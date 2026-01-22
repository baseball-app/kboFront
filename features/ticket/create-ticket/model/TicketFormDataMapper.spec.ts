import {IWriteDataInterface, TicketFormDataMapper} from './TicketFormDataMapper';

const mockMatch = {
  id: 1,
  team_home_info: {
    id: 10,
    name: 'Home Team',
    logo_url: 'http://home.logo.url',
  },
  team_away_info: {
    id: 20,
    name: 'Away Team',
    logo_url: 'http://away.logo.url',
  },
  ballpark_info: {
    id: 100,
    name: 'Sample Ballpark',
    team_info: {
      id: 10,
      name: 'Home Team',
      logo_url: 'http://home.logo.url',
    },
  },
  game_date: '2025-02-16',
  score_home: 3,
  score_away: 2,
  is_finished: true,
};

const mockWriteStore = {
  selectedMatch: mockMatch,
  selectedMatchResult: '승리',
  selectedWeather: '비',
  selectedPlace: '직관',
  selectedDate: new Date(),
};

const matchTeam = {id: 0, logo_url: 'http://logo.com', name: '테스트팀', short_name: '테스트팀'};

const mockWriteData: IWriteDataInterface = {
  todayScore: {
    our: '3',
    opponent: '2',
  },
  todayImg: undefined,
  matchTeam: matchTeam,
  matchPlace: 'TestPlace',
  matchPlayer: '',
  todayFood: '',
  todayThoughts: '',
  onlyMeCheck: false,
};

const mockResizeImageFn = jest.fn().mockReturnValue('http://resized-image-uri.com');

describe('TicketFormDataMapper', () => {
  it('이미지가 있을 경우, di 함수(resizeImage)가 호출된다.', async () => {
    const ticketFormDataMapper = new TicketFormDataMapper(mockResizeImageFn);
    const formData = await ticketFormDataMapper.toFormData({
      writeStore: mockWriteStore,
      writeData: {...mockWriteData, todayImg: {uri: '1234'} as any},
      myTeamId: 10,
    });

    expect(mockResizeImageFn).toHaveBeenCalledTimes(1);
  });

  it('"경기 취소"일 경우, "취소"로 서버에 요청해야 한다.', async () => {
    const ticketFormDataMapper = new TicketFormDataMapper(mockResizeImageFn);
    const formData = await ticketFormDataMapper.toFormData({
      writeStore: {...mockWriteStore, selectedMatchResult: '경기 취소'},
      writeData: mockWriteData,
      myTeamId: 10,
    });

    expect(formData.get('result')).toBe('취소');
  });

  it('내가 응원하는 팀이 홈/어웨이팀일 경우', async () => {
    const ticketFormDataMapper = new TicketFormDataMapper(mockResizeImageFn);
    const formData = await ticketFormDataMapper.toFormData({
      writeStore: mockWriteStore,
      writeData: mockWriteData,
      myTeamId: 10,
    });

    expect(formData.get('is_cheer')).toBe('true');
  });

  it('타팀 경기일 경우', async () => {
    const ticketFormDataMapper = new TicketFormDataMapper(mockResizeImageFn);
    const formData = await ticketFormDataMapper.toFormData({
      writeStore: mockWriteStore,
      writeData: mockWriteData,
      myTeamId: 99999,
    });

    expect(formData.get('is_cheer')).toBe('false');
  });

  it('정규 경기일 경우(더블헤더/직접 입력이 아닐 경우)', async () => {
    const ticketFormDataMapper = new TicketFormDataMapper(mockResizeImageFn);
    const formData = await ticketFormDataMapper.toFormData({
      writeStore: mockWriteStore,
      writeData: mockWriteData,
      myTeamId: 10,
    });

    expect(formData.get('direct_yn')).toBe('false');
    expect(formData.get('is_double')).toBe('false');
  });

  it('정규 경기이고 직관일 경우', async () => {
    const ticketFormDataMapper = new TicketFormDataMapper(mockResizeImageFn);
    const formData = await ticketFormDataMapper.toFormData({
      writeStore: mockWriteStore,
      writeData: mockWriteData,
      myTeamId: 10,
    });

    expect(formData.get('score_our')).toBe('3');
    expect(formData.get('score_opponent')).toBe('2');
    expect(formData.get('gip_place')).toBe('Sample Ballpark');
    expect(formData.get('is_ballpark')).toBe('true');

    // TODO: 1. 이게 뭔지 여쭤보기
    // TODO: 2. 티켓 작성/수정 api FormData -> JSON 타입으로 변경 어떨지
    // TODO: 3. 중복된 값으로 보이는 것들이 몇가지 있음 (정리하면서 변경하는 게 어떨지 ?)
    // TODO: 3-1. 예를 들어서 direct_yn이랑 is_double같은 경우에는 같은 값으로 보임
    // TODO: 3-2. is_homeballpark도 프론트에서 계산하는 것보다는 백엔드에서 계산하는 게 정확하지 않을까함
    expect(formData.get('is_homeballpark')).toBe('false');
  });

  it('정규 경기이고 집관일 경우', async () => {
    const ticketFormDataMapper = new TicketFormDataMapper(mockResizeImageFn);
    const formData = await ticketFormDataMapper.toFormData({
      writeStore: {...mockWriteStore, selectedPlace: '집관'},
      writeData: mockWriteData,
      myTeamId: 10,
    });

    expect(formData.get('score_our')).toBe('3');
    expect(formData.get('score_opponent')).toBe('2');
    expect(formData.get('is_ballpark')).toBe('false');

    // 이것만 다름
    expect(formData.get('gip_place')).toBe('TestPlace');
  });

  it('정규 경기가 아니고(더블헤더 경기인 경우) 직관일 경우', async () => {
    const ticketFormDataMapper = new TicketFormDataMapper(mockResizeImageFn);

    const formData = await ticketFormDataMapper.toFormData({
      writeStore: {...mockWriteStore, selectedMatch: null},
      writeData: mockWriteData,
      myTeamId: 9999,
    });

    expect(formData.get('hometeam_id')).toBe('9999');
    expect(formData.get('awayteam_id')).toBe('0');
    expect(formData.get('is_ballpark')).toBe('true');
  });

  it('정규 경기가 아니고(더블헤더 경기인 경우) 집관일 경우', async () => {
    const ticketFormDataMapper = new TicketFormDataMapper(mockResizeImageFn);

    const formData = await ticketFormDataMapper.toFormData({
      writeStore: {...mockWriteStore, selectedMatch: null, selectedPlace: '집관'},
      writeData: mockWriteData,
      myTeamId: 9999,
    });

    expect(formData.get('hometeam_id')).toBe('9999');
    expect(formData.get('awayteam_id')).toBe('0');
    expect(formData.get('is_ballpark')).toBe('false');
  });
});
