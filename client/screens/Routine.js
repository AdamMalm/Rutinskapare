// Apollo exempel
import { gql, useQuery } from "@apollo/client";
import { Text, View } from "react-native";

const GET_USERS = gql`
    query Users {
        users {
            id
            name
        }
    }
`;

const Routine = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{console.log(error)}Error T_T</Text>;

  return (
    <>
      <View>
        <Text>{console.log(data)}hej</Text>
        <Text>{console.log(data)}hej</Text>
      </View>
    </>
  );
};

export default Routine;
