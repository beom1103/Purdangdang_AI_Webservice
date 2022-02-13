FROM python:3.8
ENV PYTHONUNBUFFERED 1 
# ENV PYTHONDONTWRITTENBYTECODE 1
WORKDIR /apps 
COPY requirements.txt requirements.txt 
RUN pip3 install --upgrade pip 
RUN pip3 install -r requirements.txt 
COPY . .
