import { useEffect } from "react";
import { Text, View } from "react-native";
import Container from "../components/Container";
import RoutineList from "../components/RoutineCards/RoutineList";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useGlobalContext } from "../contexts/GlobalContext";

const RoutinesScreen = ({ navigation }) => {
  const { loadingRoutines, errorRoutines, dataRoutines } = useGlobalContext();

  // Behövs verkligen useEffect här?
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

  // Lägg till laddningsanimation?
  if (loadingRoutines) return null;
  if (errorRoutines) return console.log(errorRoutines);

  return (
    <Container>
      <View className="flex flex-column space-y-10">
        <Text className="text-xl font-bold color-primary100 mb-4">
          Att göra idag
        </Text>
        <RoutineList
          routines={dataRoutines.user.routines.filter(
            (routine) =>
              !routine.historyOfCompletion[0] ||
              !routine.historyOfCompletion[
                routine.historyOfCompletion.length - 1
              ].completed,
          )}
        />

        <Text className="text-xl font-bold color-primary100 mb-4">
          Utfört idag
        </Text>
        <RoutineList
          routines={dataRoutines.user.routines.filter(
            (routine) =>
              routine.historyOfCompletion[0] &&
              routine.historyOfCompletion[
                routine.historyOfCompletion.length - 1
              ].completed,
          )}
        />
      </View>
    </Container>
  );
};

export default RoutinesScreen;
