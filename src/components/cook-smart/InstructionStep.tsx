import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CookTheme } from '@/constants/cook-theme';

interface InstructionStepProps {
  stepNumber: number;
  instruction: string;
  isLast?: boolean;
}

export const InstructionStep: React.FC<InstructionStepProps> = ({
  stepNumber,
  instruction,
  isLast = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <View style={styles.stepBadge}>
          <Text style={styles.stepBadgeText}>{stepNumber}</Text>
        </View>
        {!isLast && <View style={styles.connectingLine} />}
      </View>
      <View style={styles.content}>
        <Text style={styles.instructionText}>{instruction}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  leftColumn: {
    alignItems: 'center',
    width: 32,
    marginRight: 14,
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: CookTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  connectingLine: {
    width: 2,
    flex: 1,
    backgroundColor: CookTheme.colors.surfaceBorder,
    marginTop: 6,
    marginBottom: 4,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 4,
  },
  instructionText: {
    fontSize: 15,
    color: CookTheme.colors.text,
    lineHeight: 22,
  },
});
