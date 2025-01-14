import { router } from "expo-router";
import React, { useState } from "react";

const consentList = [
  {
    value: "terms-of-service",
    title: "(필수) 오늘의 야구 이용약관",
  },
  {
    value: "privacy-policy",
    title: "(필수) 오늘의 야구 개인정보 수집 및\n이용에 대한 동의",
  },
] as const;

// TODO: 나중에 선택 동의 항목 추가될 시, 회원가입 flow가 끝날 때까지 끌고가야 할 수 있음
// 기획 물어보고 추가될 경우 store에 값 보관하는 방식으로 변경
const useConsent = () => {
  const [checkedConsent, setCheckedConsent] = useState<string[]>([]);

  // 단일 동의 체크
  const toggleConsent = (value: string) => {
    if (checkedConsent.includes(value)) {
      setCheckedConsent(checkedConsent.filter((item) => item !== value));
    } else {
      setCheckedConsent([...checkedConsent, value]);
    }
  };

  // 전체 동의 체크
  const toggleAllConsent = () => {
    if (checkedConsent.length === consentList.length) {
      setCheckedConsent([]);
    } else {
      setCheckedConsent(consentList.map((consent) => consent.value));
    }
  };

  // 동의 상세 페이지로 이동
  const moveToConsentDetail = (
    value: (typeof consentList)[number]["value"]
  ) => {
    // TODO: router.push() type error 발생하는 이유 확인
    router.push(`/auth/${value}`);
  };

  const isChecked = (value: string) => checkedConsent.includes(value);
  const isAllChecked = checkedConsent.length === consentList.length;

  return {
    checkedConsent,
    toggleConsent,
    toggleAllConsent,
    moveToConsentDetail,
    isChecked,
    isAllChecked,
    consentList,
  };
};

export default useConsent;
