import dotenv from "dotenv";
dotenv.config();
export interface ServerEnv {
  port: number;
  redisPort: number;
  redisUser: string;
  redisPassword: string;
  redisHost: string;
  redisLocal: string;
}
export const serverEnv: ServerEnv = {
  port: parseInt(process.env.PORT!),
  redisPort: parseInt(process.env.REDIS_PORT!),
  redisUser: process.env.REDIS_USER!,
  redisPassword: process.env.REDIS_PASSWORD!,
  redisHost: process.env.REDIS_HOST!,
  redisLocal: process.env.REDIS_LOCAL!,
};

console.log(serverEnv);
