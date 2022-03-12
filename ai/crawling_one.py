import errno
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import urllib.request
import time
import os
import pandas as pd



search = input ('검색어를 입력하세요: ')

num = int(input ('다운로드 받고 싶은 이미지의 갯수를 입력하세요: '))

# 저장 폴더 생성
try:
    if not (os.path.isdir(str(search))):
        os.makedirs((os.path.join(str(search))))
except OSError as e:
    if e.errno != errno.EEXIST:
        print("폴더 생성 실패!")
        exit()



# def set_chrome_driver():
#     chrome_options = webdriver.ChromeOptions()
#     driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
#     return driver

driver = webdriver.Chrome('/Users/seosanghoon/Downloads/chromedriver')

driver.get("https://www.google.co.kr/imghp?hl=ko&tab=wi&ogbl")

elem = driver.find_element_by_name("q")


elem.send_keys(str(search))

elem.send_keys(Keys.RETURN) 

if num>=50:

    SCROLL_PAUSE_TIME = 1.5

    # Get scroll height

    last_height = driver.execute_script("return document.body.scrollHeight")


    while True:

        # Scroll down to bottom

        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")


        # Wait to load page

        time.sleep(SCROLL_PAUSE_TIME)


        # Calculate new scroll height and compare with last scroll height

        new_height = driver.execute_script("return document.body.scrollHeight")

        if new_height == last_height:

            try:

                driver.find_element_by_css_selector(".mye4qd").click()

            except:

                break

        last_height = new_height


count = 1

images = driver.find_elements_by_css_selector(".rg_i.Q4LuWd")


for image in images:

    try:

        image.click()  

        time.sleep(1.5)
        
        imgURL=driver.find_element_by_css_selector(".n3VNCb").get_attribute("src")

        urllib.request.urlretrieve(imgURL , './' + str(search) + '/' + str(search) + str(count) + ".jpg")

        count = count + 1

    except:

        pass

    if count == int(num)+1:

        break

driver.close()