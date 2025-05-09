# Generated by Django 5.2.1 on 2025-05-07 19:10

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Tache',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('description', models.TextField()),
                ('priorite', models.IntegerField(default=1)),
                ('date_attribution', models.DateTimeField(auto_now_add=True)),
                ('date_modification', models.DateTimeField(auto_now=True)),
                ('id_attributeur', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='id_attributeur', to=settings.AUTH_USER_MODEL)),
                ('id_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='id_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
