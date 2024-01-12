import * as Yup from 'yup';

import { HttpBadDto } from '../utils/errors';

export const validateSchema =
  <S extends Yup.ObjectSchema<any>>(schema: S) =>
  async (value: any) =>
    schema
      .validate(value, { abortEarly: false })
      .catch(({ errors }) => Promise.reject(new HttpBadDto('schema', errors)));

export const paginationSchema = Yup.object({
  take: Yup.number().required().oneOf([10, 25, 50, 100]),
  skip: Yup.number()
    .required()
    .test((value, { parent }) => {
      return value >= 0 && value % Number(parent.take) === 0;
    }),
});

export type PaginationSchema = Yup.InferType<typeof paginationSchema>;

export * from './projects';
export * from './resume';
