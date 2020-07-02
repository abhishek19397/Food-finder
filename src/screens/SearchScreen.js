import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import useRestaurants from "../hooks/useRestaurants";
import RestaurantsList from "../components/RestaurantsList";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const [searchApi, restaurants, errorMessage] = useRestaurants();

  const filterResultsByPrice = () => {
    restaurants.sort((a, b) =>
      a.restaurant.average_cost_for_two < b.restaurant.average_cost_for_two
        ? 1
        : -1
    );
    return restaurants.slice(1, 6);
  };

  const allResults = () => {
    return restaurants;
  };

  const filterResultsByRatings = () => {
    restaurants.sort((a, b) =>
      a.restaurant.user_rating.aggregate_rating <
      b.restaurant.user_rating.aggregate_rating
        ? 1
        : -1
    );
    return restaurants.slice(1, 6);
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        term={term}
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <ScrollView>
        <RestaurantsList
          restaurants={filterResultsByRatings()}
          title="Highest Rated"
        />
        <RestaurantsList
          restaurants={filterResultsByPrice()}
          title="Cost Effective"
        />

        <RestaurantsList restaurants={allResults()} title="All results" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
