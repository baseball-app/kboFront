import {Image, Pressable, StyleSheet, View} from 'react-native'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import {useSheetSlice} from '@/slice/sheetSlice'
import {Modal} from '@/components/common/Modal'
import {size} from '@/shared'

const CommonSheet = () => {
  const sheetSlice = useSheetSlice()
  const currentSheet = sheetSlice.currentSheet

  return (
    <Modal
      visible={Boolean(currentSheet)}
      onRequestClose={sheetSlice.sheet.hide}
      animationType="slide"
      transparent={false}>
      <SafeAreaProvider>
        <SafeAreaView edges={['top']} style={styles.safeAreaView}>
          <View style={styles.headerContainer}>
            <Pressable onPress={sheetSlice.sheet.hide}>
              <Image source={require('@/assets/icons/close.png')} style={styles.icon} resizeMode="contain" />
            </Pressable>
          </View>
          {currentSheet?.content}
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    padding: size(16),
    alignItems: 'flex-end',
  },
  webViewContainer: {
    flex: 1,
  },
  icon: {
    width: size(24),
    height: size(24),
  },
})

export {CommonSheet}
