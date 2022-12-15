import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const PeriodPicker = ({ active, options, setActive, ...rest }) => {
  return (
    <View className="flex flex-row space-x-4 mx-auto" {...rest}>
      <Ionicons.Button
        backgroundColor="transparent"
        borderRadius={0}
        className="m-0 p-0"
        underlayColor="transparent"
        name="ios-chevron-back"
        size={24}
        color={options.length - 1 <= active ? "lightgray" : "black"}
        disabled={options.length - 1 <= active}
        onPress={() => {
          setActive(active + 1);
        }}
      />
      <Text className="my-auto text-sm w-40 text-center font-medium color-primary100">
        {options[active].label}
      </Text>
      <Ionicons.Button
        backgroundColor="transparent"
        borderRadius={0}
        className="m-0 p-0"
        underlayColor="transparent"
        name="ios-chevron-forward"
        size={24}
        color={active === 0 ? "lightgray" : "black"}
        disabled={active === 0}
        onPress={() => {
          setActive(active - 1);
        }}
      />
    </View>
  );
};

export default PeriodPicker;
