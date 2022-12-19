import { ScrollView, View } from "react-native";
import { StyledComponent } from "nativewind";

const Container = ({ children, extraPadding = false }) => {
  return (
    <StyledComponent component={ScrollView} className="p-4 flex-1">
      <View className={extraPadding ? "pb-20" : "pb-8"}>{children}</View>
    </StyledComponent>
  );
};

export default Container;
