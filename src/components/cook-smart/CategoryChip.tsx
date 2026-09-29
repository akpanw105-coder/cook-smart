import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CookTheme } from '@/constants/cook-theme';

interface CategoryChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  icon?: string;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  label,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        isSelected && styles.chipSelected,
      ]}
      onPress={onPress}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}>
      <Text
        style={[
          styles.label,
          isSelected && styles.labelSelected,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: CookTheme.radius.full,
    backgroundColor: CookTheme.colors.surfaceElevated,
    marginRight: 10,
    borderWidth: 1,
    borderColor: CookTheme.colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipSelected: {
    backgroundColor: CookTheme.colors.primary,
    borderColor: CookTheme.colors.primary,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: CookTheme.colors.textSecondary,
  },
  labelSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
