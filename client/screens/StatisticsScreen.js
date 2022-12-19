import { useState } from "react";
import { Text } from "react-native";
import Container from "../components/Container";
import PeriodPicker from "../components/PeriodPicker";
import RoutineStatisticsList from "../components/RoutineCards/RoutineStatisticsList";

const routineStatisics = [
  {
    id: 1,
    title: "test1",
    description:
      "Här är en liten beskrivning som är lite längre så att vi kan se flera rader",
    time: "9.00",
    frequency: "varje dag",
  },
  {
    id: 2,
    title: "test2",
    description: "Beskrivning ja0",
    time: "9.00",
    frequency: "varje dag",
  },
  {
    id: 3,
    title: "test3",
    time: "9.00",
    frequency: "tisdag, onsdag, fredag",
  },
];

const options = [
  { label: "Senaste veckan" },
  { label: "Senaste månaden" },
  { label: "Senaste året" },
];

const StatisticsScreen = () => {
  const [active, setActive] = useState(0);
  return (
    <Container>
      <Text className="text-xl font-bold color-primary100 mb-2">
        Din rutinstatistik
      </Text>
      <Text className="text-base mb-8">
        Här kan du se hur väl du följt dina rutiner senaste veckan, månaden
        eller året. Du kan se hur många procent av de planerade tillfällena du
        har utfört rutinen, samt hur många gånger i rad du utfört rutinen.
      </Text>
      <PeriodPicker
        className="mb-4"
        options={options}
        active={active}
        setActive={setActive}
      />
      <RoutineStatisticsList routineStatisics={routineStatisics} />
    </Container>
  );
};

export default StatisticsScreen;
