module.export = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'developersDb',
  entities: ['src/**/*.entity.ts'],
  // logging: true,
  synchronize: false,
};
