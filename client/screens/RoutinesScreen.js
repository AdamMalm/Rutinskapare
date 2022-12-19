import { useEffect } from "react";
import { Text, View } from "react-native";
import Container from "../components/Container";
import RoutineList from "../components/RoutineCards/RoutineList";
import Ionicons from "@expo/vector-icons/Ionicons";

// Ersätt denna lista med data från API
const routines = [
  {
    id: 1,
    title: "test1",
    description:
      "Här är en liten beskrivning som är lite längre så att vi kan se flera rader",
    time: "9.00",
    isCompleted: true,
  },
  {
    id: 2,
    title: "test2",
    description: "Beskrivning ja0",
    time: "9.00",
    isCompleted: false,
  },
  {
    id: 3,
    title: "test3",
    time: "9.00",
    isCompleted: true,
  },
];

const RoutinesScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons.Button
          name="ios-settings"
          size={32}
          color="#144E5A"
          backgroundColor="transparent"
          borderRadius={0}
          className="m-0 p-0 pr-2"
          underlayColor="transparent"
          onPress={() => navigation.navigate("EditRoutines")}
        />
      ),
    });
  }, [navigation]);

  return (
    <Container>
      <View className="flex flex-column space-y-10">
        <Text className="text-xl font-bold color-primary100 mb-4">
          Att göra idag
        </Text>
        <RoutineList
          routines={routines.filter((routine) => !routine.isCompleted)}
        />

        <Text className="text-xl font-bold color-primary100 mb-4">
          Utfört idag
        </Text>
        <RoutineList
          routines={routines.filter((routine) => routine.isCompleted)}
        />
      </View>
    </Container>
  );
};

export default RoutinesScreen;
