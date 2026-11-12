import { Color, Stack } from "expo-router";
import {
  MD3LightTheme, PaperProvider
} from 'react-native-paper';

const theme = {
  ...MD3LightTheme,
  colors: {
      ...MD3LightTheme.colors,
      primary: '#e65100',
      secondary: '#ff9800'
  }
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen
          name='(tabs)'
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='meal/[id]'
          options={{
            title: 'Рецепт'
          }}
        />
      </Stack>
    </PaperProvider>
  )
}
