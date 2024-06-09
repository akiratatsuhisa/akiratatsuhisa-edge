import _ from 'lodash';
import * as Yup from 'yup';

import {
  Database,
  Framework,
  Language,
  ProjectStatus,
  Technology,
} from '../utils';

export const upsertProjectSchema = Yup.object({
  isPublished: Yup.boolean().required(),
  startDate: Yup.string()
    .transform((value) => (!value ? null : value))
    .nullable()
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/),
  endDate: Yup.string()
    .transform((value) => (!value ? null : value))
    .nullable()
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/),
  status: Yup.string().required().oneOf(_.values(ProjectStatus)),
  languages: Yup.array(Yup.string().required().oneOf(_.values(Language)))
    .required()
    .unique(),
  frameworks: Yup.array(Yup.string().required().oneOf(_.values(Framework)))
    .required()
    .unique(),
  databases: Yup.array(Yup.string().required().oneOf(_.values(Database)))
    .required()
    .unique(),
  technologies: Yup.array(Yup.string().required().oneOf(_.values(Technology)))
    .required()
    .unique(),
  others: Yup.array(Yup.string().required()).required().unique(),
});

export type UpsertProjectSchema = Yup.InferType<typeof upsertProjectSchema>;

export const uploadProjectImageSchema = Yup.object({
  isThumb: Yup.bool().optional(),
});

export type UploadProjectImageSchema = Yup.InferType<
  typeof uploadProjectImageSchema
>;

export const deleteProjectImageSchema = Yup.object({
  index: Yup.number().optional().integer(),
});

export type DeleteProjectImageSchema = Yup.InferType<
  typeof deleteProjectImageSchema
>;

export const sortProjectImageSchema = Yup.object({
  index: Yup.number().required().integer(),
  mode: Yup.string().required().oneOf(['increment', 'decrement']),
});

export type SortProjectImageSchema = Yup.InferType<
  typeof sortProjectImageSchema
>;

export const upsertProjectLocalizationSchema = Yup.object({
  title: Yup.string().required().max(255),
  slug: Yup.string().required().max(255),
  description: Yup.string().optional().max(1024),
  client: Yup.string().optional().max(255),
  website: Yup.string().optional().max(255),
  source: Yup.string().optional().max(255),
});

export type UpsertProjectLocalizationSchema = Yup.InferType<
  typeof upsertProjectLocalizationSchema
>;
