import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config');

export const AppConfig: IAppConfig = {
  popup: {
    width: '350px',
  },
  newFeatureNotice: {
    fish: {
      version: '',
      title: '',
      content: '',
    },
    dsg: {
      version: '',
      title: '',
      content: '',
    },
  },
  endpoints: {
    login: '',
    cdnConfig: '',
    lobbyUrl: '',
    playerCanLike: '',
  },
};

export interface IAppConfig {
  popup: IPopup;
  newFeatureNotice: {
    fish: IVersionInfo;
    dsg: IVersionInfo;
  };
  endpoints: IEndpoints;
}
interface IPopup {
  width: string;

}
interface IEndpoints {
  login: string;
  cdnConfig: string;
  lobbyUrl: string;
  playerCanLike: string;
}

interface IVersionInfo {
  version: string;
  title: string;
  content: string;
}
