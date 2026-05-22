import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import imagepaths from '../components/imagepaths';
import { useAppTheme } from '../theme/useAppTheme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const theme = useAppTheme();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const formSlide = useRef(new Animated.Value(60)).current;
  const formFade = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(formFade, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(formSlide, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [fadeAnim, slideAnim, formFade, formSlide]);

  const handleLogin = () => {
    if (!email) {
      Alert.alert('Missing Field', 'Please enter your email.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    navigation.navigate('OTP', { email });
  };

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <StatusBar
        barStyle={theme.statusBar as any}
        backgroundColor={theme.statusBarBg}
        translucent={true}
      />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { backgroundColor: theme.background },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.mainContainer}>
            {/* Top Logo & Header */}
            <Animated.View
              style={[
                styles.headerContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Perfect Circular Logo */}
              <View
                style={[
                  styles.logoOuterCircle,
                  {
                    backgroundColor: theme.logoBg,
                    borderColor: theme.logoBorder,
                  },
                ]}
              >
                <Image
                  source={imagepaths.logo}
                  style={styles.logoImage}
                  resizeMode="cover"
                />
              </View>

              <Text style={[styles.welcomeText, { color: theme.textPrimary }]}>
                Welcome to HKL
              </Text>
              <Text style={[styles.subtitleText, { color: theme.textMuted }]}>
                Enter the email associated with your HKL account.
              </Text>
            </Animated.View>

            {/* Input & Button Form */}
            <Animated.View
              style={[
                styles.formContainer,
                {
                  opacity: formFade,
                  transform: [{ translateY: formSlide }],
                },
              ]}
            >
              {/* Email Input */}
              <View
                style={[
                  styles.inputWrapper,
                  {
                    backgroundColor: theme.inputBg,
                    borderColor: emailFocused
                      ? theme.inputBorderFocused
                      : theme.inputBorder,
                  },
                ]}
              >
                <TextInput
                  style={[styles.input, { color: theme.inputText }]}
                  placeholder="Your email"
                  placeholderTextColor={theme.inputPlaceholder}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
              </View>

              {/* Centered Continue Button */}
              <Animated.View
                style={[
                  styles.buttonContainer,
                  { transform: [{ scale: buttonScale }] },
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.continueButton,
                    { backgroundColor: theme.btnBg },
                  ]}
                  onPress={handleLogin}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  activeOpacity={0.9}
                >
                  <Text
                    style={[
                      styles.continueButtonText,
                      { color: theme.btnText },
                    ]}
                  >
                    Continue
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </View>

          {/* Privacy & Terms Bottom Footer */}
          <View style={styles.footerContainer}>
            <Text style={[styles.footerText, { color: theme.textMuted }]}>
              By signing in, you agree to the{' '}
              <Text
                style={[styles.footerLink, { color: theme.linkText }]}
                onPress={() =>
                  Alert.alert(
                    'Terms of Service',
                    'Terms & conditions coming soon.',
                  )
                }
              >
                terms of service
              </Text>{' '}
              and have read the{' '}
              <Text
                style={[styles.footerLink, { color: theme.linkText }]}
                onPress={() =>
                  Alert.alert('Privacy Policy', 'Privacy policy coming soon.')
                }
              >
                privacy policy
              </Text>
              .
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SCREEN_HEIGHT * 0.08,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
  },
  logoOuterCircle: {
    width: 96,
    height: 96,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    overflow: 'hidden',
    borderWidth: 1,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    borderRadius: 14,
    height: 56,
    paddingHorizontal: 18,
    justifyContent: 'center',
    borderWidth: 1.5,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  input: {
    fontSize: 16,
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  continueButton: {
    borderRadius: 28,
    height: 56,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footerContainer: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  footerText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 16,
  },
  footerLink: {
    fontWeight: '500',
  },
});
