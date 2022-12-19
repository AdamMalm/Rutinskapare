import { Text, View } from "react-native";
import { useState } from "react";
import Container from "../components/Container";
import ButtonGroup from "../components/ButtonGroup";
import DropdownOpt from "../components/DropdownOpt";

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
      <View className="flex flex-col mt-2 space-y-10">
        <DropdownOpt
          name="Kategori"
          placeholder="Välj kategori"
          zIndex={3000}
          zIndexInverse={1000}
        />
        <DropdownOpt
          name="Rutin"
          placeholder="Välj rutin"
          zIndex={2000}
          zIndexInverse={2000}
        />

        <Text>Skapa rutin</Text>
        <ButtonGroup
          onPress={setSelectedIndexes}
          buttons={buttons}
          selectedIndexes={selectedIndexes}
        />
      </View>
    </Container>
  );
};

export default CreateRoutineScreen;
