import * as drizzle from 'drizzle-orm';
import { Context, HonoEnv } from 'hono';
import _ from 'lodash';

import { contacts } from '../schema';
import { PaginationSchema, ResumeContactSchema } from '../validators';
import { BaseService } from './base';

export class ResumeService extends BaseService {
  constructor(context: Context<HonoEnv>) {
    super(context);
  }

  async searchContact(dto: PaginationSchema) {
    const [result, count] = await Promise.all([
      this.db
        .select()
        .from(contacts)
        .orderBy(drizzle.desc(contacts.createdAt))
        .offset(dto.skip)
        .limit(dto.take),
      this.db
        .select({ count: drizzle.count() })
        .from(contacts)
        .then(([{ count }]) => count),
    ]);

    return { result, count };
  }

  async sendContact(dto: ResumeContactSchema, ipAddress?: string) {
    const [result] = await this.db
      .insert(contacts)
      .values({
        ...dto,
        ipAddress,
        ...this.getTimestamp('insert'),
      })
      .returning({
        id: contacts.id,
      });

    return result;
  }

  async cancelContact(id: number) {
    const [result] = await this.db
      .update(contacts)
      .set({
        isCancelled: true,
        ...this.getTimestamp('update'),
      })
      .where(drizzle.eq(contacts.id, id))
      .returning({
        id: contacts.id,
      });

    return result;
  }
}
