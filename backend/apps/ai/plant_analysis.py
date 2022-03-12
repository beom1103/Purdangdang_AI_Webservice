import numpy as np
import os
import cv2
from keras.models import load_model
THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))

CATEGORIES= [
    '개운죽',
    '관음죽',
    '괴마옥',
    '극락조화',
    '금전수',
    '녹태고',
    '눈꽃 선인장',
    '다바나 고사리',
    '더피 고사리',
    '둥근 잎 아카시아',
    '드라세나 드라코',
    '드라세나 마지나타',
    '디지고테카 아랄리아',
    '떡갈잎 고무나무',
    '라벤더',
    '로즈마리',
    '립살리스 트리고나',
    '마란타 레우코네우라',
    '마오리 소포라',
    '마오리 코로키아',
    '멕시코 소철',
    '멜라니 고무나무',
    '목마가렛',
    '몬스테라 델리시오사',
    '몬스테라 아단소니',
    '몬스테라 알보 바리에가타',
    '무늬 푸미라',
    '무늬벤자민 고무나무',
    '미모사',
    '바로크 벤자민',
    '박쥐란',
    '백묘국',
    '벵갈 고무나무',
    '보라 사랑초',
    '보스턴 고사리',
    '브레이니아 니보사',
    '블루스타 고사리',
    '사계귤',
    '산세베리아',
    '산세베리아 문샤인',
    '세네시오 칸디칸스',
    '소철',
    '수박 페페로미아',
    '수채화 고무나무',
    '스위트 바질',
    '스킨답서스',
    '스투키',
    '스파티필름',
    '십이지권',
    '싱고니움',
    '아가베 아테누아타',
    '아라우카리아',
    '아레카야자',
    '아스파라거스 나누스',
    '알로카시아 아마조니카',
    '알로카시아 오도라',
    '알로카시아 프라이덱',
    '애니시다',
    '여인초',
    '오렌지 자스민',
    '오색 마삭줄',
    '올리브 나무',
    '용신목',
    '원숭이꼬리 선인장',
    '율마',
    '유카',
    '유칼립투스 폴리안',
    '인도 고무나무',
    '접란',
    '제라늄',
    '줄리아 페페',
    '칼라데아 세토사',
    '칼라데아 오르비폴리아',
    '칼라디움',
    '칼랑코에',
    '켄차 야자',
    '콜레우스',
    '틸란드시아 이오난사',
    '테이블 야자',
    '틸란시아 세로그라피카',
    '파키라',
    '생선뼈 선인장',
    '필레아 페페로미오데스',
    '필로덴드론 글로리오섬',
    '필로덴드론 버킨',
    '필로덴드론 플로리다뷰티',
    '필로덴드론 핑크프린세스',
    '해피트리',
    '드라세나 맛상게아나',
    '헤데라',
    '호야 카르노사',
    '호주매화',
    '홍콩 야자',
    '후마타 고사리',
    '휘카스 움베르타'
]

CATEGORIES_COMMON = [
    'Fungal Leaf Spots',
    'Fungal Leaf Spots',
    'Fungal Leaf Spots',
    'healthy',
    'healthy',
    'Powdery mildew',
    'healthy',
    'Fungal Leaf Spots',
    'Fungal Leaf Spots',
    'Leaf Blight',
    'healthy',
    'Fungal Leaf Spots',
    'Fungal Leaf Spots',
    'Leaf Blight',
    'healthy',
    'Bacterial Leaf Spot',
    'Bacterial Leaf Spot',
    'healthy',
    'Bacterial Leaf Spot',
    'healthy',
    'Leaf Blight',
    'Leaf Blight',
    'healthy',
    'healthy',
    'healthy',
    'Powdery mildew',
    'Leaf scorch',
    'healthy',
    'Bacterial Leaf Spot',
    'Leaf Blight',
    'Leaf Blight',
    'Fungal Leaf Spots',
    'Fungal Leaf Spots',
    'spider mite',
    'Fungal Leaf Spots',
    'virus',
    'virus',
    'healthy'
]

class Species:
     
    def __init__(self, path):
        self.resnet_model = load_model(path)
        
    def dataization(self,img_path):
        image_w = 224
        image_h = 224
        ff = np.fromfile(img_path, np.uint8)
        img = cv2.imdecode(ff, cv2.IMREAD_UNCHANGED)
        img = cv2.resize(img, None, fx=image_w/img.shape[1], fy=image_h/img.shape[0])
        return (img/224)
  
    def calc_percent(self, y_prob, y_sort):
        result = []
        result_percent = []
           
        for i in range(-1,-4,-1):
            for j in range(95):
                if y_prob[0][j] == y_sort[0][i]:
                    index_num = j
                    temp=CATEGORIES[index_num]
                    temp_percent=round((y_prob[0][index_num]*100), 2)
                    break
            result.append(temp)
            result_percent.append(temp_percent)

        return (result, result_percent)

    def predict(self, img_path):
        test = []
        test.append(self.dataization(img_path))
        y_prob= self.resnet_model.predict(np.array(test), verbose=0)
        y_sort = np.sort(y_prob, axis = 1)
        
        result, result_percent = self.calc_percent(y_prob, y_sort)
             
        for i in range(3):
            print(f'top_{i+1} : {result[i]}, {result_percent[i]}%')
        
        content = {}
        for i in range(3):
            content[f'top{i+1}'] = {
                "name" : result[i],
                "percent" : result_percent[i],
            }
        
        return content 

class Disease:
    
    def __init__(self, path):
        self.new_model = load_model(path)
        
    def Dataization(self,img_path):
        image_w = 250
        image_h = 250
        ff = np.fromfile(img_path, np.uint8)
        img = cv2.imdecode(ff, cv2.IMREAD_UNCHANGED)
        img = cv2.resize(img, None, fx=image_w/img.shape[1], fy=image_h/img.shape[0])
        return (img/250)

    
    def predict(self, img_path):
        test = []
        test.append(self.Dataization(img_path))
        test= np.array(test)
        y_prob= self.new_model.predict(test, verbose=0)
        predicted= y_prob.argmax(axis= -1)
        return CATEGORIES_COMMON[predicted[0]]


    
# model = Species('48_class_model_3.h5')
# print(model.predict('test.jpeg'))
