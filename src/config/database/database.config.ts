
import { type ConfigService } from '@nestjs/config'
import * as path from 'path'

const ENTITIES_DIR = path.join(__dirname, '/**/*.entity{.ts,.js}')

/**
 * It takes a ConfigService as an argument and returns an object with the database configuration.
 * @param {ConfigService} configService - ConfigService - this is the service that allow us to
 * get and cast the environment variables.
 */
export const fromEnv = (configService: ConfigService): Record<string, unknown> => ({
  // type: what database you want to use
  type: configService.get<string>('database.type', 'mongodb'),
  host: configService.get<string>('database.host', 'localhost'),
  port: configService.get<number>('database.port', 27017),
  database: configService.get<string>('database.database', ''),

  // entities: where are the entities located
  entities: [ENTITIES_DIR],
  // autoLoadEntities: automatically load entities
  autoLoadEntities: true,
  // synchronize: automatically synchronize the database
  synchronize: true
  // migrationsRun: true
  // migrations: [path.join(__dirname, '../database/migrations/**/*{.ts,.js}')]
})
