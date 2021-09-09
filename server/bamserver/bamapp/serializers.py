from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Customer, StatusHistory


class UserSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ['username', 'password']

class CustomerSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model = Customer
        fields = ['id' ,'name', 'date_of_birth', 'email']

class StatusHistorySerializer(serializers.ModelSerializer):
    check_in_time = serializers.ReadOnlyField()
    class Meta:
        model = StatusHistory
        fields = ['status', 'check_in_time','customer']
