import * as path from 'path'
import { type DataSourceOptions } from 'typeorm'
import * as dotenv from 'dotenv'

dotenv.config()

const ENTITIES_DIR = path.join(__dirname, '/**/*.entity{.ts,.js}')
// const MIGRATIONS_DIR = path.join(__dirname, '/**/migrations/*{.ts,.js}')

export const dataSourceOptions: DataSourceOptions = {
  type: (process.env.DATABASE_TYPE ?? 'postgres') as 'postgres',
  url: process.env.DATABASE_URL ?? '',
  // host: configService.get<string>('database.host', 'localhost'),
  // port: configService.get<number>('database.port', 3306),
  // username: configService.get<string>('database.username', ''),
  // password: configService.get<string>('database.password', ''),
  // database: configService.get<string>('database.database', ''),

  entities: [ENTITIES_DIR],
  // logging: true,

  // synchronize: automatically synchronize the database (only for development)
  synchronize: true
}
