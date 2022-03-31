export const GP_WAREHOUSE_BACKEND = process.env.NODE_ENV === 'production' ? process.env.BACKEND_URL : 'http://localhost:8080';
export const KEYCLOAK_URL = process.env.NODE_ENV === 'production' ? process.env.KEYCLOAK_URL : 'http://localhost:8081';
export const KEYCLOAK_REALM = process.env.NODE_ENV === 'production' ? process.env.KEYCLOAK_REALM : 'test-realm';
export const KEYCLOAK_CLIENT_ID = process.env.NODE_ENV === 'production' ? process.env.KEYCLOAK_CLIENT_ID : 'localhost';
