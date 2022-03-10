from sre_parse import CATEGORIES
import numpy as np
import os
import cv2
from keras.models import load_model
from .category import CATEGORIES, CATEGORIES_COMMON
THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
my_file = os.path.join(THIS_FOLDER, '48_class_model_3.h5')

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
            for j in range(48):
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
    
# model = Resnet('48_class_model_3.h5')
# print(model.predict('test1.jpg'))
