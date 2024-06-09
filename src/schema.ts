import { integer, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';

import {
  Database,
  Framework,
  Language,
  ProjectStatus,
  Technology,
} from './utils';

export const contacts = sqliteTable('contacts', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  message: text('message').notNull(),
  isCancelled: integer('isCancelled', { mode: 'boolean' })
    .notNull()
    .default(false),
  ipAddress: text('ipAddress'),

  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull(),
});

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  sort: integer('sort').notNull().default(0),
  status: text('status').notNull().default(ProjectStatus.Initialize),
  isPublished: integer('isPublished', { mode: 'boolean' })
    .notNull()
    .default(false),
  startDate: integer('startDate', { mode: 'timestamp_ms' }),
  endDate: integer('endDate', { mode: 'timestamp_ms' }),

  thumbSrc: text('thumbSrc'),
  imageSrcs: text('imageSrcs', { mode: 'json' })
    .$type<Array<string>>()
    .notNull()
    .default([]),

  languages: text('languages', { mode: 'json' })
    .$type<Array<Language>>()
    .notNull()
    .default([]),
  frameworks: text('frameworks', { mode: 'json' })
    .$type<Array<Framework>>()
    .notNull()
    .default([]),
  databases: text('databases', { mode: 'json' })
    .$type<Array<Database>>()
    .notNull()
    .default([]),
  technologies: text('technologies', { mode: 'json' })
    .$type<Array<Technology>>()
    .notNull()
    .default([]),
  others: text('others', { mode: 'json' })
    .$type<Array<string>>()
    .notNull()
    .default([]),

  views: integer('views').notNull().default(0),

  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull(),
});

export const projectLocalizations = sqliteTable(
  'projectLocalizations',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    slug: text('slug').notNull(),

    projectId: integer('projectId').references(() => projects.id, {
      onUpdate: 'cascade',
      onDelete: 'cascade',
    }),
    languageCode: text('languageCode').notNull(),

    title: text('title').notNull(),
    description: text('description'),
    client: text('client'),
    website: text('website'),
    source: text('source'),

    createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull(),
  },
  (projectLocalizations) => ({
    uniqueSlugLanguageCode: unique().on(
      projectLocalizations.slug,
      projectLocalizations.languageCode,
    ),
    uniqueProjectLanguageCode: unique().on(
      projectLocalizations.projectId,
      projectLocalizations.languageCode,
    ),
  }),
);
