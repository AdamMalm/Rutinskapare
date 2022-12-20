import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";

const DropdownOpt = ({
  name,
  placeholder,
  zIndex,
  zIndexInverse,
  list,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(list);
  const fullConfig = resolveConfig(tailwindConfig);
  const primary100 = fullConfig.theme.colors.primary100;
  const isCategory = name === "Kategori" ? "z-50" : "z-10";

  //Logic so that they can choose their own routine name

  return (
    <View className={isCategory} {...rest}>
      <Text className="text-xl font-bold color-primary100 mb-4">{name}</Text>
      <DropDownPicker
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
        style={{
          borderColor: "white",
          shadowColor: "black",
          shadowOpacity: 0.005,
          shadowRadius: 2,
          shadowOffset: { width: 0, height: 1 },
          borderRadius: 4,
        }}
        dropDownContainerStyle={{
          borderColor: "white",
        }}
        containerStyle={{
          shadowOpacity: 0.1,
          shadowRadius: 2,
          shadowOffset: { width: 0, height: 1 },
          borderRadius: 4,
        }}
        textStyle={{
          fontSize: 18,
          color: primary100,
        }}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        listMode="SCROLLVIEW"
        placeholder={placeholder}
      />
    </View>
  );
};

export default DropdownOpt;
