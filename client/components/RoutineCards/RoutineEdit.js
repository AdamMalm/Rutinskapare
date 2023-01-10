import { Text, View } from "react-native";
import { useGlobalContext } from "../../contexts/GlobalContext";
import Button from "../Button";
import PrioChip from "../PrioChip";

const formatFrequency = (frequency) => {
  if (frequency.length === 7) {
    return "Varje dag";
  }

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

const RoutineEdit = ({ routine, ...rest }) => {
  const { removeRoutine, addHistoryCompletion } = useGlobalContext();
  const time = routine.timeOfDay.specificTime
    ? routine.timeOfDay.specificTime
    : routine.timeOfDay.nonSpecificTime;

  return (
    <View className="bg-white p-4 rounded-lg shadow-sm" {...rest}>
      {routine.highPriority && (
        <View className="flex-row">
          <PrioChip />
        </View>
      )}
      <View className="flex flex-column space-y-4">
        <View>
          <Text className="text-lg font-bold color-primary100">
            {routine.title}
          </Text>
          {routine.description && (
            <Text className="text-base mt-1">{routine.description}</Text>
          )}
        </View>
        <Text className="text-base my-auto">{`${time} | ${formatFrequency(
          routine.frequency,
        )}`}</Text>
      </View>
      <Button
        title="Redigera"
        type="contained"
        className="mt-6"
        onPress={async () => {
          var dates = [
            new Date().setDate(new Date().getDate() - 2),
            new Date().setDate(new Date().getDate() - 3),
            new Date().setDate(new Date().getDate() - 5),
            new Date().setDate(new Date().getDate() - 6),
            new Date().setDate(new Date().getDate() - 8),
            new Date().setDate(new Date().getDate() - 10),
            new Date().setDate(new Date().getDate() - 16),
            new Date().setDate(new Date().getDate() - 20),
            new Date().setDate(new Date().getDate() - 260),
            new Date().setDate(new Date().getDate() - 270),
            new Date().setDate(new Date().getDate() - 300),
            new Date().setDate(new Date().getDate() - 330),
          ];
          await addHistoryCompletion(routine.id, dates);
        }}
      />
      <Button
        title="Radera"
        type="text"
        className="mt-2"
        onPress={() => removeRoutine(routine.id)}
      />
    </View>
  );
};

export default RoutineEdit;
