import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
    NODE_ENV: string | undefined;
    DB_HOST: string | undefined;
    USER: string | undefined;
    PASSWORD: string | undefined;
    DATABASE: string | undefined;
    PORT: number | undefined;
    HOSTNAME: string | undefined;
    JWT_KEY: string | undefined;
}

interface Config {
    NODE_ENV: string;
    DB_HOST: string;
    USER: string;
    PASSWORD: string;
    DATABASE: string;
    PORT: number;
    HOSTNAME: string;
    JWT_KEY: string;
}

// Loading process.env as ENV interface like :
// "Var": process.env.VAR

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    DB_HOST: process.env.DB_HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,
    HOSTNAME: process.env.HOSTNAME,
    JWT_KEY: process.env.JWT_KEY,
  };
};


// On lache une erreur si une variable est undefined 
//comme ca on est sur de pas avoir de comportement inattendu
// si tout est bon on renvoie le type Config qui est une interface sans undefined

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
