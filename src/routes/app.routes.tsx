import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from  'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Navigator, Screen } = createBottomTabNavigator();

import { Listing } from '../Screens/Listing'
import { Purchases } from '../Screens/Purchases';
import { Sales } from '../Screens/Sales';
import { Products } from '../Screens/Products';

export function AppRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.shape_light,
        tabBarActiveBackgroundColor: theme.colors.background,
        tabBarInactiveBackgroundColor: theme.colors.background,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          height: 68,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        }
      }}
    >
      <Screen 
        name="Listagem"
        component={Listing}
        options={{
          tabBarIcon: (({ size, color }) => 
            <MaterialIcons 
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          )
        }}
      />
      <Screen 
        name="Compras"
        component={Purchases}
        options={{
          tabBarIcon: (({ size, color }) => 
            <MaterialIcons 
              name="shopping-cart"
              size={size}
              color={color}
            />
          )
        }}
      />
      <Screen 
        name="Produtos"
        component={Products}
        options={{
          tabBarIcon: (({ size, color }) => 
            <MaterialIcons 
              name="redeem"
              size={size}
              color={color}
            />
          )
        }}
      />
      <Screen 
        name="Vendas"
        component={Sales}
        options={{
          tabBarIcon: (({ size, color }) => 
            <MaterialIcons 
              name="shopping-basket"
              size={size}
              color={color}
            />
          )
        }}
      />
    </Navigator>
  )
}
