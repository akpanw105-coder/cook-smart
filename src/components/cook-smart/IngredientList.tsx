import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Ingredient } from '@/types/recipe';
import { CookTheme } from '@/constants/cook-theme';

interface IngredientListProps {
  ingredients: Ingredient[];
}

export const IngredientList: React.FC<IngredientListProps> = ({ ingredients }) => {
  return (
    <View style={styles.container}>
      {ingredients.map((item, index) => (
        <View
          key={`${item.name}-${index}`}
          style={[
            styles.row,
            index !== ingredients.length - 1 && styles.borderBottom,
          ]}>
          <View style={styles.left}>
            <View style={styles.bullet}>
              <Ionicons name="checkmark" size={12} color={CookTheme.colors.primary} />
            </View>
            <Text style={styles.name}>{item.name}</Text>
          </View>
          <Text style={styles.amount}>{item.amount}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CookTheme.colors.surface,
    borderRadius: CookTheme.radius.lg,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: CookTheme.colors.surfaceBorder,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: CookTheme.colors.surfaceBorder,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  bullet: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: CookTheme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  name: {
    fontSize: 14,
    color: CookTheme.colors.text,
    fontWeight: '500',
    flex: 1,
  },
  amount: {
    fontSize: 13,
    color: CookTheme.colors.primary,
    fontWeight: '600',
  },
});
