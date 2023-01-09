import { Text, View } from "react-native";
import Button from "../Button";
import PrioChip from "../PrioChip";
import { useGlobalContext } from "../../contexts/GlobalContext";

const Routine = ({ routine, ...rest }) => {
  const { updateHistoryCompletion } = useGlobalContext();

  const isCompleted =
    routine.historyOfCompletion[routine.historyOfCompletion.length - 1]
      ?.completed;

  return (
    <View className="bg-white p-4 rounded-lg shadow-sm" {...rest}>
      {routine.highPriority && (
        <View className="flex-row">
          <PrioChip />
        </View>
      )}
      <View>
        <View className="flex-row justify-between">
          <View className="flex-row flex-1 mr-4">
            <Text className="text-lg font-bold color-primary100">
              {routine.title}
            </Text>

            {isCompleted && (
              <Text className="text-base my-auto ml-2">(utförd)</Text>
            )}
          </View>
          <Text className="text-base my-auto">{routine.time}</Text>
        </View>
        {routine.description && (
          <Text className="text-base mt-1">{routine.description}</Text>
        )}
      </View>
      {isCompleted ? (
        <Button
          title="Markera som ej utförd"
          type="outlined"
          className="mt-6"
          onPress={() => updateHistoryCompletion(routine.id, false)}
        />
      ) : (
        <Button
          title="Markera som utförd"
          className="mt-6"
          onPress={() => updateHistoryCompletion(routine.id, true)}
        />
      )}
    </View>
  );
};

export default Routine;
