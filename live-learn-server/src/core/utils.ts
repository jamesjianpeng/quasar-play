import path from 'path'
import fs from 'fs'
import { promisify } from 'util'

/**
 * @description mongo / redis 的 url 转为 host/port/db/user/password 对象
 * @param url redis://<user>:<password>@<host>:<port>/<db>
 * @param prefix <redis://>或者<mongodb://>这个前缀过滤掉
 */
export const dbUrlToObject = (url: string, prefix?: string) => {
  if (!url) {
      console.error(`${url} `)
      return {}
  }
  prefix = prefix || 'redis://'
  url = url.replace(prefix, '')
  const user =  url.split(':')[0]
  const passwordAndHost = url.split(':')[1]
  const portAndDb = url.split(':')[2]
  const res = {
      host: passwordAndHost.split('@')[1],
      port: portAndDb.split('/')[0],
      db: portAndDb.split('/')[1], // mongodb 的 db 是 undefined
      user,
      password: passwordAndHost.split('@')[0],
  }
  return res
}

/**
 * @description 创建 log 文件
 */
export const createLogFileLocation = (fileLocation: string) => {
  const exist = fs.existsSync(fileLocation)
  if (!exist) {
    fs.mkdirSync(fileLocation, { recursive: true })
  }
  return fileLocation
}
