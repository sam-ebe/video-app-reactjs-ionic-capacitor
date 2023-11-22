import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'video-app-reactjs-ionic-capacitor',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
