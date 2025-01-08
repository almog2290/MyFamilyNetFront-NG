export const environment = {
    production: false,
    appUrl: process.env['APP_URL'] || 'http://localhost:4200',
    apiUrl: process.env['APP_API_IP'] || 'http://localhost:5000',
    keycloakUrl: process.env['APP_KEYCLOAK_URL'] || 'http://localhost:9082',
    keycloakRealm: process.env['APP_KEYCLOAK_REALM'] || 'my-family-net',
    keycloakClientId: process.env['APP_KEYCLOAK_CLIENT_ID'] || 'my-family-net-app'
};