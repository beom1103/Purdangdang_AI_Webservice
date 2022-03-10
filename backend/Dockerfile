FROM python:3.8
ENV PYTHONUNBUFFERED 1 
# ENV PYTHONDONTWRITTENBYTECODE 1
WORKDIR /apps/backend
COPY requirements.txt requirements.txt
RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx

RUN pip3 install --upgrade pip 
RUN pip3 install -r requirements.txt 
COPY . .
EXPOSE 5000

