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
} from 'react-native';
import imagepaths from '../components/imagepaths';
import { useAppTheme } from '../theme/useAppTheme';

export const OTPScreen = ({ navigation, route }: any) => {
  const email = route?.params?.email || 'your email';
  const theme = useAppTheme();

  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Entrance animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const boxesFade = useRef(new Animated.Value(0)).current;
  const boxesSlide = useRef(new Animated.Value(60)).current;

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
        Animated.timing(boxesFade, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(boxesSlide, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOtpChange = (text: string, index: number) => {
    // Allow only digits
    const digit = text.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-focus next input
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // If all filled, auto-submit
    const fullCode = newOtp.join('');
    if (fullCode.length === OTP_LENGTH && !newOtp.includes('')) {
      handleVerify(fullCode);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
    }
  };

  const handleVerify = (code?: string) => {
    const otpCode = code || otp.join('');
    if (otpCode.length < OTP_LENGTH) {
      Alert.alert('Incomplete Code', 'Please enter the full 6-digit code.');
      return;
    }
    navigation.navigate('Main');
  };

  const handleResendCode = () => {
    Alert.alert('Code Resent', `A new sign in code has been sent to ${email}.`);
    setOtp(Array(OTP_LENGTH).fill(''));
    inputRefs.current[0]?.focus();
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

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.backArrow, { color: theme.textPrimary }]}>←</Text>
      </TouchableOpacity>

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
            {/* Logo & Header */}
            <Animated.View
              style={[
                styles.headerContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Circular Logo */}
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

              <Text style={[styles.titleText, { color: theme.textPrimary }]}>
                Check your inbox
              </Text>
              <Text style={[styles.subtitleText, { color: theme.textMuted }]}>
                We've sent a sign in code to {email}, if an account exists.
              </Text>
            </Animated.View>

            {/* OTP Input Boxes */}
            <Animated.View
              style={[
                styles.otpContainer,
                {
                  opacity: boxesFade,
                  transform: [{ translateY: boxesSlide }],
                },
              ]}
            >
              <View style={styles.otpRow}>
                {otp.map((digit, index) => (
                  <View
                    key={index}
                    style={[
                      styles.otpBox,
                      {
                        backgroundColor: theme.inputBg,
                        borderColor: digit
                          ? theme.inputBorderFocused
                          : theme.inputBorder,
                      },
                    ]}
                  >
                    <TextInput
                      ref={ref => {
                        inputRefs.current[index] = ref;
                      }}
                      style={[styles.otpInput, { color: theme.inputText }]}
                      value={digit}
                      onChangeText={text => handleOtpChange(text, index)}
                      onKeyPress={e => handleKeyPress(e, index)}
                      keyboardType="number-pad"
                      maxLength={1}
                      selectTextOnFocus
                      autoFocus={index === 0}
                    />
                  </View>
                ))}
              </View>
            </Animated.View>
          </View>

          {/* Bottom Links */}
          <View style={styles.footerContainer}>
            <TouchableOpacity
              onPress={handleResendCode}
              style={styles.resendButton}
            >
              <Text style={[styles.resendText, { color: theme.linkText }]}>
                Resend code
              </Text>
            </TouchableOpacity>

            <View style={styles.discoverRow}>
              <Text style={[styles.discoverText, { color: theme.textMuted }]}>
                Not yet a member?{' '}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Discover',
                    'Discover HKL communities coming soon.',
                  )
                }
              >
                <Text style={[styles.discoverLink, { color: theme.linkText }]}>
                  Discover communities
                </Text>
              </TouchableOpacity>
            </View>
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
  backButton: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 36 : 8,
    paddingBottom: 8,
    alignSelf: 'flex-start',
  },
  backArrow: {
    fontSize: 28,
    fontWeight: '300',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
  },
  logoOuterCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
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
  titleText: {
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
    paddingHorizontal: 12,
  },
  otpContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  otpBox: {
    width: 52,
    height: 60,
    borderRadius: 14,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  footerContainer: {
    paddingVertical: 24,
    alignItems: 'center',
    width: '100%',
  },
  resendButton: {
    paddingVertical: 12,
    marginBottom: 12,
  },
  resendText: {
    fontSize: 15,
    fontWeight: '600',
  },
  discoverRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discoverText: {
    fontSize: 14,
    fontWeight: '400',
  },
  discoverLink: {
    fontSize: 14,
    fontWeight: '500',
  },
});
