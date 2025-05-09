from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status,viewsets,permissions
from rest_framework.views import APIView
from todo.models import Tache
from todo.serializers import RegisterSerializer, TacheSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User

from todo.serializers import RegisterSerializer

class RegisterView(APIView):
   def post(self, request):
        permission_classes = [permissions.AllowAny]
        serializer = RegisterSerializer(data=request.data)
        
        # Validation des données
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "Utilisateur créé avec succès"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['username'] = user.username
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        
        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)
        
        data.update({
            "id": self.user.id,
            "username": self.user.username,
            "email": self.user.email,
            "first_name": self.user.first_name,
            "last_name": self.user.last_name,
        })

        return data
    
class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
class TacheViewSet(viewsets.ModelViewSet):
    serializer_class = TacheSerializer
    queryset = Tache.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def list_users(self, request):
        users = User.objects.all()
        user_list = [{
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name
        } for user in users]
        return Response(user_list, status=status.HTTP_200_OK)
    
    def get_user_by_id(self, request, user_id=None):
        try:
            user = User.objects.get(id=user_id)
            user_data = {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name
            }
            return Response(user_data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "Utilisateur introuvable"}, status=status.HTTP_404_NOT_FOUND)


    def list_taches_by_user(self, request, user_id=None):
        taches = Tache.objects.filter(id_user=user_id)
        serializer = self.get_serializer(taches, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def list_taches_by_attributeur(self, request, attributeur_id=None):
        taches = Tache.objects.filter(id_attributeur=attributeur_id)
        serializer = self.get_serializer(taches, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)