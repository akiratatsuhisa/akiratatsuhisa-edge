import { Context, HonoEnv } from 'hono';
import _ from 'lodash';

export abstract class BaseService {
  protected readonly DROPBOX_API2_URL = 'https://api.dropboxapi.com/2';

  protected readonly DROPBOX_CACHE_TEMPORARY_LINK =
    'DROPBOX_CACHE_TEMPORARY_LINK';

  protected context: Context<HonoEnv>;

  constructor(context: Context<HonoEnv>) {
    this.context = context;
  }

  protected getTimestamp(mode: 'insert'): { createdAt: Date; updatedAt: Date };
  protected getTimestamp(mode: 'update'): { updatedAt: Date };
  protected getTimestamp(mode: 'insert' | 'update') {
    const updatedAt = new Date();

    if (mode === 'insert') {
      return { createdAt: updatedAt, updatedAt };
    }
    return { updatedAt };
  }

  protected get db() {
    return this.context.get('db');
  }

  protected get user() {
    return this.context.get('user');
  }

  protected async getAuth0ManagementToken() {
    const token = await this.context.get('getAuth0ManagementToken')();

    return token;
  }

  protected async getDropboxManagementToken() {
    const token = await this.context.get('getDropboxManagementToken')();

    return token;
  }

  protected async fetchDropboxApi(
    options: { path?: string; body?: BodyInit | null } = {},
  ) {
    const { path, body } = options;

    return fetch(`${this.DROPBOX_API2_URL}${path}`, {
      headers: {
        Authorization: `Bearer ${await this.getDropboxManagementToken()}`,
        'Content-Type': 'application/json',
        'Response-Type': 'application/json',
      },
      method: 'POST',
      body,
    });
  }

  /**
   * https://www.dropbox.com/developers/documentation/http/documentation#files-get_temporary_link
   */
  protected async getTemporaryLink(path: string) {
    const key = `${this.DROPBOX_CACHE_TEMPORARY_LINK}:${path}`;
    const cache = await this.context.env.KV_NAMESPACE.get(key);

    if (cache) {
      return cache;
    }

    const response = await this.fetchDropboxApi({
      path: '/files/get_temporary_link',
      body: JSON.stringify({
        path,
      }),
    });

    if (response.status !== 200) {
      return undefined;
    }

    const data = (await response.json()) as {
      link: string;
    };

    await this.context.env.KV_NAMESPACE.put(key, data.link, {
      expirationTtl: 14400, // 4 hours
    });
    return data.link;
  }

  /**
   * https://www.dropbox.com/developers/documentation/http/documentation#files-get_temporary_upload_link
   */
  protected async getTemporaryUploadLink(options: {
    autorename?: boolean;
    mode?: 'add' | 'overwrite' | 'update';
    mute?: boolean;
    path: string;
    strictConflict?: boolean;
    duration?: number;
  }) {
    const response = await this.fetchDropboxApi({
      path: '/files/get_temporary_upload_link',
      body: JSON.stringify({
        commit_info: {
          autorename: options.autorename,
          mode: options.mode ?? 'overwrite',
          mute: options.mute,
          path: options.path,
          strict_conflict: options.strictConflict,
        },
        duration: options.duration ?? 3600,
      }),
    });

    const data = (await response.json()) as {
      link: string;
    };

    return data.link;
  }
}
