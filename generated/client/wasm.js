
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  detectRuntime,
} = require('./runtime/index-browser.js')


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

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  throw new Error(`Extensions.getExtensionContext is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  throw new Error(`Extensions.defineExtension is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        const runtime = detectRuntime()
        const edgeRuntimeName = {
          'workerd': 'Cloudflare Workers',
          'deno': 'Deno and Deno Deploy',
          'netlify': 'Netlify Edge Functions',
          'edge-light': 'Vercel Edge Functions or Edge Middleware',
        }[runtime]

        let message = 'PrismaClient is unable to run in '
        if (edgeRuntimeName !== undefined) {
          message += edgeRuntimeName + '. As an alternative, try Accelerate: https://pris.ly/d/accelerate.'
        } else {
          message += 'this browser environment, or has been bundled for the browser (running in `' + runtime + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
