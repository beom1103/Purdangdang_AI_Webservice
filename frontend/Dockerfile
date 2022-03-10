# FROM node:latest as builder

# # Work directory

# WORKDIR /usr/src/app

# # Copy the source file

# COPY . .

# # Install the library

# # RUN [“/usr/local/bin/npm”, “install”]
# # RUN [“/usr/local/bin/npm”, “run”, “build:prod”]
# RUN [“/local/bin/npm”, “install”]
# RUN [“/bin/npm”, “run”, “build”]

# # From make nginx image

# FROM nginx:latest

# # Copy the nginx conf files

# # COPY nginx/nginx.conf /etc/nginx
# COPY nginx/default.conf /etc/nginx
# COPY nginx/snowball-frontend.conf /etc/nginx/sites-available/snowball-frontend.conf
# RUN ln -s /etc/nginx/sites-available /etc/nginx/sites-enabled

# WORKDIR /app
# COPY –from=builder /usr/src/app/build /app/build

# CMD [“nginx”, “-g”, “daemon off;”]

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
