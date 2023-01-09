import * as Notifications from "expo-notifications";
import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import Container from "../components/Container";
import ButtonGroup from "../components/ButtonGroup";
import TextField from "../components/TextField";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../components/Button";
import Prioritet from "../components/Prioritet";
import { format } from "date-fns";
import { useGlobalContext } from "../contexts/GlobalContext";

const timeButtons = [
  { label: "Morgon", icon: "sunrise" },
  { label: "Dag", icon: "sun" },
  { label: "Kväll", icon: "moon" },
  { label: "Specifik tid", icon: "clock" },
];
const frequencyButtons = [{ label: "Varje dag" }, { label: "Specifika dagar" }];
const dayButtons = [
  { label: "Söndag", value: "sunday" },
  { label: "Måndag", value: "monday" },
  { label: "Tisdag", value: "tuesday" },
  { label: "Onsdag", value: "wednesday" },
  { label: "Torsdag", value: "thursday" },
  { label: "Fredag", value: "friday" },
  { label: "Lördag", value: "saturday" },
];

const CreateRoutineScreen = ({ navigation: { goBack } }) => {
  const { addNewRoutine, errorAddRoutine, dataAddRoutine, resetAddRoutine } =
    useGlobalContext();

  const [selectedTimeIndexes, setSelectedTimeIndexes] = useState([]);
  const [selectedFreqIndexes, setSelectedFreqIndexes] = useState([]);
  const [selectedDayIndexes, setSelectedDayIndexes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescriptionText] = useState("");
  const [time, setTime] = useState(new Date());
  const [isPrioritised, setPrioritised] = useState(false);
  const toggleSwitch = () => setPrioritised((previousState) => !previousState);

  const scheduleNotifications = async ({ days }) => {
    let hour = 0;
    let minute = 0;

    // If nonSpecificTime, set standard hours
    switch (selectedTimeIndexes[0]) {
      case 0:
        hour = 7;
        break;

      case 1:
        hour = 13;
        break;

      case 2:
        hour = 17;
        break;

      case 3:
        hour = time.getHours();
        minute = time.getMinutes();
        break;

      default:
        break;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Det är dags för din rutin!",
        body: title,
      },
      trigger: {
        dayOfWeek: days,
        hour,
        minute,
        repeat: true,
      },
    });
  };

  useEffect(() => {
    if (dataAddRoutine) {
      if (dataAddRoutine.createRoutine.highPriority) {
        scheduleNotifications({ days: dataAddRoutine.createRoutine.frequency });
      }
      resetAddRoutine();
      goBack();
    }
  }, [dataAddRoutine]);

  function onTimeSelected(event, selectedTime) {
    setTime(selectedTime);
  }

  function createRoutine() {
    var days = [];
    var specificTime = "";
    var nonSpecificTime = "";

    if (timeButtons[selectedTimeIndexes[0]].label === "Specifik tid") {
      specificTime = format(time, "HH:mm");
    } else {
      nonSpecificTime = timeButtons[selectedTimeIndexes[0]].label;
    }

    if (selectedFreqIndexes[0] === 0) {
      dayButtons.forEach((day) => {
        days.push(day.value);
      });
    } else {
      selectedDayIndexes.sort(function (a, b) {
        return a - b;
      });
      selectedDayIndexes.forEach((day) => {
        days.push(dayButtons[day].value);
      });
    }

    addNewRoutine({
      title,
      description,
      frequency: days,
      highPriority: isPrioritised,
      timeOfDay: {
        isSpecific: specificTime !== "",
        specificTime,
        nonSpecificTime,
      },
    });
  }

  return (
    <Container extraPadding>
      <View className="flex flex-col mt-2 space-y-10">
        <TextField
          name={"Rutinnamn"}
          placeholder={"Exempelvis: Medicin"}
          onChange={setTitle}
        />
        <TextField
          name={"Beskrivning"}
          placeholder={"Exempelvis: Ta två alvedon"}
          onChange={setDescriptionText}
        />
        <View>
          <Text className="text-xl font-bold color-primary100 mb-6">Tid</Text>
          <ButtonGroup
            onPress={setSelectedTimeIndexes}
            buttons={timeButtons}
            selectedIndexes={selectedTimeIndexes}
          />
        </View>
        {selectedTimeIndexes[0] === 3 && (
          <View className="flex flex-row items-center justify-between mx-2">
            <Text className="text-lg font-bold color-primary100">Ange tid</Text>
            <DateTimePicker
              mode="time"
              is24Hour={true}
              value={time}
              onChange={onTimeSelected}
              style={{ alignSelf: "center", fontSize: 16 }}
            />
          </View>
        )}
        <View>
          <Text className="text-xl font-bold color-primary100 mb-4">
            Frekvens
          </Text>
          <ButtonGroup
            onPress={setSelectedFreqIndexes}
            buttons={frequencyButtons}
            selectedIndexes={selectedFreqIndexes}
          />
          {selectedFreqIndexes[0] === 1 && (
            <View>
              <Text className="text-base font-bold color-primary100 mt-10 mb-4">
                Välj dagar
              </Text>
              <ButtonGroup
                onPress={setSelectedDayIndexes}
                buttons={dayButtons}
                selectedIndexes={selectedDayIndexes}
                multipleChoice={true}
              />
            </View>
          )}
        </View>
        <Prioritet
          isPrioritised={isPrioritised}
          setPrioritised={toggleSwitch}
        />
        {title === "" ||
        selectedFreqIndexes.length === 0 ||
        selectedTimeIndexes.length === 0 ||
        (selectedFreqIndexes[0] === 1 && selectedDayIndexes.length === 0) ? (
          <>
            <Text className="text-sm text-center mt-10 mb-2">
              Fyll i alla obligatoriska fält.
            </Text>
            <Button type="disabled" title={"Spara rutin"}></Button>
          </>
        ) : (
          <Button onPress={createRoutine} title={"Spara rutin"}></Button>
        )}
        {errorAddRoutine && (
          <Text className="text-sm text-center mt-10 mb-2">
            Det gick inte att spara rutinen. Försök igen.
          </Text>
        )}
      </View>
    </Container>
  );
};

export default CreateRoutineScreen;
