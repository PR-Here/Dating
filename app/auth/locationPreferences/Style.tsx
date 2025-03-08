import { h, w } from "@/utils/Dimensions";
import { backgroundLight, primary } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const createStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundLight,
  },
  content: {
    flex: 1,
    paddingHorizontal: w(24),
    paddingTop: h(20),
  },
  title: {
    marginBottom: h(8),
  },
  subtitle: {
    marginBottom: h(32),
  },
  input: {
    marginBottom: h(32),
  },
  sliderContainer: {
    marginVertical: h(24),
  },
  distanceText: {
    marginTop: h(8),
    marginBottom: h(24),
  },
  slidingText: {
    opacity: 0.7,
  },
  slider: {
    height: h(40),
  },
  preferencesContainer: {
    marginBottom: h(32),
  },
  label: {
    marginBottom: h(16),
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: w(12),
  },
  optionButton: {
  },
  footer: {
    gap: w(12),
    marginVertical: h(4),
  },
  backButton: {
    flex: 1,
    minWidth: 0,
  },
  continueButton: {
    flex: 2,
  },
  thumb: {
    width: w(24),
    height: w(24),
    borderRadius: w(12),
    backgroundColor: primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rail: {
    flex: 1,
    height: h(4),
    borderRadius: h(2),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  railSelected: {
    height: h(4),
    backgroundColor: primary,
    borderRadius: h(2),
  },
}); 