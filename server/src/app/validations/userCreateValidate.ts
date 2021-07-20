import * as Yup from 'yup';

const userCreateSchema = Yup.object().shape({
  name: Yup.string().required('O campo Nome é obrigátorio'),
  email: Yup.string()
    .email('Email inválido')
    .required('O campo Email é obrigátorio'),
  password: Yup.string()
    .min(5, 'A senha deve ter entre 5 e 20 caracteres.')
    .max(20, 'A senha deve ter entre 5 e 20 caracteres.')
    .required('A senha é obrigátorio'),
});

export default userCreateSchema;
