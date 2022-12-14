import { Text, View } from "react-native";
import Button from "../Button";

const Routine = ({ id, title, description, time, isCompleted, ...rest }) => {
  return (
    <View className="bg-white p-4 rounded shadow-sm" {...rest}>
      <View>
        <View className="flex-row justify-between">
          <View className="flex-row flex-1 mr-4">
            <Text className="text-lg font-bold color-primary100">{title}</Text>
            {isCompleted && (
              <Text className="text-base my-auto ml-2">(utförd)</Text>
            )}
          </View>
          <Text className="text-base my-auto">{time}</Text>
        </View>
        {description && <Text className="text-base mt-1">{description}</Text>}
      </View>
      {isCompleted ? (
        <Button
          title="Markera som ej utförd"
          type="outlined"
          className="mt-6"
          onPress={() => console.log("Markera som ej utförd, API", +id)}
        />
      ) : (
        <Button
          title="Markera som utförd"
          className="mt-6"
          onPress={() => console.log("Markera som utförd, API", +id)}
        />
      )}
    </View>
  );
};

export default Routine;
