import {useLocalSearchParams} from 'expo-router';
import {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, View, Image, StyleSheet, ScrollView, TextInput, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import dayjs from 'dayjs';
import {DAYS_OF_WEEK} from '@/constants/day';
import LocationTypeSelector from '@/components/write/LocationTypeSelector';
import Ellipse from '@/components/common/Ellipse';
import Input from '@/components/common/Input';
import useProfile from '@/hooks/my/useProfile';
import {useTeam} from '@/entities/match';
import SelectBox from '@/components/common/SelectBox';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import useTicketDetail from '@/hooks/match/useTicketDetail';
import LottieView from 'lottie-react-native';
import * as FileSystemLegacy from 'expo-file-system/legacy';
import {useLogin} from '@/hooks/auth/useLogin';
import {logEvent} from '@/analytics/func';
import {EVENTS} from '@/analytics/event';
import {Config} from '@/config/Config';
import {size, useKeyboard} from '@/shared';
import {useAppRouter} from '@/shared';
import {BottomSheet, Txt} from '@/shared/ui';
import {CustKeyboardAvoidingView} from '@/shared/lib/useKeyboard';
import {HOME_BALLPARK_LIST, PLACE_LIST} from '@/constants/ticket';
import {TicketImageUploader} from '@/entities/ticket';
import {color_token} from '@/constants/theme';

interface ITicketEditData {
  homeTeam: {
    score: number | undefined;
    id: number;
  };
  awayTeam: {
    score: number;
    id: number;
  };
  todayImg: ImagePicker.ImagePickerAsset | undefined | string;
  place: string;
  placeType: string;
  player: string;
  food: string;
  memo: string;
  onlyMe: boolean;
  game: number;
  date: string;
  weather: string;
  result: string;
  direct_yn: boolean;
}

const Optional = ({label}: {label: string}) => {
  return (
    <View style={optionalStyles.container}>
      <Txt size={14} color={color_token.gray900} weight="medium" style={optionalStyles.label}>
        {label}
      </Txt>
      <Txt size={14} color={color_token.gray600} weight="medium" style={optionalStyles.label}>
        {' '}
        (선택)
      </Txt>
    </View>
  );
};

const EditTicketPage = () => {
  const {isKeyboardVisible} = useKeyboard();
  const {id} = useLocalSearchParams();
  const [isPending, setIsPending] = useState(false);
  const {profile} = useProfile();
  const {ticketDetail, updateTicket, initializeTicketInfo} = useTicketDetail(Number(id), Number(profile?.id));

  const [writeData, setWriteData] = useState<ITicketEditData>({
    homeTeam: {
      score: 0,
      id: 0,
    },
    awayTeam: {
      score: 0,
      id: 0,
    },
    todayImg: '',
    place: '',
    placeType: '집관',
    player: '',
    food: '',
    memo: '',
    onlyMe: false,
    direct_yn: false,
    game: 0,
    date: '',
    weather: '',
    result: '',
  });

  const homeBallpark = HOME_BALLPARK_LIST.find(ballpark => ballpark.teamName === profile.my_team?.short_name)?.value;
  const is_homeballpark = homeBallpark === writeData.place;

  useEffect(() => {
    if (ticketDetail) {
      setWriteData({
        homeTeam: {
          score: Number(ticketDetail.score_our),
          id: Number(ticketDetail.hometeam_id),
        },
        awayTeam: {
          score: Number(ticketDetail.score_opponent),
          id: Number(ticketDetail.awayteam_id),
        },
        todayImg: ticketDetail?.image || '',
        place: ticketDetail.gip_place,
        placeType: ticketDetail?.is_ballpark ? '직관' : '집관',
        player: ticketDetail.starting_pitchers,
        food: ticketDetail.food,
        memo: ticketDetail.memo,
        onlyMe: ticketDetail.only_me,
        game: ticketDetail.game,
        date: ticketDetail.date,
        weather: ticketDetail.weather,
        result: ticketDetail.result,
      } as ITicketEditData);
    }
  }, [ticketDetail]);

  const {findTeamById, teams} = useTeam();

  const title = (() => {
    const date = dayjs(ticketDetail?.date);
    return `${date.format(`M월 D일 ${DAYS_OF_WEEK[date.day()]}요일`)}`;
  })();

  const teamAwayInfo = findTeamById(writeData?.awayTeam.id);
  const teamHomeInfo = findTeamById(writeData?.homeTeam.id);

  const opponentTeam = findTeamById(
    writeData?.awayTeam.id === profile.my_team?.id ? writeData?.homeTeam.id : writeData?.awayTeam.id,
  )?.name;

  // 직접입력 여부
  const isDirectWrite = !ticketDetail?.game;

  // 마이팀이 포함되어 있는지 여부
  const isCheer = writeData.awayTeam.id === profile.my_team?.id || writeData.homeTeam.id === profile.my_team?.id;

  const [teamModalVisible, setTeamModalVisible] = useState(false);
  const [placeModalVisible, setPlaceModalVisible] = useState(false);

  const router = useAppRouter();

  const {user} = useLogin();

  const onSubmit = async () => {
    if (isPending) return;
    logEvent(EVENTS.DIARY_EDIT, {entry_id: ticketDetail?.id});
    setIsPending(true);

    const formData = new FormData();

    if (typeof writeData?.todayImg === 'string' || !writeData?.todayImg) {
      // formData.append('image', writeData?.todayImg)

      formData.append('id', String(ticketDetail?.id));

      formData.append('result', writeData?.result === '경기 취소' ? '취소' : writeData?.result || '');

      formData.append('weather', writeData?.weather || '');

      formData.append('is_ballpark', JSON.stringify(writeData?.placeType === '직관'));

      formData.append('score_our', String(writeData?.homeTeam.score));

      formData.append('score_opponent', String(writeData?.awayTeam.score));

      // 선발선수
      formData.append('starting_pitchers', writeData?.player || '');

      // 관람장소
      formData.append('gip_place', String(writeData?.place || ''));

      // 직관푸드
      formData.append('food', writeData?.food || '');

      // 오늘의 소감
      formData.append('memo', writeData?.memo || '');

      formData.append('is_homeballpark', JSON.stringify(is_homeballpark));

      //나만보기
      formData.append('only_me', JSON.stringify(writeData?.onlyMe));

      formData.append('direct_yn', JSON.stringify(isDirectWrite));

      // hometeam_id
      formData.append('hometeam_id', String(writeData?.homeTeam.id));

      formData.append('awayteam_id', String(writeData?.awayTeam.id));

      formData.append('is_cheer', JSON.stringify(isCheer));

      formData.append('is_double', JSON.stringify(isDirectWrite));

      updateTicket(formData)
        .then(() => {
          initializeTicketInfo().finally(() => router.back());
        })
        .catch(err => {
          console.log('err', err);
        })
        .finally(() => {
          setIsPending(false);
        });
    } else {
      const image = writeData?.todayImg;

      const resizedImage = await ImageResizer.createResizedImage(
        image?.uri || '', // 원본 이미지
        800, // 리사이즈할 가로 크기 (필요한 크기로 변경)
        800, // 리사이즈할 세로 크기
        'PNG', // 출력 포맷 ('JPEG' 또는 'PNG')
        100, // 품질 (0 ~ 100)
        0, // 회전 (0 = 그대로)
        undefined, // outputPath (설정하지 않으면 기본 캐시에 저장됨)
        false, // 메타데이터 유지 여부
      );

      await FileSystemLegacy.uploadAsync(`${Config.API_URL}/tickets/ticket_upd/`, resizedImage?.uri || '', {
        fieldName: 'image',
        uploadType: FileSystemLegacy.FileSystemUploadType.MULTIPART,
        parameters: {
          id: String(ticketDetail?.id),
          result: writeData?.result === '경기 취소' ? '취소' : writeData?.result || '',
          weather: writeData?.weather || '',
          is_ballpark: JSON.stringify(writeData?.placeType === '직관'),
          score_our: String(writeData?.homeTeam.score),
          score_opponent: String(writeData?.awayTeam.score),
          starting_pitchers: writeData?.player || '',
          gip_place: String(writeData?.place || ''),
          food: writeData?.food || '',
          memo: writeData?.memo || '',
          is_homeballpark: JSON.stringify(is_homeballpark),
          only_me: JSON.stringify(writeData?.onlyMe),
          direct_yn: JSON.stringify(isDirectWrite),
          hometeam_id: String(writeData?.homeTeam.id),
          awayteam_id: String(writeData?.awayTeam.id),
          is_cheer: JSON.stringify(isCheer),
          is_double: JSON.stringify(isDirectWrite),
        },
        headers: {
          'X-KBOAPP-TOKEN': user?.accessToken || '',
        },
      })
        .then((res: any) => {
          initializeTicketInfo();
          console.log('res', res);
        })
        .catch(err => {
          console.log('err', err);
        })
        .finally(() => {
          initializeTicketInfo();
          setIsPending(false);
          router.back();
        });
    }
  };

  const uploadPhoto = async () => {
    /** 갤러리 접근 권한 요청 */
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    /** 갤러리에서 이미지 선택 */
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [307, 270],
      selectionLimit: 1,
    } as ImagePicker.ImagePickerOptions);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      onChangeValue('todayImg', result.assets[0]);
    }
  };

  const onChangeValue = (key: keyof ITicketEditData, value: ITicketEditData[keyof ITicketEditData]) => {
    setWriteData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const isFalsy = (value: any) => {
    return value === undefined || value === null || value === '';
  };

  const isEnabled = Boolean(
    !isFalsy(writeData.homeTeam.score) &&
    !isFalsy(writeData.awayTeam.score) &&
    ((writeData.placeType === '직관' && writeData.place) ||
      (writeData.placeType === '직관' && ticketDetail?.gip_place) ||
      writeData.placeType === '집관'),
  );

  const inputListRef = useRef<Record<string, TextInput>>({});
  const scrollRef = useRef<ScrollView>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stepHeaderBox}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Image source={require('@/assets/icons/back.png')} style={styles.backImage} />
        </TouchableOpacity>
        <Txt size={18} weight="semibold">
          {title}
        </Txt>
      </View>
      <CustKeyboardAvoidingView>
        <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
          <View style={styles.tabMenuContainer}>
            <View style={styles.tabMenu}>
              {/* 직관, 집관 선택 컴포넌트 */}
              <LocationTypeSelector
                value={writeData.placeType} //
                onChange={value => onChangeValue('placeType', value)}
              />
            </View>
            <View style={styles.tabMenuBox}>
              <View>
                <View style={styles.scoreBox}>
                  <TextInput
                    style={styles.scoreInput}
                    maxLength={2}
                    placeholder="0"
                    value={String(writeData.homeTeam.score).replaceAll(/\D/g, '')}
                    placeholderTextColor="#ddd"
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'}
                    returnKeyType="next"
                    submitBehavior="newline"
                    onSubmitEditing={() => inputListRef.current['opponent'].focus()}
                    onChangeText={value =>
                      onChangeValue('homeTeam', {
                        ...writeData.homeTeam,
                        score: value ? Number(value.replaceAll(/\D/g, '')) : undefined,
                      })
                    }
                    ref={ref => {
                      if (ref) inputListRef.current['our'] = ref;
                    }}
                  />
                  <View style={styles.ellipseBox}>
                    <Ellipse />
                    <Ellipse />
                  </View>
                  <TextInput
                    style={styles.scoreInput}
                    maxLength={2}
                    value={String(writeData.awayTeam.score).replaceAll(/\D/g, '')}
                    placeholder="0"
                    placeholderTextColor="#ddd"
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'}
                    returnKeyType="done"
                    onChangeText={value =>
                      onChangeValue('awayTeam', {
                        ...writeData.awayTeam,
                        score: value ? Number(value.replaceAll(/\D/g, '')) : undefined,
                      })
                    }
                    ref={ref => {
                      if (ref) inputListRef.current['opponent'] = ref;
                    }}
                  />
                </View>
                <View style={styles.teamNmBox}>
                  <Txt size={14} style={styles.teamNmText}>
                    {teamHomeInfo?.short_name}
                  </Txt>
                  <Txt size={14} style={styles.teamNmText}>
                    {teamAwayInfo?.short_name}
                  </Txt>
                </View>
              </View>

              <TicketImageUploader //
                onChange={image => onChangeValue('todayImg', image)}
              />

              {(() => {
                if (isDirectWrite) {
                  return (
                    <SelectBox
                      label={'오늘의 상대구단'}
                      placeholder={'상대구단을 선택해주세요'}
                      value={opponentTeam}
                      onPress={() => setTeamModalVisible(true)}
                    />
                  );
                }

                if (!isCheer) return null;
                return (
                  <Input
                    label="오늘의 상대구단"
                    value={opponentTeam} //
                    editable={false}
                  />
                );
              })()}

              {writeData.placeType === '집관' ? (
                <Input
                  label={<Optional label="오늘의 집관장소" />}
                  value={writeData?.place}
                  onChangeText={value => onChangeValue('place', value)}
                  placeholder="집관 장소를 기록해주세요"
                  maxLength={20}
                  ref={ref => {
                    if (ref) inputListRef.current['gip-place'] = ref;
                  }}
                  returnKeyType="next"
                  submitBehavior="newline"
                  onSubmitEditing={() => inputListRef.current['player'].focus()}
                />
              ) : (
                <>
                  {!isDirectWrite ? (
                    <Input
                      label="오늘의 경기구장"
                      value={ticketDetail.gip_place} //
                      editable={false}
                    />
                  ) : (
                    <SelectBox
                      label={'오늘의 경기구장'}
                      placeholder={'경기구장을 선택해주세요'}
                      value={writeData?.place}
                      onPress={() => setPlaceModalVisible(true)}
                    />
                  )}
                </>
              )}

              <Input
                label={<Optional label="오늘의 선발선수" />}
                value={writeData?.player} //
                onChangeText={value => onChangeValue('player', value)}
                placeholder="선수 이름을 기록해주세요"
                maxLength={20}
                ref={ref => {
                  if (ref) inputListRef.current['player'] = ref;
                }}
                returnKeyType="next"
                submitBehavior="newline"
                onSubmitEditing={() => inputListRef.current['food'].focus()}
              />

              <Input
                label={<Optional label="오늘의 직관푸드" />}
                value={writeData?.food} //
                onChangeText={value => onChangeValue('food', value)}
                placeholder="오늘 먹은 직관푸드를 기록해주세요"
                maxLength={25}
                ref={ref => {
                  if (ref) inputListRef.current['food'] = ref;
                }}
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() => {
                  inputListRef.current['thoughts'].focus();
                  scrollRef.current?.scrollToEnd();
                }}
              />

              <Input
                label={
                  <View style={styles.inputTitleBox}>
                    <Txt size={14} weight="medium" color={color_token.gray900}>
                      오늘의 소감
                    </Txt>
                    <TouchableOpacity
                      style={styles.onlyMeBox}
                      onPress={() =>
                        setWriteData(prev => ({
                          ...prev,
                          onlyMe: !prev?.onlyMe,
                        }))
                      }
                      activeOpacity={1}>
                      <Image
                        source={
                          writeData?.onlyMe
                            ? require('@/assets/icons/onlyMeOnCheck.png')
                            : require('@/assets/icons/onlyMeOffCheck.png')
                        }
                        resizeMode="contain"
                        style={styles.checkboxIcon}
                      />
                      <Txt size={12}>나만보기</Txt>
                    </TouchableOpacity>
                  </View>
                }
                value={writeData?.memo}
                onChangeText={value => onChangeValue('memo', value)}
                placeholder="오늘의 소감을 기록해주세요"
                maxLength={500}
                multiline={true}
                numberOfLines={6}
                style={styles.thoughtsInput}
                ref={ref => {
                  if (ref) inputListRef.current['thoughts'] = ref;
                }}
              />
            </View>
          </View>
        </ScrollView>
      </CustKeyboardAvoidingView>
      {isKeyboardVisible && Platform.OS === 'android' ? null : (
        <FooterButton isEnabled={isEnabled} isPending={isPending} onSubmit={onSubmit} />
      )}
      {/* {Platform.OS === 'ios' && <FooterButton isEnabled={isEnabled} isPending={isPending} onSubmit={onSubmit} />} */}

      <BottomSheet
        isOpen={teamModalVisible}
        duration={250}
        height={394}
        onPressOverlay={() => setTeamModalVisible(false)}>
        <View style={styles.teamModalContent}>
          <Txt size={18} weight="bold">
            오늘의 상대구단
          </Txt>
          <View style={styles.optionsContainer}>
            {teams?.map(team => (
              <TouchableOpacity
                key={team.id}
                style={[styles.optionButton, opponentTeam === team.name && styles.selectedOption]}
                activeOpacity={1}
                onPress={() =>
                  onChangeValue('awayTeam', {
                    ...writeData.awayTeam,
                    id: team.id,
                  })
                }>
                <Image source={team.logo} style={styles.logoImg} resizeMode="contain" />
                <Txt
                  size={14}
                  weight={opponentTeam === team.name ? 'bold' : 'medium'}
                  color={opponentTeam === team.name ? color_token.primary : color_token.gray900}>
                  {team.name}
                </Txt>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </BottomSheet>
      <BottomSheet
        isOpen={placeModalVisible}
        duration={250}
        height={400}
        onPressOverlay={() => setPlaceModalVisible(false)}>
        <View style={styles.placeModalContent}>
          <Txt size={18} weight="bold">
            오늘의 경기구단
          </Txt>
          <View style={styles.optionsContainer}>
            {PLACE_LIST.map(option => (
              <TouchableOpacity
                key={option.value}
                style={[styles.placeOptionButton, writeData?.place === option.label && styles.selectedOption]}
                activeOpacity={1}
                onPress={() => onChangeValue('place', option.value)}>
                <Txt
                  size={14}
                  weight={writeData?.place === option.label ? 'bold' : 'medium'}
                  color={writeData?.place === option.label ? color_token.primary : color_token.gray900}>
                  {option.label}
                </Txt>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const FooterButton = ({
  isEnabled,
  isPending,
  onSubmit,
}: {
  isEnabled: boolean;
  isPending: boolean;
  onSubmit: () => void;
}) => {
  return (
    <View style={styles.footerButtonBox}>
      <TouchableOpacity
        style={[styles.footerButton, isEnabled ? styles.activeButton : styles.disabledButton]}
        onPress={onSubmit}
        disabled={!isEnabled}>
        {isPending ? (
          <LottieView source={require('@/assets/lottie/loading.json')} autoPlay loop style={styles.lottieView} />
        ) : (
          <Txt size={16} weight="bold" color={isEnabled ? color_token.white : color_token.gray600}>
            티켓 정보 변경하기
          </Txt>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default EditTicketPage;

const styles = StyleSheet.create({
  backImage: {
    width: size(16),
    height: size(28),
  },
  container: {
    flex: 1,
    backgroundColor: color_token.gray150,
    paddingHorizontal: size(20),
    position: 'relative',
  },
  stepHeaderBox: {
    paddingVertical: size(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  tabMenuContainer: {
    flex: 1,
    borderRadius: size(10),
    marginTop: size(24),
  },
  tabMenuBox: {
    alignItems: 'center',
    gap: size(24),
    paddingHorizontal: size(14),
    borderBottomLeftRadius: size(15),
    borderBottomRightRadius: size(15),
    marginBottom: size(20),
    backgroundColor: color_token.white,
    paddingBottom: size(32),
    borderTopWidth: 1,
    borderColor: color_token.gray300,
  },
  scoreBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: size(4),
    marginTop: size(28),
  },
  scoreInput: {
    width: size(55),
    height: size(55),
    fontSize: size(24),
    fontWeight: '700',
    borderWidth: 1,
    textAlign: 'center',
    borderColor: color_token.gray350,
    borderRadius: size(5),
  },
  ellipseBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: size(10),
    gap: size(6),
  },
  teamNmBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: size(25),
  },
  teamNmText: {
    width: 55,
    textAlign: 'center',
  },
  thoughtsInput: {
    height: size(125),
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  footerButtonBox: {
    width: '100%',
    marginTop: size(16),
    position: 'sticky',
    bottom: 0,
  },
  footerButton: {
    backgroundColor: color_token.gray300,
    height: size(50),
    borderRadius: size(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: color_token.gray300,
  },
  inputTitleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  onlyMeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    gap: size(4),
  },
  checkboxIcon: {
    width: size(18),
    height: size(18),
  },
  teamModalContent: {
    width: '100%',
    backgroundColor: color_token.white,
    height: size(394),
    borderTopLeftRadius: size(20),
    borderTopRightRadius: size(20),
    padding: size(24),
  },
  placeModalContent: {
    width: '100%',
    backgroundColor: color_token.white,
    height: size(400),
    borderTopLeftRadius: size(20),
    borderTopRightRadius: size(20),
    padding: size(24),
  },
  optionsContainer: {
    marginTop: size(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: size(12),
  },
  optionButton: {
    height: size(48),
    borderWidth: 1,
    maxWidth: '48%',
    minWidth: '48%',
    borderColor: color_token.gray350,
    borderRadius: size(10),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: size(22),
    gap: size(8),
  },
  placeOptionButton: {
    maxWidth: '48%',
    minWidth: '48%',
    height: size(48),
    borderWidth: 1,
    borderColor: color_token.gray350,
    borderRadius: size(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectedOption: {
    borderColor: color_token.primary,
    backgroundColor: color_token.primary_10,
    flexDirection: 'row',
  },
  logoImg: {
    width: 24,
    height: 24,
  },
  tabMenu: {
    backgroundColor: color_token.white,
    width: '100%',
    height: size(59),
    borderTopLeftRadius: size(10),
    borderColor: color_token.gray300,
    borderTopRightRadius: size(10),
  },
  activeButton: {
    backgroundColor: color_token.primary,
  },
  lottieView: {
    width: size(100),
    height: size(100),
  },
});

const optionalStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    lineHeight: size(19.6),
  },
});
