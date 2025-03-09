import { StyleSheet } from 'react-native';
import { w, h, font, screen } from '@/utils/Dimensions';
import { Typography } from '@/constants/Typography';
import { backgroundLight, buttonText, primary, shadow, text, textSecondary } from '@/constants/Colors';

export const createStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundLight,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  itemContainer: {
    flex: 1,
    width: screen.width,
  },
  imageBackground: {
    height: screen.height * 0.7, // 70% of screen height
    width: screen.width,
    position: 'absolute',
    top: 0,
  },
  image: {
    width: screen.width,
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30, 20, 55, 0.4)', // Slightly darker overlay for better text contrast
  },
  floatingCard: {
    borderRadius: w(24),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    marginTop: screen.height * 0.60,
    marginHorizontal: w(20),
    
  },
  blurContainer: {
    paddingHorizontal: w(20),
    paddingVertical: h(18),
   
  },
  headerText: {
    color: text,
    fontFamily: Typography.fontFamily.medium,
  },
  title: {
    color: text,
    fontFamily: Typography.fontFamily.bold,
    fontSize: font(24),
  },
  description: {
    color: textSecondary,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: h(105),
    width: '100%',
    gap: w(8),
  },
  dot: {
    height: w(6),
    width: w(6),
    borderRadius: w(3),
    backgroundColor: textSecondary,
  },
  activeDot: {
    width: w(24),
    backgroundColor: primary,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: w(24),
    paddingBottom: h(40),
    paddingTop: h(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(189, 18, 21, 0.05)',
    borderTopLeftRadius: w(32),
    borderTopRightRadius: w(32),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: h(16),
  },
  skipButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: primary,
  },
  skipText: {
    color: primary,
    fontSize: font(16),
    fontFamily: Typography.fontFamily.medium,
  },
  nextButton: {
    paddingVertical: h(16),
    paddingHorizontal: w(32),
    borderRadius: w(24),
    backgroundColor: primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: w(8),
    shadowColor: shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  nextText: {
    color: buttonText,
    fontSize: font(16),
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  floatingElement: {
    position: 'absolute',
    width: w(120),
    height: w(120),
    borderRadius: w(60),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});
