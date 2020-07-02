import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SearchScreen from "./src/screens/SearchScreen";
import ShowRestaurantsScreen from "./src/screens/ShowRestaurantScreen";

const navigator = createStackNavigator(
  {
    Search: SearchScreen,
    ShowRestaurant: ShowRestaurantsScreen,
  },
  {
    initialRouteName: "Search",
    defaultNavigationOptions: {
      title: "Restaurant Search",
    },
  }
);

export default createAppContainer(navigator);
