import * as Yup from 'yup';

const storeCreateSchema = Yup.object().shape({
  name: Yup.string().required('O campo Nome é obrigátorio'),
  description: Yup.string().required('O campo Descrição é obrigátorio'),
  city: Yup.string().required('O campo Cidade é obrigátorio'),
  uf: Yup.string()
    .min(2, 'O UF só pode conter 2 caracteres')
    .max(2, 'O UF só pode conter 2 caracteres')
    .required('O campo UF é obrigátorio'),
});

export default storeCreateSchema;
