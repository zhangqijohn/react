import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    cluster: {
      listen: {
        port: 5000,
        hostname: '0.0.0.0'
      }
    }
  };
  return config;
};
