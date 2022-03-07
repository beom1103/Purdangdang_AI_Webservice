from sre_parse import CATEGORIES
import numpy as np
import os
import cv2
from keras.models import load_model

THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
my_file = os.path.join(THIS_FOLDER, '48_class_model_3.h5')
print(my_file)
CATEGORIES = [
              "개운죽", "관음죽", "괴마옥", "극락조화", "금전수", "녹태고", "다바나 고사리", "더피 고사리", "둥근 잎 아카시아",
              "드라세나 드라코", "드라세나 마지나타", "디지고데카 아랄리아", "떡갈잎 고무나무", "라벤더", "로즈마리", "립살리스 트리고나",
              "마란타 레우코네우라", "마오리 소포라", "마오리 코로키아", "멕시코 소철", "멜라니 고무나무", "목마가렛", "몬스테라 델리시오사",
              "몬스테라 아단소니", "몬스테라 알보 바리에가타", "무늬 푸미라", "무늬벤자민 고무나무", "미모사", "바로크 벤자민", "박쥐란", "백묘국", "베고니아",
              "벵갈 고무나무", "보스턴 고사리", "브레이니아 니보사", "블루스타 고사리", "산세베리아", "산세베리아 문샤인", "세네시오 칸디칸스",
              "소철", "수박 페페로미아", "수채화 고무나무", "스위트 바질", "스킨답서스", "스투키", "스파티필름", "유주나무", "행운목"
              ]

class Resnet:
    # def __init__(self, path):
    #     self.resnet_model = load_model(path)
    
    def __init__(self):
        self.resnet_model = load_model('48_class_model_3.h5')

    def dataization(self,img_path):
        image_w = 224
        image_h = 224
        ff = np.fromfile(img_path, np.uint8)
        img = cv2.imdecode(ff, cv2.IMREAD_UNCHANGED)
        img = cv2.resize(img, None, fx=image_w/img.shape[1], fy=image_h/img.shape[0])
        return (img/224)

    
    def predict(self, img_path):
        test = []
        test.append(self.dataization(img_path))
        test= np.array(test)
        y_prob= self.resnet_model.predict(test, verbose=0)
        predicted= y_prob.argmax(axis=-1)
        
        return CATEGORIES[predicted[0]]

# model = Resnet()

# print(model.predict('test.jpeg'))