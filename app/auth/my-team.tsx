import React from 'react'
import {StyleSheet, View, ScrollView, Image, Pressable} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import useUserJoin from '@/hooks/auth/useUserJoin'
import {useTeam} from '@/entities/match'
import {color_token} from '@/constants/theme'
import Header from '@/components/common/Header'
import {BackButton, BottomFloatSection, Button, Txt} from '@/shared/ui'
import {size} from '@/shared'

export default function MyTeamScreen() {
  const {
    setMyTeam,
    myTeam,
    moveToNextStep, //
    moveToPrevStep,
  } = useUserJoin()

  const {teams} = useTeam()

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftButton={{
          content: <BackButton onPress={moveToPrevStep} />,
        }}
      />
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.content}>
          <Txt size={24} weight="semibold" style={styles.title}>
            마이팀을{'\n'}선택해주세요
          </Txt>
          <Txt size={16} color={color_token.gray600} style={styles.subtitle}>
            마이팀은 내가 응원하고 싶은{'\n'}최애 야구 구단을 뜻해요.
          </Txt>
          <View style={styles.teamsGrid}>
            {teams?.map(team => (
              <Pressable
                key={team.id}
                style={[styles.teamButton, myTeam?.id === team.id && styles.selectedTeam]}
                onPress={() => setMyTeam(team)}>
                <Image source={team.logo} style={styles.teamLogo} />
                <Txt size={16} weight="medium" style={styles.teamName}>
                  {team.name}
                </Txt>
              </Pressable>
            ))}
          </View>
        </ScrollView>
        <BottomFloatSection>
          <Button type={myTeam ? 'primary' : 'gray'} disabled={!myTeam} onPress={moveToNextStep}>
            다음
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
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    paddingHorizontal: size(24),
    paddingBottom: size(50),
    marginTop: size(28),
  },
  title: {
    marginBottom: size(8),
  },
  subtitle: {
    marginBottom: size(24),
  },
  teamsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: size(15),
  },
  teamButton: {
    width: size(99),
    height: size(90),
    paddingTop: size(13),
    paddingBottom: size(12),
    backgroundColor: '#F0F0F0',
    borderRadius: size(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: size(2),
    borderColor: '#F0F0F0',
  },
  selectedTeam: {
    backgroundColor: 'white',
    borderWidth: size(2),
    borderColor: '#000',
  },
  teamLogo: {
    width: size(35),
    height: size(35),
    resizeMode: 'contain',
  },
  teamName: {
    textAlign: 'center',
    marginTop: size(8),
  },
})
