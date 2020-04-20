import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.keys = appInfo.name + 'pid';

  config.middleware = [
      'errorHandler'
  ];

  return {
    ...config
  };
};
