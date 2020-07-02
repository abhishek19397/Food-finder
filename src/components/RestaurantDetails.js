import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const ResultsDetails = ({ restaurant }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={{ uri: restaurant.featured_image }}
      />
      <Text style={styles.name}>{restaurant.name}</Text>
      <Text>
        {restaurant.user_rating.aggregate_rating} stars,{" "}
        {restaurant.all_reviews_count} reviews
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },

  imageStyle: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
  },
});

export default ResultsDetails;
