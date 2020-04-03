import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    cluster: {
      listen: {
        port: 5000,
        hostname: '172.16.13.63'
      }
    }
  };
  return config;
};
