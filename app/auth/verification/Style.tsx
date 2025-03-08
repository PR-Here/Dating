import { StyleSheet } from 'react-native';
import { w, h } from '@/utils/Dimensions';
import { backgroundLight, primary, text } from '@/constants/Colors';

export const createStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundLight,
  },
  content: {
    flex: 1,
    paddingHorizontal: w(24),
    paddingTop: h(60),
  },
  title: {
    marginBottom: h(8),
  },
  subtitle: {
    marginBottom: h(32),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: h(32),
  },
  otpInputContainer: {
    width: w(64),
  },
  otpInput: {
    height: w(64),
    textAlign: 'center',
    fontSize: w(24),
    padding: 0,
  },
  button: {
    marginTop: 'auto',
    marginBottom: h(24),
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: h(32),
    flexWrap: 'wrap',
  },
  resendButton: {
    minWidth: 0,
    paddingHorizontal: w(0),
  },
}); 