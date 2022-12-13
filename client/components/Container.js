import { View } from "react-native";
import { StyledComponent } from "nativewind";

const Container = ({ children }) => {
  return (
    <StyledComponent component={View} className="p-4 flex-1">
      {children}
    </StyledComponent>
  );
};

export default Container;
