import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'example-capacitor-http',
  webDir: 'www',
  server: {
    androidScheme: 'http'
  },
  android: { allowMixedContent: true },
  plugins: {
    CapacitorHttp: {
      enabled: true
    },
  }
};

export default config;
