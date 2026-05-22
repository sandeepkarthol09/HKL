import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useAppTheme } from '../theme/useAppTheme';
import Fontsize from '../core/value/Fontsize';
import FontFamily from '../core/value/Fontfamily';
import { wp } from '../core/value/Constants';
import imagepaths from '../components/imagepaths';
import { COLORS } from '../theme/colors';

export const HomeScreen = ({ navigation }: any) => {
  const theme = useAppTheme();
  const [activeTab, setActiveTab] = useState('Feed');

  const tabs = ['Feed', 'Spaces', 'Events', 'Members', 'Leaderboard'];

  const feedPosts = [
    {
      id: '1',
      author: 'Sandeep Karthol',
      avatarInitials: 'SK',
      space: '👋 Say Hello',
      timestamp: '22h',
      type: 'text',
      content: 'Hello Everyone i am new here',
      likes: 4,
      comments: 1,
    },
    {
      id: '2',
      author: 'Gurmohit Singh',
      avatarInitials: 'GS',
      space: '🌱 Hearttalks (Discussions)',
      timestamp: '1d',
      type: 'article',
      title: "Baba Ji's Poem",
      content:
        'Baba Ji’s poem at the previous HKL Conference in Telford showered the room with peace and stillness. They urged the attendees to recognize all ...',
      imageUri:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
      likes: 12,
      comments: 5,
    },
  ];

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <StatusBar
        barStyle={theme.statusBar as any}
        backgroundColor={theme.statusBarBg}
        translucent={false}
      />

      {/* 1. App Bar Header */}
      <View style={styles.header}>
        <Text style={[styles.brandLogo, { color: theme.brandLogoColor }]}>
          HKL
        </Text>
        <TouchableOpacity style={styles.avatarButton}>
          <Text style={styles.avatarText}>SK</Text>
        </TouchableOpacity>
      </View>

      {/* 2. Scrollable Top Tabs Container */}
      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
        >
          {tabs.map(tab => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabButton,
                  {
                    backgroundColor: isActive
                      ? theme.tabActiveBg
                      : theme.tabInactiveBg,
                  },
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    { color: isActive ? theme.tabActiveText : theme.textMuted },
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Main Feed Content Scroll list */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* 3. My Daily Commitment Card Banner Component */}
        <View
          style={[
            styles.commitmentCard,
            {
              backgroundColor: theme.commitmentBg,
              borderColor: theme.commitmentBorder,
            },
          ]}
        >
          <View style={styles.commitmentHeaderRow}>
            <Image
              source={{
                uri: 'https://picsum.photos/200/300',
              }}
              style={{
                width: '100%',
                height: wp(30),
                borderTopLeftRadius: wp(4),
                borderTopRightRadius: wp(4),
              }}
            />
          </View>

          <Text style={[styles.commitmentBody, { color: theme.textMuted }]}>
            🌱 Here is this week's practice. Please log your experience daily by{' '}
            <Text style={[styles.hyperlinkText, { color: theme.linkText }]}>
              clicking here
            </Text>{' '}
            You can access previous practices by{' '}
            <Text style={[styles.hyperlinkText, { color: theme.linkText }]}>
              clicking here
            </Text>
          </Text>
        </View>

        {/* 4. Stream Feed Rendering */}
        {feedPosts.map(post => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View
                style={[
                  styles.miniAvatar,
                  { backgroundColor: post.id === '1' ? '#2F80ED' : '#27AE60' },
                ]}
              >
                <Text style={styles.miniAvatarText}>{post.avatarInitials}</Text>
              </View>
              <Text style={styles.postMetaData} numberOfLines={1}>
                <Text style={[styles.postAuthor, { color: theme.textPrimary }]}>
                  {post.author}
                </Text>
                <Text style={{ color: theme.textMuted }}> in {post.space}</Text>
                <Text style={{ color: theme.textMuted }}>
                  {' '}
                  • {post.timestamp}
                </Text>
              </Text>
            </View>

            {post.type === 'article' ? (
              <View style={styles.articleContainer}>
                <Text
                  style={[styles.articleTitle, { color: theme.textPrimary }]}
                >
                  {post.title}
                </Text>
                <Text
                  style={[styles.articleContent, { color: theme.textMuted }]}
                >
                  {post.content}
                </Text>
                <Image
                  source={{ uri: post.imageUri }}
                  style={styles.articleImage}
                  resizeMode="cover"
                />
              </View>
            ) : (
              <Text
                style={[styles.pureTextContent, { color: theme.textPrimary }]}
              >
                {post.content}
              </Text>
            )}

            {/* Interaction Row Footer */}
            <View style={styles.interactionRow}>
              <TouchableOpacity style={styles.interactionButton}>
                {/* <Text
                  style={[styles.interactionIcon, { color: theme.textMuted }]}
                >
                  ♡
                </Text> */}
                <Image
                  source={imagepaths.heart}
                  style={{
                    height: wp(4.5),
                    width: wp(4.5),
                  }}
                />
                <Text
                  style={[styles.interactionCount, { color: theme.textMuted }]}
                >
                  {post.likes}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.interactionButton}>
                <Text
                  style={[styles.interactionIcon, { color: theme.textMuted }]}
                >
                  💬
                </Text>
                <Text
                  style={[styles.interactionCount, { color: theme.textMuted }]}
                >
                  {post.comments}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 5. Floating Action Button Container (FAB) */}
      <TouchableOpacity
        style={[
          styles.fabButton,
          { backgroundColor: theme.fabBg, shadowColor: theme.fabShadow },
        ]}
        activeOpacity={0.85}
      >
        <Text style={[styles.fabIcon, { color: theme.brandLogoColor }]}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: wp(2),
  },
  brandLogo: {
    fontSize: Fontsize.NINE,
    fontFamily: FontFamily.GoogleSansBold,
    letterSpacing: 1,
    includeFontPadding: false,
  },
  avatarButton: {
    width: wp(9.5),
    height: wp(9.5),
    borderRadius: wp(4.75),
    backgroundColor: '#2F80ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: Fontsize.THREE_DOT_EIGHT,
    includeFontPadding: false,
    fontFamily: FontFamily.GoogleSans17ptRegular,
  },
  tabsWrapper: {
    paddingBottom: wp(2),
  },
  tabsContainer: {
    paddingHorizontal: wp(4),
    alignItems: 'center',
    gap: wp(2),
    marginTop: wp(1),
  },
  tabButton: {
    paddingHorizontal: wp(4),
    paddingVertical: wp(2),
    borderRadius: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
    includeFontPadding: false,
  },
  tabButtonText: {
    fontSize: Fontsize.THREE_DOT_EIGHT,
    fontFamily: FontFamily.GoogleSansMedium,
    includeFontPadding: false,
  },
  scrollContainer: {
    padding: wp(4),
    paddingBottom: wp(22),
  },
  commitmentCard: {
    borderRadius: wp(4),
    borderWidth: 1,
    marginBottom: wp(5),
  },
  commitmentHeaderRow: {
    flexDirection: 'row',
    marginBottom: wp(3),
  },
  crestContainer: {
    width: wp(14),
    height: wp(14),
    borderWidth: 1.2,
    borderRadius: wp(7),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  crestFallbackText: {
    fontSize: Fontsize.THREE,
    fontFamily: FontFamily.GoogleSansBold,
    includeFontPadding: false,
  },
  commitmentTitleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  commitmentTitle: {
    fontSize: Fontsize.FOUR_DOT_FIVE,
    fontFamily: FontFamily.GoogleSansBold,
  },
  commitmentSubTitle: {
    fontSize: Fontsize.FOUR_DOT_FIVE,
    fontFamily: FontFamily.GoogleSansBold,
    marginTop: wp(-1),
  },
  commitmentActionHint: {
    fontSize: Fontsize.TWO_DOT_EIGHT,
    fontFamily: FontFamily.GoogleSansRegular,
    marginTop: wp(1),
  },
  commitmentBody: {
    fontSize: Fontsize.THREE_DOT_FIVE,
    fontFamily: FontFamily.GoogleSansRegular,
    lineHeight: wp(5),
    padding: wp(4),
    includeFontPadding: false,
  },
  hyperlinkText: {
    fontFamily: FontFamily.GoogleSansMedium,
    textDecorationLine: 'underline',
    includeFontPadding: false,
    fontSize: Fontsize.THREE_DOT_FIVE,
  },
  postCard: {
    marginBottom: wp(6),
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(2.5),
  },
  miniAvatar: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(2),
  },
  miniAvatarText: {
    color: '#FFFFFF',
    fontSize: Fontsize.TWO_DOT_FIVE,
    fontFamily: FontFamily.GoogleSansBold,
    includeFontPadding: false,
  },
  postMetaData: {
    fontSize: Fontsize.THREE_DOT_FIVE,
    fontFamily: FontFamily.GoogleSansRegular,
    includeFontPadding: false,
    width:'92%',
  },
  postAuthor: {
    fontFamily: FontFamily.GoogleSansBold,
    includeFontPadding: false,
  },
  pureTextContent: {
    fontSize: Fontsize.FOUR,
    fontFamily: FontFamily.GoogleSansRegular,
    includeFontPadding: false,
    paddingLeft: wp(0.5),
    marginVertical: wp(2),
  },
  articleContainer: {
    marginTop: wp(1),
  },
  articleTitle: {
    fontSize: Fontsize.FIVE,
    fontFamily: FontFamily.GoogleSansBold,
    marginBottom: wp(1.5),
    includeFontPadding: false,
  },
  articleContent: {
    fontSize: Fontsize.THREE_DOT_EIGHT,
    fontFamily: FontFamily.GoogleSansRegular,
    lineHeight: wp(5.5),
    marginBottom: wp(3),
    includeFontPadding: false,
  },
  articleImage: {
    width: '100%',
    height: wp(50),
    borderRadius: wp(3),
    backgroundColor: '#E1E1E1',
  },
  interactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    marginTop: wp(2.5),
    paddingLeft: wp(0.5),
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
  },
  interactionIcon: {
    fontSize: Fontsize.FOUR,
    includeFontPadding: false,
  },
  interactionCount: {
    fontSize: Fontsize.THREE_DOT_TWO,
    fontFamily: FontFamily.GoogleSansRegular,
    includeFontPadding: false,
  },
  fabButton: {
    position: 'absolute',
    right: wp(4),
    bottom: wp(19),
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  fabIcon: {
    fontSize: Fontsize.SEVEN,
    includeFontPadding: false,
    fontWeight: '300',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: wp(15),
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    padding: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: Fontsize.FIVE,
    opacity: 0.4,
  },
  notificationBadge: {
    position: 'absolute',
    top: wp(-1),
    right: wp(-1.5),
    backgroundColor: '#FF3B30',
    borderRadius: wp(2),
    paddingHorizontal: wp(1),
    paddingVertical: wp(0.25),
    minWidth: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: Fontsize.TWO_DOT_FIVE,
    fontFamily: FontFamily.GoogleSansBold,
  },
});
