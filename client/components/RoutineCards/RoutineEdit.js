import { Text, View } from "react-native";
import { useGlobalContext } from "../../contexts/GlobalContext";
import Button from "../Button";
import PrioChip from "../PrioChip";

const RoutineEdit = ({
  id,
  title,
  description,
  time,
  frequency,
  highPriority,
  ...rest
}) => {
  const { removeRoutine } = useGlobalContext();
  return (
    <View className="bg-white p-4 rounded-lg shadow-sm" {...rest}>
      {highPriority && (
        <View className="flex-row">
          <PrioChip />
        </View>
      )}
      <View className="flex flex-column space-y-4">
        <View>
          <Text className="text-lg font-bold color-primary100">{title}</Text>
          {description && <Text className="text-base mt-1">{description}</Text>}
        </View>
        <Text className="text-base my-auto">{`${time} ${frequency}`}</Text>
      </View>
      <Button
        title="Redigera"
        type="contained"
        className="mt-6"
        onPress={() => console.log("Redigera call API", +id)}
      />
      <Button
        title="Radera"
        type="text"
        className="mt-2"
        onPress={() => removeRoutine(id)}
      />
    </View>
  );
};

export default RoutineEdit;
