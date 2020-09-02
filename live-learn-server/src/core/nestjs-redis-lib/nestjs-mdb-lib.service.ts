import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import {
  MongoClient,
  MongoError,
  Db,
  Collection,
} from 'mongodb';
import { MDB_OPTIONS } from './constants';
import {
  IMdbOptions,
  IMdb,
  IDbMap,
  ICli,
  ICliMap,
  IColOption,
} from './interface';
import _ from 'lodash';

@Injectable()
export class NestjsMdbLibService implements OnModuleInit {

  private dbMap: IDbMap = {};
  private cliMap: ICliMap = {};

  constructor(
    @Inject(MDB_OPTIONS) private options: IMdbOptions,
  ) {}

  onModuleInit() {
    return this.options;
  }

  async test() {
    return 'hello, nestjs mdb lib !';
  }
}
