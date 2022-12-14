import { View } from "react-native";
import Routine from "./Routine";

const RoutineList = ({ routines }) => {
  return (
    <View className="flex flex-column space-y-4">
      {routines.map((routine) => (
        <Routine
          key={routine.id}
          id={routine.id}
          title={routine.title}
          description={routine.description}
          time={routine.time}
          isCompleted={routine.isCompleted}
        />
      ))}
    </View>
  );
};

export default RoutineList;
