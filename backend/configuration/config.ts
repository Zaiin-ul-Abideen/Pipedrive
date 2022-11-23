const pipedrive = require("pipedrive");
require("dotenv").config();
const defaultClient = pipedrive.ApiClient.instance;
let apiToken = defaultClient.authentications.api_key;
apiToken.apiKey = process.env.API_KEY;
export default pipedrive;
