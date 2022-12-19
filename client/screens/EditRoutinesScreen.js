import { Text, View } from "react-native";
import Container from "../components/Container";
import Button from "../components/Button";
import RoutineEditList from "../components/RoutineCards/RoutineEditList";

const categorizedRoutines = [
  {
    categoryName: "Medicin",
    routines: [
      {
        id: 1,
        title: "Ta medicin",
        description: "2 st omegalyx",
        time: "9.00",
        frequency: "varje dag",
      },
    ],
  },
  {
    categoryName: "Måltider",
    routines: [
      {
        id: 2,
        title: "Frukost",
        time: "7.00",
        frequency: "varje dag",
      },
      {
        id: 3,
        title: "Lunch",
        time: "12.00",
        frequency: "varje dag",
      },
    ],
  },
];

const EditRoutinesScreen = ({ navigation }) => {
  return (
    <Container extraPadding>
      <Button
        title="Skapa ny rutin"
        iconName="ios-add"
        onPress={() => navigation.navigate("CreateRoutine")}
      />
      {categorizedRoutines.map((category) => {
        return (
          <View key={category.categoryName}>
            <Text className="text-xl font-bold color-primary100 mb-4 mt-8">
              {category.categoryName}
            </Text>
            <RoutineEditList routines={category.routines} />
          </View>
        );
      })}
    </Container>
  );
};

export default EditRoutinesScreen;
