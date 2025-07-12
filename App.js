import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigation/AuthNavigator";
import { ThemeProvider } from "./context/ThemeContext"; 
import './context/i18n';


export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
