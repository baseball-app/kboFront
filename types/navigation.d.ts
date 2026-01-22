declare global {
  namespace ReactNavigation {
    interface RootParamList {
      index: undefined;
      auth: undefined;
      '(tabs)': undefined;
      // "(tabs)/home": undefined;
      // ...이곳에 타입을 추가하시면 됩니다.
    }
  }
}

// 타입 체크를 위한 빈 export
export {};
