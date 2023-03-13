declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    DB_HOST: string;
    USER: string;
    PASSWORD: string;
    DATABASE: string;
    PORT: number; // jsp quoi faire ca bug 
    HOSTNAME: string;
  }
} 