from django.contrib import admin
from .models import Customer, StatusHistory

admin.site.register(Customer)
admin.site.register(StatusHistory)
