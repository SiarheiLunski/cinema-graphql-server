module.exports = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'cinema_app',
  password: 'cinema_app',
  database: 'cinema_app',
  synchronize: process.env.NODE_ENV === 'development',
  logging: true,
  entities: [
    'src/entity/**/*.ts'
  ],
  migrations: [
    'src/migration/**/*.ts'
  ],
  subscribers: [
    'src/subscriber/**/*.ts'
  ],
  cli: {
    'entitiesDir': 'src/entity',
    'migrationsDir': 'src/migration',
    'subscribersDir': 'src/subscriber'
  },
  seeds: [
    'src/seeds/**/*{.ts,.js}'
  ]
};
