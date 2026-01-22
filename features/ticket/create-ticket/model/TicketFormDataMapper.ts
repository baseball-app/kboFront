import {Team} from '@/entities/match';
import {IDailyLogWriteState} from '@/slice/dailyWriteSlice';
import {CustomFormData, IFormData} from '@/types/IFormData';
import dayjs from 'dayjs';
import * as ImagePicker from 'expo-image-picker';

interface IWriteDataInterface {
  todayImg: ImagePicker.ImagePickerAsset | undefined;
  matchTeam: Team | null;
  matchPlace: string;
  matchPlayer: string;
  todayFood: string;
  todayThoughts: string;
  onlyMeCheck: boolean;
  todayScore: {
    our: string;
    opponent: string;
  };
}

type TicketRegisterRequestDto = {
  date: string;

  game: number | any;
  hometeam_id: number;
  awayteam_id: number;

  result: string;
  weather: string;

  score_our: number;
  score_opponent: number;

  starting_pitchers: string;
  gip_place: string;
  food: string;
  memo: string;
  only_me: boolean;
  image: string;
  is_cheer: boolean;

  // 자동으로 계산되는 데이터들
  direct_yn: boolean;
  is_double: boolean;

  is_ballpark: boolean; // 직관 or 집관
  is_homeballpark: boolean; // 홈 or 어웨이
};

class TicketFormDataMapper {
  constructor(
    private imageResizer: (uri: string) => Promise<{uri: string}>, //
  ) {}

  private _transform = (params: {
    writeStore: IDailyLogWriteState;
    writeData: IWriteDataInterface;
    myTeamId: number;
  }): TicketRegisterRequestDto => {
    const {writeStore, writeData, myTeamId} = params;

    const ballparkInfo = writeStore.selectedMatch?.ballpark_info;
    const teamAwayInfo = writeStore.selectedMatch?.team_away_info;
    const teamHomeInfo = writeStore.selectedMatch?.team_home_info;
    const isBallpark = writeStore.selectedPlace === '직관';

    const date = dayjs(writeStore.selectedDate).format('YYYY-MM-DD');

    const game = writeStore.selectedMatch?.id || '';
    const hometeam_id = teamHomeInfo?.id || myTeamId;
    const awayteam_id = teamAwayInfo?.id || writeData.matchTeam?.id || 0;

    const result = writeStore.selectedMatchResult === '경기 취소' ? '취소' : writeStore.selectedMatchResult;
    const weather = writeStore.selectedWeather;

    const score_our = Number(writeData.todayScore.our);
    const score_opponent = Number(writeData.todayScore.opponent);

    const starting_pitchers = writeData.matchPlayer || '';
    const gip_place = isBallpark ? ballparkInfo?.name || writeData.matchPlace : writeData.matchPlace || '';

    const food = writeData.todayFood || '';
    const memo = writeData.todayThoughts || '';
    const only_me = writeData.onlyMeCheck;
    const image = writeData.todayImg?.uri || '';

    const is_cheer = teamAwayInfo?.id === myTeamId || teamHomeInfo?.id === myTeamId;
    const direct_yn = !writeStore.selectedMatch;
    const is_double = !writeStore.selectedMatch;
    const is_ballpark = isBallpark;
    const is_homeballpark = writeStore.selectedPlace === '집관';

    return {
      date,
      game,
      hometeam_id,
      awayteam_id,
      result,
      weather,
      score_our,
      score_opponent,
      starting_pitchers,
      gip_place,
      food,
      memo,
      only_me,
      image,
      is_cheer,
      direct_yn,
      is_double,
      is_ballpark,
      is_homeballpark,
    };
  };

  toDto = async (params: {
    writeStore: IDailyLogWriteState;
    writeData: IWriteDataInterface;
    myTeamId: number;
  }): Promise<TicketRegisterRequestDto> => {
    const data = this._transform(params);

    if (data.image) {
      const resizedImage = await this.imageResizer(data.image);
      return {...data, image: resizedImage.uri};
    }

    return data;
  };

  toStringDto = async (params: {
    writeStore: IDailyLogWriteState;
    writeData: IWriteDataInterface;
    myTeamId: number;
  }): Promise<Record<keyof TicketRegisterRequestDto, string>> => {
    let result = {} as Record<keyof TicketRegisterRequestDto, string>;
    const {image, ...rest} = await this.toDto(params);

    for (const r of Object.entries(rest)) {
      const [key, value] = r as [
        key: keyof TicketRegisterRequestDto,
        value: TicketRegisterRequestDto[keyof TicketRegisterRequestDto],
      ];
      if (typeof value === 'string') {
        result[key] = value;
      } else {
        result[key] = JSON.stringify(value);
      }
    }

    return result;
  };

  toFormData = async (params: {
    writeStore: IDailyLogWriteState;
    writeData: IWriteDataInterface;
    myTeamId: number;
  }): Promise<IFormData<TicketRegisterRequestDto>> => {
    const {image, ...rest} = await this.toDto(params);
    const formData = new CustomFormData<TicketRegisterRequestDto>();

    for (const r of Object.entries(rest)) {
      const [key, value] = r as [
        key: keyof TicketRegisterRequestDto,
        value: TicketRegisterRequestDto[keyof TicketRegisterRequestDto],
      ];
      if (typeof value === 'string') {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    }

    return formData;
  };
}

export {TicketFormDataMapper, IWriteDataInterface, TicketRegisterRequestDto};
