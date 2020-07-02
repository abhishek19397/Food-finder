import axios from "axios";

export default axios.create({
  baseURL: "https://developers.zomato.com/api/v2.1",
  headers: {
    user_key: "0990c099fbbaba8b83750d7a89c7777a",
  },
});
