from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Customer, StatusHistory


class UserSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ['username', 'password']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['name', 'date_of_birth', 'email']

class StatusHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusHistory
        fields = ['status', 'customer']
