import _ from 'lodash';
import * as Yup from 'yup';

export const resumeContactSchema = Yup.object({
  name: Yup.string().required().max(255),
  email: Yup.string().required().max(255).email('email'),
  phone: Yup.string()
    .required()
    .matches(/^\+?\d{1,20}$/, 'phone'),
  message: Yup.string().required().max(1024),
});

export type ResumeContactSchema = Yup.InferType<typeof resumeContactSchema>;
