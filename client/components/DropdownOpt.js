import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";

const DropdownOpt = ({ name, placeholder, zIndex, zIndexInverse, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Pear", value: "pear" },
    { label: "Orange", value: "orange" },
  ]);

  const isCategory = name === "Kategori" ? "z-50" : "z-10";

  //Logic so that they can choose their own routine name

  return (
    <View className={isCategory} {...rest}>
      <Text className="text-xl font-bold color-primary100 mb-4">{name}</Text>

      <DropDownPicker
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
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
