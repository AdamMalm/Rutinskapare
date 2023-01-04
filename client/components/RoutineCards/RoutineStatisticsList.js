import { View } from "react-native";
import RoutineStatisics from "./RoutineStatisics";

const RoutineStatisticsList = ({ routineStatisics }) => {
  return (
    <View className="flex flex-column space-y-4">
      {routineStatisics.map((routineStatisic) => (
        <RoutineStatisics
          key={routineStatisic.id}
          routineStatisic={routineStatisic}
        />
      ))}
    </View>
  );
};

export default RoutineStatisticsList;
