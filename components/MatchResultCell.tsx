import React, {useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {findMatchResultImage} from '@/constants/match';
import {useTeam} from '@/entities/match';
import {TicketCalendarLog} from '@/entities/ticket/types';
import {Pressable, size} from '@/shared';
import {color_token} from '@/constants/theme';
import {Txt} from '@/shared/ui';

//TODO: 애니메이션 및 컴포넌트 리팩터링 필요함
const MatchResultCell = ({
  data,
  onPress,
  isLoading,
}: {
  data: TicketCalendarLog[];
  onPress: () => void;
  isLoading: boolean;
}) => {
  const {findTeamByName} = useTeam();

  const {matchResult, opponent, myTeam} = useMemo(() => {
    const res = data[0];
    if (!res) return {matchResult: null, myTeam: null, opponent: null};
    return {
      matchResult: res.result,
      myTeam: findTeamByName(res.home),
      opponent: findTeamByName(res.opponent_name),
    };
  }, [data, findTeamByName]);

  return (
    <Pressable style={{alignItems: 'center'}} onPress={onPress}>
      {matchResult ? (
        <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
          <Image source={findMatchResultImage(matchResult)} style={styles.moodContainer} />
          <Txt size={10} weight="regular" color={color_token.gray900} style={styles.teamText}>
            {myTeam?.short_name}:{opponent?.short_name}
          </Txt>
          {data.length > 1 && (
            <View style={{flexDirection: 'row', gap: 3}}>
              <View style={[styles.swiperDot]} />
              <View style={[styles.swiperDot]} />
            </View>
          )}
        </View>
      ) : (
        <View style={[styles.moodContainer]} />
      )}
    </Pressable>
  );
};

export default MatchResultCell;

const styles = StyleSheet.create({
  moodContainer: {
    width: size(28),
    height: size(28),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: size(20),
    marginBottom: size(2),
  },
  swiperDot: {
    width: size(5),
    height: size(5),
    borderRadius: size(5),
    backgroundColor: color_token.primary,
  },
  teamText: {
    width: '100%',
    textAlign: 'center',
  },
});
