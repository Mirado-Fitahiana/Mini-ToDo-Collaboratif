to run the backend project
  1-python -m venv venv
  2-activate venv:
    PS: venv/Scripts/activate
  3-install pip
    pip -r requirements.txt
  4-do migration
    python manage.py makemigrations todo
    python manage.py migrate
      if doesn't work delete folder migration in the todo project and re run the command
  5-run the project
    python manage.py runserver

to run the front-end project
  1- install package
    npm install
  2-run the project
    npm start
