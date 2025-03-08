import { StyleSheet } from 'react-native';
import { w, h, screen, font } from '@/utils/Dimensions';
import { backgroundLight, primary, text, textSecondary } from '@/constants/Colors';

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
  socialButtons: {
    gap: h(16),
    marginBottom: h(32),
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: h(32),
    gap: w(16),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  form: {
    gap: h(16),
    marginBottom: h(32),
  },
  button: {
    marginTop: 'auto',
    marginBottom: h(132),
  },
  helperText: {
    marginTop: h(-8),
    marginBottom: h(16),
    marginLeft: w(16),
  },
  phoneInput: {
    marginTop: h(8),
  },
  phoneInputContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: w(16),
    marginTop: h(8),
  },
  phoneInputText: {
    backgroundColor: 'transparent',
    paddingVertical: h(8),
  },
  phoneInputTextInput: {
    color: text,
    fontSize: font(14),
    height: h(40),
  },
  phoneInputCode: {
    color: text,
    fontSize: font(14),
  },
  phoneInputCountryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: w(16),
    marginLeft: w(8),
  },
  errorText: {
    marginTop: h(4),
    marginLeft: w(16),
  },
}); 