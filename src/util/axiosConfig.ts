import axios from "axios";

axios.defaults.baseURL =
	process.env.NODE_ENV === "production"
		? "http://18.185.179.185/api"
		: "http://localhost:3001/api";
