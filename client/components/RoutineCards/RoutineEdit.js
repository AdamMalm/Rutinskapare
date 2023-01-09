import { Text, View } from "react-native";
import { useGlobalContext } from "../../contexts/GlobalContext";
import Button from "../Button";
import PrioChip from "../PrioChip";

const formatFrequency = (frequency) => {
  var formattedFrequency = "";

  if (frequency.length === 7) {
    return "Varje dag";
  }

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
  const { removeRoutine } = useGlobalContext();
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
        onPress={() => console.log("Redigera call API", +routine.id)}
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
