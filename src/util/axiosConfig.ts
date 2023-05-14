import axios from "axios";

axios.defaults.baseURL =
	process.env.NODE_ENV === "production" ? "https://mnelux.com/api" : "http://localhost:3001/api";

axios.defaults.withCredentials = true;
