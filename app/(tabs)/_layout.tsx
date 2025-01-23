import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {

  return (
    <Tabs
      >
      <Tabs.Screen
        name="index" options={{title: 'Home',}}
      />
    </Tabs>
  );
}
