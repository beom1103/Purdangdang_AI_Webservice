from dataclasses import fields
from django import forms
from pybo.models import Answer, Question


class QuestionForm(forms.ModelForm):
    class Meta:
        model = Question  # 사용할 모델
        fields = ['subject', 'content']  # QuestionForm에서 사용할 Question 모델의 속성
        '''
        {{forms.as_p}} 를 사용했을 때 자동으로 html 코드가 생성되니까 여기서 수작업으로
        디자인을 수정해줄 수 있다.
        widgets = {
            'subject': forms.TextInput(attrs={'class': 'form-control'}),
            'content': forms.Textarea(attrs={'class': 'form-control', 'rows':10}),
        }
        '''

        labels = {
            'subject': '제목',
            'content': '내용',
        }

class AnswerForm(forms.ModelForm):
    class Meta:
        model = Answer
        fields = ['content']
        labels = {
            'content': '답변내용',
        }
