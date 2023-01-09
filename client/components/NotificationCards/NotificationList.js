import { View } from "react-native";
import Notification from "./Notification";

const NotificationList = ({ notifications }) => {
  //calculate isReminder
  return (
    <View className="flex flex-column space-y-4">
      {notifications.map((notification) => (
        <Notification
          isReminder={notification.isReminder}
          key={notification.id}
          routineName={notification.routineName}
          time={notification.time}
        />
      ))}
    </View>
  );
};

export default NotificationList;
