import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { GlassCard } from '../components/GlassCard';
import { QuickAction } from '../components/QuickAction';

export const HomeScreen = ({ navigation }: any) => {
  const transactions = [
    { id: '1', title: 'Salary Deposit', category: 'Income', amount: '+ $4,850.00', time: 'Today, 9:30 AM', positive: true },
    { id: '2', title: 'Apple Store', category: 'Shopping', amount: '- $999.00', time: 'Yesterday, 4:15 PM', positive: false },
    { id: '3', title: 'Netflix Subscription', category: 'Entertainment', amount: '- $15.49', time: 'May 18, 2026', positive: false },
    { id: '4', title: 'Figma Pro Plan', category: 'Work', amount: '- $45.00', time: 'May 15, 2026', positive: false },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSubtitle}>Welcome back,</Text>
            <Text style={styles.headerTitle}>Alex Carter</Text>
          </View>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>HKL Active</Text>
          </View>
        </View>

        {/* Main Portfolio Card */}
        <GlassCard style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardSubtitle}>TOTAL PORTFOLIO VALUE</Text>
            <View style={styles.trendContainer}>
              <Text style={styles.trendText}>+4.8%</Text>
            </View>
          </View>
          <Text style={styles.cardTitle}>$32,490.80</Text>
          <Text style={styles.cardWalletId}>BTC / USD / EUR Account</Text>

          {/* Simple Sparkline trend using Views */}
          <View style={styles.sparklineContainer}>
            {[8, 14, 11, 19, 15, 22, 28, 24, 32].map((height, index) => (
              <View
                key={index}
                style={[
                  styles.sparklineBar,
                  {
                    height: height,
                    backgroundColor: index === 8 ? COLORS.secondary : COLORS.primary,
                    opacity: 0.4 + (index / 8) * 0.6,
                  },
                ]}
              />
            ))}
          </View>
        </GlassCard>

        {/* Quick Actions Grid */}
        <View style={styles.actionsGrid}>
          <QuickAction
            label="Analytics"
            iconType="analytics"
            onPress={() => navigation.navigate('Details')}
          />
          <QuickAction
            label="Cards"
            iconType="cards"
            onPress={() => navigation.navigate('Settings')}
          />
          <QuickAction
            label="Send"
            iconType="send"
            onPress={() => Alert.alert('Send Funds', 'Fast payment gateway is ready.')}
          />
          <QuickAction
            label="Receive"
            iconType="receive"
            onPress={() => Alert.alert('Receive Funds', 'Your HKL deposit address copied.')}
          />
        </View>

        {/* Recent Activities Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Details')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Transaction List */}
        <View style={styles.listContainer}>
          {transactions.map((tx) => (
            <View key={tx.id} style={styles.transactionRow}>
              <View style={styles.txIconContainer}>
                <Text style={styles.txEmoji}>
                  {tx.category === 'Income' ? '📈' : tx.category === 'Shopping' ? '🛍️' : tx.category === 'Entertainment' ? '🎬' : '💻'}
                </Text>
              </View>
              <View style={styles.txInfo}>
                <Text style={styles.txTitle}>{tx.title}</Text>
                <Text style={styles.txTime}>{tx.time}</Text>
              </View>
              <View style={styles.txValue}>
                <Text style={[styles.txAmount, { color: tx.positive ? COLORS.success : COLORS.textPrimary }]}>
                  {tx.amount}
                </Text>
                <Text style={styles.txCategory}>{tx.category}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerSubtitle: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 0.3,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.success,
    marginRight: 6,
  },
  statusText: {
    color: COLORS.success,
    fontSize: 12,
    fontWeight: '600',
  },
  mainCard: {
    marginBottom: 28,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  trendContainer: {
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  trendText: {
    color: COLORS.secondaryLight,
    fontSize: 12,
    fontWeight: '700',
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  cardWalletId: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  sparklineContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 36,
    marginTop: 24,
    paddingHorizontal: 4,
  },
  sparklineBar: {
    width: 24,
    borderRadius: 4,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    paddingVertical: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  viewAllText: {
    color: COLORS.primaryLight,
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  txIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  txEmoji: {
    fontSize: 18,
  },
  txInfo: {
    flex: 1,
  },
  txTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  txTime: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  txValue: {
    alignItems: 'flex-end',
  },
  txAmount: {
    fontSize: 15,
    fontWeight: '700',
  },
  txCategory: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    letterSpacing: 0.5,
  },
});
