import axios from "axios";

//TODO : gives 405 error when used this way

const instance = axios.create({
  baseUrl: "http://localhost:5555/api"
});

instance.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM INSTANCE";

export default instance;
