import { View } from "react-native";
import RoutineStatistic from "./RoutineStatistic";

const RoutineStatisticsList = ({ routineStatistics }) => {
  return (
    <View className="flex flex-column space-y-4">
      {routineStatistics.map((routineStatistic) => (
        <RoutineStatistic
          key={routineStatistic.id}
          routineStatistic={routineStatistic}
        />
      ))}
    </View>
  );
};

export default RoutineStatisticsList;
