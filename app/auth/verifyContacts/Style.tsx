import { StyleSheet } from 'react-native';
import { w, h } from '@/utils/Dimensions';
import { backgroundLight } from '@/constants/Colors';

export const createStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundLight,
    paddingHorizontal: w(24),
  },
  title: {
    marginBottom: h(8),
  },
  subtitle: {
    marginBottom: h(32),
  },
  form: {
    gap: h(24),
    marginTop: h(0),
  },
  section: {
    gap: h(16),
  },
  footer: {
    marginTop: 'auto',
    gap: h(16),
  },
  button: {
    marginTop: h(16),
  },
}); 