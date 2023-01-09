import { Platform } from "react-native";
import { useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import { GlobalProvider } from "./contexts/GlobalContext";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Constants from "expo-constants";

import * as Notifications from "expo-notifications";

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
    ? manifest.debuggerHost.split(`:`).shift().concat(`:5000/graphql`)
    : `api.example.com`;

const client = new ApolloClient({
  uri: "http://" + api,
  cache: new InMemoryCache(),
});

// Getting theme color hex code for tab icons
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "./tailwind.config.js";
const fullConfig = resolveConfig(tailwindConfig);
const primary100 = fullConfig.theme.colors.primary100;

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: primary100,
  },
};

async function requestPermissionsAsync() {
  return await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
}

function RoutineTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          var iconName;

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
        tabBarActiveTintColor: primary100,
        tabBarLabelStyle: { fontSize: 16, fontWeight: "500", flex: 1 },
        tabBarStyle: {
          height: Platform.OS === "ios" ? 100 : 72,
          paddingLeft: Platform.OS === "ios" ? 0 : 8,
          paddingTop: Platform.OS === "ios" ? 0 : 8,
        },
        headerTintColor: primary100,
        headerTitleStyle: {
          fontWeight: "bold",
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
  useEffect(() => {
    requestPermissionsAsync();

    // Cancel all scheduled notifications
    // Since we don't remove notifications ever, this gives us a clean slate for testing
    // TODO: Remove this when we have a proper notification system
    Notifications.cancelAllScheduledNotificationsAsync();
  }, []);

  return (
    <ApolloProvider client={client}>
      <GlobalProvider>
        <NavigationContainer theme={Theme}>
          <Stack.Navigator
            initialRouteName="Routines"
            screenOptions={{
              headerTintColor: primary100,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          >
            <Stack.Screen
              name="Routines"
              component={RoutineTabs}
              options={{ title: "Dagens rutiner", headerShown: false }}
            />
            <Stack.Screen
              name="EditRoutines"
              component={EditRoutinesScreen}
              options={{
                title: "Ändra rutiner",
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
