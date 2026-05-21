import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { GlassCard } from '../components/GlassCard';

export const DetailsScreen = ({ navigation }: any) => {
  const [selectedRange, setSelectedRange] = useState('1W');
  const [activeBar, setActiveBar] = useState(4); // default selected index

  const ranges = ['1D', '1W', '1M', '1Y'];
  
  const chartData = [
    { label: 'Mon', value: 120, height: 40 },
    { label: 'Tue', value: 210, height: 70 },
    { label: 'Wed', value: 150, height: 50 },
    { label: 'Thu', value: 340, height: 110 },
    { label: 'Fri', value: 290, height: 95 },
    { label: 'Sat', value: 180, height: 60 },
    { label: 'Sun', value: 230, height: 75 },
  ];

  const categories = [
    { name: 'Shopping & Retail', percentage: 42, color: COLORS.primary, amount: '$1,320.00' },
    { name: 'Dining & Cafes', percentage: 28, color: COLORS.secondary, amount: '$880.00' },
    { name: 'Entertainment', percentage: 18, color: COLORS.accent, amount: '$565.00' },
    { name: 'Utilities & Bills', percentage: 12, color: COLORS.warning, amount: '$377.00' },
  ];

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
        <Text style={styles.headerTitle}>Analytics</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
          <View style={styles.gearIcon}>
            <View style={styles.gearCircle} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Range Selector */}
        <View style={styles.rangeSelector}>
          {ranges.map((range) => {
            const isActive = selectedRange === range;
            return (
              <TouchableOpacity
                key={range}
                style={[styles.rangeTab, isActive && styles.activeRangeTab]}
                onPress={() => setSelectedRange(range)}
              >
                <Text style={[styles.rangeTabText, isActive && styles.activeRangeTabText]}>
                  {range}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Expenses Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryLabel}>Total Spendings</Text>
          <Text style={styles.summaryValue}>$3,142.00</Text>
          <Text style={styles.summaryTrend}>
            <Text style={{ color: COLORS.success }}>-12.4% </Text>
            vs last week
          </Text>
        </View>

        {/* Custom Bar Chart Card */}
        <GlassCard style={styles.chartCard}>
          <Text style={styles.chartTitle}>Daily Expenditure</Text>
          <Text style={styles.chartSubtitle}>Tap on any bar for details</Text>

          <View style={styles.chartWrapper}>
            <View style={styles.chartYAxis}>
              <Text style={styles.yAxisText}>$400</Text>
              <Text style={styles.yAxisText}>$200</Text>
              <Text style={styles.yAxisText}>$0</Text>
            </View>

            <View style={styles.barsContainer}>
              {chartData.map((data, index) => {
                const isSelected = activeBar === index;
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    style={styles.barColumn}
                    onPress={() => setActiveBar(index)}
                  >
                    {isSelected && (
                      <View style={styles.tooltip}>
                        <Text style={styles.tooltipText}>${data.value}</Text>
                      </View>
                    )}
                    <View style={styles.barTrack}>
                      <View
                        style={[
                          styles.barFill,
                          {
                            height: data.height,
                            backgroundColor: isSelected ? COLORS.secondary : COLORS.primary,
                            shadowColor: isSelected ? COLORS.secondary : COLORS.primary,
                          },
                          isSelected && styles.activeBarFill,
                        ]}
                      />
                    </View>
                    <Text style={[styles.barLabel, isSelected && styles.activeBarLabel]}>
                      {data.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </GlassCard>

        {/* Categories Breakdown */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Category Breakdown</Text>
        </View>

        <GlassCard style={styles.categoriesCard}>
          {categories.map((cat, index) => (
            <View key={index} style={styles.categoryRow}>
              <View style={styles.categoryInfo}>
                <View style={styles.categoryNameContainer}>
                  <View style={[styles.categoryDot, { backgroundColor: cat.color }]} />
                  <Text style={styles.categoryName}>{cat.name}</Text>
                </View>
                <Text style={styles.categoryAmount}>{cat.amount}</Text>
              </View>
              {/* Progress Bar */}
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${cat.percentage}%`,
                      backgroundColor: cat.color,
                    },
                  ]}
                />
              </View>
              <View style={styles.categoryFooter}>
                <Text style={styles.categoryPercentage}>{cat.percentage}% of total</Text>
              </View>
            </View>
          ))}
        </GlassCard>
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
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gearIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: COLORS.textPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gearCircle: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.textPrimary,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  rangeSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
    marginBottom: 24,
  },
  rangeTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeRangeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  rangeTabText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  activeRangeTabText: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  summaryContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  summaryLabel: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  summaryValue: {
    color: COLORS.textPrimary,
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -1,
    marginVertical: 4,
  },
  summaryTrend: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  chartCard: {
    marginBottom: 28,
  },
  chartTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  chartSubtitle: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 2,
    marginBottom: 24,
  },
  chartWrapper: {
    flexDirection: 'row',
    height: 160,
    alignItems: 'flex-end',
  },
  chartYAxis: {
    justifyContent: 'space-between',
    height: 130,
    paddingBottom: 20,
    marginRight: 12,
  },
  yAxisText: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'right',
  },
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  tooltip: {
    position: 'absolute',
    top: -30,
    backgroundColor: '#1E1E2F',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 10,
  },
  tooltipText: {
    color: COLORS.textPrimary,
    fontSize: 10,
    fontWeight: '700',
  },
  barTrack: {
    height: 120,
    width: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
    justifyContent: 'flex-end',
    marginBottom: 8,
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 8,
  },
  activeBarFill: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  barLabel: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: '600',
  },
  activeBarLabel: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  categoriesCard: {
    paddingVertical: 12,
  },
  categoryRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.03)',
  },
  categoryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  categoryName: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  categoryAmount: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 3,
    width: '100%',
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  categoryFooter: {
    alignItems: 'flex-end',
  },
  categoryPercentage: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '500',
  },
});
