import { HTTPException } from 'hono/http-exception';

export class HttpBadDto extends HTTPException {
  constructor(
    reason?: string,
    public errors: Array<string> = [],
  ) {
    const message = reason != null ? `Bad Dto\nReason:\n${reason}` : 'Bad Dto';

    super(400, { message });
  }
}

export class HttpUnauthorized extends HTTPException {
  constructor(reason?: string) {
    const message =
      reason != null ? `Unauthorized\nReason:\n${reason}` : 'Unauthorized';

    super(401, { message });
  }
}

export class HttpForbidden extends HTTPException {
  constructor(reason?: string) {
    const message =
      reason != null ? `Access Denied\nReason:\n${reason}` : 'Forbidden';

    super(403, { message });
  }
}

export class HttpNotFound extends HTTPException {
  constructor(entity?: string, id?: string) {
    const message = `Not Found${entity ? ` ${entity}${id ? `(${id})` : ''}` : ''}`;

    super(404, { message });
  }
}

export class HttpInternalServerError extends HTTPException {
  constructor() {
    const message = 'Internal Server Error';

    super(500, { message });
  }
}
