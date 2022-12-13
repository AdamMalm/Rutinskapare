import { Button, Text } from "react-native";
import Container from "../components/Container";

const EditRoutinesScreen = ({ navigation }) => {
  return (
    <Container>
      <Text>Redigera rutiner</Text>
      <Button
        title="Lägg till rutin"
        onPress={() => navigation.navigate("CreateRoutine")}
      />
    </Container>
  );
};

export default EditRoutinesScreen;
