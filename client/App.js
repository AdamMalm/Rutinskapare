import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import { GlobalProvider } from "./contexts/GlobalContext";

import RoutinesScreen from "./screens/RoutinesScreen";
import EditRoutinesScreen from "./screens/EditRoutinesScreen";
import CreateRoutineScreen from "./screens/CreateRoutineScreen";
import NotificationScreen from "./screens/NotificationScreen";
import StatisticsScreen from "./screens/StatisticsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
        tabBarActiveTintColor: primary100,
        tabBarLabelStyle: { fontSize: 16, fontWeight: "500", flex: 1 },
        tabBarStyle: { height: 100 },
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
  return (
    <GlobalProvider>
      <NavigationContainer theme={Theme}>
        <Stack.Navigator
          initialRouteName="Dagens rutiner"
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
  );
}
