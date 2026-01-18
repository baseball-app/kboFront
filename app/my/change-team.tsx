import React, {useState} from 'react'
import {StyleSheet, View, TouchableOpacity, ScrollView, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import useProfile from '@/hooks/my/useProfile'
import Header from '@/components/common/Header'
import {useTeam} from '@/entities/match'
import {color_token} from '@/constants/theme'
import {size} from '@/shared'
import {BottomFloatSection, Button, Txt} from '@/shared/ui'

export default function ChangeScreen() {
  const {updateMyTeam, profile} = useProfile()
  const {teams} = useTeam()
  const [selectedTeamId, setSelectedTeamId] = useState(profile.my_team?.id)

  const isChanged = selectedTeamId !== profile.my_team?.id

  return (
    <SafeAreaView style={styles.container}>
      <Header title="마이팀 변경" />
      <View style={{flex: 1}}>
        <View style={styles.headerDescription}>
          <Txt size={16} color={color_token.gray500} style={styles.headerDescriptionText}>
            내가 설정한 마이팀을 기준으로{'\n'}데이터가 새로 작성됩니다.
          </Txt>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.teamsGrid}>
            {teams?.map(team => (
              <TouchableOpacity
                key={team.id}
                style={[styles.teamButton, selectedTeamId === team.id && styles.selectedTeam]}
                onPress={() => setSelectedTeamId(team.id)}>
                <Image source={team.logo} style={styles.teamLogo} />
                <Txt size={16} weight="medium" style={styles.teamName}>
                  {team.name}
                </Txt>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <BottomFloatSection>
          <Button
            type={isChanged ? 'primary' : 'gray'}
            disabled={!isChanged}
            onPress={() => updateMyTeam(selectedTeamId)}>
            변경하기
          </Button>
        </BottomFloatSection>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color_token.white,
    position: 'relative',
  },
  content: {
    flex: 1,
    paddingHorizontal: size(24),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerDescription: {
    alignItems: 'center',
    marginBottom: size(28),
    marginTop: size(20),
  },
  headerDescriptionText: {
    textAlign: 'center',
  },
  teamsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: size(16),
  },
  teamButton: {
    width: '30%',
    aspectRatio: 99 / 90,
    paddingTop: size(16),
    paddingBottom: size(10),
    backgroundColor: color_token.gray200,
    borderRadius: size(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: color_token.gray200,
  },
  selectedTeam: {
    backgroundColor: color_token.white,
    borderWidth: 2,
    borderColor: color_token.black,
  },
  teamLogo: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  teamName: {
    textAlign: 'center',
    marginTop: size(8),
  },
  footer: {
    paddingHorizontal: size(24),
    paddingBottom: size(16),
  },
  nextButton: {
    backgroundColor: color_token.gray400,
    padding: size(15),
    borderRadius: size(8),
    alignItems: 'center',
  },
  nextButtonActive: {
    backgroundColor: color_token.primary,
  },
})
