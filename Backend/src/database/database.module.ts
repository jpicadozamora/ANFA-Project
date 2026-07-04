import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2/promise';

function getDbUser(config: ConfigService): string {
  return config.get<string>('DB_USERNAME') ?? config.get<string>('DB_USER', 'root');
}

function getDbName(config: ConfigService): string {
  return config.get<string>('DB_DATABASE') ?? config.get<string>('DB_NAME', 'anfa_db');
}

async function ensureDatabase(config: ConfigService): Promise<void> {
  const host = config.get<string>('DB_HOST', 'localhost');
  const port = config.get<number>('DB_PORT', 3306);
  const user = getDbUser(config);
  const password = config.get<string>('DB_PASSWORD', '');
  const database = getDbName(config);

  const connection = await mysql.createConnection({ host, port, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
  
  // Crear tabla site si no existe
  await connection.query(`USE \`${database}\``);
  await connection.query(`
    CREATE TABLE IF NOT EXISTS site (
      id INT AUTO_INCREMENT PRIMARY KEY,
      address VARCHAR(255) DEFAULT '',
      phone VARCHAR(255) DEFAULT '',
      email VARCHAR(255) DEFAULT '',
      schedule TEXT,
      aboutParagraph1 TEXT,
      aboutParagraph2 TEXT,
      aboutParagraph3 TEXT,
      quote TEXT,
      statYears VARCHAR(255) DEFAULT '',
      statYearsLabel VARCHAR(255) DEFAULT 'Años de experiencia',
      statProjects VARCHAR(255) DEFAULT '',
      statProjectsLabel VARCHAR(255) DEFAULT 'Proyectos entregados',
      statClients VARCHAR(255) DEFAULT '',
      statClientsLabel VARCHAR(255) DEFAULT 'Clientes satisfechos',
      statTeam VARCHAR(255) DEFAULT '',
      statTeamLabel VARCHAR(255) DEFAULT 'Colaboradores'
    )
  `);
  
  // Crear tabla project si no existe
  await connection.query(`
    CREATE TABLE IF NOT EXISTS project (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      squareMeters DECIMAL(10,2) NULL,
      rooms INT NULL,
      bathrooms INT NULL,
      garage BOOLEAN DEFAULT FALSE,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Crear tabla property si no existe
  await connection.query(`
    CREATE TABLE IF NOT EXISTS property (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      location VARCHAR(255) NOT NULL,
      price VARCHAR(255) NOT NULL,
      bedrooms INT DEFAULT 0,
      bathrooms INT DEFAULT 0,
      houseSquareMeters DECIMAL(10,2) NULL,
      lotSquareMeters DECIMAL(10,2) NULL,
      garage BOOLEAN DEFAULT FALSE,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Crear tabla contact si no existe
  await connection.query(`
    CREATE TABLE IF NOT EXISTS contact (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(255) NULL,
      message TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Crear tabla remodelation si no existe
  await connection.query(`
    CREATE TABLE IF NOT EXISTS remodelation (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      beforeImageUrl VARCHAR(255) NULL,
      afterImageUrl VARCHAR(255) NULL,
      category VARCHAR(255) NULL
    )
  `);
  
  // Eliminar columna category de la tabla project si existe
  try {
    await connection.query(`ALTER TABLE project DROP COLUMN category`);
  } catch (err) {
    // Ignorar error si la columna no existe
  }
  
  await connection.end();
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        await ensureDatabase(config);

        return {
          type: 'mysql',
          host: config.get<string>('DB_HOST', 'localhost'),
          port: config.get<number>('DB_PORT', 3306),
          username: getDbUser(config),
          password: config.get<string>('DB_PASSWORD', ''),
          database: getDbName(config),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: config.get<string>('DB_SYNCHRONIZE', 'true') === 'true',
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
