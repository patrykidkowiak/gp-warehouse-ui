import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "https://gp-warehouse-keycloak.onrender.com/auth",
    realm: "gp-warehouse-realm",
    clientId: "localhost"
});

export default keycloak;
