import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

require('dotenv').config();

class ConfigService {

    constructor(private env: { [k: string]: string | undefined }) { }

    private getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }

        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }

    public getPort() {
        return this.getValue('PORT', true);
    }

    public isProduction() {
        const mode = this.getValue('MODE', false);
        return mode != 'DEV';
    }

    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            url: this.getValue('DATABASE_URL'),
            ssl: {
                rejectUnauthorized: false
            },
            entities: [join(__dirname, '..', '**', '*.typeorm.model{.ts,.js}')],
            migrationsTableName: 'migration',
            migrations: [join(__dirname, '../typeorm/migration/*.{ts,js}')],
            cli: {
                migrationsDir: 'src/typeorm/migration',
            },

        }
    }

}

const configService = new ConfigService(process.env)
    .ensureValues([
        'DATABASE_URL'
    ]);

export { configService };