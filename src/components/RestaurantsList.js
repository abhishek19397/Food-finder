import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import RestuarantDetails from "./RestaurantDetails";
import { withNavigation } from "react-navigation";

const RestaurantsList = ({ title, restaurants, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={restaurants}
        keyExtractor={(restaurants) => restaurants.restaurant.id}
        renderItem={(item) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ShowRestaurant", {
                  id: item.item.restaurant.R.res_id,
                })
              }
            >
              <RestuarantDetails restaurant={item.item.restaurant} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  container: {
    marginBottom: 10,
  },
});

export default withNavigation(RestaurantsList);
