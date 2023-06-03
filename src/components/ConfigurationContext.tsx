import { createContext} from "react";

export interface ConfigurationSettings {
  username?: string;
  imgSrc?: string;
}

const defaultValue: ConfigurationSettings = {
  username: null,
  imgSrc: null,
};

const ConfigurationContext =  createContext<ConfigurationSettings>(defaultValue);

export const ConfigurationProvider =  ConfigurationContext.Provider;
