from django.db import models

# Create your models here.
class Customer(models.Model):
    name = models.CharField(max_length = 30)
    date_of_birth = models.DateField()
    email = models.EmailField()

    def __str__(self):
        return self.name + " " + str(self.date_of_birth)
class StatusHistory(models.Model):
    CHOICES = [
        ("Nuevo", "Nuevo"), 
        ("En seguimiento", "En seguimiento"), 
        ("Atendido", "Atendido"), 
        ("Rechazado", "Rechazado"),
    ]
    status = models.CharField(max_length = 30, choices= CHOICES, default="Nuevo")
    check_in_time = models.DateTimeField(auto_now = True)
    customer = models.ForeignKey(Customer, on_delete = models.CASCADE)


    