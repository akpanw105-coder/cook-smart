import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CookTheme } from '@/constants/cook-theme';

export const BottomNavigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === '/' || pathname === '/index' || pathname === '';
  const isGenerate = pathname === '/generate';
  const isSaved = pathname === '/saved';

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => router.replace('/')}
          activeOpacity={0.7}
          accessibilityLabel="Home tab">
          <Ionicons
            name={isHome ? 'home' : 'home-outline'}
            size={22}
            color={isHome ? CookTheme.colors.primary : CookTheme.colors.textMuted}
          />
          <Text
            style={[
              styles.label,
              isHome && styles.labelActive,
            ]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => router.replace('/generate')}
          activeOpacity={0.7}
          accessibilityLabel="Generate tab">
          <View style={styles.generateIconWrapper}>
            <Ionicons
              name={isGenerate ? 'sparkles' : 'sparkles-outline'}
              size={21}
              color={isGenerate ? CookTheme.colors.primary : CookTheme.colors.textMuted}
            />
          </View>
          <Text
            style={[
              styles.label,
              isGenerate && styles.labelActive,
            ]}>
            Generate
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => router.replace('/saved')}
          activeOpacity={0.7}
          accessibilityLabel="Saved recipes tab">
          <Ionicons
            name={isSaved ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color={isSaved ? CookTheme.colors.primary : CookTheme.colors.textMuted}
          />
          <Text
            style={[
              styles.label,
              isSaved && styles.labelActive,
            ]}>
            Saved
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: CookTheme.colors.background,
    borderTopWidth: 1,
    borderTopColor: CookTheme.colors.surfaceBorder,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    paddingTop: 8,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    minWidth: 70,
  },
  generateIconWrapper: {
    position: 'relative',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: CookTheme.colors.textMuted,
    marginTop: 4,
  },
  labelActive: {
    color: CookTheme.colors.primary,
    fontWeight: '700',
  },
});
