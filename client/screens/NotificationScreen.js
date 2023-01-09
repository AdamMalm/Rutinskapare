import { Text, View } from "react-native";
import Container from "../components/Container";
import NotificationList from "../components/NotificationCards/NotificationList";

const notifications = [
  {
    isReminder: false,
    id: 1,
    routineName: "Frukost",
    time: "9:00",
  },
  {
    isReminder: true,
    id: 2,
    routineName: "Lunch",
    time: "12:00",
  },
  {
    isReminder: false,
    id: 3,
    routineName: "Middag",
    time: "16:00",
  },
];

const NotificationScreen = () => {
  //get data from back-end

  return (
    <Container>
      <View className="mt-2">
        <Text className="text-xl text-primary100 font-bold mb-2">Idag</Text>
        <NotificationList notifications={notifications} />

        <Text className="text-xl text-primary100 font-bold mt-10 mb-2">
          Senaste veckan
        </Text>
        <NotificationList notifications={notifications} />
      </View>
    </Container>
  );
};

export default NotificationScreen;
