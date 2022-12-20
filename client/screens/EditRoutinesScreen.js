import Container from "../components/Container";
import Button from "../components/Button";
import RoutineEditList from "../components/RoutineCards/RoutineEditList";
import { useGlobalContext } from "../contexts/GlobalContext";

const EditRoutinesScreen = ({ navigation }) => {
  const { loadingRoutines, errorRoutines, dataRoutines, addNewRoutine } =
    useGlobalContext();
  if (loadingRoutines) return null;
  if (errorRoutines) return console.log(errorRoutines);

  return (
    <Container extraPadding>
      <Button
        title="Skapa ny rutin (FOR TESTING)"
        className="mb-4"
        iconName="ios-add"
        onPress={() =>
          addNewRoutine({
            title: "test",
            description: "test",
            frequency: "monday",
            highPriority: true,
            specificTime: "",
            nonSpecificTime: "day",
          })
        }
      />
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
