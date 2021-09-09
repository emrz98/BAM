from django.http.response import JsonResponse
from django.shortcuts import render
from django.contrib.auth import authenticate
from django.http import Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, CustomerSerializer, StatusHistorySerializer
from .models import Customer, StatusHistory

"""
    Login authentication
    You need to register user and password in your own database.
"""
class Login(APIView):
    permission_classes = (AllowAny,)
    def authentication(self, request, username, password):
        user = authenticate(username = username, password = password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return token
        else:
           return None

    def post(self, request, format = None):
        username = request.data["username"]
        password = request.data["password"]
        token = self.authentication(request, username, password)
        if token is None:
            return Response(status.HTTP_400_BAD_REQUEST)
        else:
            response = {"token": token.key}
            return Response(response, status = status.HTTP_200_OK)


"""
 You can access to the entire list of the customer and you can add new ones.
"""

class CustomerList(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        snippets = Customer.objects.all()
        serializer = CustomerSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            model = serializer.save()
            status_history = StatusHistory.objects.create(customer = model)
            status_history.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomerDetail(APIView):
    permission_classes = (IsAuthenticated,)
    def get_object(self, pk):
        try:
            return Customer.objects.get(pk=pk)
        except Customer.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CustomerSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CustomerSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class StatusHistoryList(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, pk, format=None):
        snippets = StatusHistory.objects.filter(customer = pk)
        serializer = StatusHistorySerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, pk, format=None):
        customer_status_history = StatusHistory.objects.filter(customer = pk)
        last_status = customer_status_history.latest('id').status
        actual_status = request.data["status"]
        history_dict = request.data.copy()
        history_dict["customer"] = pk
        serializer = StatusHistorySerializer(data=history_dict)
        if serializer.is_valid() and last_status != actual_status:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)