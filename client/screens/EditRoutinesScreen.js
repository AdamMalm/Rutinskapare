import Container from "../components/Container";
import Button from "../components/Button";
import RoutineEditList from "../components/RoutineCards/RoutineEditList";
import { useGlobalContext } from "../contexts/GlobalContext";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { View, Text } from "react-native";

const EditRoutinesScreen = ({ navigation }) => {
  const { loadingRoutines, errorRoutines, dataRoutines } = useGlobalContext();

  if (loadingRoutines) return <Loading />;
  if (errorRoutines) return <Error error={errorRoutines} />;
  if (dataRoutines.user.routines.length === 0) {
    return (
      <Container>
        <View className="flex flex-col items-center">
          <Text className="text-base font-bold text-center color-primary100 mt-4">
            Du har inga rutiner än
          </Text>
          <Text className="text-base mt-2 text-center">
            Skapa en ny rutin för att komma igång!
          </Text>
        </View>
        <Button
          title="Skapa ny rutin"
          iconName="ios-add"
          className="mt-8"
          onPress={() => navigation.navigate("CreateRoutine")}
        />
      </Container>
    );
  }

  return (
    <Container extraPadding>
      <Button
        title="Skapa ny rutin"
        iconName="ios-add"
        onPress={() => navigation.navigate("CreateRoutine")}
      />
      <RoutineEditList
        routines={[...dataRoutines.user.routines].reverse()}
        className="mt-8"
      />
    </Container>
  );
};

export default EditRoutinesScreen;
