import * as ImagePicker from 'expo-image-picker';
import {useUploadPhoto} from './useUploadPhoto';
import {openNoPermissionAlert} from '@/shared/lib/openNoPermissionAlert';

jest.mock('@/shared/lib/openNoPermissionAlert');

describe('useUploadPhoto', () => {
  const mockImagePicker = ImagePicker as jest.Mocked<typeof ImagePicker>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('갤러리 접근 권한이 없을 경우, openNoPermissionAlert() 함수를 호출한다.', async () => {
    mockImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValue({
      granted: false,
      canAskAgain: false,
      status: 'denied',
    } as any);

    const {uploadPhoto} = useUploadPhoto();
    await uploadPhoto();

    expect(openNoPermissionAlert).toHaveBeenCalledTimes(1);
    expect(mockImagePicker.launchImageLibraryAsync).not.toHaveBeenCalled();
  });

  it('권한이 허용되고 이미지가 선택되면, 선택된 이미지를 반환한다.', async () => {
    const mockAsset = {
      uri: 'file:///test/image.jpg',
      width: 100,
      height: 100,
      type: 'image',
      fileName: 'test-image.jpg',
      fileSize: 1000,
    } as ImagePicker.ImagePickerAsset;

    mockImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValue({
      granted: true,
      canAskAgain: true,
      status: 'granted',
    } as any);

    mockImagePicker.launchImageLibraryAsync.mockResolvedValue({
      canceled: false,
      assets: [mockAsset],
    } as any);

    const {uploadPhoto} = useUploadPhoto();
    const result = await uploadPhoto();

    expect(result).toEqual(mockAsset);
    expect(openNoPermissionAlert).not.toHaveBeenCalled();
  });

  it('사용자가 이미지 선택을 취소하면, null을 반환한다.', async () => {
    mockImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValue({
      granted: true,
      canAskAgain: true,
      status: 'granted',
    } as any);

    mockImagePicker.launchImageLibraryAsync.mockResolvedValue({
      canceled: true,
      assets: [],
    } as any);

    const {uploadPhoto} = useUploadPhoto();
    const result = await uploadPhoto();

    expect(result).toBeNull();
    expect(openNoPermissionAlert).not.toHaveBeenCalled();
  });
});
