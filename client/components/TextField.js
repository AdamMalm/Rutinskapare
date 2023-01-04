import { Text, View, TextInput, StyleSheet } from "react-native";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";

const TextField = ({ name, placeholder, ...rest }) => {
  const fullConfig = resolveConfig(tailwindConfig);
  const darkgray = fullConfig.theme.colors.darkgray;
  const frivillig = "(Frivillig)";

  return (
    <View {...rest}>
      {name === "Beskrivning" ? (
        <View>
          <View className="flex flex-row items-center">
            <Text className="text-xl font-bold color-primary100 mb-6">
              {name}
            </Text>
            <Text className="text-sm color-black mb-6 ml-2">{frivillig}</Text>
          </View>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={darkgray}
            multiline={true}
            style={styleBig}
          />
        </View>
      ) : (
        <View>
          <Text className="text-xl font-bold color-primary100 mb-6">
            {name}
          </Text>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={darkgray}
            multiline={false}
            style={styleSmall}
          />
        </View>
      )}
    </View>
  );
};

const styleSmall = StyleSheet.create({
  paddingHorizontal: 16,
  textAlignVertical: "top",
  backgroundColor: "white",
  height: 40,
  borderRadius: 5,
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 1 },
  fontSize: 16,
});

const styleBig = StyleSheet.create({
  paddingHorizontal: 16,
  paddingTop: 10,
  textAlignVertical: "top",
  backgroundColor: "white",
  height: 95,
  borderRadius: 5,
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 1 },
  fontSize: 16,
});

export default TextField;
