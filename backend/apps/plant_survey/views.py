
from django.http import HttpResponse
from ..plant.serializers import PlantSerializer
from ..plant.models import Plant
from rest_framework.views import APIView
import json
from .models import Category
from rest_framework.response import Response


# Create your views here.

class SurveyResultView(APIView):
    def post(self, request):
        
        data = json.loads(request.body)
        data = data['answers']
        data = data.split(' ')

        result = {}

        for i in range(len(data)):
            answer_set = data[i].split('=')
            result[answer_set[0]] = int(answer_set[1])

        survey_code = "@" + dic_to_str(result)
        plants=''
        plants = Category.objects.filter(survey_code=survey_code)

        if not plants:
            new_survey_code = replaced_code(survey_code)
            plants = Category.objects.filter(survey_code=new_survey_code)

        plants_id_list = []

        for i in range(len(plants)):
            plants_id_list.append(plants[i].id)

        plants = Plant.objects.filter(id__in=plants_id_list)
        serializer_class = PlantSerializer(plants, many=True)

        return Response(serializer_class.data)

def dic_to_str(data):
    result = ''
    data_values = list(data.values())

    for i in range(len(data_values)):
        result += str(data_values[i])
        
    return result

def replaced_code(survey_code):
    return '@001100'

#survey_code에 해당하는 식물이 없을 때 대신 반환해줄 다른 survey_code를 지정함.
def register_blacklist_code(survey_code):

    '''survey_code = survey_code.strip('@')
    change_order = ['water_cycle', 'sunlight', 'size', 'price', 'difficulty', 'scent']
    column_order = ['difficulty','price','scent','size','sunlight','water_cycle']

    blacklist_code  = Blacklist.objects.filter(survey_code=survey_code)

    if not blacklist_code:
        while True:
            for i in range(len(change_order)):
                index = column_order.index(change_order[i])
                survey_code[index] = reverse_value(survey_code[index])
                plants = Category.objects.filter(survey_code=survey_code)

                if not plants:'''
                    
def reverse_value(data):
    if data == '1':
        return '0'
    else:
        return '1'
    