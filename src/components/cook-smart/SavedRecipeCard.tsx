import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Recipe } from '@/types/recipe';
import { CookTheme } from '@/constants/cook-theme';

interface SavedRecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
  onRemove: () => void;
}

export const SavedRecipeCard: React.FC<SavedRecipeCardProps> = ({
  recipe,
  onPress,
  onRemove,
}) => {
  const difficultyColor =
    CookTheme.colors.tagDifficulty[recipe.difficulty] || CookTheme.colors.tagDifficulty.Easy;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
      <Image source={{ uri: recipe.imageUrl }} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.category}>{recipe.category}</Text>
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            accessibilityLabel="Remove from saved recipes">
            <Ionicons name="trash-outline" size={17} color={CookTheme.colors.danger} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {recipe.name}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color={CookTheme.colors.primary} />
            <Text style={styles.metaText}>{recipe.cookingTime}</Text>
          </View>
          <View style={styles.metaDot} />
          <View style={styles.metaItem}>
            <View style={[styles.diffDot, { backgroundColor: difficultyColor }]} />
            <Text style={[styles.metaText, { color: difficultyColor }]}>{recipe.difficulty}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: CookTheme.colors.surface,
    borderRadius: CookTheme.radius.lg,
    overflow: 'hidden',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: CookTheme.colors.surfaceBorder,
    alignItems: 'center',
  },
  image: {
    width: 105,
    height: 105,
    backgroundColor: CookTheme.colors.surfaceElevated,
  },
  content: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  category: {
    fontSize: 11,
    fontWeight: '700',
    color: CookTheme.colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  removeBtn: {
    padding: 4,
    borderRadius: 8,
    backgroundColor: CookTheme.colors.dangerLight,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: CookTheme.colors.text,
    lineHeight: 20,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: CookTheme.colors.textSecondary,
    fontWeight: '500',
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: CookTheme.colors.textMuted,
    marginHorizontal: 6,
  },
  diffDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
