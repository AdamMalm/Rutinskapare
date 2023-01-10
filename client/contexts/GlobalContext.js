import React, { useContext } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { GET_USER_ROUTINES } from "../api/queries/UserQuery";
import {
  ADD_ROUTINE,
  DELETE_ROUTINE,
  UPDATE_ROUTINE_HISTORY,
  UPDATE_ROUTINE_HISTORY2,
} from "../api/mutations/RoutineMutations";
import { UPDATE_USER_ROUTINES } from "../api/mutations/UserMutations";
import {
  ADD_HISTORY,
  UPDATE_HISTORY,
  DELETE_HISTORY,
} from "../api/mutations/HistoryMutations";

const GlobalContext = React.createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const GlobalProvider = ({ children }) => {
  const {
    loading: loadingRoutines,
    error: errorRoutines,
    data: dataRoutines,
    refetch: refetchRoutines,
  } = useQuery(GET_USER_ROUTINES);
  const [
    addRoutine,
    { error: errorAddRoutine, data: dataAddRoutine, reset: resetAddRoutine },
  ] = useMutation(ADD_ROUTINE);
  const [updateUserRoutines] = useMutation(UPDATE_USER_ROUTINES);
  const [deleteRoutine] = useMutation(DELETE_ROUTINE);
  const [addHistory] = useMutation(ADD_HISTORY);
  const [updateRoutine] = useMutation(UPDATE_ROUTINE_HISTORY);
  const [updateRoutine2] = useMutation(UPDATE_ROUTINE_HISTORY2);
  const [updateHistory] = useMutation(UPDATE_HISTORY);
  const [deleteHistory] = useMutation(DELETE_HISTORY);
  const [getUserRoutines] = useLazyQuery(GET_USER_ROUTINES);

  const addNewRoutine = ({
    title,
    description,
    frequency,
    highPriority,
    timeOfDay,
  }) => {
    addHistory({
      variables: {
        completed: false,
        time: new Date().toISOString(),
      },
      onError: (error) => console.log(error),
      onCompleted: (history) => {
        addRoutine({
          variables: {
            title: title,
            description: description,
            frequency: frequency,
            highPriority: highPriority,
            timeOfDay: timeOfDay,
            historyOfCompletion: [history.createHistory.id],
          },
          onError: (error) => console.log(error),
          onCompleted: (routine) => {
            var routines = [];
            dataRoutines.user.routines.forEach((element) => {
              routines.push(element.id);
            });
            if (!routines.includes(routine.createRoutine.id)) {
              routines.push(routine.createRoutine.id);
            }
            updateUserRoutines({
              variables: {
                routines: routines,
              },
              onError: (error) => console.log(error),
              onCompleted: () => refetchRoutines(),
            });
          },
        });
      },
    });
  };

  const removeRoutine = (routineId) => {
    var routine = dataRoutines.user.routines.filter(
      (routine) => routine.id === routineId,
    )[0];

    routine.historyOfCompletion.forEach((item) => {
      deleteHistory({
        variables: {
          id: item.id,
        },
      });
    });

    deleteRoutine({
      variables: {
        id: routineId,
      },
      onError: (error) => console.log(error),
    });

    var routines = [];
    dataRoutines.user.routines.forEach((routine) => {
      if (routine.id != routineId) {
        routines.push(routine.id);
      }
    });

    updateUserRoutines({
      variables: {
        routines: routines,
      },
      onError: (error) => console.log(error),
      onCompleted: () => {
        refetchRoutines();
      },
    });
  };

  const updateHistoryCompletion = async (routineId, completionBool) => {
    var routine = dataRoutines.user.routines.filter(
      (routine) => routine.id === routineId,
    )[0];

    const latestHistory =
      routine.historyOfCompletion[routine.historyOfCompletion.length - 1];

    var latestDate = new Date(latestHistory.time);
    var today = new Date();

    if (latestDate.toDateString() === today.toDateString()) {
      updateHistory({
        variables: {
          id: latestHistory.id,
          completed: completionBool,
          time: latestHistory.time,
        },
        onError: (error) => console.log(error),
        onCompleted: () => refetchRoutines(),
      });
    } else {
      addHistory({
        variables: {
          completed: completionBool,
          time: new Date().toISOString(),
        },
        onError: (error) => console.log(error),
        onCompleted: (history) => {
          var arr = [];
          routine.historyOfCompletion.forEach((item) => arr.push(item.id));
          arr.push(history.createHistory.id);
          updateRoutine({
            variables: {
              id: routineId,
              historyOfCompletion: arr,
            },
            onError: (error) => console.log(error),
          });
        },
      });
    }
  };

  //For demo only
  const addHistoryCompletion = async (routineId, dates) => {
    getUserRoutines({
      onCompleted: (userRoutines) => {
        var routine = userRoutines.user.routines.filter(
          (routine) => routine.id === routineId,
        )[0];
        var b = Boolean(Math.round(Math.random()));
        addHistory({
          variables: {
            completed: b,
            time: new Date(dates[0]),
          },
          onError: (error) => console.log(error),
          onCompleted: (history) => {
            console.log("new history");
            var arr = [];
            routine.historyOfCompletion.forEach((item) => arr.push(item.id));
            arr.push(history.createHistory.id);

            var freq = [];
            routine.frequency.forEach((d) => {
              if (d === "Måndag") freq.push("monday");
              if (d === "Tisdag") freq.push("tuesday");
              if (d === "Onsdag") freq.push("wednesday");
              if (d === "Torsdag") freq.push("thursday");
              if (d === "Fredag") freq.push("friday");
              if (d === "Lördag") freq.push("saturday");
              if (d === "Söndag") freq.push("sunday");
            });

            updateRoutine2({
              variables: {
                id: routineId,
                historyOfCompletion: arr,
                frequency: freq,
              },
              onError: (error) => console.log(error),
              onCompleted: async () => {
                console.log(dates.length);
                dates.splice(0, 1);
                if (dates.length > 0) {
                  addHistoryCompletion(routineId, dates);
                } else {
                  console.log("Done");
                }
              },
            });
          },
        });
      },
    });
  };

  const swedishDaylist = [
    "Söndag",
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
  ];

  const getTodaysRoutines = () => {
    var today = new Date();
    var day = today.getDay();
    var todaysRoutines = dataRoutines.user.routines.filter((routine) =>
      routine.frequency.includes(swedishDaylist[day]),
    );
    return todaysRoutines;
  };

  const value = {
    loadingRoutines,
    errorRoutines,
    dataRoutines,
    addNewRoutine,
    dataAddRoutine,
    errorAddRoutine,
    resetAddRoutine,
    removeRoutine,
    updateHistoryCompletion,
    addHistoryCompletion,
    getTodaysRoutines,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export { GlobalProvider };
