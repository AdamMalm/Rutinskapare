import { Text, View } from "react-native";
import { useState } from "react";
import Container from "../components/Container";
import ButtonGroup from "../components/ButtonGroup";
import TextField from "../components/TextField";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../components/Button";
import Prioritet from "../components/Prioritet";

const CreateRoutineScreen = () => {
  const [selectedTimeIndexes, setSelectedTimeIndexes] = useState([]);
  const [selectedFreqIndexes, setSelectedFreqIndexes] = useState([]);
  const [selectedDayIndexes, setSelectedDayIndexes] = useState([]);
  const [routineName, setroutineNameText] = useState("");
  const [description, setDescriptionText] = useState("");
  const [time, setTime] = useState(new Date());
  const [isPrioritised, setPrioritised] = useState(false);
  const toggleSwitch = () => setPrioritised((previousState) => !previousState);

  const frivillig = "(Frivillig)";
  const timeButtons = [
    { label: "Morgon", icon: "sunrise" },
    { label: "Dag", icon: "sun" },
    { label: "Kväll", icon: "moon" },
    { label: "Specifik tid", icon: "clock" },
  ];
  const frekvensButtons = [
    { label: "Varje dagar" },
    { label: "Specifika dagar" },
  ];
  const dayButtons = [
    { label: "Måndag" },
    { label: "Tisdag" },
    { label: "Onsdag" },
    { label: "Torsdag" },
    { label: "Fredag" },
    { label: "Lördag" },
    { label: "Söndag" },
  ];

  function onTimeSelected(event, selectedTime) {
    setTime(selectedTime);
  }

  function createRoutine() {
    //do something here
  }

  return (
    <Container extraPadding>
      <View className="flex flex-col mt-2 space-y-10">
        <TextField
          name={"Rutinnamn"}
          placeholder={"Exempelvis: Medicin"}
          onChange={setroutineNameText}
          text={routineName}
        />
        <TextField
          name={"Beskrivning"}
          placeholder={"Exempelvis: Ta två alvedon"}
          onChange={setDescriptionText}
          text={description}
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
        {selectedTimeIndexes[0] === 3 ? (
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
        ) : (
          <></>
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
          {selectedFreqIndexes[0] === 1 ? (
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
          ) : (
            <></>
          )}
        </View>
        <Prioritet
          isPrioritised={isPrioritised}
          setPrioritised={toggleSwitch}
        />
        <Button onPress={createRoutine} title={"Spara rutin"}></Button>
      </View>
    </Container>
  );
};

export default CreateRoutineScreen;
