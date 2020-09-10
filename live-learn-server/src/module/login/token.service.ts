import { Injectable } from '@nestjs/common';
import { MapperService } from '../../core/mapper.service'

@Injectable()
export class TokenService{
  constructor(
    private mapperService: MapperService
  ) {}
  refreshToken () {/** noop */}
}
