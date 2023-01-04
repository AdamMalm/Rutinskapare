import { View } from "react-native";
import RoutineEdit from "./RoutineEdit";

const RoutineEditList = ({ routines, ...rest }) => {
  return (
    <View className="flex flex-column space-y-4" {...rest}>
      {routines.map((routine) => (
        <RoutineEdit
          key={routine.id}
          id={routine.id}
          title={routine.title}
          description={routine.description}
          time={
            routine.timeOfDay.specificTime == ""
              ? routine.timeOfDay.nonSpecificTime
              : routine.timeOfDay.specificTime
          }
          frequency={routine.frequency}
          highPriority={routine.highPriority}
        />
      ))}
    </View>
  );
};

export default RoutineEditList;
