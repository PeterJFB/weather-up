import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import WeatherDisplay from "./components/WeartherDisplay";
import NavBar from "./components/NavBar";
import ClothingSelection from "./components/ClothingSelection";

function App() {
  return (
    <Flex w="full" h="100vh" justify="center" align="center" direction="column">
      <Flex
        flex={1}
        w="full"
        justify="center"
        align="center"
        maxH="100%"
        overflowY="auto"
        sx={{ scrollbarGutter: "stable" }}
      >
        <Routes>
          <Route path="/clothing" element={<ClothingSelection />}></Route>
          <Route path="/" element={<WeatherDisplay />} />
        </Routes>
      </Flex>
      <NavBar />
    </Flex>
  );
}

export default App;
