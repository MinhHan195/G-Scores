require('dotenv').config({ override: true });

const env = process.env.NODE_ENV || 'development';

const commonApp = {
    port: 5178
};

const configs = {
    development: {
        app: commonApp,
        db: {
            username: 'postgres.ovctostkpzgwbnrvtnxr',
            password: 'Han!@#19052003',
            database: 'postgres',
            host: 'aws-1-ap-southeast-2.pooler.supabase.com',
            port: '5432',
            dialect: 'postgres',
            ssl: true,
            logging: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    },
    test: {
        app: commonApp,
        db: {
            username: 'root',
            password: null,
            database: 'GScores_test',
            host: '127.0.0.1',
            port: 3306,
            dialect: 'mysql',
            ssl: true,
            logging: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    },
    production: {
        app: commonApp,
        db: {
            username: 'root',
            password: null,
            database: 'GScores_production',
            host: '127.0.0.1',
            port: 3306,
            dialect: 'mysql',
            ssl: true,
            logging: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    }
};

const config = configs[env] || configs.development;

module.exports = config;