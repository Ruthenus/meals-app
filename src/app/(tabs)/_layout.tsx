import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e65100'
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Категорії',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='food'
              size={size}
              color={String(color)}
            />
          )          
        }}
      />
      <Tabs.Screen
        name='meals'
        options={{
          title: 'Страви',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='magnify'
              size={size}
              color={String(color)}
            />
          )          
        }}
      />
      <Tabs.Screen
        name='random'
        options={{
          title: 'Випадкова',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='dice-multiple'
              size={size}
              color={String(color)}
            />
          )          
        }}
      />
      <Tabs.Screen
        name='news'
        options={{
          title: 'Новини',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='newspaper'
              size={size}
              color={String(color)}
            />
          )          
        }}
      />
    </Tabs>
  );
}
