import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import {
  MongoClient,
  MongoError,
  Db,
  Collection
} from 'mongodb'
import { MDB_OPTIONS } from './constants'
import { IMdbOptions, IMdb } from './interface'
import _ from 'lodash'

@Injectable()
export class MdbService implements OnModuleInit {
  
  private dbMap: { [key: string]: Db } = {}
  private cliMap: { [key: string]: MongoClient } = {}

  constructor (
    @Inject(MDB_OPTIONS) private options: IMdbOptions
  ) {
    this.getClis()
  }

  onModuleInit () {
    return this.options
  }

  async getClis () {
    const clis: Array<Promise<{ key: string, url: string, cli: MongoClient }>> = this.options.map(async ({ url, key }: IMdb): Promise<{ key: string, url: string, cli: MongoClient }> => {
      return  { key, url, cli: await this.getCli(url) }
    })
    const res: Array<{ key: string, url: string, cli: MongoClient }> = await Promise.all(clis)
    const cliMap: { [key: string]: MongoClient }  = {}
    res.map(({ key, url, cli }) => {
      cliMap[key] = cli
    })
    this.cliMap = cliMap
  }

  getCli (url): Promise<MongoClient> {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, { useNewUrlParser: true, poolSize: 30 }, (err: MongoError, cli: MongoClient) => {
          if (err) {
              return reject(err)
          }
          resolve(cli)
      })
    })
  }

  async getDb (cliKey: string, db: string): Promise<Db> {
    const currentDb = this.dbMap[`${cliKey}_${db}`]
    const currentCli = this.cliMap[cliKey]
    if (!currentCli) {
      const cliItem = _.find(this.options, ({ key }) => key === cliKey) || { url: '' } // this.options.find(({ key }) => key === cliKey) || { url: '' }
      if (cliItem.url) {
        this.cliMap[cliKey] = await this.getCli(cliItem.url)
      } else {
        console.log('regester option no has ' + cliKey )
        return 
      }
    }

    if (currentDb) { 
      return currentDb
    } else {
      const cli =  this.cliMap[cliKey]
      const Db = cli.db(db)
      this.dbMap[`${cliKey}_${db}`] = Db
      return Db
    }
  }

  async getCol (data:{ db: string, col: string, cliKey: string}): Promise<Collection> {
    const {db, col, cliKey } = data
    let currentDb = this.dbMap[`${cliKey}_${db}`]
    if (!currentDb) {
      currentDb = await this.getDb(cliKey, db)
    }
    return await currentDb.collection(col)

  }
}
