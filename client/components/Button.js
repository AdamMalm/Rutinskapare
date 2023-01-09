import { Pressable, Text } from "react-native";
import PropTypes from "prop-types";
import Ionicons from "@expo/vector-icons/Ionicons";

const Button = ({ onPress, title, iconName, type = "contained", ...rest }) => {
  let pressableTypeStyle = "";
  let hexColor = "";
  let textColor = "";

  switch (type) {
    case "contained":
      pressableTypeStyle = "bg-primary100";
      hexColor = "#fff";
      textColor = "text-white";
      break;
    case "outlined":
      pressableTypeStyle = "border border-solid border-primary100";
      hexColor = "#144E5A";
      textColor = "text-primary100";
      break;
    case "text":
      hexColor = "#144E5A";
      textColor = "text-primary100";
      break;
    case "disabled":
      pressableTypeStyle = "bg-gray";
      textColor = "text-darkgray";
      break;
    default:
      break;
  }

  return (
    <Pressable
      onPress={onPress}
      className={`${pressableTypeStyle} p-3 rounded flex-row justify-center`}
      {...rest}
    >
      {iconName && (
        <Ionicons
          name={iconName}
          size={20}
          color={hexColor}
          style={{ marginRight: 8 }}
        />
      )}
      <Text className={`${textColor} text-sm font-medium`}>{title}</Text>
    </Pressable>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["contained", "outlined", "text", "disabled"]),
};

export default Button;
