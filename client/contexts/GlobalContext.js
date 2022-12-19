import React, { useContext, useState } from "react";
import { gql, useQuery } from "@apollo/client"

const GET_ROUTINES = gql`
  query getRoutines {
    routines {
      id
      title
      description
      frequency
      highPriority
      timeOfDay
      historyOfCompletion
    }
  }
`

const GlobalContext = React.createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const GlobalProvider = ({ children }) => {
  const [testString, setTestString] = useState("amazing default sträng");
  const { loading, error, data } = useQuery(GET_ROUTINES)

  const value = {
    testString,
    setTestString,
    loading,
    error,
    data
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export { GlobalProvider };
