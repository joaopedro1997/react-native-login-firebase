import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Welcome } from "../pages/Welcome";
import { Login } from "../pages/Login";

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: "#fff",
      },
    }}
  >
    <stackRoutes.Screen name="Login" component={Login} />
    <stackRoutes.Screen name="Welcome" component={Welcome} />
  </stackRoutes.Navigator>
);

export default AppRoutes;
