import {render, waitFor} from '@testing-library/react-native';
import {VersionGuard} from '../provider/VersionGuard';
import {Alert, Text} from 'react-native';
import {useAppVersionGuard} from '../model/useAppVersionGuard';
import * as useAppVersionGuardModule from '../model/useAppVersionGuard';

jest.mock('../model/useAppVersionGuard');

describe('VersionGuard', () => {
  const mockCheckVersion = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    const actualUseAppVersionGuard =
      jest.requireActual<typeof useAppVersionGuardModule>('../model/useAppVersionGuard').useAppVersionGuard;

    (useAppVersionGuard as jest.Mock).mockImplementation(() => {
      const actual = actualUseAppVersionGuard();
      return {
        ...actual,
        checkVersion: mockCheckVersion,
      };
    });
  });

  it('업데이트가 필요하지 않을 때, 자식 컴포넌트는 렌더링 되어야 한다.', async () => {
    mockCheckVersion.mockResolvedValue([false, 'storePath']);

    const {queryByText} = render(
      <VersionGuard>
        <Text>안녕하세요</Text>
      </VersionGuard>,
    );

    // 초기에는 렌더링되지 않아야 함
    expect(queryByText('안녕하세요')).not.toBeOnTheScreen();

    // 비동기 작업 완료 후 렌더링 확인
    await waitFor(() => {
      expect(queryByText('안녕하세요')).toBeOnTheScreen();
    });
  });

  it('업데이트가 필요할 때, "업데이트 필요" 메세지가 출력된다.', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    mockCheckVersion.mockResolvedValue([true, 'storePath']);

    const {queryByText} = render(
      <VersionGuard>
        <Text>안녕하세요</Text>
      </VersionGuard>,
    );

    // 비동기 작업 완료 후 렌더링 확인
    await waitFor(() => {
      expect(queryByText('안녕하세요')).not.toBeOnTheScreen();
      expect(alertSpy).toHaveBeenCalledWith('업데이트 필요', '최신 버전으로 업데이트 해주세요.', expect.any(Array));
    });
  });
});
