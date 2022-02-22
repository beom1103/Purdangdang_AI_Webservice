1. 사용 기술
   1. react-typesctipt
   2. react-router-dom
   3. recoil
   4. tailwind css
   5. eslint/prettier
   6. axios
2. 규칙

   1. 변수 명은 동사 + 명사
   2. 함수 하나 당 한 가지 기능
   3. env 파일로 url, key 등 관리

3. 코드 포맷팅 : .eslintrc, .prettierrc.json : git ignore 안하면 build 시 error 발생

   1. [https://velog.io/@qhgus/React-ESLint-Prettier-Typescript-세팅하기](https://velog.io/@qhgus/React-ESLint-Prettier-Typescript-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0)
   2. 위 블로그 보시면서 설치하시면 됩니다!
   3. 파일 위치

   ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/70de3c9b-51a1-48af-aa79-d0027318375d/Untitled.png)

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

1. tailwind css 코드 포맷팅 규정
   - class 속성이 4개를 초과하면 따로 class명 생성
   - default css 속성을 지정
   - 여태 짠 css class 리팩토링...(공통 된 속성끼리 모아서 재사용을 고려함)
2. .gitignore
   1. .env
   2. .eslintrc
   3. .prettierrc.json
