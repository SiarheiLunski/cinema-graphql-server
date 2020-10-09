declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    SPARKPOST_API_KEY: string;
    JWT_SECRET_KEY: string;
  }
}
