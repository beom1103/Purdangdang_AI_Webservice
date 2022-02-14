import * as Yup from 'yup';

export const validationForm = Yup.object().shape({
  username: Yup.string()
    .required('이름을 입력해주세요.')
    .min(2, '이름은 최소 2자 이상 입력해주세요.')
    .max(10, '이름은 최대 10글자까지 가능합니다.'),
  email: Yup.string()
    .required('이메일을 입력해주세요')
    .email('이메일 형식을 확인해주세요.'),
  password: Yup.string()
    .required('비밀번호를 입력해주세요.')
    .min(6, '비밀번호는 최소 6자 이상 입력해주세요')
    .max(15, '비밀번호는 최대 15자까지 가능합니다. '),
  confirmPassword: Yup.string()
    .required('비밀번호 확인칸을 확인해주세요.')
    .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.'),
});
