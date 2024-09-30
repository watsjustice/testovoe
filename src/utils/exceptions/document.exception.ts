import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from '../enum/exception.enum';
import { formatException } from '../helpers/common.helper';

export class DocumentNotFoundException extends HttpException {
  constructor(id: string) {
    super(
      formatException(ErrorMessages.DocumentNotFound, id),
      HttpStatus.NOT_FOUND,
    );
  }
}

export class DocumentNotUpdatedException extends HttpException {
  constructor(id: string) {
    super(
      formatException(ErrorMessages.DocumentNotUpdated, id),
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class DocumentNotCreatedException extends HttpException {
  constructor() {
    super(ErrorMessages.DocumentNotCreated, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class DocumentNotDeletedException extends HttpException {
  constructor(id: string) {
    super(
      formatException(ErrorMessages.DocumentNotDeleted, id),
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class DocumentBatchExecutionException extends HttpException {
  constructor() {
    super(ErrorMessages.DocumentBatchFailed, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
