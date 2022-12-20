import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
// Getting theme color hex code for tab icons

const Notification = ({ isReminder, routineName, time, ...rest }) => {
  const fullConfig = resolveConfig(tailwindConfig);
  const primary60 = fullConfig.theme.colors.primary60;
  const orange = fullConfig.theme.colors.orange;
  let iconName = isReminder
    ? "ios-alert-circle-outline"
    : "ios-notifications-outline";
  let text = isReminder ? "Påminnelse" : "Dags för din rutin";
  let bgStyle = isReminder
    ? "bg-orange/20 h-12 w-12 mr-6 justify-center items-center rounded"
    : "bg-primary60/20 h-12 w-12 mr-6 rounded justify-center items-center";
  let iconColor = isReminder ? orange : primary60;

  return (
    <View
      className="p-4 bg-white rounded flex flex-row h-20 shadow-sm"
      {...rest}
    >
      <View className={bgStyle}>
        <Ionicons name={iconName} size={40} color={iconColor} />
      </View>
      <View className="flex flex-col grow">
        <View className="flex flex-row justify-between">
          <Text className="text-sm">{text}</Text>
          <Text className="text-sm">{time}</Text>
        </View>
        <Text className="text-base font-semibold">{routineName}</Text>
      </View>
    </View>
  );
};

export default Notification;
