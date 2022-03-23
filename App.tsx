import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';

import theme from './src/global/styles/theme';
import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './src/routes/app.routes';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_700Bold
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={ theme }>
      <StatusBar style="light" backgroundColor='transparent' />
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
    );
  }
  

