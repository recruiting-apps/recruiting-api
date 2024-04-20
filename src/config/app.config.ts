import * as dotenv from 'dotenv'

dotenv.config()

const APP_CONFIG = () => {
  return {
    port: process.env.PORT,
    database: {
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      url: process.env.DATABASE_URL
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRATION
    }
  }
}

export default APP_CONFIG
