import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { COLORS } from '../theme/colors';

const { width } = Dimensions.get('window');

export const SplashScreen = ({ navigation }: any) => {
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineTranslateY = useRef(new Animated.Value(20)).current;
  const ring1Scale = useRef(new Animated.Value(0.5)).current;
  const ring1Opacity = useRef(new Animated.Value(0)).current;
  const ring2Scale = useRef(new Animated.Value(0.5)).current;
  const ring2Opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate logo entrance
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Glow pulse
      Animated.timing(glowOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      // Expanding rings
      Animated.parallel([
        Animated.timing(ring1Scale, {
          toValue: 1.8,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(ring1Opacity, {
            toValue: 0.6,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(ring1Opacity, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(ring2Scale, {
          toValue: 2.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(200),
          Animated.timing(ring2Opacity, {
            toValue: 0.4,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(ring2Opacity, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
        // Tagline entrance
        Animated.parallel([
          Animated.timing(taglineOpacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(taglineTranslateY, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start();

    // Navigate to Login after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, logoScale, logoOpacity, glowOpacity, taglineOpacity, taglineTranslateY, ring1Scale, ring1Opacity, ring2Scale, ring2Opacity]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      {/* Background gradient orbs */}
      <View style={styles.bgOrb1} />
      <View style={styles.bgOrb2} />
      <View style={styles.bgOrb3} />

      {/* Expanding rings */}
      <Animated.View
        style={[
          styles.ring,
          {
            transform: [{ scale: ring1Scale }],
            opacity: ring1Opacity,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.ring,
          styles.ring2,
          {
            transform: [{ scale: ring2Scale }],
            opacity: ring2Opacity,
          },
        ]}
      />

      {/* Glow behind logo */}
      <Animated.View style={[styles.glow, { opacity: glowOpacity }]} />

      {/* Logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: logoScale }],
            opacity: logoOpacity,
          },
        ]}
      >
        <View style={styles.logoBorder}>
          <View style={styles.logoInner}>
            <Text style={styles.logoText}>HKL</Text>
          </View>
        </View>
      </Animated.View>

      {/* Tagline */}
      <Animated.View
        style={[
          styles.taglineContainer,
          {
            opacity: taglineOpacity,
            transform: [{ translateY: taglineTranslateY }],
          },
        ]}
      >
        <Text style={styles.tagline}>Smart Finance Platform</Text>
        <View style={styles.taglineDivider} />
        <Text style={styles.taglineSub}>Secure • Fast • Intelligent</Text>
      </Animated.View>

      {/* Bottom branding */}
      <View style={styles.bottomBranding}>
        <Text style={styles.brandingText}>Powered by HKL Technologies</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgOrb1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: COLORS.primary,
    opacity: 0.06,
    top: -60,
    left: -80,
  },
  bgOrb2: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: COLORS.secondary,
    opacity: 0.05,
    bottom: 80,
    right: -60,
  },
  bgOrb3: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.accent,
    opacity: 0.04,
    bottom: -40,
    left: 40,
  },
  ring: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  ring2: {
    borderColor: COLORS.secondary,
    borderWidth: 1,
  },
  glow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    opacity: 0.12,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  logoBorder: {
    width: 120,
    height: 120,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: 'rgba(99, 102, 241, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
  },
  logoInner: {
    width: 100,
    height: 100,
    borderRadius: 28,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 38,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: 4,
  },
  taglineContainer: {
    alignItems: 'center',
  },
  tagline: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },
  taglineDivider: {
    width: 40,
    height: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 1,
    marginVertical: 12,
  },
  taglineSub: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textMuted,
    letterSpacing: 2,
  },
  bottomBranding: {
    position: 'absolute',
    bottom: 50,
  },
  brandingText: {
    color: 'rgba(100, 116, 139, 0.5)',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});
