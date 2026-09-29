import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Recipe } from '@/types/recipe';
import { CookTheme } from '@/constants/cook-theme';

interface RecipeCardProps {
  recipe: Recipe;
  isSaved: boolean;
  onPress: () => void;
  onToggleSave: () => void;
  variant?: 'featured' | 'standard' | 'compact';
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  isSaved,
  onPress,
  onToggleSave,
  variant = 'standard',
}) => {
  const isFeatured = variant === 'featured';

  const difficultyColor =
    CookTheme.colors.tagDifficulty[recipe.difficulty] || CookTheme.colors.tagDifficulty.Easy;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isFeatured ? styles.featuredCard : styles.standardCard,
      ]}
      onPress={onPress}
      activeOpacity={0.88}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: recipe.imageUrl }}
          style={isFeatured ? styles.featuredImage : styles.standardImage}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay} />
        
        {/* Category Pill */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{recipe.category}</Text>
        </View>

        {/* Save Button floating on image */}
        <TouchableOpacity
          style={styles.saveFloatingBtn}
          onPress={(e) => {
            e.stopPropagation();
            onToggleSave();
          }}
          activeOpacity={0.7}
          accessibilityLabel={isSaved ? 'Remove from saved' : 'Save recipe'}>
          <Ionicons
            name={isSaved ? 'bookmark' : 'bookmark-outline'}
            size={20}
            color={isSaved ? CookTheme.colors.primary : '#FFFFFF'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.name}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={15} color={CookTheme.colors.primary} />
            <Text style={styles.metaText}>{recipe.cookingTime}</Text>
          </View>

          <View style={styles.metaDot} />

          <View style={styles.metaItem}>
            <View style={[styles.diffIndicator, { backgroundColor: difficultyColor }]} />
            <Text style={[styles.metaText, { color: difficultyColor, fontWeight: '600' }]}>
              {recipe.difficulty}
            </Text>
          </View>

          <View style={styles.metaDot} />

          <View style={styles.metaItem}>
            <Ionicons name="people-outline" size={15} color={CookTheme.colors.textMuted} />
            <Text style={styles.metaText}>{recipe.servings} serv</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: CookTheme.colors.surface,
    borderRadius: CookTheme.radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: CookTheme.colors.surfaceBorder,
  },
  standardCard: {
    marginBottom: 16,
  },
  featuredCard: {
    width: 290,
    marginRight: 16,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    backgroundColor: CookTheme.colors.surfaceElevated,
  },
  standardImage: {
    width: '100%',
    height: 180,
  },
  featuredImage: {
    width: '100%',
    height: 190,
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  categoryBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: 'rgba(15, 16, 18, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: CookTheme.radius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  categoryBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  saveFloatingBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: 'rgba(15, 16, 18, 0.8)',
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: CookTheme.colors.text,
    lineHeight: 22,
    marginBottom: 10,
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
    fontSize: 13,
    color: CookTheme.colors.textSecondary,
    fontWeight: '500',
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: CookTheme.colors.textMuted,
    marginHorizontal: 8,
  },
  diffIndicator: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
});
