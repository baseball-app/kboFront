import {TeamTag, useTeam} from '@/entities/match'
import useProfile from '@/hooks/my/useProfile'
import React from 'react'
import {View, Dimensions, StyleSheet} from 'react-native'
import {size} from '@/shared'
import {Txt} from '@/shared/ui'

const width = Dimensions.get('window').width

const TeamTagList = ({
  selectedTeamId,
  onChangeTeam,
}: {
  selectedTeamId: number
  onChangeTeam: (teamId: number) => void
}) => {
  const {teams} = useTeam()
  const {profile} = useProfile()

  return (
    <View style={styles.ticketBox}>
      <Txt size={18} weight="semibold">
        상대 구단별 경기티켓
      </Txt>
      <View style={styles.tabContainer}>
        {[{id: 0, short_name: '최애 경기'}, ...(teams || []), {id: 999, short_name: '타구단'}]
          ?.filter(club => club.id !== profile.my_team?.id)
          .map((club, index) => (
            <TeamTag
              paddingHorizontal={index < 5 ? (width - 251) / 10 : index < 10 ? (width - 222) / 10 : 12}
              key={club.id}
              name={club.short_name || ''}
              isActive={club.id === selectedTeamId}
              onClick={() => onChangeTeam(club.id)}
            />
          ))}
      </View>
    </View>
  )
}

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
})

export {TeamTagList}
