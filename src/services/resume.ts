import { Context, HonoEnv } from 'hono';
import _ from 'lodash';

import { PaginationSchema, ResumeContactSchema } from '../validators';
import { BaseService } from './base';

export class ResumeService extends BaseService {
  constructor(context: Context<HonoEnv>) {
    super(context);
  }

  async searchContact(dto: PaginationSchema) {
    const [result, count] = await Promise.all([
      this.prisma.contact.findMany({
        orderBy: { createdAt: 'desc' },
        ...dto,
      }),
      this.prisma.contact.count(),
    ]);

    return { result, count };
  }

  async sendContact(dto: ResumeContactSchema, ipAddress?: string) {
    const contact = await this.prisma.contact.create({
      data: { ...dto, ipAddress },
    });

    return { id: contact.id };
  }

  async cancelContact(id: string) {
    const contact = await this.prisma.contact.update({
      data: { isCancelled: true },
      where: { id },
    });

    return { id: contact.id };
  }
}
