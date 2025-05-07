from django.db import models
from django.contrib.auth.models import User


class Tache(models.Model):
    id = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User,related_name='id_user', on_delete=models.CASCADE)
    description = models.TextField()
    priorite = models.IntegerField(default=1)
    date_attribution = models.DateTimeField(auto_now_add=True)
    date_modification = models.DateTimeField(auto_now=True)
    id_attributeur = models.ForeignKey(User,related_name='id_attributeur', on_delete=models.CASCADE)
    class Meta:
        db_table = 'tache'