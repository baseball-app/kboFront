import {StyleSheet, ScrollView, Image, Text, TouchableOpacity, View} from 'react-native'
import Calendar from '@/components/home/Calendar'
import {SafeAreaView} from 'react-native-safe-area-context'
import FriendList from '@/components/home/FrendList'
import {useRouter} from 'expo-router'
import GameContainer from '@/components/game/GameContainer'
const CalendarScreen = () => {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FriendList />
      <ScrollView style={styles.scollContainer}>
        <GameContainer />
        <View style={{marginBottom: 70}}>
          <Calendar />
        </View>
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity //
        activeOpacity={0.95}
        style={styles.floatingButton}
        onPress={() => router.push('/write')}>
        <Image source={require('@/assets/icons/write.png')} resizeMode="contain" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scollContainer: {
    flex: 1,
    backgroundColor: '#fffcf3',
    padding: 24,
  },

  /* Floating Button */
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    backgroundColor: '#353430',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
})

export default CalendarScreen
