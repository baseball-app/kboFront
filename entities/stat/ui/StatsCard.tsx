import {color_token} from '@/constants/theme';
import {useTeam} from '@/entities/match';
import {Pressable, size} from '@/shared';
import {Txt} from '@/shared/ui';
import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface StatsCardProps {
  image: React.ReactNode;
  title: React.ReactNode;
  matchResult: {
    win: number;
    lose: number;
    draw: number;
  };
  onPress?: () => void;
}

const _StatsCard = ({image, title, matchResult, onPress}: StatsCardProps) => {
  const totalMatchCount = matchResult.win + matchResult.draw + matchResult.lose;
  const winRate = Math.ceil(
    totalMatchCount === 0 ? 0 : Math.floor(((matchResult.win || 0) / totalMatchCount) * 10000) / 100,
  );

  return (
    <Pressable style={styles.container} onPress={onPress}>
      {image}
      <View style={styles.contents}>
        <View style={styles.body}>
          {title}
          <View style={styles.resultBox}>
            <Text style={styles.percentage}>{winRate}%</Text>
            <Text style={styles.resultText}>
              ({matchResult.win || 0}승 {matchResult.draw || 0}무 {matchResult.lose || 0}패)
            </Text>
          </View>
        </View>
        <Image source={require('@/assets/icons/chevron_right_gray.png')} style={styles.chevronIcon} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color_token.gray200,
    gap: size(14),
    padding: size(16),
    paddingRight: size(8),
    paddingBottom: size(18),
    borderRadius: size(16),
  },
  contents: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  body: {gap: 4},
  resultBox: {
    gap: size(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 22,
    color: '#161617',
  },
  resultText: {
    fontSize: 16,
    fontWeight: 500,
  },
  chevronIcon: {
    width: 18,
    height: 18,
  },
});

const HomeAwayStatsCard = ({
  title,
  matchResult,
  onPress,
}: {
  title: '홈' | '원정';
  matchResult: {
    win: number;
    draw: number;
    lose: number;
  };
  onPress: () => void;
}) => {
  const image = useMemo(() => {
    return (
      <View
        style={{
          width: size(35),
          height: size(35),
          backgroundColor: color_token.white,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={title === '홈' ? require('@/assets/icons/home_stats.png') : require('@/assets/icons/away_stats.png')}
          style={{width: size(24), height: size(24)}}
        />
      </View>
    );
  }, [title]);

  return (
    <_StatsCard
      onPress={onPress}
      image={image}
      title={
        <Txt size={14} weight="regular">
          {title} 승률
        </Txt>
      }
      matchResult={matchResult}
    />
  );
};

const TeamStatsCard = ({
  onPress,
  teamName,
  matchResult,
}: {
  onPress: () => void;
  teamName: string;
  matchResult: {
    win: number;
    draw: number;
    lose: number;
  };
}) => {
  const {findTeamByName} = useTeam();
  const team = findTeamByName(teamName);

  const image = useMemo(() => {
    return <Image source={team?.logo} style={{width: 35, height: 35}} />;
  }, [team]);

  if (!team) return null;

  return (
    <_StatsCard
      image={image}
      onPress={onPress}
      title={
        <View style={{flexDirection: 'row', gap: 1}}>
          <Txt size={14} weight="bold">
            {teamName}
          </Txt>
          <Txt size={14} weight="regular">
            와의 경기 승률
          </Txt>
        </View>
      }
      matchResult={matchResult}
    />
  );
};

const StadiumStatsCard = ({
  stadiumName,
  matchResult,
  onPress,
}: {
  stadiumName: string;
  matchResult: {
    win: number;
    draw: number;
    lose: number;
  };
  onPress: () => void;
}) => {
  const stadium = stadiumList.find(stadium => stadium.name.replaceAll(/\s/g, '') === stadiumName.replaceAll(/\s/g, ''));
  const image = useMemo(
    () => (
      <View
        style={{
          width: size(35),
          height: size(35),
          backgroundColor: stadium?.color,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={require('@/assets/icons/ic_stadium.png')} style={{width: size(24), height: size(24)}} />
      </View>
    ),
    [stadiumName],
  );

  if (!stadium) return null;

  return (
    <_StatsCard
      onPress={onPress}
      image={image}
      title={
        <Txt size={14} weight="regular">
          {stadiumName} 승률
        </Txt>
      }
      matchResult={matchResult}
    />
  );
};

export {HomeAwayStatsCard, TeamStatsCard, StadiumStatsCard};

const stadiumList = [
  {name: '부산 사직 야구장', color: '#4EB7E7'},
  {
    name: '대구 삼성 라이온즈 파크',
    color: '#2273FE',
  },
  {
    name: '대전 한화 생명 볼파크',
    color: '#FF5A08',
  },
  {
    name: '잠실 종합운동장 야구장',
    color: '#0A7B5F',
  },
  {
    name: '인천 SSG 랜더스 필드',
    color: '#FFCB67',
  },
  {
    name: '고척 스카이돔',
    color: '#EF4B87',
  },
  {
    name: '수원 KT위즈파크',
    color: '#4B4B4B',
  },
  {
    name: '광주 기아 챔피언스 필드',
    color: '#E61A1E',
  },
  {
    name: '창원 NC파크',
    color: '#16C9CE',
  },
];
