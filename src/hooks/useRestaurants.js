import { useEffect, useState } from "react";
import zomato from "../api/zomato";

export default () => {
  const [restaurants, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const searchApi = async (searchTerm) => {
    try {
      const response = await zomato.get("/search", {
        params: {
          q: searchTerm,
          entity_type: "city",
          entity_id: 4,
        },
      });
      setResults(response.data.restaurants);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Ooops something went wrong");
    }
  };

  useEffect(() => {
    searchApi("pizza");
  }, []);

  return [searchApi, restaurants, errorMessage];
};
