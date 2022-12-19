import { Text, View, TextInput } from "react-native";

const TextField = ({ ...rest }) => {
  return (
    <View {...rest}>
      <Text className="text-xl font-bold color-primary100 mb-4">
        Beskrivning
      </Text>
      <TextInput style={"bg-white w-full h-10"} />
    </View>
  );
};

export default TextField;
