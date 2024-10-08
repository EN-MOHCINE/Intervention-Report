import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="formSignature"
        options={{
          title: 'Form',
          tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'document-text' : 'document-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="test_api"
        options={{
          title: 'test_api',
          tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'body' : 'body'} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="test_api_sqllite"
        options={{
          title: 'test_api_sqllite',
          tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'body' : 'body'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
