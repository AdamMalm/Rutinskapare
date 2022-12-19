import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_TIME } from "../api/mutations/TimeMutations";
import { GET_ROUTINES } from "../api/queries/RoutineQuery";

const GlobalContext = React.createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const GlobalProvider = ({ children }) => {
  const [testString, setTestString] = useState("amazing default sträng");
  const { loading, error, data } = useQuery(GET_ROUTINES);
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
    testString,
    setTestString,
    loading,
    error,
    data,
    addNewTime,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export { GlobalProvider };
