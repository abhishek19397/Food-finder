import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import zomato from "../api/zomato";
import { Value } from "react-native-reanimated";

const dimensions = Dimensions.get("window");
const imageHeight = Math.round((dimensions.width * 9) / 16);
const imageWidth = dimensions.width;

const ShowRestaurantScreen = ({ navigation }) => {
  const [restaurant, setRestaurant] = useState(null);
  const id = navigation.getParam("id");

  const getRestaurant = async (id) => {
    const response = await zomato.get("/restaurant", {
      params: {
        res_id: id,
      },
    });

    setRestaurant(response.data);
  };

  useEffect(() => {
    getRestaurant(id);
  }, []);

  return (
    <>
      {restaurant ? (
        <>
          <Image
            style={styles.imageStyle}
            source={{ uri: restaurant.featured_image }}
          />
          <View style={styles.container}>
            <View
              style={{
                marginRight: 10,
                width: dimensions.width - 100,
                flexWrap: "wrap",
                alignItems: "flex-start",
              }}
            >
              <Text style={styles.name}>{restaurant.name}</Text>
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                {restaurant.cuisines}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginVertical: 5,
                  fontStyle: "italic",
                  color: "#4b4b4b",
                }}
              >
                {restaurant.location.locality}, {restaurant.location.city}
              </Text>
              <Text
                style={{ fontSize: 14, color: "#4b4b4b", fontStyle: "italic" }}
              >
                Timings:
              </Text>
              <FlatList
                data={restaurant.timings.split(",")}
                keyExtractor={(value) => value}
                renderItem={(item) => {
                  return (
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#4b4b4b",
                        fontStyle: "italic",
                      }}
                    >
                      {item.item.trim()}
                    </Text>
                  );
                }}
              ></FlatList>
              <Text
                style={{
                  fontSize: 12,
                  color: "#4b4b4b",
                  fontStyle: "italic",
                  backgroundColor: "#b2bec3",
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 3,
                  marginTop: 5,
                }}
              >{`Price for two - ${restaurant.currency} ${restaurant.average_cost_for_two}`}</Text>
            </View>
            <View style={styles.rating_section}>
              <Text style={styles.rating}>
                {restaurant.user_rating.aggregate_rating}
              </Text>
              <View style={styles.review}>
                <Text style={{ fontWeight: "bold" }}>
                  {restaurant.all_reviews_count}
                </Text>
                <Text style={{ fontWeight: "400", fontSize: 10 }}>reviews</Text>
              </View>
            </View>
          </View>
          <View style={styles.address}>
            <Text style={{ fontWeight: "bold" }}>Address</Text>
            <Text>{restaurant.location.address}</Text>
          </View>
          <View style={{ marginHorizontal: 15, marginTop: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              Major highlights
            </Text>
            <FlatList
              data={restaurant.highlights}
              keyExtractor={(value) => value}
              contentContainerStyle={{
                flexDirection: "row",

                flexWrap: "wrap",
              }}
              renderItem={(item) => {
                return (
                  <Text
                    style={{
                      fontSize: 10,
                      padding: 5,
                      borderRadius: 5,
                      fontWeight: "600",
                      backgroundColor: "#44bd32",
                      marginHorizontal: 2,
                      marginTop: 5,
                    }}
                  >
                    {item.item.trim()}
                  </Text>
                );
              }}
            ></FlatList>
          </View>
        </>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageStyle: {
    width: imageWidth,
    height: imageHeight,
    borderRadius: 4,
    marginBottom: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rating_section: {
    marginRight: 20,
    alignContent: "center",
    alignItems: "center",
  },
  rating: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 12,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "#e67e22",
    fontWeight: "bold",
    fontSize: 24,
  },
  review: {
    backgroundColor: "#7f8c8d",
    fontWeight: "bold",
    color: "white",
    paddingTop: 2,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: "center",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  address: {
    backgroundColor: "#b2bec3",
    paddingTop: 5,
    paddingHorizontal: 10,
    paddingBottom: 5,
    margin: 10,
    marginTop: 30,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
});

export default ShowRestaurantScreen;
