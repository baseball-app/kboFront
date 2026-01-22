import {useTeam} from '@/entities/match';
import {Pressable} from '@/shared';
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
    backgroundColor: '#EEEFF3',
    gap: 14,
    padding: 16,
    paddingRight: 8,
    paddingBottom: 18,
    borderRadius: 16,
  },
  contents: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 14 * 1.4,
  },
  body: {gap: 4},
  resultBox: {
    gap: 6,
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
          width: 35,
          height: 35,
          backgroundColor: '#fff',
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={title === '홈' ? require('@/assets/icons/home_stats.png') : require('@/assets/icons/away_stats.png')}
          style={{width: 24, height: 24}}
        />
      </View>
    );
  }, [title]);

  return (
    <_StatsCard
      onPress={onPress}
      image={image}
      title={<Text style={styles.title}>{title} 승률</Text>}
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
          <Text style={[styles.title, {fontWeight: 700}]}>{teamName}</Text>
          <Text style={styles.title}>와의 경기 승률</Text>
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
  const stadium = stadiumList.find(stadium => stadium.name === stadiumName);
  const image = useMemo(
    () => (
      <View
        style={{
          width: 35,
          height: 35,
          backgroundColor: stadium?.color,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={require('@/assets/icons/ic_stadium.png')} style={{width: 24, height: 24}} />
      </View>
    ),
    [stadiumName],
  );

  if (!stadium) return null;

  return (
    <_StatsCard
      onPress={onPress}
      image={image}
      title={<Text style={styles.title}>{stadiumName} 승률</Text>}
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
