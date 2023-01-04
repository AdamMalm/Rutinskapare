import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Container from "../components/Container";
import RoutineList from "../components/RoutineCards/RoutineList";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useGlobalContext } from "../contexts/GlobalContext";
import Loading from "../components/Loading";
import Error from "../components/Error";

const RoutinesScreen = ({ navigation }) => {
  const { loadingRoutines, errorRoutines, getTodaysRoutines } =
    useGlobalContext();
  const [completedRoutines, setCompletedRoutines] = useState([]);
  const [uncompletedRoutines, setUncompletedRoutines] = useState([]);

  useEffect(() => {
    if (loadingRoutines || errorRoutines) return;
    setCompletedRoutines(
      getTodaysRoutines().filter(
        (routine) =>
          routine.historyOfCompletion[0] &&
          routine.historyOfCompletion[routine.historyOfCompletion.length - 1]
            .completed,
      ),
    );
    setUncompletedRoutines(
      getTodaysRoutines().filter(
        (routine) =>
          !routine.historyOfCompletion[0] ||
          !routine.historyOfCompletion[routine.historyOfCompletion.length - 1]
            .completed,
      ),
    );
  }, [getTodaysRoutines]);

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
  if (loadingRoutines) return <Loading />;
  if (errorRoutines) return <Error error={errorRoutines} />;

  if (uncompletedRoutines.length === 0 && completedRoutines.length === 0) {
    return (
      <Container>
        <View className="flex flex-col items-center">
          <Text className="text-base font-bold text-center color-primary100 mt-4">
            Du har inga rutiner att utföra idag.
          </Text>
          <Text className="text-base mt-2 text-center">
            Redigera eller lägg till rutiner genom att klicka på kugghjulet uppe
            till höger.
          </Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View className="flex flex-column space-y-10">
        <View>
          <Text className="text-xl font-bold color-primary100 mb-4">
            Att göra idag
          </Text>
          {uncompletedRoutines.length === 0 ? (
            <Text className="text-base">
              Du har utfört alla dagens rutiner!
            </Text>
          ) : (
            <RoutineList routines={uncompletedRoutines} />
          )}
        </View>

        <View>
          <Text className="text-xl font-bold color-primary100 mb-4">
            Utfört idag
          </Text>
          {completedRoutines.length === 0 ? (
            <Text className="text-base">
              Du har inte utfört några rutiner idag.
            </Text>
          ) : (
            <RoutineList routines={completedRoutines} />
          )}
        </View>
      </View>
    </Container>
  );
};

export default RoutinesScreen;
