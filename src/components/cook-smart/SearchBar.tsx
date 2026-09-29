import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CookTheme } from '@/constants/cook-theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search delicious recipes, ingredients...',
  onClear,
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} color={CookTheme.colors.textMuted} style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={CookTheme.colors.textMuted}
        style={styles.input}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            onChangeText('');
            onClear?.();
          }}
          activeOpacity={0.7}
          style={styles.clearBtn}
          accessibilityLabel="Clear search">
          <Ionicons name="close-circle" size={18} color={CookTheme.colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CookTheme.colors.surfaceElevated,
    borderRadius: CookTheme.radius.lg,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: CookTheme.colors.surfaceBorder,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: CookTheme.colors.text,
    fontSize: 15,
    paddingVertical: 0,
  },
  clearBtn: {
    padding: 4,
  },
});
