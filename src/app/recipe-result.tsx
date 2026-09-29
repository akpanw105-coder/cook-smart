import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes } from '@/context/RecipeContext';
import { CookTheme } from '@/constants/cook-theme';
import { IngredientList } from '@/components/cook-smart/IngredientList';
import { InstructionStep } from '@/components/cook-smart/InstructionStep';
import { SaveButton } from '@/components/cook-smart/SaveButton';

export default function RecipeResultScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getRecipeById, isSaved, toggleSaveRecipe } = useRecipes();

  const recipe = id ? getRecipeById(id) : undefined;
  const saved = recipe ? isSaved(recipe.id) : false;

  if (!recipe) {
    return (
      <SafeAreaView style={styles.errorArea} edges={['top', 'left', 'right']}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={54} color={CookTheme.colors.danger} />
          <Text style={styles.errorTitle}>Recipe Not Found</Text>
          <Text style={styles.errorSubtitle}>
            We couldn't locate this recipe in your culinary catalog.
          </Text>
          <TouchableOpacity
            style={styles.backHomeBtn}
            onPress={() => router.back()}
            activeOpacity={0.8}>
            <Text style={styles.backHomeBtnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const difficultyColor =
    CookTheme.colors.tagDifficulty[recipe.difficulty] || CookTheme.colors.tagDifficulty.Easy;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Large Hero Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe.imageUrl }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.imageGradientOverlay} />

          {/* Floating Back Button */}
          <SafeAreaView edges={['top']} style={styles.floatingNavSafeArea}>
            <View style={styles.floatingNavRow}>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => router.back()}
                activeOpacity={0.7}
                accessibilityLabel="Go back">
                <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => toggleSaveRecipe(recipe.id)}
                activeOpacity={0.7}
                accessibilityLabel="Save recipe">
                <Ionicons
                  name={saved ? 'bookmark' : 'bookmark-outline'}
                  size={20}
                  color={saved ? CookTheme.colors.primary : '#FFFFFF'}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>

        {/* Content Body */}
        <View style={styles.body}>
          {/* Category Tag */}
          <View style={styles.badgeRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{recipe.category}</Text>
            </View>
            {recipe.calories && (
              <View style={styles.calorieBadge}>
                <Ionicons name="flame-outline" size={13} color={CookTheme.colors.primary} />
                <Text style={styles.calorieText}>{recipe.calories} kcal</Text>
              </View>
            )}
          </View>

          {/* Title */}
          <Text style={styles.title}>{recipe.name}</Text>

          {/* Description */}
          <Text style={styles.description}>{recipe.description}</Text>

          {/* Meta Stat Cards */}
          <View style={styles.statsCard}>
            <View style={styles.statCol}>
              <Ionicons name="time-outline" size={20} color={CookTheme.colors.primary} />
              <Text style={styles.statLabel}>Cook Time</Text>
              <Text style={styles.statVal}>{recipe.cookingTime}</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statCol}>
              <Ionicons name="speedometer-outline" size={20} color={difficultyColor} />
              <Text style={styles.statLabel}>Difficulty</Text>
              <Text style={[styles.statVal, { color: difficultyColor }]}>
                {recipe.difficulty}
              </Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statCol}>
              <Ionicons name="restaurant-outline" size={20} color={CookTheme.colors.primary} />
              <Text style={styles.statLabel}>Servings</Text>
              <Text style={styles.statVal}>{recipe.servings} people</Text>
            </View>
          </View>

          {/* Ingredients Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeading}>Ingredients</Text>
              <Text style={styles.sectionCounter}>{recipe.ingredients.length} items</Text>
            </View>
            <IngredientList ingredients={recipe.ingredients} />
          </View>

          {/* Instructions Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeading}>Step-by-Step Instructions</Text>
              <Text style={styles.sectionCounter}>{recipe.instructions.length} steps</Text>
            </View>
            <View style={styles.instructionsContainer}>
              {recipe.instructions.map((step, idx) => (
                <InstructionStep
                  key={`step-${idx}`}
                  stepNumber={idx + 1}
                  instruction={step}
                  isLast={idx === recipe.instructions.length - 1}
                />
              ))}
            </View>
          </View>

          {/* Save Recipe CTA Button */}
          <View style={styles.ctaSection}>
            <SaveButton
              isSaved={saved}
              onPress={() => toggleSaveRecipe(recipe.id)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CookTheme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 330,
    backgroundColor: CookTheme.colors.surfaceElevated,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageGradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(13, 14, 18, 0.3)',
  },
  floatingNavSafeArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  floatingNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  circleBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(13, 14, 18, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  body: {
    paddingHorizontal: 20,
    marginTop: -24,
    borderTopLeftRadius: CookTheme.radius.xl,
    borderTopRightRadius: CookTheme.radius.xl,
    backgroundColor: CookTheme.colors.background,
    paddingTop: 24,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  categoryBadge: {
    backgroundColor: CookTheme.colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: CookTheme.radius.full,
    borderWidth: 1,
    borderColor: CookTheme.colors.primaryBorder,
  },
  categoryBadgeText: {
    color: CookTheme.colors.primary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  calorieBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CookTheme.colors.surfaceElevated,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: CookTheme.radius.full,
    gap: 4,
    borderWidth: 1,
    borderColor: CookTheme.colors.surfaceBorder,
  },
  calorieText: {
    color: CookTheme.colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: CookTheme.colors.text,
    letterSpacing: -0.5,
    lineHeight: 32,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: CookTheme.colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: CookTheme.colors.surface,
    borderRadius: CookTheme.radius.lg,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: CookTheme.colors.surfaceBorder,
    marginBottom: 26,
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statDivider: {
    width: 1,
    height: '70%',
    backgroundColor: CookTheme.colors.surfaceBorder,
    alignSelf: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: CookTheme.colors.textMuted,
    marginTop: 6,
    marginBottom: 2,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  statVal: {
    fontSize: 14,
    fontWeight: '700',
    color: CookTheme.colors.text,
  },
  section: {
    marginBottom: 26,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: CookTheme.colors.text,
    letterSpacing: -0.3,
  },
  sectionCounter: {
    fontSize: 13,
    color: CookTheme.colors.primary,
    fontWeight: '600',
  },
  instructionsContainer: {
    backgroundColor: CookTheme.colors.surface,
    borderRadius: CookTheme.radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: CookTheme.colors.surfaceBorder,
  },
  ctaSection: {
    marginTop: 8,
    marginBottom: 20,
  },
  errorArea: {
    flex: 1,
    backgroundColor: CookTheme.colors.background,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: CookTheme.colors.text,
    marginTop: 14,
    marginBottom: 6,
  },
  errorSubtitle: {
    fontSize: 14,
    color: CookTheme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  backHomeBtn: {
    backgroundColor: CookTheme.colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: CookTheme.radius.md,
  },
  backHomeBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
