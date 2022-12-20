import { View } from "react-native";
import RoutineEdit from "./RoutineEdit";

const RoutineEditList = ({ routines }) => {
  return (
    <View className="flex flex-column space-y-4">
      {routines.map((routine) => (
        <RoutineEdit
          key={routine.id}
          id={routine.id}
          title={routine.title}
          description={routine.description}
          time={routine.time}
          frequency={routine.frequency}
          highPriority={routine.highPriority}
        />
      ))}
    </View>
  );
};

export default RoutineEditList;
