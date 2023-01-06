import { View } from "react-native";
import RoutineEdit from "./RoutineEdit";

const RoutineEditList = ({ routines, ...rest }) => {
  return (
    <View className="flex flex-column space-y-4" {...rest}>
      {routines.map((routine) => (
        <RoutineEdit key={routine.id} routine={routine} />
      ))}
    </View>
  );
};

export default RoutineEditList;
