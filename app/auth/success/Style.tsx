import { StyleSheet } from 'react-native';
import { w, h, font } from '@/utils/Dimensions';
import { backgroundLight, primary } from '@/constants/Colors';

export const createStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundLight,
    paddingHorizontal: w(24),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: h(40),
  },
  successIconContainer: {
    width: w(300),
    height: w(300),
    position: 'absolute',
    top: h(0),
    left: w(20),
    right: w(0),
    bottom: w(0),
    zIndex: 1,
    opacity: 0.7,
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  title: {
    marginBottom: h(16),
    textAlign: 'center',
    marginTop: h(50),
  },
  subtitle: {
    marginBottom: h(40),
    textAlign: 'center',
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 16,
    padding: w(24),
    marginBottom: h(40),
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: h(40),
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: w(16),
  },
  button: {
    width: '100%',
    marginTop: h(16),
  },
  profileContainer: {
    width: w(120),
    height: w(120),
    borderRadius: w(60),
    marginBottom: h(24),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white',
    zIndex: 1,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: w(60),
  },
  statText: {
    fontSize: font(24),
    fontWeight: 'bold',
    marginBottom: h(4),
  },
}); 