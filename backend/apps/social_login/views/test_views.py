from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse

class test(APIView):
    def post(self, request):
        print('request.user는 ', request.user)
        print('request.user.is_staff는 ', request.user.is_staff)

        return HttpResponse('되나 안되나')
