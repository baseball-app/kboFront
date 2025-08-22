import {Image, Pressable, StyleSheet, Text, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Modal} from '@/components/common/Modal'
import {useSheetSlice} from '@/slice/sheetSlice'

const CommonSheet = () => {
  const sheetSlice = useSheetSlice()
  const currentSheet = sheetSlice.currentSheet

  return (
    <Modal
      visible={Boolean(currentSheet)}
      onRequestClose={sheetSlice.sheet.hide}
      animationType="slide" //
    >
      <SafeAreaView edges={['top']} style={styles.webViewContainer}>
        <View style={{padding: 16, alignItems: 'flex-end'}}>
          <Pressable onPress={sheetSlice.sheet.hide}>
            <Image source={require('@/assets/icons/close.png')} style={styles.icon} resizeMode="contain" />
          </Pressable>
        </View>
        {currentSheet?.content}
      </SafeAreaView>
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
