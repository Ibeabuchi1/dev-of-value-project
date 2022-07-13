module.export = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'developersDb',
  entities: ['src/**/*.entity.ts'],
  synchronize: false,
  seeds: ['src/database/seeds/*.ts'],
  cli: {
    migrationsDir: ['src/database/migrations'],
  },
  migrations: ['src/database/migrations/*.ts'],
};
