import { createContext, useContext } from "react";

export interface ConfigurationSettings {
  username?: string;
  imgSrc?: string;
}

const defaultValue: ConfigurationSettings = {
  username: null,
  imgSrc: null,
};

export const AppConfiguration =  createContext<ConfigurationSettings>(defaultValue);

export const AppConfigurationProvider =  AppConfiguration.Provider;

export const useAppConfiguration = () => useContext(AppConfiguration);
