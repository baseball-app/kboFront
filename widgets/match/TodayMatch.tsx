import {DAYS_OF_WEEK} from '@/constants/day';
import dayjs from 'dayjs';
import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Pressable} from 'react-native';
import {ROUTES, size, useAppRouter} from '@/shared';
import {TeamWithInfo, useMatch, useTeam} from '@/entities/match';
import useProfile from '@/hooks/my/useProfile';
import Ellipse from '@/components/common/Ellipse';
import {color_token} from '@/constants/theme';
import {Txt} from '@/shared/ui/Txt';

const TodayMatch = () => {
  const {matchingList} = useMatch({selectedDate: new Date()});
  const {profile} = useProfile();

  const todayMyTeamMatch = matchingList //
    .find(({team_away_info, team_home_info}) => {
      return team_away_info.id === profile.my_team?.id || team_home_info.id === profile.my_team?.id;
    });

  const {findTeamById} = useTeam();

  const router = useAppRouter();

  const home_info = findTeamById(todayMyTeamMatch?.team_home_info.id);
  const away_info = findTeamById(todayMyTeamMatch?.team_away_info.id);

  const game_date = dayjs(todayMyTeamMatch?.game_date);
  const weekDay = DAYS_OF_WEEK[game_date.day()];
  const title = `${game_date.format(`M월D일(${weekDay}) HH:mm`)}`;

  return (
    <View style={styles.container}>
      {todayMyTeamMatch ? (
        <MatchInfo
          title={title}
          home_info={home_info}
          away_info={away_info}
          ballpark_name={todayMyTeamMatch.ballpark_info.name.slice(0, 2)}
        />
      ) : (
        <EmptyMatch myTeamName={profile.my_team?.short_name || ''} />
      )}

      <Pressable style={styles.seeMoreButton} onPress={() => router.navigate(ROUTES.MATCH_TAB)}>
        <View style={styles.imgBox}>
          <Image
            source={require('@/assets/icons/see-more-calendar.png')}
            resizeMode="contain"
            style={{width: size(24), height: size(24)}}
          />
        </View>
        <Txt size={13} weight="medium" color={color_token.gray800}>
          경기일정 더보기
        </Txt>
      </Pressable>
    </View>
  );
};

const MatchInfo = ({
  title,
  home_info,
  away_info,
  ballpark_name,
}: {
  title: string;
  home_info: TeamWithInfo | undefined;
  away_info: TeamWithInfo | undefined;
  ballpark_name: string;
}) => {
  return (
    <View style={styles.gameInfoBox}>
      <View style={styles.titleSection}>
        <Txt size={14} weight="medium" color={color_token.gray900}>
          {title}
        </Txt>
        <Txt size={14} weight="regular" color={color_token.gray600}>
          {` ・ ${ballpark_name.slice(0, 2)}`}
        </Txt>
      </View>
      <View style={styles.matchTeamBox}>
        <View style={styles.matchTeamInfo}>
          <Image source={home_info?.logo} resizeMode="contain" style={{width: size(35), height: size(35)}} />
          <View style={styles.ellipseBox}>
            <Ellipse size={5} />
            <Ellipse size={5} />
          </View>
          <Image source={away_info?.logo} resizeMode="contain" style={{width: size(35), height: size(35)}} />
        </View>
        <View style={styles.teamNameBox}>
          <Txt size={14} weight="medium" color={color_token.gray900} numberOfLines={1} style={styles.teamText}>
            {home_info?.short_name}
          </Txt>
          <Txt size={14} weight="medium" color={color_token.gray900} numberOfLines={1} style={styles.teamText}>
            {away_info?.short_name}
          </Txt>
        </View>
      </View>
    </View>
  );
};

const EmptyMatch = ({myTeamName}: {myTeamName: string}) => {
  return (
    <View style={styles.noGameInfoBox}>
      <Txt size={16} weight="regular" color={color_token.black}>
        <Txt weight="bold" color={color_token.black}>
          {myTeamName}
        </Txt>
        의 경기 일정이 없어요.
      </Txt>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00184F',
    borderRadius: size(10),
    width: '100%',
    marginTop: size(12),
    marginBottom: size(26),
    paddingHorizontal: size(10),
    paddingVertical: size(12),
    gap: size(12),
    flexDirection: 'column',
    alignItems: 'center',
  },
  gameInfoBox: {
    backgroundColor: '#fff',
    borderRadius: size(10),
    width: '100%',
    padding: size(12),
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noGameInfoBox: {
    backgroundColor: '#fff',
    borderRadius: size(10),
    width: '100%',
    height: size(113),
    padding: size(12),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchTeamBox: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginTop: size(12),
  },
  matchTeamInfo: {
    flexDirection: 'row',
    gap: size(20),
    width: '100%',
    justifyContent: 'center',
  },
  ellipseBox: {
    flexDirection: 'column',
    gap: size(6),
    justifyContent: 'center',
  },
  teamNameBox: {
    width: '100%',
    flexDirection: 'row',
    gap: size(45),
    justifyContent: 'center',
    marginTop: size(4),
  },
  seeMoreButton: {
    // width: size(133),
    paddingHorizontal: size(12),
    height: size(26),
    borderRadius: size(40),
    flexDirection: 'row',
    backgroundColor: color_token.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBox: {
    width: size(24),
    height: size(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamText: {
    textAlign: 'center',
    width: size(35),
  },
});

export {TodayMatch};
