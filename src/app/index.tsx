import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes } from '@/context/RecipeContext';
import { CookTheme } from '@/constants/cook-theme';
import { Category } from '@/types/recipe';
import { SearchBar } from '@/components/cook-smart/SearchBar';
import { CategoryChip } from '@/components/cook-smart/CategoryChip';
import { RecipeCard } from '@/components/cook-smart/RecipeCard';
import { BottomNavigation } from '@/components/cook-smart/BottomNavigation';

const CATEGORIES: Category[] = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Quick Meals',
  'Desserts',
  'Healthy',
];

export default function HomeScreen() {
  const router = useRouter();
  const { recipes, isSaved, toggleSaveRecipe, searchQuery, setSearchQuery } = useRecipes();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

  const featuredRecipes = useMemo(() => {
    return recipes.filter((r) => r.isFeatured);
  }, [recipes]);

  const filteredFeed = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some((i) =>
          i.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCat =
        selectedCategory === 'All' || recipe.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [recipes, searchQuery, selectedCategory]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={CookTheme.colors.background} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* Header / Logo */}
        <View style={styles.header}>
          <View>
            <View style={styles.logoRow}>
              <View style={styles.logoIcon}>
                <Ionicons name="flame" size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.brandTitle}>Cook<Text style={styles.brandAccent}>Smart</Text></Text>
            </View>
            <Text style={styles.tagline}>Intelligent culinary inspiration</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search chicken, pasta, avocado..."
          />
        </View>

        {/* Categories Bar */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}>
          <CategoryChip
            label="All"
            isSelected={selectedCategory === 'All'}
            onPress={() => setSelectedCategory('All')}
          />
          {CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat}
              label={cat}
              isSelected={selectedCategory === cat}
              onPress={() =>
                setSelectedCategory((prev) => (prev === cat ? 'All' : cat))
              }
            />
          ))}
        </ScrollView>

        {/* Featured Recipes (Show only if no category filter & no search) */}
        {selectedCategory === 'All' && searchQuery.trim() === '' && (
          <View style={styles.featuredSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Recipes</Text>
              <Text style={styles.sectionSub}>Hand-picked daily</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}>
              {featuredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  variant="featured"
                  isSaved={isSaved(recipe.id)}
                  onPress={() =>
                    router.push({
                      pathname: '/recipe-result',
                      params: { id: recipe.id },
                    })
                  }
                  onToggleSave={() => toggleSaveRecipe(recipe.id)}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Recipe Feed */}
        <View style={styles.feedSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'All'
                ? searchQuery.trim()
                  ? `Search Results (${filteredFeed.length})`
                  : 'Popular Recipes'
                : `${selectedCategory} (${filteredFeed.length})`}
            </Text>
          </View>

          {filteredFeed.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="search" size={44} color={CookTheme.colors.textMuted} />
              <Text style={styles.emptyTitle}>No recipes found</Text>
              <Text style={styles.emptySubtitle}>
                Try adjusting your search keywords or browse other categories.
              </Text>
            </View>
          ) : (
            filteredFeed.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isSaved={isSaved(recipe.id)}
                onPress={() =>
                  router.push({
                    pathname: '/recipe-result',
                    params: { id: recipe.id },
                  })
                }
                onToggleSave={() => toggleSaveRecipe(recipe.id)}
              />
            ))
          )}
        </View>
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
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: CookTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: CookTheme.colors.text,
    letterSpacing: -0.5,
  },
  brandAccent: {
    color: CookTheme.colors.primary,
  },
  tagline: {
    fontSize: 12,
    color: CookTheme.colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: CookTheme.colors.text,
    letterSpacing: -0.3,
  },
  sectionSub: {
    fontSize: 13,
    color: CookTheme.colors.textMuted,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  featuredSection: {
    marginBottom: 24,
  },
  featuredList: {
    paddingLeft: 20,
    paddingRight: 4,
  },
  feedSection: {
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: CookTheme.colors.text,
    marginTop: 14,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: CookTheme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
