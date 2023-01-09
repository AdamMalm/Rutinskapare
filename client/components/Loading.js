import { View, Text } from "react-native";

const Loading = () => {
  return (
    <View className="flex flex-column items-center justify-center h-full">
      <Text className="text-lg font-bold color-primary100">Laddar...</Text>
    </View>
  );
};

export default Loading;
