import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, ImageSourcePropType} from 'react-native';
import {CalendarScreenProps} from '../../types/calendar';
import {Calendar, DateData} from 'react-native-calendars';

// import pencilIcon from '../../asset/icons/pencil.png';
// import heartIcon from '../../asset/icons/heart.png';
// import starIcon from '../../asset/icons/star.png';
// 로컬 이미지 import
const pencilIcon = require('../../../src/asset/icons/pencil.png');
const heartIcon = require('../../../src/asset/icons/heart.png');
const starIcon = require('../../../src/asset/icons/star.png');

// 이미지 타입 정의
type IconType = 'pencil' | 'heart' | 'star';

interface CustomMarking {
  customStyles: {
    container?: {
      backgroundColor?: string;
    };
    text?: {
      color: string;
    };
  };
  iconType: IconType;
}

interface MarkedDates {
  [date: string]: CustomMarking;
}

// 아이콘 매핑
const iconMapping: Record<IconType, ImageSourcePropType> = {
  pencil: pencilIcon,
  heart: heartIcon,
  star: starIcon,
};

// 커스텀 날짜 컴포넌트
const CustomDay: React.FC<any & {date?: DateData}> = ({
  date,
  state,
  marking,
}) => {
  const customMarking = marking as CustomMarking;

  if (!date) {
    return null;
  }

  return (
    <View style={[styles.customDay, customMarking?.customStyles?.container]}>
      <Text
        style={[
          styles.dayText,
          customMarking?.customStyles?.text,
          state === 'disabled' ? styles.disabledText : null,
        ]}>
        {date.day}
      </Text>
      {customMarking?.iconType && (
        <Image
          source={iconMapping[customMarking.iconType]}
          style={styles.dayImage}
        />
      )}
    </View>
  );
};

const fetchDataFromAPI = async (): Promise<MarkedDates> => {
  // API 호출을 모방한 예시
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        '2024-07-01': {
          customStyles: {
            container: {backgroundColor: 'lightblue'},
            text: {color: 'darkblue'},
          },
          iconType: 'pencil',
        },
        '2024-07-15': {
          customStyles: {
            container: {backgroundColor: 'lightgreen'},
            text: {color: 'darkgreen'},
          },
          iconType: 'heart',
        },
        '2024-07-20': {
          customStyles: {
            container: {backgroundColor: 'pink'},
            text: {color: 'red'},
          },
          iconType: 'star',
        },
      });
    }, 1000);
  });
};

const MyCalendar: React.FC<CalendarScreenProps> = ({navigation}) => {
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDataFromAPI();
        console.log('API에서 받아온 데이터:', data); // 디버깅용 로그
        setMarkedDates(data);
      } catch (error) {
        console.error('데이터 로딩 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const onDayPress = (day: DateData) => {
    console.log('선택한 날짜:', day);
    navigation.navigate('홈');
  };

  if (isLoading) {
    return <Text>로딩 중...</Text>;
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>메인 캘린더 화면</Text>
      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        markingType={'custom'}
        dayComponent={CustomDay}
        hideExtraDays={true}
        enableSwipeMonths={true}
      />
      <Text>마킹된 날짜: {Object.keys(markedDates).join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  customDay: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    textAlign: 'center',
    fontSize: 16,
  },
  disabledText: {
    color: 'gray',
  },
  dayImage: {
    width: 20,
    height: 20,
    position: 'absolute',
    bottom: -10,
  },
});

export default MyCalendar;
