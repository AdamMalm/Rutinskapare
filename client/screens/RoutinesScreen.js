import { Button, Text } from "react-native";
import Container from "../components/Container";

const RoutinesScreen = ({ navigation }) => {
  return (
    <Container>
      <Text>Rutiner</Text>
      <Button
        title="Redigera rutiner"
        onPress={() => navigation.navigate("EditRoutines")}
      />
    </Container>
  );
};

export default RoutinesScreen;
