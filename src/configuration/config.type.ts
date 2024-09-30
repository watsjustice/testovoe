export interface DatabaseConfigType {
    database: string;
    username: string;
    password: string;
    host: string;
    port: number;
    url?: string;
}

export interface GeneralConfigType {
    port: number;
    database: DatabaseConfigType;
}

