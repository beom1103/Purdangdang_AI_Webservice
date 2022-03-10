# Generated by Django 4.0.2 on 2022-03-09 14:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserPlant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=20, null=True, verbose_name='반려식물 이름')),
                ('image', models.ImageField(blank=True, null=True, upload_to='user_plants', verbose_name='반려식물 이미지')),
                ('order', models.IntegerField(default=1, verbose_name='반려식물 순서')),
                ('user_id', models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='유저 ID')),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_pk', models.IntegerField(blank=True)),
                ('email', models.EmailField(blank=True, max_length=500, unique=True)),
                ('nickname', models.CharField(blank=True, max_length=200)),
                ('point', models.IntegerField(default=0)),
                ('like', models.CharField(blank=True, max_length=200)),
                ('phone', models.CharField(blank=True, max_length=200)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
