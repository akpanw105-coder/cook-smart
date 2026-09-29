import React from 'react';
import { Stack } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RecipeProvider } from '@/context/RecipeContext';
import { CookTheme } from '@/constants/cook-theme';

export default function RootLayout() {
  return (
    <RecipeProvider>
      <StatusBar style="light" />
      <View style={styles.outerContainer}>
        <View style={styles.maxContainer}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: CookTheme.colors.background },
              animation: 'fade',
            }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="generate" />
            <Stack.Screen
              name="recipe-result"
              options={{
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen name="saved" />
          </Stack>
        </View>
      </View>
    </RecipeProvider>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#07080A',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  maxContainer: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 520 : undefined,
    backgroundColor: CookTheme.colors.background,
  },
});
