import { Text, View } from "react-native";
import Container from "../components/Container";
import Button from "../components/Button";
import RoutineList from "../components/RoutineCards/RoutineList";
import { useGlobalContext } from "../contexts/GlobalContext";

// Ersätt denna lista med data från API
const routines = [
  {
    id: 1,
    title: "test1",
    description: "la alallal",
    time: "9.00",
    isCompleted: true,
  },
  {
    id: 2,
    title: "test2",
    description: "la alallal",
    time: "9.00",
    isCompleted: false,
  },
  {
    id: 3,
    title: "test2",
    time: "9.00",
    isCompleted: true,
  },
];

const RoutinesScreen = ({ navigation }) => {
  const { loading, error, data } = useGlobalContext();

  return (
    <Container>
      {console.log(loading)}
      {console.log(error)}
      {console.log(data)}
      <View className="flex flex-column space-y-10">
        <Button
          title="Redigera rutiner (ska flyttas)"
          onPress={() => navigation.navigate("EditRoutines")}
        />

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
