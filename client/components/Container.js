import { ScrollView, View } from "react-native";
import { StyledComponent } from "nativewind";

const Container = ({ children }) => {
  return (
    <StyledComponent component={ScrollView} className="p-4 flex-1">
      <View className="pb-8">{children}</View>
    </StyledComponent>
  );
};

export default Container;
