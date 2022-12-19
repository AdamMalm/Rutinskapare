import { Text } from "react-native";
import { useState } from "react";
import Container from "../components/Container";
import ButtonGroup from "../components/ButtonGroup";

const CreateRoutineScreen = () => {
  // Demo på hur buttongroup används
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const buttons = [
    { label: "Morgon", icon: "sunrise" },
    { label: "Dag", icon: "sun" },
    { label: "Kväll", icon: "moon" },
    { label: "Specifik tid", icon: "clock" },
  ];
  return (
    <Container extraPadding>
      <Text>Skapa rutin</Text>
      <ButtonGroup
        onPress={setSelectedIndexes}
        buttons={buttons}
        selectedIndexes={selectedIndexes}
      />
    </Container>
  );
};

export default CreateRoutineScreen;
