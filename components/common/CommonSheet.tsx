import {Image, Pressable, StyleSheet, View, Modal} from 'react-native'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import {useSheetSlice} from '@/slice/sheetSlice'

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
        <SafeAreaView edges={['top']} style={{flex: 1, backgroundColor: 'transparent'}}>
          <View style={{padding: 16, alignItems: 'flex-end'}}>
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
  webViewContainer: {
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
})

export {CommonSheet}
