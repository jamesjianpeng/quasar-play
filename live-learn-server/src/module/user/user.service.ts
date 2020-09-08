import { Injectable, OnModuleInit } from '@nestjs/common';
import { NestjsMdbLibService } from '@smartblog/nestjs-mdb-lib';
import { NestjsRdbLibService } from '@smartblog/nestjs-rdb-lib';
import { User } from 'src/entity/user.entity';
import { Collection } from 'mongodb';
import { IServerResponse } from 'src/core/interface'
// import { Collection } from 'mongodb';
@Injectable()
export class UserService implements OnModuleInit {
  private colUser: Collection

  constructor(
    private nestjsMdbLibService: NestjsMdbLibService,
    private nestjsRdbLibService: NestjsRdbLibService,
  ) {}

  onModuleInit () {
    this.init()
  }

  async init () {
    const data = { cliKey: 'sz', db: 'LiveLearn', col: 'user' };
    this.colUser = await this.nestjsMdbLibService.getCol(data);
  }

  async getUser(user: User): Promise<IServerResponse<User | null>> {
    const { email } = user;
    const currentUser = await this.colUser.findOne({ email });
    return { code:  (currentUser ? 0 : 1), data: currentUser }
  }

  async addUser(user: User): Promise<IServerResponse<User | null>> {
    const { email } = user
    const currentUser = await this.colUser.findOne({ email })
    if (currentUser) {
      return { code: 1, data: currentUser, msg: '已经存在该用户' }
    }
    await this.colUser.insertOne(user)
    return { data: currentUser }
  }

}
