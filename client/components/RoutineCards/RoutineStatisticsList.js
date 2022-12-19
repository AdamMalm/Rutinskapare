import { View } from "react-native";
import RoutineStatisics from "./RoutineStatisics";

const RoutineStatisticsList = ({ routineStatisics }) => {
  return (
    <View className="flex flex-column space-y-4">
      {routineStatisics.map((routineStatisic) => (
        <RoutineStatisics
          key={routineStatisic.id}
          title={routineStatisic.title}
          description={routineStatisic.description}
          time={routineStatisic.time}
          frequency={routineStatisic.frequency}
        />
      ))}
    </View>
  );
};

export default RoutineStatisticsList;
