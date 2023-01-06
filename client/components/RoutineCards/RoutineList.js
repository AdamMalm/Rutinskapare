import { View } from "react-native";
import Routine from "./Routine";

const RoutineList = ({ routines }) => {
  return (
    <View className="flex flex-column space-y-4">
      {routines.map((routine) => (
        <Routine key={routine.id} routine={routine} />
      ))}
    </View>
  );
};

export default RoutineList;
