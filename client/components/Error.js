import { View, Text } from "react-native";

const Error = ({ error }) => {
  console.log(error);
  return (
    <View className="flex flex-column items-center justify-center h-full">
      <Text className="text-lg font-bold color-primary100">
        Något gick fel...
      </Text>
    </View>
  );
};
export default Error;
