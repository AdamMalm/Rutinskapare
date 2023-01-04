import { Text, View } from "react-native";

const Statistic = ({ value, description }) => {
  return (
    <View className="p-4 bg-primary60/[.2] flex flex-row justify-between rounded">
      <Text className="text-base my-auto">{description}</Text>
      <Text className="text-lg font-bold color-primary100">{value}</Text>
    </View>
  );
};

const RoutineStatisics = ({ routineStatisic, ...rest }) => {
  return (
    <View className="bg-white p-4 rounded-lg shadow-sm" {...rest}>
      <View className="flex flex-column space-y-4">
        <View>
          <Text className="text-lg font-bold color-primary100">
            {routineStatisic.title}
          </Text>
          {routineStatisic.description && (
            <Text className="text-base mt-1">
              {routineStatisic.description}
            </Text>
          )}
        </View>
        <Text className="text-base my-auto">{`${routineStatisic.time} ${routineStatisic.frequency}`}</Text>
        <View className="border-b border-gray" />
        <View className="flex flex-column space-y-2">
          <View>
            <Statistic value={"87%"} description="Andel utförda" />
          </View>
          <View>
            <Statistic value={"4"} description="Utförda i rad" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default RoutineStatisics;
