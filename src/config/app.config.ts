export default () => ({
  port: process.env.PORT ?? 3000,
  database: {
    type: process.env.DATABASE_TYPE ?? 'postgres',
    url: process.env.DATABASE_URL ?? '',
    synchronize: process.env.DATABASE_SYNC ?? true
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1d'
  },
  mail: {
    user: process.env.MAIL_USER ?? '',
    password: process.env.MAIL_PASSWORD ?? ''
  }
})
