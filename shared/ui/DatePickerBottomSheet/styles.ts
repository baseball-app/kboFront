import {StyleSheet} from 'react-native';
import {size} from '@/shared/lib/size';
import {color_token} from '@/constants/theme';

export const styles = StyleSheet.create({
  modalContent: {
    width: '100%',
    padding: size(24),
    backgroundColor: color_token.white,
    borderTopLeftRadius: size(20),
    borderTopRightRadius: size(20),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  modalTitle: {
    marginBottom: size(16),
  },
  datePickerContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: size(13),
    marginTop: size(30),
    marginBottom: size(16),
  },
  button: {
    flex: 1,
    paddingVertical: size(12),
    height: size(46),
  },
});
