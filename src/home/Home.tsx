import { Badge, Heading } from "@chakra-ui/react";
import { useUserContext } from "../contexts/UserContext/useUserContext.ts";
import { Navigate } from "react-router-dom";

function Home() {
  const { username, role } = useUserContext();
  if (!username) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <>
      <Heading>Hello {username}</Heading>
      {role === "ADMIN" ? (
        <Badge colorScheme={"blue"}>ADMIN</Badge>
      ) : (
        <Badge colorScheme={"green"}>USER</Badge>
      )}
    </>
  );
}

export default Home;
