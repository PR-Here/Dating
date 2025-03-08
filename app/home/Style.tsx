import { StyleSheet } from 'react-native';
import { w, h } from '@/utils/Dimensions';
import { backgroundLight, primary } from '@/constants/Colors';

export const createStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundLight,
  },
  header: {
    paddingTop: h(60),
    paddingHorizontal: w(24),
    backgroundColor: backgroundLight,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: h(24),
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: w(12),
  },
  profileButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  filterButton: {
    marginRight: w(8),
  },
  storiesContainer: {
    marginBottom: h(24),
  },
  section: {
    marginBottom: h(24),
  },
  sectionHeader: {
    paddingHorizontal: w(24),
    marginBottom: h(12),
  },
  sectionContent: {
    paddingHorizontal: w(24),
  },
  horizontalContent: {
    paddingRight: w(8),
  },
  content: {
    paddingBottom: h(24),
  },
  cardContainer: {
    marginBottom: h(16),
  },
  compactCard: {
    width: w(150),
    marginRight: w(12),
  },
}); 