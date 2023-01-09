import { Text, View } from "react-native";

const Statistic = ({ value, description }) => {
  return (
    <View className="p-4 bg-primary60/[.2] flex flex-row justify-between rounded">
      <Text className="text-base my-auto">{description}</Text>
      <Text className="text-lg font-bold color-primary100">{value}</Text>
    </View>
  );
};

const formatFrequency = (frequency) => {
  let formattedFrequency = "";
  frequency.forEach((item, index) => {
    if (index === 0) {
      formattedFrequency += item;
    } else {
      formattedFrequency += ", " + item.toLowerCase();
    }
  });
  return formattedFrequency;
};

const RoutineStatistics = ({ routineStatistic, ...rest }) => {
  const time =
    routineStatistic.timeOfDay.specificTime == ""
      ? routineStatistic.timeOfDay.nonSpecificTime
      : routineStatistic.timeOfDay.specificTime;
  return (
    <View className="bg-white p-4 rounded-lg shadow-sm" {...rest}>
      <View className="flex flex-column space-y-4">
        <View>
          <Text className="text-lg font-bold color-primary100">
            {routineStatistic.title}
          </Text>
          {routineStatistic.description && (
            <Text className="text-base mt-1">
              {routineStatistic.description}
            </Text>
          )}
        </View>
        <Text className="text-base my-auto">{`${time} | ${formatFrequency(
          routineStatistic.frequency,
        )}`}</Text>
        <View className="border-b border-gray" />
        <View className="flex flex-column space-y-2">
          {routineStatistic.stats.largestStreak != 0 ? (
            <>
              <View>
                <Statistic
                  value={routineStatistic.stats.percentageComp * 100 + "%"}
                  description="Andel utförda"
                />
              </View>
              <View>
                <Statistic
                  value={routineStatistic.stats.largestStreak}
                  description="Utförda i rad"
                />
              </View>
            </>
          ) : (
            <Text className="text-base my-auto">
              Denna rutin har inte inträffat ännu.
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default RoutineStatistics;
