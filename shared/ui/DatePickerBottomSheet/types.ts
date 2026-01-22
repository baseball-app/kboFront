import {DimensionValue, ViewStyle} from 'react-native';

/** WheelPicker 컬럼 설정 */
export interface WheelPickerColumn {
  /** 컬럼 고유 키 (예: 'year', 'month', 'day', 'season') */
  key: string;
  /** 선택 가능한 항목 배열 (예: ['2024년', '2025년']) */
  items: string[];
  /** 초기 선택값 (예: '2024년') */
  initialValue: string;
  /** 컬럼 너비 (예: '49%' 또는 '30%') */
  width: DimensionValue;
}

/** 선택된 값들을 담는 객체 타입 */
export type SelectedValues = Record<string, string>;

/** DatePickerBottomSheet 기본 컴포넌트 Props */
export interface DatePickerBottomSheetProps {
  /** BottomSheet 열림 여부 */
  isOpen: boolean;
  /** 상단 타이틀 텍스트 */
  title: string;
  /** WheelPicker 컬럼 설정 배열 */
  columns: WheelPickerColumn[];
  /** 완료 버튼 클릭 시 콜백 (선택된 값들 전달) */
  onConfirm: (values: SelectedValues) => void;
  /** 취소 버튼 클릭 시 콜백 */
  onCancel: () => void;
  /** BottomSheet 높이 (기본값: 320) */
  height?: number;
  /** 애니메이션 duration (기본값: 350) */
  duration?: number;
  /** 확인 버튼 텍스트 (기본값: '완료') */
  confirmText?: string;
  /** 취소 버튼 텍스트 (기본값: '취소') */
  cancelText?: string;
  /** 컬럼 컨테이너 추가 스타일 */
  containerStyle?: ViewStyle;
}

/** 연도 범위 설정 */
export interface YearRange {
  start: number;
  end: number;
}

/** YearMonthPicker Props */
export interface YearMonthPickerProps {
  isOpen: boolean;
  initialYear: number;
  initialMonth: number;
  yearRange: YearRange;
  onConfirm: (year: number, month: number) => void;
  onCancel: () => void;
  title?: string;
}

/** DatePicker Props */
export interface DatePickerProps {
  isOpen: boolean;
  initialDate: Date;
  yearRange: YearRange;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
  title?: string;
}

/** SeasonPicker Props */
export interface SeasonPickerProps {
  isOpen: boolean;
  initialYear: number;
  initialSeason: string;
  yearRange: YearRange;
  seasonList: string[];
  onConfirm: (year: number, season: string) => void;
  onCancel: () => void;
  title?: string;
}
