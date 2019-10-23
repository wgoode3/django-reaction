from django.db import models


class Tv_Show_Manager(models.Manager):
    def addShow(self, data):
        errors = {}
        
        if "title" not in data:
            errors["title"] = "Title is required"
        elif len(data["title"]) < 2:
            errors["title"] = "Title must be 2 characters or longer"

        if "network" not in data:
            errors["network"] = "Network is required"
        elif len(data["network"]) < 3:
            errors["network"] = "Network must be 3 characters or longer"

        if "genre" not in data:
            errors["genre"] = "Genre is required"
        elif len(data["genre"]) < 5:
            errors["genre"] = "Genre must be 5 characters or longer"

        if len(errors) == 0:
            return Tv_Show.objects.create(
                title=data["title"],
                network=data["network"],
                genre=data["genre"]
            )
        else:
            return errors

class Tv_Show(models.Model):
    title = models.CharField(max_length=255)
    network = models.CharField(max_length=255)
    genre = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = Tv_Show_Manager()
