import dayjs from 'dayjs';
import _ from 'lodash';

import { LanguageCode } from '../../generated/client/edge';

export const parseQuery = (value?: string | string[]) => {
  const data = _.isArray(value) ? _.first(value) : value;

  return _.isNil(data) || data === '' ? undefined : data;
};

export const parseQueries = (value: unknown) => {
  const data = _(_.isArray(value) ? value : [value])
    .map((data) => (_.isNil(data) || data === '' ? undefined : data))
    .compact()
    .value();

  return _.isEmpty(data) ? undefined : data;
};

export const regexObjectId = '[0-9a-fA-F]{24}';
export const regexLanguageCode = 'en|vi|ja';

export const parseDateTime = (
  value?: string | number | Date | dayjs.Dayjs | null | undefined,
): Date | null => {
  if (
    !value ||
    (typeof value === 'number' &&
      (value.toString().length !== 10 || value.toString().length !== 13))
  ) {
    return null;
  }

  if (typeof value === 'number') {
    return dayjs(
      value.toString().length === 10 ? value * 1000 : value,
    ).toDate();
  }

  if (typeof value !== 'string') {
    return dayjs(value).toDate();
  }

  const date = dayjs(value, undefined, true);

  if (!date.isValid()) {
    return null;
  }

  return date.toDate();
};

export const parseLanguageCode = (languageCode?: unknown): LanguageCode => {
  switch (languageCode) {
    case 'en':
      return LanguageCode.ENGLISH;
    case 'vi':
      return LanguageCode.VIETNAMESE;
    case 'ja':
      return LanguageCode.JAPANESE;
    default:
      throw new Error('Invalid Language Code');
  }
};
