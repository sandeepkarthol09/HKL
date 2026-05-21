import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { GlassCard } from '../components/GlassCard';

export const SettingsScreen = ({ navigation }: any) => {
  const [isLocked, setIsLocked] = useState(false);
  const [onlinePayments, setOnlinePayments] = useState(true);
  const [intlPayments, setIntlPayments] = useState(false);
  const [spendLimit, setSpendLimit] = useState(5000); // Out of 10000

  const handleSave = () => {
    Alert.alert('Settings Saved', 'Card configurations updated successfully.');
  };

  const adjustLimit = (amount: number) => {
    setSpendLimit((prev) => Math.min(Math.max(prev + amount, 500), 10000));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <View style={styles.backArrow}>
            <View style={styles.backArrowLine1} />
            <View style={styles.backArrowLine2} />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Card Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Virtual Card Illustration */}
        <View style={styles.cardContainer}>
          <View style={[styles.virtualCard, isLocked && styles.cardLockedOverlay]}>
            <View style={styles.cardGlow1} />
            <View style={styles.cardGlow2} />
            
            <View style={styles.cardTop}>
              <Text style={styles.cardBrand}>HKL PLATINUM</Text>
              <View style={styles.cardTypeDotContainer}>
                <View style={[styles.cardTypeDot, { backgroundColor: COLORS.accent }]} />
                <View style={[styles.cardTypeDot, { backgroundColor: COLORS.warning, marginLeft: -10, opacity: 0.85 }]} />
              </View>
            </View>

            <View style={styles.cardChipContainer}>
              <View style={styles.cardChip}>
                <View style={styles.chipLineH} />
                <View style={styles.chipLineV} />
              </View>
              <Text style={styles.contactlessSymbol}>📡</Text>
            </View>

            <Text style={styles.cardNumber}>••••   ••••   ••••   8824</Text>

            <View style={styles.cardBottom}>
              <View>
                <Text style={styles.cardLabel}>CARDHOLDER</Text>
                <Text style={styles.cardValue}>ALEX CARTER</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.cardLabel}>EXPIRES</Text>
                <Text style={styles.cardValue}>12 / 29</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Security Controls */}
        <Text style={styles.sectionTitle}>Security Settings</Text>
        <GlassCard style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Lock Card Temporary</Text>
              <Text style={styles.settingDesc}>Freeze all transactions instantly</Text>
            </View>
            <Switch
              value={isLocked}
              onValueChange={setIsLocked}
              trackColor={{ false: 'rgba(255, 255, 255, 0.05)', true: COLORS.primary }}
              thumbColor={COLORS.textPrimary}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Online Payments</Text>
              <Text style={styles.settingDesc}>Allow web shop expenditures</Text>
            </View>
            <Switch
              value={onlinePayments}
              onValueChange={setOnlinePayments}
              disabled={isLocked}
              trackColor={{ false: 'rgba(255, 255, 255, 0.05)', true: COLORS.primary }}
              thumbColor={COLORS.textPrimary}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>International Usage</Text>
              <Text style={styles.settingDesc}>Transact outside primary country</Text>
            </View>
            <Switch
              value={intlPayments}
              onValueChange={setIntlPayments}
              disabled={isLocked}
              trackColor={{ false: 'rgba(255, 255, 255, 0.05)', true: COLORS.primary }}
              thumbColor={COLORS.textPrimary}
            />
          </View>
        </GlassCard>

        {/* Spending Limits */}
        <Text style={styles.sectionTitle}>Monthly Limit</Text>
        <GlassCard style={styles.limitCard}>
          <View style={styles.limitHeader}>
            <Text style={styles.limitValue}>${spendLimit.toLocaleString()}</Text>
            <Text style={styles.limitMax}>/ $10,000 max</Text>
          </View>

          {/* Styled ProgressBar Limit */}
          <View style={styles.sliderTrack}>
            <View style={[styles.sliderFill, { width: `${(spendLimit / 10000) * 100}%` }]} />
            <View style={[styles.sliderThumb, { left: `${(spendLimit / 10000) * 100 - 3}%` }]} />
          </View>

          <View style={styles.adjustmentButtons}>
            <TouchableOpacity style={styles.adjustBtn} onPress={() => adjustLimit(-500)}>
              <Text style={styles.adjustBtnText}>-$500</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.adjustBtn} onPress={() => adjustLimit(500)}>
              <Text style={styles.adjustBtnText}>+$500</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>

        {/* Action Button */}
        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Apply Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    width: 14,
    height: 10,
    justifyContent: 'center',
    position: 'relative',
  },
  backArrowLine1: {
    position: 'absolute',
    left: 0,
    width: 14,
    height: 2,
    backgroundColor: COLORS.textPrimary,
  },
  backArrowLine2: {
    position: 'absolute',
    left: 0,
    width: 7,
    height: 7,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: COLORS.textPrimary,
    transform: [{ rotate: '45deg' }],
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  virtualCard: {
    width: '100%',
    height: 200,
    borderRadius: 24,
    backgroundColor: '#1E1E2F',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    padding: 24,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  cardLockedOverlay: {
    opacity: 0.5,
    backgroundColor: '#0F0F1A',
  },
  cardGlow1: {
    position: 'absolute',
    top: -50,
    left: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLORS.primary,
    opacity: 0.35,
    blurRadius: 50,
  },
  cardGlow2: {
    position: 'absolute',
    bottom: -60,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: COLORS.accent,
    opacity: 0.25,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  cardBrand: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  cardTypeDotContainer: {
    flexDirection: 'row',
  },
  cardTypeDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  cardChipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
    marginTop: 8,
  },
  cardChip: {
    width: 32,
    height: 24,
    backgroundColor: COLORS.warning,
    borderRadius: 4,
    marginRight: 10,
    position: 'relative',
  },
  chipLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 11,
    height: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  chipLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 15,
    width: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  contactlessSymbol: {
    fontSize: 16,
    opacity: 0.7,
  },
  cardNumber: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 2,
    marginVertical: 14,
    zIndex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 1,
  },
  cardLabel: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 8,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 2,
  },
  cardValue: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  settingsCard: {
    paddingVertical: 8,
    marginBottom: 32,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.03)',
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  settingLabel: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  settingDesc: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  limitCard: {
    paddingVertical: 24,
    marginBottom: 36,
  },
  limitHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  limitValue: {
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: '800',
  },
  limitMax: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '600',
  },
  sliderTrack: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 3,
    position: 'relative',
    marginBottom: 24,
  },
  sliderFill: {
    height: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: 3,
  },
  sliderThumb: {
    position: 'absolute',
    top: -7,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.textPrimary,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  adjustmentButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  adjustBtn: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  adjustBtnText: {
    color: COLORS.textPrimary,
    fontWeight: '600',
    fontSize: 14,
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  saveBtnText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
