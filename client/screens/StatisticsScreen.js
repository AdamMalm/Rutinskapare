import { useState, useEffect } from "react";
import { Text } from "react-native";
import Container from "../components/Container";
import Error from "../components/Error";
import Loading from "../components/Loading";
import PeriodPicker from "../components/PeriodPicker";
import RoutineStatisticsList from "../components/RoutineCards/RoutineStatisticsList";
import { useGlobalContext } from "../contexts/GlobalContext";

const options = [
  { label: "Senaste veckan" },
  { label: "Senaste månaden" },
  { label: "Senaste året" },
];

const getStats = ({ completionHistory, referenceDate }) => {
  var historyFiltered = completionHistory.filter(
    (h) => new Date(h.time) > referenceDate,
  );

  if (historyFiltered.length != 0) {
    var firstHistoryToAdd = historyFiltered[0];
    historyFiltered.forEach((h) => {
      if (new Date(firstHistoryToAdd.time) > new Date(h.time)) {
        firstHistoryToAdd = h;
      }
    });

    var history = [firstHistoryToAdd];

    var nextHistoryToAdd = null;
    historyFiltered.forEach(() => {
      historyFiltered.forEach((h) => {
        if (new Date(h.time) > new Date(history[history.length - 1].time)) {
          if (nextHistoryToAdd == null) {
            nextHistoryToAdd = h;
          } else {
            if (new Date(h.time) < new Date(nextHistoryToAdd.time)) {
              nextHistoryToAdd = h;
            }
          }
        }
      });

      if (nextHistoryToAdd != null) {
        history.push(nextHistoryToAdd);
        nextHistoryToAdd = null;
      }
    });
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
      percentageComp: numCompleted / history.length,
      largestStreak: largestStreak,
    };
  }

  return {
    percentageComp: 0,
    largestStreak: 0,
  };
};

const StatisticsScreen = () => {
  const { loadingRoutines, errorRoutines, dataRoutines } = useGlobalContext();
  if (loadingRoutines) return <Loading />;
  if (errorRoutines) return <Error error={errorRoutines} />;

  const [activePeriod, setActivePeriod] = useState(0);
  const [routineStatistics, setRoutineStatistics] = useState([]);

  useEffect(() => {
    var routinesStats = [];
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
      var stats = getStats({
        completionHistory: routine.historyOfCompletion,
        referenceDate: date,
      });
      routinesStats.push({ ...routine, stats });
    });
    setRoutineStatistics(routinesStats);
  }, [activePeriod, dataRoutines]);

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
