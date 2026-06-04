import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cls.logistica',
  appName: 'Logística CLS',
  webDir: 'out',
  server: {
    url: 'https://logistica-app-two.vercel.app/',
    cleartext: true
  }
};

export default config;