from django.http import JsonResponse
from django.views import View
from .models import Tv_Show
import json


def its_working(request):
    return JsonResponse({"status": "ok"})

class TvShow(View):
    def get(self, req):
        allshows = list(Tv_Show.objects.values().all())
        return JsonResponse({"data": allshows})

    def post(self, req):
        data = json.loads(req.body.decode())
        response = Tv_Show.objects.addShow(data)
        if isinstance(response, Tv_Show):
            return JsonResponse({"status": "ok"})
        else:
            return JsonResponse({"errors": response})

class TvShowDetails(View):
    def get(self, req, show_id):
        pass

    def put(self, req, show_id):
        return JsonResponse({"show_id": show_id})

    def delete(self, req, show_id):
        pass
