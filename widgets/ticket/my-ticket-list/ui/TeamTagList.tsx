import {TeamTag, useTeam} from '@/entities/match';
import useProfile from '@/hooks/my/useProfile';
import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {size} from '@/shared';
import {Txt} from '@/shared/ui';

const TeamTagList = ({
  selectedTeamId,
  onChangeTeam,
}: {
  selectedTeamId: number;
  onChangeTeam: (teamId: number) => void;
}) => {
  const {teams} = useTeam();
  const {profile} = useProfile();

  const tagLines = useMemo(() => {
    const teamList = [
      {id: 0, short_name: '최애 경기'}, //
      ...(teams || []),
      {id: 999, short_name: '타구단'},
    ].filter(club => club.id !== profile.my_team?.id);

    return [teamList.slice(0, 5), teamList.slice(5, 10), teamList.slice(10)];
  }, [teams, profile.my_team?.id]);

  return (
    <View style={styles.ticketBox}>
      <Txt size={18} weight="semibold">
        상대 구단별 경기티켓
      </Txt>
      <View style={styles.tabContainer}>
        {tagLines.map((tagLine, index) => (
          <View key={index} style={{flexDirection: 'row', gap: size(8)}}>
            {tagLine.map(club => (
              <TeamTag
                key={club.id}
                name={club.short_name || ''}
                isActive={club.id === selectedTeamId}
                onClick={() => onChangeTeam(club.id)}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ticketBox: {
    paddingHorizontal: size(20),
    paddingVertical: size(24),
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingTop: size(15),
    gap: size(8),
    rowGap: size(12),
  },
});

export {TeamTagList};
