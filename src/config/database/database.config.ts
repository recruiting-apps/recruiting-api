import * as path from 'path'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const ENTITIES_DIR = path.join(__dirname, '/**/*.entity{.ts,.js}')

export const databaseConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: config.get<string>('database.type') as any,
  url: config.get<string>('database.url'),
  synchronize: config.get<boolean>('database.synchronize', false),
  entities: [ENTITIES_DIR],
  autoLoadEntities: true
})
