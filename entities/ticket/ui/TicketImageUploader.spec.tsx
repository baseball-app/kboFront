import {useUploadPhoto} from '@/entities/ticket/model/useUploadPhoto'
import {render, fireEvent, waitFor} from '@testing-library/react-native'
import {TicketImageUploader} from './TicketImageUploader'

jest.mock('@/entities/ticket/model/useUploadPhoto')

describe('TicketImageUploader', () => {
  //
  const mockUploadFn = jest.fn().mockResolvedValue({uri: 'test'})

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useUploadPhoto as jest.Mock).mockReturnValue({
      uploadPhoto: mockUploadFn,
    })
  })

  it('이미지를 선택하면 onChange함수가 동작한다.', async () => {
    const mockOnChangeFn = jest.fn()
    const mockAsset = {uri: 'test-uri'} as any
    mockUploadFn.mockResolvedValue(mockAsset)

    const {getByRole} = render(<TicketImageUploader uri="123" onChange={mockOnChangeFn} />)

    const pressable = getByRole('button')
    fireEvent.press(pressable)

    await waitFor(() => {
      expect(mockOnChangeFn).toHaveBeenCalledWith(mockAsset)
      expect(mockOnChangeFn).toHaveBeenCalledTimes(1)
    })
  })

  it('uri가 존재하면 화면에는 image가 렌더링 된다.', () => {
    const mockOnChangeFn = jest.fn()
    const testUri = 'https://example.com/test-image.jpg'

    const {getByTestId} = render(<TicketImageUploader uri={testUri} onChange={mockOnChangeFn} />)

    const image = getByTestId('ticket-image')
    expect(image).toBeTruthy()
    expect(image.props.source.uri).toBe(testUri)
  })

  it('uri가 존재하지 않으면 "오늘의 사진을 넣어주세요" 텍스트가 렌더링된다.', () => {
    const mockOnChangeFn = jest.fn()

    const {getByText} = render(<TicketImageUploader uri={undefined} onChange={mockOnChangeFn} />)

    expect(getByText('오늘의 사진을 넣어주세요')).toBeTruthy()
  })
})
