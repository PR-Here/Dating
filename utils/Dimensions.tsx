import { Dimensions, PixelRatio, Platform } from 'react-native';

// Design specifications
const DESIGN_WIDTH = 375;  // iPhone design width
const DESIGN_HEIGHT = 812; // iPhone design height

// Device thresholds
const SMALL_SCREEN_HEIGHT = 667;  // iPhone 8
const MEDIUM_SCREEN_HEIGHT = 736;  // iPhone 8 Plus
const LARGE_SCREEN_HEIGHT = 812;   // iPhone X and above

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const ASPECT_RATIO = SCREEN_HEIGHT / SCREEN_WIDTH;

// Device type detection
const isSmallDevice = SCREEN_HEIGHT <= SMALL_SCREEN_HEIGHT;
const isMediumDevice = SCREEN_HEIGHT > SMALL_SCREEN_HEIGHT && SCREEN_HEIGHT <= MEDIUM_SCREEN_HEIGHT;
const isLargeDevice = SCREEN_HEIGHT > MEDIUM_SCREEN_HEIGHT;

// Scale factors
const widthBaseScale = SCREEN_WIDTH / DESIGN_WIDTH;
const heightBaseScale = SCREEN_HEIGHT / DESIGN_HEIGHT;

// Responsive scaling function
function normalize(size: number, based = 'width') {
  const newSize = based === 'height' ? 
    size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export const w = (size: number) => {
  let factor = 1;
  if (isSmallDevice) factor = 0.9;
  if (isMediumDevice) factor = 0.95;
  return normalize(size * factor);
};

export const h = (size: number) => {
  let factor = 1;
  if (isSmallDevice) factor = 0.9;
  if (isMediumDevice) factor = 0.95;
  return normalize(size * factor, 'height');
};

export const font = (size: number) => {
  let factor = 1;
  if (isSmallDevice) factor = 0.8;
  if (isMediumDevice) factor = 0.9;
  return normalize(size * factor);
};

// Metrics for consistent spacing and sizing
export const metrics = {
  // Screen dimensions
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  
  // Component heights
  heights: {
    input: h(48),
    button: h(48),
    header: h(56),
    tab: h(48),
    card: h(200),
    smallButton: h(36),
    touchable: h(44),
    navBar: Platform.OS === 'ios' ? h(44) : h(56),
  },

  // Component widths
  widths: {
    input: '100%',
    button: '100%',
    icon: w(24),
    smallIcon: w(16),
    largeIcon: w(32),
    avatar: w(40),
  },

  // Spacing
  spacing: {
    xs: w(4),
    sm: w(8),
    md: w(16),
    lg: w(24),
    xl: w(32),
    xxl: w(40),
  },

  // Border radius
  borderRadius: {
    xs: w(4),
    sm: w(8),
    md: w(12),
    lg: w(16),
    xl: w(20),
    circle: w(999),
  },

  // Icons
  icons: {
    tiny: w(12),
    small: w(16),
    medium: w(24),
    large: w(32),
    xl: w(40),
  },

  // Image sizes
  images: {
    small: w(20),
    medium: w(40),
    large: w(60),
    logo: w(200),
  },

  // Font sizes
  fonts: {
    xs: font(12),
    sm: font(14),
    md: font(16),
    lg: font(18),
    xl: font(20),
    xxl: font(24),
    xxxl: font(30),
  },

  // Device specific gaps
  getGapHeight: (value: number) => {
    if (ASPECT_RATIO >= DESIGN_HEIGHT / DESIGN_WIDTH) {
      return h(value);
    }
    if (ASPECT_RATIO <= SMALL_SCREEN_HEIGHT / DESIGN_WIDTH) {
      return h(value * 0.7);
    }
    return h(value * 0.85);
  }
};

export const screen = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
};

// Usage example:
/*
import { w, h, font } from '@/utils/Dimensions';

const styles = StyleSheet.create({
  container: {
    height: metrics.getGapHeight(100),
    padding: metrics.spacing.md,
  },
  text: {
    fontSize: metrics.fonts.md,
    marginBottom: metrics.spacing.sm,
  },
  customSize: {
    width: w(150),
    height: h(200),
  }
});
*/ 