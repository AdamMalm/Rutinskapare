import { Text, View } from "react-native";
import { useState } from "react";
import Container from "../components/Container";
import ButtonGroup from "../components/ButtonGroup";
import TextField from "../components/TextField";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../components/Button";
import Prioritet from "../components/Prioritet";
import { format } from "date-fns";
import { useGlobalContext } from "../contexts/GlobalContext";

const timeButtons = [
  { label: "Morgon", icon: "sunrise", value: "morning" },
  { label: "Dag", icon: "sun", value: "day" },
  { label: "Kväll", icon: "moon", value: "evening" },
  { label: "Specifik tid", icon: "clock" },
];
const frekvensButtons = [{ label: "Varje dag" }, { label: "Specifika dagar" }];
const dayButtons = [
  { label: "Måndag", value: "monday" },
  { label: "Tisdag", value: "tuesday" },
  { label: "Onsdag", value: "wednesday" },
  { label: "Torsdag", value: "thursday" },
  { label: "Fredag", value: "friday" },
  { label: "Lördag", value: "saturday" },
  { label: "Söndag", value: "sunday" },
];
const frivillig = "(Frivillig)";

const CreateRoutineScreen = () => {
  const { addNewRoutine } = useGlobalContext();

  const [selectedTimeIndexes, setSelectedTimeIndexes] = useState([]);
  const [selectedFreqIndexes, setSelectedFreqIndexes] = useState([]);
  const [selectedDayIndexes, setSelectedDayIndexes] = useState([]);
  const [routineName, setRoutineNameText] = useState("");
  const [description, setDescriptionText] = useState("");
  const [time, setTime] = useState(new Date());
  const [isPrioritised, setPrioritised] = useState(false);
  const toggleSwitch = () => setPrioritised((previousState) => !previousState);

  function onTimeSelected(event, selectedTime) {
    setTime(selectedTime);
  }

  function createRoutine() {
    var days = [];
    var specificTime = " ";
    var timeOfDay = " ";

    if (timeButtons[selectedTimeIndexes[0]].label === "Specifik tid") {
      specificTime = format(time, "HH:mm");

      //------------ ändra till: timeOfDay = "none"; -------------------------
      if (Number(format(time, "HH")) < 10) {
        timeOfDay = "morning";
      } else if (Number(format(time, "HH")) > 16) {
        timeOfDay = "evening";
      } else {
        timeOfDay = "day";
      }
      // ---------------------------------------------------------------------
    } else {
      timeOfDay = timeButtons[selectedTimeIndexes[0]].value;
      if (timeOfDay === "morning") {
        specificTime = "08:00";
      } else if (timeOfDay === "day") {
        specificTime = "12:00";
      } else {
        specificTime = "17:00";
      }
    }

    if (frekvensButtons[selectedFreqIndexes[0]].label == "Varje dag") {
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
      title: routineName,
      description: description,
      frequency: days,
      highPriority: isPrioritised,
      specificTime: specificTime,
      nonSpecificTime: timeOfDay,
    });
  }

  return (
    <Container extraPadding>
      <View className="flex flex-col mt-2 space-y-10">
        <TextField
          name={"Rutinnamn"}
          placeholder={"Exempelvis: Medicin"}
          onChange={setRoutineNameText}
        />
        <TextField
          name={"Beskrivning"}
          placeholder={"Exempelvis: Ta två alvedon"}
          onChange={setDescriptionText}
        />
        <View>
          <View className="flex flex-row items-center">
            <Text className="text-xl font-bold color-primary100 mb-6">Tid</Text>
            <Text className="text-sm color-black mb-6 ml-2">{frivillig}</Text>
          </View>
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
            buttons={frekvensButtons}
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
        {routineName === "" || selectedFreqIndexes[0] === null ? (
          <Button type="disabled" title={"Fyll i rutininformation"}></Button>
        ) : (
          <Button onPress={createRoutine} title={"Spara rutin"}></Button>
        )}
      </View>
    </Container>
  );
};

export default CreateRoutineScreen;
