export const config = {
    baseUrl: 'http://35.184.85.213/',
    baseApiUrl: 'http://34.71.62.96:18080/hem/v1/',
    dbUsername: `hem`,
    dbPassword: `hem`,
    dbServerName: `35.184.85.213`,
    dbPort: `5432`,
    dbName: `postgres`
};

import { Client } from 'pg';

let pgClient: Client;

export class DBActions {

    async connectDB(dbUsername: string, dbPassword: string, dbServerName: string, dbPort: string, dbName: string) {
        const connectionString = `postgres://${dbUsername}:${dbPassword}@${dbServerName}:${dbPort}/${dbName}`;
        pgClient = await new Client(connectionString);
        await pgClient.connect();
    }

    async query(queryString: string): Promise<void> {
        return pgClient.query(queryString);
    }

    async disconnectDB() {
        await pgClient.end();
    }

}
