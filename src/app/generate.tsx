import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes } from '@/context/RecipeContext';
import { CookTheme } from '@/constants/cook-theme';
import { POPULAR_INGREDIENT_CHIPS } from '@/data/recipes';
import { BottomNavigation } from '@/components/cook-smart/BottomNavigation';

export default function GenerateRecipeScreen() {
  const router = useRouter();
  const { generateRecipeFromIngredients } = useRecipes();
  const [ingredientText, setIngredientText] = useState('');
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleChip = (chip: string) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);

    const customList = ingredientText
      .split(/[\n,]+/)
      .map((i) => i.trim())
      .filter((i) => i.length > 0);

    const merged = Array.from(new Set([...selectedChips, ...customList]));

    try {
      const generated = await generateRecipeFromIngredients(merged);
      setIsGenerating(false);

      router.push({
        pathname: '/recipe-result',
        params: { id: generated.id },
      });
    } catch (error) {
      setIsGenerating(false);
      Alert.alert(
        'Generation Error',
        'Could not generate recipe at this moment. Please check your connection and try again.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={CookTheme.colors.background} />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Ionicons name="sparkles" size={24} color={CookTheme.colors.primary} />
            </View>
            <Text style={styles.title}>What ingredients do you have?</Text>
            <Text style={styles.subtitle}>
              Type your ingredients or select staples below. Gemini AI will compose an authentic culinary recipe tailored to your pantry.
            </Text>
          </View>

          {/* Multiline Ingredient Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputHeader}>
              <Text style={styles.inputLabel}>Enter Ingredients</Text>
              <Text style={styles.inputHelper}>Separate with commas or enters</Text>
            </View>
            <TextInput
              style={styles.multilineInput}
              value={ingredientText}
              onChangeText={setIngredientText}
              placeholder="e.g. Chicken breast, 2 eggs, garlic, baby spinach..."
              placeholderTextColor={CookTheme.colors.textMuted}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Ingredient Chips */}
          <View style={styles.chipsSection}>
            <Text style={styles.chipsSectionTitle}>Quick Add Staples</Text>
            <View style={styles.chipsGrid}>
              {POPULAR_INGREDIENT_CHIPS.map((chip) => {
                const isSelected = selectedChips.includes(chip);
                return (
                  <TouchableOpacity
                    key={chip}
                    style={[styles.chip, isSelected && styles.chipActive]}
                    onPress={() => toggleChip(chip)}
                    activeOpacity={0.7}>
                    <Ionicons
                      name={isSelected ? 'checkmark' : 'add'}
                      size={15}
                      color={isSelected ? '#FFFFFF' : CookTheme.colors.primary}
                      style={styles.chipIcon}
                    />
                    <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                      {chip}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Summary / Tag Preview */}
          {selectedChips.length > 0 && (
            <View style={styles.selectionPreview}>
              <Text style={styles.previewLabel}>
                Selected from staples ({selectedChips.length}):
              </Text>
              <Text style={styles.previewList}>{selectedChips.join(' • ')}</Text>
            </View>
          )}

          {/* Generate Button */}
          <View style={styles.btnSection}>
            <TouchableOpacity
              style={[
                styles.generateBtn,
                isGenerating && styles.generateBtnDisabled,
              ]}
              onPress={handleGenerate}
              disabled={isGenerating}
              activeOpacity={0.85}>
              {isGenerating ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator color="#FFFFFF" size="small" />
                  <Text style={styles.btnText}>Gemini is Crafting Recipe...</Text>
                </View>
              ) : (
                <View style={styles.loadingRow}>
                  <Ionicons name="sparkles" size={20} color="#FFFFFF" />
                  <Text style={styles.btnText}>Generate Recipe with Gemini</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: CookTheme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: CookTheme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: CookTheme.colors.primaryBorder,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: CookTheme.colors.text,
    letterSpacing: -0.5,
    lineHeight: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: CookTheme.colors.textSecondary,
    lineHeight: 20,
  },
  inputContainer: {
    backgroundColor: CookTheme.colors.surface,
    borderRadius: CookTheme.radius.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: CookTheme.colors.surfaceBorder,
    marginBottom: 24,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: CookTheme.colors.text,
  },
  inputHelper: {
    fontSize: 12,
    color: CookTheme.colors.textMuted,
  },
  multilineInput: {
    minHeight: 110,
    backgroundColor: CookTheme.colors.surfaceElevated,
    borderRadius: CookTheme.radius.md,
    padding: 14,
    color: CookTheme.colors.text,
    fontSize: 15,
    lineHeight: 22,
    borderWidth: 1,
    borderColor: CookTheme.colors.surfaceBorder,
  },
  chipsSection: {
    marginBottom: 20,
  },
  chipsSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: CookTheme.colors.text,
    marginBottom: 12,
  },
  chipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: CookTheme.radius.full,
    backgroundColor: CookTheme.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: CookTheme.colors.surfaceBorder,
  },
  chipActive: {
    backgroundColor: CookTheme.colors.primary,
    borderColor: CookTheme.colors.primary,
  },
  chipIcon: {
    marginRight: 6,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: CookTheme.colors.textSecondary,
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  selectionPreview: {
    backgroundColor: CookTheme.colors.surfaceElevated,
    padding: 14,
    borderRadius: CookTheme.radius.md,
    marginBottom: 24,
    borderLeftWidth: 3,
    borderLeftColor: CookTheme.colors.primary,
  },
  previewLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: CookTheme.colors.textMuted,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  previewList: {
    fontSize: 14,
    color: CookTheme.colors.text,
    fontWeight: '500',
  },
  btnSection: {
    marginTop: 8,
  },
  generateBtn: {
    backgroundColor: CookTheme.colors.primary,
    height: 56,
    borderRadius: CookTheme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: CookTheme.colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  generateBtnDisabled: {
    opacity: 0.7,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
