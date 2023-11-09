import Application from './src/Application';
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  clientId: 'dtcd',
  realm: 'wdcplatform',
  url: 'http://localhost:8090',
});

keycloak.init({ onLoad: 'login-required' }).then(() => {
  const app = new Application();
  app.installDependence('keycloak', 'esm', '22.0.4', keycloak);
  app.start();
  window.onfocus = async () => await keycloak.updateToken(90);
}).catch(error => {
  document.getElementById('loader-text').innerHTML =
    'Что-то пошло не так, попробуйте обновить страницу или обратитесь к администратору...';
  throw error;
});
