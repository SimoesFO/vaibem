import * as Yup from 'yup';

const authSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('O campo E-mail é obrigátorio'),
  password: Yup.string()
    .min(5, 'A senha deve ter entre 5 e 20 caracteres.')
    .max(20, 'A senha deve ter entre 5 e 20 caracteres.')
    .required('A senha é obrigátorio'),
});

export default authSchema;
