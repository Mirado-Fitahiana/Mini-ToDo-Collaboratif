from django.contrib.auth.models import User
from rest_framework import serializers
from todo.models import Tache
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user
    
class TacheSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tache
        fields = ['id', 'id_user', 'id_attributeur', 'description', 'priorite', 'date_attribution', 'date_modification']
        
