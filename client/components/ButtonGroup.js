import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

const ButtonGroup = ({
  onPress,
  selectedIndexes,
  buttons,
  multipleChoice = false,
}) => {
  const onPressMultiple = (index) => {
    if (selectedIndexes.includes(index)) {
      onPress(
        selectedIndexes.filter((selectedIndex) => selectedIndex !== index),
      );
    } else {
      onPress([...selectedIndexes, index]);
    }
  };

  const onPressSingle = (index) => {
    onPress([index]);
  };

  return (
    <View className="bg-white rounded-lg shadow-sm">
      {buttons.map((button, index) => (
        <Pressable
          key={index}
          className={`p-4 rounded flex-row justify-between ${
            buttons.length - 1 !== index && "border-b border-gray"
          }`}
          onPress={
            multipleChoice
              ? () => onPressMultiple(index)
              : () => onPressSingle(index)
          }
        >
          <View className="flex-row space-x-4">
            {button.icon && (
              <Feather name={button.icon} size={24} color="#144E5A" />
            )}
            <Text className="text-sm color-primary100 font-semibold py-1">
              {button.label}
            </Text>
          </View>
          {selectedIndexes.includes(index) && (
            <Ionicons name="ios-checkmark-sharp" size={24} color="#144E5A" />
          )}
        </Pressable>
      ))}
    </View>
  );
};

export default ButtonGroup;
