import { Text, View, Switch } from "react-native";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";

const Prioritet = ({ isPrioritised, setPrioritised, ...rest }) => {
  const fullConfig = resolveConfig(tailwindConfig);
  const primary80 = fullConfig.theme.colors.primary80;
  const darkgray = fullConfig.theme.colors.darkgray;

  return (
    <View className="mb-4" {...rest}>
      <Text className="text-xl font-bold color-primary100 ">Prioritet</Text>
      <Text className="text-sm color-black mb-6 ">
        Du får notiser om de rutiner du sätter hög prioritet på.
      </Text>
      <View className="flex flex-row justify-between items-center ">
        <Text className="text-base font-bold color-primary100 ">
          Hög prioritet
        </Text>
        <Switch
          onValueChange={setPrioritised}
          value={isPrioritised}
          trackColor={{ false: darkgray, true: primary80 }}
          ios_backgroundColor={darkgray}
        />
      </View>
    </View>
  );
};

export default Prioritet;
