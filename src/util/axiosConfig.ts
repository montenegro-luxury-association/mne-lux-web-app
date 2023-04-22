import axios from "axios";

axios.defaults.baseURL =
	process.env.NODE_ENV === "production"
		? "http://18.159.215.165/api"
		: "http://localhost:3001/api";
