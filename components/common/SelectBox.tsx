import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  label?: string | React.ReactNode;
  placeholder?: string;
  value?: string;
  onPress?: () => void;
};

const SelectBox = ({label, placeholder, value, onPress}: Props) => {
  // const [isOpen, setIsOpen] = useState(false)

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={() => {
        // setIsOpen(true)
        onPress?.();
      }}>
      {label && typeof label === 'string' ? <Text style={styles.label}>{label}</Text> : null}
      {label && typeof label !== 'string' ? label : null}
      <View style={[styles.base]}>
        <View style={{width: 18, height: 18}} />
        {!value && placeholder ? <Text style={styles.placeholder}>{placeholder}</Text> : null}
        {value ? <Text style={styles.value}>{value}</Text> : null}
        <Image
          source={require('@/assets/icons/arrow-up.png')}
          style={[{width: 18, height: 18, marginTop: 4}, {transform: [{rotate: '180deg'}]}]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SelectBox;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignContent: 'flex-start',
    gap: 4,
    flexDirection: 'column',
  },
  base: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    paddingTop: 8,
    borderColor: '#D0CEC7',
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#171716',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22.4,
    flex: 1,
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editable: {
    backgroundColor: '#F3F2EE',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20.8,
    color: '#171716',
  },
  placeholder: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22.4,
    color: '#D0CEC7',
    textAlign: 'center',
    marginTop: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22.4,
    color: '#171716',
    textAlign: 'center',
    marginTop: 4,
  },
});
