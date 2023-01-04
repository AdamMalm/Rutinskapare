import React, { useContext } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { GET_USER_ROUTINES } from "../api/queries/UserQuery";
import { ADD_TIME, DELETE_TIME } from "../api/mutations/TimeMutations";
import { ADD_ROUTINE, DELETE_ROUTINE } from "../api/mutations/RoutineMutations";
import { UPDATE_USER_ROUTINES } from "../api/mutations/UserMutations";

const GlobalContext = React.createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const GlobalProvider = ({ children }) => {
  //const { loadingUser, errorUser, dataUser } = useQuery(GET_USER);
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
        console.log(timeOfDay);
        addRoutine({
          variables: {
            title: title,
            description: description,
            frequency: frequency,
            highPriority: highPriority,
            timeOfDay: timeOfDay.createTime.id,
          },
          onError: (error) => console.log(error),
          onCompleted: (routine) => {
            console.log(routine);
            console.log("------------");
            getUserRoutines({
              onError: (error) => console.log(error),
              onCompleted: (userRoutines) => {
                var routineObjs = userRoutines.user.routines;
                var routines = [];
                routineObjs.forEach((element) => {
                  routines.push(element.id);
                });
                if (!routines.includes(routine.createRoutine.id)) {
                  routines.push(routine.createRoutine.id);
                }
                console.log(routines);
                updateUserRoutines({
                  variables: {
                    routines: routines,
                  },
                  onError: (error) => console.log(error),
                  onCompleted: (user) => {
                    console.log(user);
                    console.log(user.updateUser.routines);
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
      onCompleted: (userRoutines) => {
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
          onCompleted: (timeOfDayData) => {
            console.log("Deleted TimeOfDay");
            console.log(timeOfDayData);
          },
        });

        deleteRoutine({
          variables: {
            id: routineId,
          },
          onError: (error) => console.log(error),
          onCompleted: (routineData) => {
            console.log("Deleted Routine");
            console.log(routineData);
          },
        });

        var routines = [];
        userRoutines.user.routines.forEach((routine) => {
          if (routine.id != routineId) {
            routines.push(routine.id);
          }
        });
        console.log(routines);
        updateUserRoutines({
          variables: {
            routines: routines,
          },
          onError: (error) => console.log(error),
          onCompleted: (user) => {
            console.log("Updated User");
            console.log(user);
            console.log(user.updateUser.routines);
            refetchRoutines();
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
    getTodaysRoutines,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export { GlobalProvider };
