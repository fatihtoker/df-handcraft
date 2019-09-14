export const environment = {
  production: true,
  baseURL: 'https://df-handcraft-api.herokuapp.com/',
  dfApi: {
    baseURL: 'https://df-handcraft-api.herokuapp.com/api',
    version: 'v1'
  },
  dfAdmin: {
    baseURL: 'https://df-handcraft-api.herokuapp.com/admin',
    loginURL: 'login_check',
    userInfoURL: 'user-info',
    menusURL: 'menus',
    panelURL: 'admin-panel'
  },
  aws: {
    bucketName: 'df-prod-images',
    baseURL: 's3.us-east-2.amazonaws.com'
  }
};
