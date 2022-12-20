import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_TIME } from "../api/mutations/TimeMutations";
import { GET_USER_ROUTINES } from "../api/queries/UserQuery";

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
  } = useQuery(GET_USER_ROUTINES);
  const [addTime] = useMutation(ADD_TIME);

  const addNewTime = ({ specificTime, nonSpecificTime }) => {
    addTime({
      variables: {
        specificTime: specificTime,
        nonSpecificTime: nonSpecificTime,
      },
      onError: (error) => console.log(error),
    });
  };

  const value = {
    loadingRoutines,
    errorRoutines,
    dataRoutines,
    addNewTime,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export { GlobalProvider };
