Pour lancer le projet backend :
  1-Créer un environnement virtuel :
     python -m venv venv

  2-Activer l'environnement virtuel :
    Windows (PowerShell) PS: venv/Scripts/activate
    Windows (CMD) : .\venv\Scripts\activate.bat
    Linux/Mac : source venv/bin/activate

  3-Installer les dépendances :
    pip -r requirements.txt
  4-Faire les migrations :
    python manage.py makemigrations todo
    python manage.py migrate
    Si cela ne fonctionne pas :
      Supprime le dossier migrations dans le projet todo.
      Relance les commandes de migration.

  5-Lancer le serveur :
    python manage.py runserver

Pour lancer le projet frontend :
  1- Installer les dépendances :
    npm install
  2-Lancer le projet :
    npm start

Voici les interfaces que j'ai creer 
J'ai utilisé MUI librairie pour accélerer la création d'interface WEB
1- Login
![image](https://github.com/user-attachments/assets/d5db6310-2728-42a5-9e25-5e323f12cb41)
2- Register
![image](https://github.com/user-attachments/assets/40194326-342c-41a8-a423-55625b2b430d)
3- CRUD TACHES
![image](https://github.com/user-attachments/assets/f3cbc909-ce21-495c-a6f2-046f5d98b052)
3-a) Insertion tache
![image](https://github.com/user-attachments/assets/1f7e93df-09c3-4260-ba02-4e67b1e9f1ba)
3-b) Modification tache
![image](https://github.com/user-attachments/assets/d33c170a-17ad-42db-b03b-068012d49c73)
3-c) Suppression tache
![image](https://github.com/user-attachments/assets/a361a9c6-8f6b-41d0-b1a5-ef84ac60b3af)
3- Résultat après suppression
![image](https://github.com/user-attachments/assets/828b7420-87f3-459f-9c7d-a95c076ee55c)





