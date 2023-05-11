import "./App.css";
import {
  Heading,
  Button,
  Flex,
  InputGroup,
  InputRightAddon,
  Input,
  FormControl,
  Spacer,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import PasswordInput from "./components/PasswordInput.tsx";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./contexts/UserContext/useUserContext.ts";
import jwtDecode from "jwt-decode";

interface Values {
  username: string;
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

enum FormMode {
  SIGN_UP = "signUp",
  LOGIN = "login",
}

function App() {
  const [mode, setMode] = useState<FormMode>(FormMode.LOGIN);
  const navigate = useNavigate();
  const { setUsername, setRole } = useUserContext();
  const signUp = async (values: Values) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", `${values.email}@aiesec.net`);
    urlencoded.append("username", values.username);
    urlencoded.append("password", values.password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  const login = async (values: Values) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("username", values.username);
    urlencoded.append("password", values.password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, requestOptions)
      .then((response) => response.json())
      .then((result: LoginResponse) => {
        localStorage.setItem("token", result.accessToken);
        navigate("/home");
        const { username, role } = jwtDecode(result.accessToken) as {
          username: string;
          role: string;
        };
        setUsername(username);
        setRole(role);
      })
      .catch((error) => console.log("error", error));
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      mode === FormMode.LOGIN ? login(values) : signUp(values);
    },
  });

  return (
    <Flex direction={"column"}>
      <Heading>AiesecID</Heading>
      <Flex mt={"10"} justify={"space-around"}>
        <RadioGroup
          colorScheme={"green"}
          onChange={(value: FormMode) => setMode(value)}
          value={mode}
        >
          <Radio value={FormMode.SIGN_UP}>Register</Radio>
          <Radio value={FormMode.LOGIN} ml={"5"}>
            Log in
          </Radio>
        </RadioGroup>
      </Flex>
      <Spacer />
      <form onSubmit={formik.handleSubmit}>
        <FormControl mt={"10"}>
          <InputGroup id={"username"} onChange={formik.handleChange}>
            <Input placeholder="Username" name={"username"} />
          </InputGroup>
        </FormControl>
        {mode === FormMode.SIGN_UP && (
          <FormControl mt={"5"}>
            <InputGroup id={"email"} onChange={formik.handleChange}>
              <Input placeholder="user" name={"email"} />
              <InputRightAddon children="@aiesec.net" />
            </InputGroup>
          </FormControl>
        )}
        <FormControl mt={"5"}>
          <InputGroup id={"password"} onChange={formik.handleChange}>
            <PasswordInput />
          </InputGroup>
        </FormControl>
        <Button mt={"10"} type="submit" colorScheme="green" width="full">
          {mode === FormMode.SIGN_UP ? "Sign up" : "Log in"}
        </Button>
      </form>
    </Flex>
  );
}

export default App;
