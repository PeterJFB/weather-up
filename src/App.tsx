import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";
import WeatherDisplay from "./components/WeartherDisplay";

function App() {
  return (
    <Flex w="full" h="100vh" justify="center" align="center" direction="column">
      <Routes>
        <Route path="/" element={<WeatherDisplay />}></Route>
        <Route path="hello" element={"hi"} />
      </Routes>
      <Spinner />
    </Flex>
  );
}

export default App;
