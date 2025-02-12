import {StyleSheet, ScrollView, Image, Text, TouchableOpacity} from 'react-native'
import Calendar from '@/components/home/Calendar'
import {View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import FriendList from '@/components/home/FrendList'
import GameInfoCard from '@/components/home/GameInfoCard'
const CalendarScreen = () => {
    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <FriendList />
            <ScrollView style={styles.scollContainer}>
                <View style={styles.tabMenu}>
                    <TouchableOpacity style={styles.tabMenuButton}>
                        <View style={styles.arrowImgBox}>
                            <Image source={require('@/assets/icons/left-arrow.png')} resizeMode="contain" />
                        </View>
                        <Text style={styles.dayText}>어제의 야구</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabMenuButton}>
                        <Text style={styles.todayText}>오늘의 야구</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabMenuButton}>
                        <Text style={styles.dayText}>내일의 야구</Text>
                        <View style={styles.arrowImgBox}>
                            <Image source={require('@/assets/icons/right-arrow.png')} resizeMode="contain" />
                        </View>
                    </TouchableOpacity>
                </View>
                <GameInfoCard />
                <Calendar />
            </ScrollView>

            {/* Floating Button */}
            <TouchableOpacity
                activeOpacity={0.95}
                style={styles.floatingButton}
                onPress={() => console.log('Floating Button Pressed')}>
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
    tabMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tabMenuButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    todayText: {
        fontSize: 16,
        color: 'black',
        fontWeight: '600',
        lineHeight: 22.4,
    },
    dayText: {
        fontSize: 12,
        color: '#95938B',
        fontWeight: '600',
    },
    arrowImgBox: {
        height: 20,
        width: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
