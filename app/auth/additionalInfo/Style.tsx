import { StyleSheet } from 'react-native';
import { w, h } from '@/utils/Dimensions';
import { backgroundLight } from '@/constants/Colors';

export const createStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundLight,
  },
  content: {
    flex: 1,
    paddingHorizontal: w(24),
    paddingTop: h(20),
    paddingBottom: h(24),
  },
  title: {
    marginBottom: h(8),
  },
  subtitle: {
    marginBottom: h(32),
  },
  bioInput: {
    height: h(120),
    marginBottom: h(24),
    textAlignVertical: 'top',
    paddingTop: h(16),
  },
  input: {
    marginBottom: h(24),
  },
  sectionTitle: {
    marginBottom: h(16),
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: w(8),
    marginBottom: h(24),
  },
  optionButton: {
    minWidth: w(80),
  },
  button: {
    marginTop: h(24),
  },
  footer: {
    gap: w(12),
    marginVertical: h(4),
  },
}); 