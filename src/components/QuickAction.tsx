import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../theme/colors';

interface QuickActionProps {
  label: string;
  onPress: () => void;
  iconType: 'analytics' | 'cards' | 'send' | 'receive' | 'settings';
}

export const QuickAction: React.FC<QuickActionProps> = ({ label, onPress, iconType }) => {
  const renderIcon = () => {
    switch (iconType) {
      case 'analytics':
        return (
          <View style={styles.analyticsIcon}>
            <View style={[styles.bar, { height: 10, backgroundColor: COLORS.secondary }]} />
            <View style={[styles.bar, { height: 18, backgroundColor: COLORS.primary }]} />
            <View style={[styles.bar, { height: 13, backgroundColor: COLORS.accent }]} />
          </View>
        );
      case 'cards':
        return (
          <View style={styles.cardIcon}>
            <View style={styles.cardBase} />
            <View style={styles.cardStripe} />
            <View style={styles.cardChip} />
          </View>
        );
      case 'send':
        return (
          <View style={styles.sendIcon}>
            <View style={styles.arrowShaft} />
            <View style={styles.arrowHead} />
          </View>
        );
      case 'receive':
        return (
          <View style={styles.receiveIcon}>
            <View style={styles.arrowShaftDown} />
            <View style={styles.arrowHeadDown} />
          </View>
        );
      case 'settings':
        return (
          <View style={styles.gearIcon}>
            <View style={styles.gearOuter}>
              <View style={styles.gearProng1} />
              <View style={styles.gearProng2} />
              <View style={styles.gearProng3} />
              <View style={styles.gearProng4} />
              <View style={styles.gearInner} />
            </View>
          </View>
        );
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.75}>
      <View style={styles.iconWrapper}>
        {renderIcon()}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.2,
  },

  // Custom Icon Styles
  analyticsIcon: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: 18,
    height: 18,
  },
  bar: {
    width: 4,
    borderRadius: 2,
  },

  cardIcon: {
    width: 22,
    height: 16,
    borderWidth: 1.5,
    borderColor: COLORS.primaryLight,
    borderRadius: 4,
    justifyContent: 'space-between',
    position: 'relative',
  },
  cardBase: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 5,
    height: 4,
    backgroundColor: COLORS.secondary,
    borderRadius: 1,
  },
  cardStripe: {
    height: 3,
    backgroundColor: COLORS.primaryLight,
    width: '100%',
    marginTop: 8,
  },
  cardChip: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.accent,
  },

  sendIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowShaft: {
    width: 2,
    height: 14,
    backgroundColor: COLORS.primaryLight,
    transform: [{ rotate: '45deg' }, { translateY: -1 }],
  },
  arrowHead: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderBottomWidth: 7,
    borderBottomColor: COLORS.primaryLight,
    transform: [{ rotate: '45deg' }],
  },

  receiveIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowShaftDown: {
    width: 2,
    height: 14,
    backgroundColor: COLORS.success,
    transform: [{ rotate: '45deg' }, { translateY: 1 }],
  },
  arrowHeadDown: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderTopWidth: 7,
    borderTopColor: COLORS.success,
    transform: [{ rotate: '45deg' }],
  },

  gearIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gearOuter: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2.5,
    borderColor: COLORS.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  gearInner: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  gearProng1: {
    position: 'absolute',
    width: 3,
    height: 16,
    backgroundColor: COLORS.textSecondary,
    borderRadius: 1,
  },
  gearProng2: {
    position: 'absolute',
    width: 16,
    height: 3,
    backgroundColor: COLORS.textSecondary,
    borderRadius: 1,
  },
  gearProng3: {
    position: 'absolute',
    width: 3,
    height: 16,
    backgroundColor: COLORS.textSecondary,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
  },
  gearProng4: {
    position: 'absolute',
    width: 16,
    height: 3,
    backgroundColor: COLORS.textSecondary,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
  },
});
