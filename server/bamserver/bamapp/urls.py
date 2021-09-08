from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('login/', views.Login.as_view()),
    path('customer/', views.CustomerList.as_view()),
    path('customer/<int:pk>/', views.CustomerDetail.as_view()),
    path('customer/<int:pk>/history/', views.StatusHistoryList.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)