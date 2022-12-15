import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import { GlobalProvider } from "./contexts/GlobalContext";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Constants from "expo-constants";

import RoutinesScreen from "./screens/RoutinesScreen";
import EditRoutinesScreen from "./screens/EditRoutinesScreen";
import CreateRoutineScreen from "./screens/CreateRoutineScreen";
import NotificationScreen from "./screens/NotificationScreen";
import StatisticsScreen from "./screens/StatisticsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const { manifest } = Constants;

const api =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(`5000/graphql`)
    : `api.example.com`;

const client = new ApolloClient({
  uri: api,
  cache: new InMemoryCache(),
});

function RoutineTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "RoutinesTab") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (route.name === "Notifications") {
            iconName = focused
              ? "ios-notifications"
              : "ios-notifications-outline";
          } else if (route.name === "Statistics") {
            iconName = focused ? "ios-stats-chart" : "ios-stats-chart-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="RoutinesTab"
        component={RoutinesScreen}
        options={{ title: "Dagens rutiner" }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ title: "Notiser" }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{ title: "Statistik" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Dagens rutiner">
            <Stack.Screen
              name="Routines"
              component={RoutineTabs}
              options={{ title: "Dagens rutiner", headerShown: false }}
            />
            <Stack.Screen
              name="EditRoutines"
              component={EditRoutinesScreen}
              options={{
                title: "Alla rutiner",
                headerBackTitle: "Tillbaka",
              }}
            />
            <Stack.Screen
              name="CreateRoutine"
              component={CreateRoutineScreen}
              options={{ title: "Skapa ny rutin", headerBackTitle: "Avbryt" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GlobalProvider>
    </ApolloProvider>
  );
}
