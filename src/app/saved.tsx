import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes } from '@/context/RecipeContext';
import { CookTheme } from '@/constants/cook-theme';
import { SavedRecipeCard } from '@/components/cook-smart/SavedRecipeCard';
import { BottomNavigation } from '@/components/cook-smart/BottomNavigation';

export default function SavedRecipesScreen() {
  const router = useRouter();
  const { savedRecipes, unsaveRecipe } = useRecipes();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={CookTheme.colors.background} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Saved Recipes</Text>
            <Text style={styles.subtitle}>
              {savedRecipes.length === 1
                ? '1 favorite recipe saved'
                : `${savedRecipes.length} favorite recipes saved`}
            </Text>
          </View>
        </View>

        {/* Content list or empty state */}
        {savedRecipes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="bookmark-outline" size={36} color={CookTheme.colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>No saved recipes yet</Text>
            <Text style={styles.emptySubtitle}>
              Explore our chef-curated meals or generate a custom dish from your pantry to save them here.
            </Text>

            {/* Create a Recipe CTA */}
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={() => router.replace('/generate')}
              activeOpacity={0.85}>
              <Ionicons name="sparkles" size={18} color="#FFFFFF" style={styles.btnIcon} />
              <Text style={styles.ctaButtonText}>Create a Recipe</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.listSection}>
            {savedRecipes.map((recipe) => (
              <SavedRecipeCard
                key={recipe.id}
                recipe={recipe}
                onPress={() =>
                  router.push({
                    pathname: '/recipe-result',
                    params: { id: recipe.id },
                  })
                }
                onRemove={() => unsaveRecipe(recipe.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: CookTheme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: CookTheme.colors.text,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: CookTheme.colors.textSecondary,
    fontWeight: '500',
  },
  listSection: {
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 16,
  },
  emptyIconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: CookTheme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: CookTheme.colors.primaryBorder,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: CookTheme.colors.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: CookTheme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 26,
    maxWidth: 290,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CookTheme.colors.primary,
    paddingHorizontal: 24,
    height: 52,
    borderRadius: CookTheme.radius.lg,
    shadowColor: CookTheme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  btnIcon: {
    marginRight: 8,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
