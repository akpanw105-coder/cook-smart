import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CookTheme } from '@/constants/cook-theme';

interface SaveButtonProps {
  isSaved: boolean;
  onPress: () => void;
  loading?: boolean;
}

export const SaveButton: React.FC<SaveButtonProps> = ({
  isSaved,
  onPress,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSaved ? styles.buttonSaved : styles.buttonPrimary,
      ]}
      onPress={onPress}
      activeOpacity={0.82}
      disabled={loading}
      accessibilityRole="button"
      accessibilityLabel={isSaved ? 'Saved to cookbook' : 'Save recipe'}>
      {loading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <>
          <Ionicons
            name={isSaved ? 'bookmark' : 'bookmark-outline'}
            size={20}
            color="#FFFFFF"
            style={styles.icon}
          />
          <Text style={styles.text}>
            {isSaved ? 'Recipe Saved in Cookbook' : 'Save Recipe'}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    borderRadius: CookTheme.radius.lg,
    paddingHorizontal: 24,
    shadowColor: CookTheme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonPrimary: {
    backgroundColor: CookTheme.colors.primary,
  },
  buttonSaved: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: CookTheme.colors.primary,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
