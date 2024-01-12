
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  detectRuntime,
} = require('./runtime/edge.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.9.1
 * Query Engine version: 23fdc5965b1e05fc54e5f26ed3de66776b93de64
 */
Prisma.prismaVersion = {
  client: "5.9.1",
  engine: "23fdc5965b1e05fc54e5f26ed3de66776b93de64"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */
exports.Prisma.ContactScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  phone: 'phone',
  message: 'message',
  isCancelled: 'isCancelled',
  ipAddress: 'ipAddress',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProjectScalarFieldEnum = {
  id: 'id',
  thumbSrc: 'thumbSrc',
  sort: 'sort',
  isPublished: 'isPublished',
  startDate: 'startDate',
  endDate: 'endDate',
  status: 'status',
  imageSrcs: 'imageSrcs',
  languages: 'languages',
  frameworks: 'frameworks',
  databases: 'databases',
  technologies: 'technologies',
  others: 'others',
  views: 'views',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProjectLocalizationScalarFieldEnum = {
  id: 'id',
  slug: 'slug',
  projectId: 'projectId',
  languageCode: 'languageCode',
  title: 'title',
  description: 'description',
  client: 'client',
  website: 'website',
  source: 'source',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};
exports.ProjectStatus = exports.$Enums.ProjectStatus = {
  INITIALIZE: 'INITIALIZE',
  ON_GOING: 'ON_GOING',
  MAINTAIN: 'MAINTAIN',
  DELAY: 'DELAY',
  CANCEL: 'CANCEL',
  PUBLISH: 'PUBLISH'
};

exports.Language = exports.$Enums.Language = {
  C_SHARP: 'C_SHARP',
  CSS: 'CSS',
  DART: 'DART',
  GO: 'GO',
  HTML: 'HTML',
  JAVASCRIPT: 'JAVASCRIPT',
  PYTHON: 'PYTHON',
  SASS: 'SASS',
  TYPESCRIPT: 'TYPESCRIPT'
};

exports.Framework = exports.$Enums.Framework = {
  ANGULAR: 'ANGULAR',
  BOOTSTRAP: 'BOOTSTRAP',
  DJANGO: 'DJANGO',
  DOTNET_CORE: 'DOTNET_CORE',
  EXPRESS: 'EXPRESS',
  FLUTTER: 'FLUTTER',
  NEXT: 'NEXT',
  NEST: 'NEST',
  NODEJS: 'NODEJS',
  NUXT: 'NUXT',
  REACT: 'REACT',
  TAILWINDCSS: 'TAILWINDCSS',
  VUE: 'VUE'
};

exports.Database = exports.$Enums.Database = {
  ELASTICSEARCH: 'ELASTICSEARCH',
  MONGODB: 'MONGODB',
  MYSQL: 'MYSQL',
  NEO4J: 'NEO4J',
  POSTGRESQL: 'POSTGRESQL',
  REDIS: 'REDIS',
  SQLITE: 'SQLITE'
};

exports.Technology = exports.$Enums.Technology = {
  AWS: 'AWS',
  AZURE: 'AZURE',
  DOCKER: 'DOCKER',
  ESLINT: 'ESLINT',
  FIGMA: 'FIGMA',
  GITHUB: 'GITHUB',
  GRAPHQL: 'GRAPHQL',
  NGINX: 'NGINX',
  SOCKET_IO: 'SOCKET_IO'
};

exports.LanguageCode = exports.$Enums.LanguageCode = {
  ENGLISH: 'ENGLISH',
  VIETNAMESE: 'VIETNAMESE',
  JAPANESE: 'JAPANESE'
};

exports.Prisma.ModelName = {
  Contact: 'Contact',
  Project: 'Project',
  ProjectLocalization: 'ProjectLocalization'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "G:\\github\\akiratatsuhisa\\akiratatsuhisa-edge\\generated\\client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../.env"
  },
  "relativePath": "../../prisma",
  "clientVersion": "5.9.1",
  "engineVersion": "23fdc5965b1e05fc54e5f26ed3de66776b93de64",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mongodb",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "Z2VuZXJhdG9yIGNsaWVudCB7CiAgcHJvdmlkZXIgPSAicHJpc21hLWNsaWVudC1qcyIKICBvdXRwdXQgICA9ICIuLi9nZW5lcmF0ZWQvY2xpZW50Igp9CgpkYXRhc291cmNlIGRiIHsKICBwcm92aWRlciAgPSAibW9uZ29kYiIKICB1cmwgICAgICAgPSBlbnYoIkRBVEFCQVNFX1VSTCIpCiAgZGlyZWN0VXJsID0gZW52KCJESVJFQ1RfVVJMIikKfQoKbW9kZWwgQ29udGFjdCB7CiAgaWQgICAgICAgICAgU3RyaW5nICBAaWQgQGRlZmF1bHQoYXV0bygpKSBAbWFwKCJfaWQiKSBAZGIuT2JqZWN0SWQKICBuYW1lICAgICAgICBTdHJpbmcKICBlbWFpbCAgICAgICBTdHJpbmcKICBwaG9uZSAgICAgICBTdHJpbmcKICBtZXNzYWdlICAgICBTdHJpbmcKICBpc0NhbmNlbGxlZCBCb29sZWFuIEBkZWZhdWx0KGZhbHNlKQogIGlwQWRkcmVzcyAgIFN0cmluZz8KCiAgY3JlYXRlZEF0IERhdGVUaW1lIEBkZWZhdWx0KG5vdygpKQogIHVwZGF0ZWRBdCBEYXRlVGltZSBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdAoKICBAQG1hcCgiY29udGFjdHMiKQp9CgplbnVtIExhbmd1YWdlQ29kZSB7CiAgRU5HTElTSCAgICBAbWFwKCJlbiIpCiAgVklFVE5BTUVTRSBAbWFwKCJ2aSIpCiAgSkFQQU5FU0UgICBAbWFwKCJqYSIpCgogIEBAbWFwKCJsYW5ndWFnZUNvZGVzIikKfQoKZW51bSBMYW5ndWFnZSB7CiAgQ19TSEFSUCAgICBAbWFwKCJjc2hhcnAiKQogIENTUyAgICAgICAgQG1hcCgiY3NzIikKICBEQVJUICAgICAgIEBtYXAoImRhcnQiKQogIEdPICAgICAgICAgQG1hcCgiZ28iKQogIEhUTUwgICAgICAgQG1hcCgiaHRtbCIpCiAgSkFWQVNDUklQVCBAbWFwKCJqYXZhc2NyaXB0IikKICBQWVRIT04gICAgIEBtYXAoInB5dGhvbiIpCiAgU0FTUyAgICAgICBAbWFwKCJzYXNzIikKICBUWVBFU0NSSVBUIEBtYXAoInR5cGVzY3JpcHQiKQoKICBAQG1hcCgibGFuZ3VhZ2VzIikKfQoKZW51bSBGcmFtZXdvcmsgewogIEFOR1VMQVIgICAgIEBtYXAoImFuZ3VsYXIiKQogIEJPT1RTVFJBUCAgIEBtYXAoImJvb3RzdHJhcCIpCiAgREpBTkdPICAgICAgQG1hcCgiZGphbmdvIikKICBET1RORVRfQ09SRSBAbWFwKCJkb3RuZXRjb3JlIikKICBFWFBSRVNTICAgICBAbWFwKCJleHByZXNzIikKICBGTFVUVEVSICAgICBAbWFwKCJmbHV0dGVyIikKICBORVhUICAgICAgICBAbWFwKCJuZXh0IikKICBORVNUICAgICAgICBAbWFwKCJuZXN0IikKICBOT0RFSlMgICAgICBAbWFwKCJub2RlanMiKQogIE5VWFQgICAgICAgIEBtYXAoIm51eHQiKQogIFJFQUNUICAgICAgIEBtYXAoInJlYWN0IikKICBUQUlMV0lORENTUyBAbWFwKCJ0YWlsd2luZGNzcyIpCiAgVlVFICAgICAgICAgQG1hcCgidnVlIikKCiAgQEBtYXAoImZyYW1ld29ya3MiKQp9CgplbnVtIERhdGFiYXNlIHsKICBFTEFTVElDU0VBUkNIIEBtYXAoImVsYXN0aWNzZWFyY2giKQogIE1PTkdPREIgICAgICAgQG1hcCgibW9uZ29kYiIpCiAgTVlTUUwgICAgICAgICBAbWFwKCJteXNxbCIpCiAgTkVPNEogICAgICAgICBAbWFwKCJuZW80aiIpCiAgUE9TVEdSRVNRTCAgICBAbWFwKCJwb3N0Z3Jlc3FsIikKICBSRURJUyAgICAgICAgIEBtYXAoInJlZGlzIikKICBTUUxJVEUgICAgICAgIEBtYXAoInNxbGl0ZSIpCgogIEBAbWFwKCJkYXRhYmFzZXMiKQp9CgplbnVtIFRlY2hub2xvZ3kgewogIEFXUyAgICAgICBAbWFwKCJhd3MiKQogIEFaVVJFICAgICBAbWFwKCJhenVyZSIpCiAgRE9DS0VSICAgIEBtYXAoImRvY2tlciIpCiAgRVNMSU5UICAgIEBtYXAoImVzbGludCIpCiAgRklHTUEgICAgIEBtYXAoImZpZ21hIikKICBHSVRIVUIgICAgQG1hcCgiZ2l0aHViIikKICBHUkFQSFFMICAgQG1hcCgiZ3JhcGhxbCIpCiAgTkdJTlggICAgIEBtYXAoIm5naW54IikKICBTT0NLRVRfSU8gQG1hcCgic29ja2V0aW8iKQoKICBAQG1hcCgidGVjaG5vbG9naWVzIikKfQoKZW51bSBQcm9qZWN0U3RhdHVzIHsKICBJTklUSUFMSVpFIEBtYXAoImluaXRpYWxpemUiKQogIE9OX0dPSU5HICAgQG1hcCgib25Hb2luZyIpCiAgTUFJTlRBSU4gICBAbWFwKCJtYWludGFpbiIpCiAgREVMQVkgICAgICBAbWFwKCJkZWxheSIpCiAgQ0FOQ0VMICAgICBAbWFwKCJjYW5jZWwiKQogIFBVQkxJU0ggICAgQG1hcCgicHVibGlzaCIpCgogIEBAbWFwKCJwcm9qZWN0U3RhdHVzIikKfQoKbW9kZWwgUHJvamVjdCB7CiAgaWQgICAgICAgICAgU3RyaW5nICBAaWQgQGRlZmF1bHQoYXV0bygpKSBAbWFwKCJfaWQiKSBAZGIuT2JqZWN0SWQKICB0aHVtYlNyYyAgICBTdHJpbmc/CiAgc29ydCAgICAgICAgSW50ICAgICBAZGVmYXVsdCgwKQogIGlzUHVibGlzaGVkIEJvb2xlYW4gQGRlZmF1bHQoZmFsc2UpCgogIHN0YXJ0RGF0ZSBEYXRlVGltZT8KICBlbmREYXRlICAgRGF0ZVRpbWU/CiAgc3RhdHVzICAgIFByb2plY3RTdGF0dXMgQGRlZmF1bHQoSU5JVElBTElaRSkKCiAgaW1hZ2VTcmNzICAgIFN0cmluZ1tdICAgICBAZGVmYXVsdChbXSkKICBsYW5ndWFnZXMgICAgTGFuZ3VhZ2VbXSAgIEBkZWZhdWx0KFtdKQogIGZyYW1ld29ya3MgICBGcmFtZXdvcmtbXSAgQGRlZmF1bHQoW10pCiAgZGF0YWJhc2VzICAgIERhdGFiYXNlW10gICBAZGVmYXVsdChbXSkKICB0ZWNobm9sb2dpZXMgVGVjaG5vbG9neVtdIEBkZWZhdWx0KFtdKQogIG90aGVycyAgICAgICBTdHJpbmdbXSAgICAgQGRlZmF1bHQoW10pCgogIHZpZXdzIEludCBAZGVmYXVsdCgwKQoKICBwcm9qZWN0TG9jYWxpemF0aW9ucyBQcm9qZWN0TG9jYWxpemF0aW9uW10KCiAgY3JlYXRlZEF0IERhdGVUaW1lIEBkZWZhdWx0KG5vdygpKQogIHVwZGF0ZWRBdCBEYXRlVGltZSBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdAoKICBAQG1hcCgicHJvamVjdHMiKQp9Cgptb2RlbCBQcm9qZWN0TG9jYWxpemF0aW9uIHsKICBpZCAgIFN0cmluZyBAaWQgQGRlZmF1bHQoYXV0bygpKSBAbWFwKCJfaWQiKSBAZGIuT2JqZWN0SWQKICBzbHVnIFN0cmluZwoKICBwcm9qZWN0SWQgICAgU3RyaW5nICAgICAgIEBtYXAoInByb2plY3RfaWQiKSBAZGIuT2JqZWN0SWQKICBsYW5ndWFnZUNvZGUgTGFuZ3VhZ2VDb2RlCgogIHRpdGxlICAgICAgIFN0cmluZwogIGRlc2NyaXB0aW9uIFN0cmluZz8KICBjbGllbnQgICAgICBTdHJpbmc/CiAgd2Vic2l0ZSAgICAgU3RyaW5nPwogIHNvdXJjZSAgICAgIFN0cmluZz8KCiAgcHJvamVjdCBQcm9qZWN0IEByZWxhdGlvbihmaWVsZHM6IFtwcm9qZWN0SWRdLCByZWZlcmVuY2VzOiBbaWRdLCBvblVwZGF0ZTogQ2FzY2FkZSwgb25EZWxldGU6IENhc2NhZGUpCgogIGNyZWF0ZWRBdCBEYXRlVGltZSBAZGVmYXVsdChub3coKSkKICB1cGRhdGVkQXQgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQKCiAgQEB1bmlxdWUoW3NsdWcsIGxhbmd1YWdlQ29kZV0pCiAgQEB1bmlxdWUoW3Byb2plY3RJZCwgbGFuZ3VhZ2VDb2RlXSkKICBAQG1hcCgicHJvamVjdExvY2FsaXphdGlvbnMiKQp9Cg==",
  "inlineSchemaHash": "cd39c7d338c1b1294ce109a794e35b88c6b0dd10450eeb04362166ee903c0186",
  "noEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Contact\":{\"dbName\":\"contacts\",\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"message\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isCancelled\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ipAddress\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Project\":{\"dbName\":\"projects\",\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"thumbSrc\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sort\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isPublished\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"endDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ProjectStatus\",\"default\":\"INITIALIZE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imageSrcs\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"languages\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Language\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"frameworks\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Framework\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"databases\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Database\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"technologies\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Technology\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"others\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"views\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"projectLocalizations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProjectLocalization\",\"relationName\":\"ProjectToProjectLocalization\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ProjectLocalization\":{\"dbName\":\"projectLocalizations\",\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"slug\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"projectId\",\"dbName\":\"project_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"languageCode\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LanguageCode\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"client\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"website\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"source\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"project\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Project\",\"relationName\":\"ProjectToProjectLocalization\",\"relationFromFields\":[\"projectId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[[\"slug\",\"languageCode\"],[\"projectId\",\"languageCode\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"slug\",\"languageCode\"]},{\"name\":null,\"fields\":[\"projectId\",\"languageCode\"]}],\"isGenerated\":false}},\"enums\":{\"LanguageCode\":{\"values\":[{\"name\":\"ENGLISH\",\"dbName\":\"en\"},{\"name\":\"VIETNAMESE\",\"dbName\":\"vi\"},{\"name\":\"JAPANESE\",\"dbName\":\"ja\"}],\"dbName\":\"languageCodes\"},\"Language\":{\"values\":[{\"name\":\"C_SHARP\",\"dbName\":\"csharp\"},{\"name\":\"CSS\",\"dbName\":\"css\"},{\"name\":\"DART\",\"dbName\":\"dart\"},{\"name\":\"GO\",\"dbName\":\"go\"},{\"name\":\"HTML\",\"dbName\":\"html\"},{\"name\":\"JAVASCRIPT\",\"dbName\":\"javascript\"},{\"name\":\"PYTHON\",\"dbName\":\"python\"},{\"name\":\"SASS\",\"dbName\":\"sass\"},{\"name\":\"TYPESCRIPT\",\"dbName\":\"typescript\"}],\"dbName\":\"languages\"},\"Framework\":{\"values\":[{\"name\":\"ANGULAR\",\"dbName\":\"angular\"},{\"name\":\"BOOTSTRAP\",\"dbName\":\"bootstrap\"},{\"name\":\"DJANGO\",\"dbName\":\"django\"},{\"name\":\"DOTNET_CORE\",\"dbName\":\"dotnetcore\"},{\"name\":\"EXPRESS\",\"dbName\":\"express\"},{\"name\":\"FLUTTER\",\"dbName\":\"flutter\"},{\"name\":\"NEXT\",\"dbName\":\"next\"},{\"name\":\"NEST\",\"dbName\":\"nest\"},{\"name\":\"NODEJS\",\"dbName\":\"nodejs\"},{\"name\":\"NUXT\",\"dbName\":\"nuxt\"},{\"name\":\"REACT\",\"dbName\":\"react\"},{\"name\":\"TAILWINDCSS\",\"dbName\":\"tailwindcss\"},{\"name\":\"VUE\",\"dbName\":\"vue\"}],\"dbName\":\"frameworks\"},\"Database\":{\"values\":[{\"name\":\"ELASTICSEARCH\",\"dbName\":\"elasticsearch\"},{\"name\":\"MONGODB\",\"dbName\":\"mongodb\"},{\"name\":\"MYSQL\",\"dbName\":\"mysql\"},{\"name\":\"NEO4J\",\"dbName\":\"neo4j\"},{\"name\":\"POSTGRESQL\",\"dbName\":\"postgresql\"},{\"name\":\"REDIS\",\"dbName\":\"redis\"},{\"name\":\"SQLITE\",\"dbName\":\"sqlite\"}],\"dbName\":\"databases\"},\"Technology\":{\"values\":[{\"name\":\"AWS\",\"dbName\":\"aws\"},{\"name\":\"AZURE\",\"dbName\":\"azure\"},{\"name\":\"DOCKER\",\"dbName\":\"docker\"},{\"name\":\"ESLINT\",\"dbName\":\"eslint\"},{\"name\":\"FIGMA\",\"dbName\":\"figma\"},{\"name\":\"GITHUB\",\"dbName\":\"github\"},{\"name\":\"GRAPHQL\",\"dbName\":\"graphql\"},{\"name\":\"NGINX\",\"dbName\":\"nginx\"},{\"name\":\"SOCKET_IO\",\"dbName\":\"socketio\"}],\"dbName\":\"technologies\"},\"ProjectStatus\":{\"values\":[{\"name\":\"INITIALIZE\",\"dbName\":\"initialize\"},{\"name\":\"ON_GOING\",\"dbName\":\"onGoing\"},{\"name\":\"MAINTAIN\",\"dbName\":\"maintain\"},{\"name\":\"DELAY\",\"dbName\":\"delay\"},{\"name\":\"CANCEL\",\"dbName\":\"cancel\"},{\"name\":\"PUBLISH\",\"dbName\":\"publish\"}],\"dbName\":\"projectStatus\"}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.getQueryEngineWasmModule = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

