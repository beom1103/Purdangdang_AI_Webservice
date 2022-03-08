# node.js 압축 이미지를 설치합니다
FROM node:13.12.0-alpine

# 이미지 내부 작업 경로를 설정합니다
WORKDIR /apps/frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /apps/frontend/node_modules/.bin:$PATH

# 필수 패키지 파일을 이미지 내부로 복사하고, npm 명령어로 설치합니다
# COPY package.json /apps/client/package.json
# COPY package-lock.json /apps/client/package.json

COPY package*.json ./
COPY ./ ./
COPY .env* ./

RUN npm install --silent

# 앱 시작 명령어를 시작합니다.
CMD ["npm", "start"]