import React, { useContext } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { GET_USER_ROUTINES } from "../api/queries/UserQuery";
import { ADD_TIME, DELETE_TIME } from "../api/mutations/TimeMutations";
import {
  ADD_ROUTINE,
  DELETE_ROUTINE,
  UPDATE_ROUTINE_HISTORY,
} from "../api/mutations/RoutineMutations";
import { UPDATE_USER_ROUTINES } from "../api/mutations/UserMutations";
import { GET_ROUTINE_HISTORY } from "../api/queries/RoutineQuery";
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
  const [addTime] = useMutation(ADD_TIME);
  const [addRoutine] = useMutation(ADD_ROUTINE);
  const [updateUserRoutines] = useMutation(UPDATE_USER_ROUTINES);
  const [getUserRoutines] = useLazyQuery(GET_USER_ROUTINES);
  const [deleteTime] = useMutation(DELETE_TIME);
  const [deleteRoutine] = useMutation(DELETE_ROUTINE);
  const [addHistory] = useMutation(ADD_HISTORY);
  const { refetch: refetchRoutineHistory } = useQuery(GET_ROUTINE_HISTORY);
  const [updateRoutine] = useMutation(UPDATE_ROUTINE_HISTORY);
  const [updateHistory] = useMutation(UPDATE_HISTORY);
  const [deleteHistory] = useMutation(DELETE_HISTORY);

  const addNewTime = ({ specificTime, nonSpecificTime }) => {
    addTime({
      variables: {
        specificTime: specificTime,
        nonSpecificTime: nonSpecificTime,
      },
      onError: (error) => console.log(error),
    });
  };

  const addNewRoutine = ({
    title,
    description,
    frequency,
    highPriority,
    specificTime,
    nonSpecificTime,
  }) => {
    addTime({
      variables: {
        specificTime: specificTime,
        nonSpecificTime: nonSpecificTime,
      },
      onError: (error) => console.log(error),
      onCompleted: (timeOfDay) => {
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
                timeOfDay: timeOfDay.createTime.id,
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
                  onCompleted: () => {
                    refetchRoutines();
                  },
                });
              },
            });
          },
        });
      },
    });
  };

  const removeRoutine = (routineId) => {
    getUserRoutines({
      onError: (error) => console.log(error),
      onCompleted: async (userRoutines) => {
        var routineToRemove = userRoutines.user.routines.filter(
          (routine) => routine.id == routineId,
        )[0];

        if (routineToRemove == undefined) return;

        var timeOfDayId = routineToRemove.timeOfDay.id;

        deleteTime({
          variables: {
            id: timeOfDayId,
          },
          onError: (error) => console.log(error),
        });

        const routineHistory = await refetchRoutineHistory({
          routineId: routineId,
        });

        routineHistory.data.routine.historyOfCompletion.forEach((item) => {
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
        userRoutines.user.routines.forEach((routine) => {
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
      },
    });
  };

  const updateHistoryCompletion = async (routineId, completionBool) => {
    let routine = dataRoutines.user.routines.filter(
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
          routine.data.routine.historyOfCompletion.forEach((item) =>
            arr.push(item.id),
          );
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
    let today = new Date();
    let day = today.getDay();
    let todaysRoutines = dataRoutines.user.routines.filter((routine) =>
      routine.frequency.includes(swedishDaylist[day]),
    );
    return todaysRoutines;
  };

  const value = {
    loadingRoutines,
    errorRoutines,
    dataRoutines,
    addNewTime,
    addNewRoutine,
    removeRoutine,
    updateHistoryCompletion,
    getTodaysRoutines,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export { GlobalProvider };
