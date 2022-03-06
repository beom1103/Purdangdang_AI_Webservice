from sre_parse import CATEGORIES
import numpy as np
import os
import cv2
import h5py
from keras.models import load_model

THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
my_file = os.path.join(THIS_FOLDER, '48_class_model_3.h5')

CATEGORIES = [
              "개운죽", "관음죽", "괴마옥", "극락조화", "금전수", "녹태고", "다바나 고사리", "더피 고사리", "둥근 잎 아카시아",
              "드라세나 드라코", "드라세나 마지나타", "디지고테카 아랄리아", "떡갈잎 고무나무", "라벤더", "로즈마리", "립살리스 트리고나",
              "마란타 레우코네우라", "마오리 소포라", "마오리 코로키아", "멕시코 소철", "멜라니 고무나무", "목마가렛", "몬스테라 델리시오사",
              "몬스테라 아단소니", "몬스테라 알보 바리에가타", "무늬 푸미라", "무늬벤자민 고무나무", "미모사", "바로크 벤자민", "박쥐란", "백묘국", "베고니아",
              "벵갈 고무나무", "보스턴 고사리", "브레이니아 니보사", "블루스타 고사리", "산세베리아", "산세베리아 문샤인", "세네시오 칸디칸스",
              "소철", "수박 페페로미아", "수채화 고무나무", "스위트 바질", "스킨답서스", "스투키", "스파티필름", "사계귤", "드라세나 맛상게아나"
              ]

class Resnet:
    
    def __init__(self, path):
        self.resnet_model = load_model(path)
    
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
        
        print(predicted)
        
        y_sort = np.sort(y_prob, axis = 1)

        top_1 = []
        top_1_percent = []
        top_2 = []
        top_2_percent = []
        top_3 = []
        top_3_percent = []

        #top_1
        for i in range(len(test)):
            top_1.append(CATEGORIES[predicted[i]])
        
        # top_1_percent
        for i in range(48):
            if y_prob[0][i] == y_sort[0][-1]:
                index_num = i
        percent = round((y_prob[0][index_num]*100), 2)
        top_1_percent.append(percent)

        # top_2
        for i in range(48):
            if y_prob[0][i] == y_sort[0][-2]:
                index_num = i
        top_2.append(CATEGORIES[index_num])
        percent = round((y_prob[0][index_num]*100), 2)
        top_2_percent.append(percent)

        # top_3
        for i in range(48):
            if y_prob[0][i] == y_sort[0][-3]:
                index_num = i
        top_3.append(CATEGORIES[index_num])
        percent = round((y_prob[0][index_num]*100), 2)
        top_3_percent.append(percent)

        
        for i in range(len(test)):
            print(f"top_1 : {top_1[i]} {top_1_percent[i]}%,  top_2 : {top_2[i]} {top_2_percent[i]} %, top_3 : {top_3[i]} {top_3_percent[i]} %")
        
        # return CATEGORIES[predicted[0]]
        return {
            "top1" : {
                "name" : top_1[i],
                "percent" : top_1_percent[i],
            },
            "top2" : {
                "name" : top_2[i],
                "percent" : top_2_percent[i],
            },
            "top3" : {
                "name" : top_3[i],
                "percent" : top_3_percent[i],
            }
        }

# model = Resnet('48_class_model_3.h5')
# print(model.predict('test1.jpg'))
