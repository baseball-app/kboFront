import {StyleSheet, View, Text, FlatList, SafeAreaView, ScrollView} from 'react-native'

import useNotification from '@/hooks/notification/useNotification'
import NotificationCard from '@/components/alarm/NotificationCard'
import {format} from 'date-fns'
import EmptyNotificationView from '@/components/alarm/EmptyNotificationView'

const AlarmScreen = () => {
    const {notificationList, onClickNotification, fetchNextPage} = useNotification()

    return (
        <ScrollView style={styles.wrapper}>
            <FlatList
                data={notificationList} //  || notificationList
                keyExtractor={_ => String(_.id)}
                ListEmptyComponent={<EmptyNotificationView />}
                ListHeaderComponent={<View style={{height: 24}} />}
                ListFooterComponent={<View style={{height: 24}} />}
                onEndReached={fetchNextPage}
                onEndReachedThreshold={0.6}
                ItemSeparatorComponent={() => <View style={{height: 12}} />}
                renderItem={({item}) => (
                    <View style={{marginInline: 24}}>
                        <NotificationCard
                            type={item.type}
                            userName={item.user_info.nickname}
                            isRead={item.is_read}
                            date={format(item.created_at, 'YY.MM.DD')}
                            onClick={() => onClickNotification(item)}
                        />
                    </View>
                )}
            />
        </ScrollView>
    )
}
export default AlarmScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#F3F2EE',
    },
    headerTitleBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 24,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#171716',
    },
})
