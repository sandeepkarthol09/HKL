import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Animated,
  Dimensions,
  Easing,
  Image,
} from 'react-native';
import { COLORS } from '../theme/colors';
import imagepaths from '../components/imagepaths';

const { width, height } = Dimensions.get('window');

export const SplashScreen = ({ navigation }: any) => {
  // Entrance Animations
  const logoScale = useRef(new Animated.Value(0.4)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(30)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Continuous / Loop Animations
  const floatAnim = useRef(new Animated.Value(0)).current;
  const orb1Scale = useRef(new Animated.Value(1)).current;
  const orb2Scale = useRef(new Animated.Value(1)).current;
  const ringScale = useRef(new Animated.Value(0.8)).current;
  const ringOpacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // 1. Entrance animation sequence
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 30,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(contentTranslateY, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // 2. Continuous float loop (hovering logo emblem)
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 3. Continuous breathing orbs
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(orb1Scale, {
            toValue: 1.15,
            duration: 4000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(orb1Scale, {
            toValue: 0.9,
            duration: 4000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(orb2Scale, {
            toValue: 0.85,
            duration: 5000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(orb2Scale, {
            toValue: 1.1,
            duration: 5000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();

    // 4. Continuous pulsing outer ring waves
    Animated.loop(
      Animated.parallel([
        Animated.timing(ringScale, {
          toValue: 1.8,
          duration: 3000,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(ringOpacity, {
            toValue: 0.6,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(ringOpacity, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();

    // 5. Fill progress loading bar smoothly
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2600,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false, // width interpolation needs nativeDriver: false
    }).start();

    // 6. Navigation timeout to Login
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3200);

    return () => clearTimeout(timer);
  }, [navigation]);

  // Interpolate logo float movement
  const logoTranslateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-6, 6],
  });

  // Interpolate progress loading bar width
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Fluid Glowing Orbs in the Background */}
      <Animated.View
        style={[
          styles.bgOrb1,
          {
            transform: [{ scale: orb1Scale }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.bgOrb2,
          {
            transform: [{ scale: orb2Scale }],
          },
        ]}
      />
      <Animated.View style={styles.bgOrb3} />

      {/* Ambient center glow overlay */}
      <View style={styles.ambientCenterGlow} />

      {/* Main Brand Content */}
      <View style={styles.mainContent}>
        {/* Layered Pulsing Ring Wave */}
        <Animated.View
          style={[
            styles.pulseRing,
            {
              transform: [{ scale: ringScale }],
              opacity: ringOpacity,
            },
          ]}
        />

        {/* Animated Hovering Logo Emblem */}
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              transform: [
                { scale: logoScale },
                { translateY: logoTranslateY },
              ],
              opacity: logoOpacity,
            },
          ]}
        >
          <View style={styles.logoImageContainer}>
            <Image
              source={imagepaths.logo}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        {/* Brand Typography & Taglines */}
        <Animated.View
          style={[
            styles.brandDetailsContainer,
            {
              opacity: contentOpacity,
              transform: [{ translateY: contentTranslateY }],
            },
          ]}
        >

          <Text style={styles.mainTagline}>WELCOME TO THE HKL GLOBAL MOVEMENT</Text>
          
          <View style={styles.dividerLine} />
          
          <Text style={styles.featuresTagline}>SECURE • HYPER-FAST • INTUITIVE</Text>
        </Animated.View>
      </View>

      {/* Bottom Loading Progress and Branding */}
      <View style={styles.bottomSection}>
        {/* Progress Bar Track */}
        <View style={styles.progressBarTrack}>
          <Animated.View
            style={[
              styles.progressBarActive,
              {
                width: progressWidth,
              },
            ]}
          />
        </View>

        <Text style={styles.companyName}>POWERED BY HKL TECHNOLOGIES</Text>
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
  // Glowing Fluid Background Orbs
  bgOrb1: {
    position: 'absolute',
    width: width * 0.95,
    height: width * 0.95,
    borderRadius: (width * 0.95) / 2,
    backgroundColor: COLORS.primary,
    opacity: 0.08,
    top: -height * 0.1,
    left: -width * 0.15,
  },
  bgOrb2: {
    position: 'absolute',
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: (width * 0.85) / 2,
    backgroundColor: COLORS.secondary,
    opacity: 0.07,
    bottom: height * 0.05,
    right: -width * 0.2,
  },
  bgOrb3: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    backgroundColor: COLORS.accent,
    opacity: 0.04,
    top: height * 0.35,
    left: width * 0.2,
  },
  ambientCenterGlow: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: COLORS.primaryLight,
    opacity: 0.04,
    alignSelf: 'center',
  },
  mainContent: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  // Expanding Pulse Wave
  pulseRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: 'rgba(34, 211, 238, 0.4)', // cyan glow
    zIndex: 0,
  },
  // Central Emblem Wrapper
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
    zIndex: 3,
  },
  // Logo Image Container & Floating soft Shadow
  logoImageContainer: {
    borderRadius: 36,
    backgroundColor: 'transparent',
    shadowColor: '#100e0e',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 15,
    elevation: 8,
  },
  logoImage: {
    width: 160,
    height: 160,
    borderRadius: 36,
    borderWidth: 1.5,
    borderColor: 'rgba(16, 14, 14, 0.08)',
  },
  // Brand Typography & Badging
  brandDetailsContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  capsuleBadge: {
    backgroundColor: 'rgba(99, 102, 241, 0.12)', // very soft transparent indigo
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginBottom: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  capsuleBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primaryLight,
    letterSpacing: 2,
  },
  mainTagline: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  dividerLine: {
    width: 45,
    height: 2.5,
    backgroundColor: COLORS.secondary,
    borderRadius: 2,
    marginVertical: 18,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  featuresTagline: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 3,
    textAlign: 'center',
  },
  // Bottom Progress Track and Company Info
  bottomSection: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  progressBarTrack: {
    width: 140,
    height: 3,
    backgroundColor: 'rgba(16, 14, 14, 0.08)',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBarActive: {
    height: '100%',
    backgroundColor: COLORS.secondaryLight,
    borderRadius: 10,
  },
  companyName: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 2.5,
  },
});
