import { Text, View, TextInput, StyleSheet } from "react-native";

const TextField = ({ ...rest }) => {
  return (
    <View {...rest}>
      <Text className="text-xl font-bold color-primary100 mb-4">
        Beskrivning
      </Text>
      <TextInput style={styles} />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundColor: "white",
});

export default TextField;
