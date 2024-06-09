import { Context, HonoEnv } from 'hono';
import _ from 'lodash';

import { HttpNotFound } from '../utils';
import { BaseService } from './base';

export class UsersService extends BaseService {
  constructor(context: Context<HonoEnv>) {
    super(context);
  }

  async getAll() {
    const url = new URL(`${this.context.env.AUTH_MANAGEMENT_URL}/users`);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${await this.getAuth0ManagementToken()}`,
      },
    });

    return (await response.json()) as Array<any>;
  }

  async getByNickName(options: { nickname: string }) {
    const { nickname } = options;

    if (!/^[a-zA-Z0-9_+\-.!#$'^`~@]+$/.test(nickname)) {
      throw new HttpNotFound();
    }

    const url = new URL(`${this.context.env.AUTH_MANAGEMENT_URL}/users`);
    url.searchParams.set('per_page', '1');
    url.searchParams.set('q', `nickname="${nickname}"`);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${await this.getAuth0ManagementToken()}`,
      },
    });
    const data = (await response.json()) as Array<any>;

    if (!data.length) {
      throw new HttpNotFound();
    }

    return _(data)
      .map((data) =>
        _(data)
          .pick([
            'nickname',
            'name',
            'family_name',
            'given_name',
            'email',
            'picture',
          ])
          .mapKeys((_value, key) => _.camelCase(key)),
      )
      .first();
  }
}
