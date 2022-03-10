

# 사용기술

   1. react-typesctipt
   2. react-router-dom
   3. recoil
   4. tailwind css with styled-components
   5. eslint/prettier
   6. axios

# 규칙
   1. 변수 명은 동사 + 명사
   2. 함수 하나 당 한 가지 기능
   3. env 파일로 url, key 등 관리
   4. .gitignore
   -  .env
   - .eslintrc
   - .prettierrc.json
   
# 코드 포맷팅: .eslintrc, .prettierrc.json

   1. [https://velog.io/@qhgus/React-ESLint-Prettier-Typescript-세팅하기](https://velog.io/@qhgus/React-ESLint-Prettier-Typescript-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0)
   2. 위 블로그 보시면서 설치하시면 됩니다!
   3. 파일 위치

   ```tsx
//파일명 : root 디렉토리에 .eslintrc 생성 후 코드 복붙
{
  "parser": "@typescript-eslint/parser",
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": ["@typescript-eslint", "prettier"],
  "ignorePatterns": ["node_modules/"],
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "generator-star-spacing": "off",
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ]
  }
}
```

```tsx
//파일명 : root 디렉토리에 .prettierrc.json 생성 후 코드 복붙
{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "endOfLine": "auto",
  "arrowParens": "avoid"
}
```
## 1. tailwind css 코드 포맷팅 규정
   - class 속성이 4개를 초과하면 따로 class명 생성
   - default css 속성을 지정
   - 공통 된 속성끼리 모아서 재사용을 고려
  

# 폴더 구조

```bash
frontend
|
├── public : index.html, img, video 
│
├── src
│   │
|   |
│   ├── api : 서버로 보내는 fetch(axios)로직
│   │
|   |
│   ├── components
│   │       |── global, modal : 재사용 되는 공통 컴포넌트, modal
|   |       |
|   |       |── 각 page별 컴포넌트 
|   |       |
|   |       |── routing : 페이지 Routing 관리
|   |
│   ├── pages : 라우팅 되는 page
│   │
|   |
│   └── store : type, json ...
└── App.tsx / App.css
```

## 실행(frontend에서 실행)

1. npm start(port:3000)
   cd frontend
   npm install
   npm start


# 구현 기능

### 1. 홈 페이지

#### 질병 진단기능(회원만 이용 가능)

- 이미지 업로드 후 버튼 클릭시 모달로 나타냄
- 모달에서는 Accordian을 통해 원인, 증상, 방안 제시

### 2. 회원가입 페이지 & 로그인 페이지

- 회원가입시 양식이 알맞지 않으면 알맞지 않은 곳으로 focus (react-hook-form 이용) 
- 회원가입 후 로그인 페이지로 이동
- token을 localstorage에 저장 관리
- 유효성 검사
- 로그인 & 회원가입 중첩 라우팅으로 구현
- 로그인 성공시 홈페이지로 리다이렉트

#### 접근제한

- 페이지가 이동될 대마다 localstorage에 있는 token이 유효한지 확인
- 확인 후 !valid면 로그인 페이지로 이동
- 로그인 후 로그인과. 회원가입 페이지 접근 시도하면 메인 페이지로 이동
- 로그인 전, 후 ui 변경

### 3. 검색 페이지

- scroll Top 버튼
- img 클릭 하면 상세 페이지로 이동
- infinite scroll 구현 (throttle을 이용해 최적화)
- 검색 필터 
- 검색 단어 onChange 시 바로 반영하여 결과 출력(debounce을 이용해 최적화)

### 4. 식물 상세 페이지(리뷰 페이지는 회원만 이용 가능)

- Info, Review 중첩 라우팅
- 식물에 관한 기본적인 정보 제공
- 리뷰 작성, 수정, 삭제, 별점 기능 (리뷰 작성시 debounce 적용)
- 찜 기능(myPage에 등록)
- 식물구매 버튼 클릭시 해당 식물과 관련된 네이버쇼핑 페이지로 이동
- 영상보기 버튼 클릭시 해당 식물과 관련된 유튜브 페이지로 이동

### 5. 식물 추천 서비스 페이지

- 여러가지 설문(집안의 공간, 반려동물의 유무, 취향 등)을 토대로 사용자의 환경을 조사받아 적합한 식물을 추천
- 문항 선택시 자동으로 다음 문항으로 이동
- 페이지네이션
- 추천 결과를 마이페이지에 자동 반영(찜기능)
- 이미지 클릭시 상세 페이지로 이동



### 6. 마이페이지

- 
-
