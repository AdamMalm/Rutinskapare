import { useState, useEffect } from "react";
import { Text } from "react-native";
import Container from "../components/Container";
import PeriodPicker from "../components/PeriodPicker";
import RoutineStatisticsList from "../components/RoutineCards/RoutineStatisticsList";
import { useGlobalContext } from "../contexts/GlobalContext";

const options = [
  { label: "Senaste veckan" },
  { label: "Senaste månaden" },
  { label: "Senaste året" },
];

const getStats = ({ completionHistory, referenceDate }) => {
  var history = completionHistory.filter(
    (h) => new Date(h.time) > referenceDate,
  );
  var numCompleted = history.filter((h) => h.completed).length;

  var largestStreak = 0;
  var streak = 0;
  history.map((h) => {
    if (h.completed) {
      streak++;
      if (streak > largestStreak) {
        largestStreak = streak;
      }
    } else {
      streak = 0;
    }
  });

  return {
    percentageComp: Math.round((numCompleted / history.length) * 100) / 100,
    largestStreak: largestStreak,
  };
};

const StatisticsScreen = () => {
  const { loadingRoutines, errorRoutines, dataRoutines } = useGlobalContext();
  if (loadingRoutines) return null;
  if (errorRoutines) return console.log(errorRoutines);

  const [activePeriod, setActivePeriod] = useState(0);
  const [routineStatistics, setRoutineStatistics] = useState([]);

  useEffect(() => {
    let routinesStats = [];
    dataRoutines.user.routines.map((routine) => {
      var date = new Date();
      switch (activePeriod) {
        case 0: //Week
          date.setDate(date.getDate() - 7);
          break;
        case 1: //Month
          date.setMonth(date.getMonth() - 1);
          break;
        case 2: //Year
          date.setFullYear(date.getFullYear() - 1);
          break;
      }
      let stats = getStats({
        completionHistory: routine.historyOfCompletion,
        referenceDate: date,
      });
      routinesStats.push({ ...routine, stats });
    });
    setRoutineStatistics(routinesStats);
  }, [activePeriod]);

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
        activePeriod={activePeriod}
        setActivePeriod={setActivePeriod}
      />
      {routineStatistics.length !== 0 && (
        <RoutineStatisticsList routineStatistics={routineStatistics} />
      )}
    </Container>
  );
};

export default StatisticsScreen;
