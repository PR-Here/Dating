import { h, w } from "@/utils/Dimensions";

import { backgroundDark, backgroundLight, text, textSecondary } from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
const createStyles = (insets: EdgeInsets) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundDark,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    height: h(250),
    position: 'relative',
    backgroundColor: backgroundDark,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageEditButton: {
    position: 'absolute',
    bottom: h(20),
    right: w(20),
    width: w(48),
    height: w(48),
    borderRadius: w(24),
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  content: {
    padding: w(16),
    paddingTop: h(20),
    gap: h(16),
  },
  card: {
    backgroundColor: backgroundLight,
    borderRadius: h(16),
    padding: w(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    marginVertical: h(4),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: h(12),
  },
  input: {
    borderWidth: 1,
    borderColor: textSecondary,
    borderRadius: h(8),
    padding: w(12),
    width: '100%',
    backgroundColor: backgroundLight,
  },
  saveButton: {
    alignSelf: 'flex-end',
    width: w(100),
    marginTop: h(7),
  },
  editContainer: {
    alignItems: 'center',
    marginTop: h(8),
    justifyContent: 'space-between',
    width: '100%',
  },
  bio: {
    marginTop: h(8),
    lineHeight: h(24),
  },
  bioEditContainer: {
    marginTop: h(8),
  },
  bioInput: {
    borderWidth: 1,
    borderColor: text,
    borderRadius: h(8),
    padding: w(12),
    minHeight: h(100),
    color: text,
    textAlignVertical: 'top',
  },
  saveBioButton: {
    marginTop: h(52),
    alignSelf: 'flex-end',
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: w(8),
    marginTop: h(12),
  },
  interestTag: {
    paddingHorizontal: w(16),
    paddingVertical: h(8),
    backgroundColor: '#F5F5F5',
    borderRadius: h(20),
  },
  editButton: {
    paddingVertical: h(4),
    paddingHorizontal: w(12),
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: h(20),
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButton: {
    position: 'absolute',
    top: insets?.top + h(16),
    left: w(16),
    zIndex: 100,
    width: w(40),
    height: w(40),
    borderRadius: w(20),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default createStyles;