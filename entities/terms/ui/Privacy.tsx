import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {View} from 'react-native'

const Privacy = () => {
  return (
    <>
      <View>
        <Text style={styles.headerTitle}>개인정보 처리방침</Text>
        <Text style={styles.paragraph}>
          이 개인정보 처리 방침(이하 "방침")은 오늘의 야구 (이하 "회사")가 제공하는 오늘의 야구-야구 모바일 애플리케이션
          및 관련 서비스 (이하 "서비스")에서 이용자의 개인정보를 처리하는 방법과 그에 따른 권리와 의무를 규정하는 것을
          목적으로 합니다. 이 방침은 회사와 이용자 사이의 권리와 의무를 규정하며, 개인정보 처리 시 준수해야 할 사항을
          안내합니다.
        </Text>
      </View>

      <View>
        <Text style={styles.sectionTitle}>1. 수집하는 개인정보의 항목 및 수집 방법</Text>
        <Text style={styles.paragraph}>1.1. 회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집할 수 있습니다.</Text>
        <Text style={styles.bulletPoint}>
          <Text style={styles.bullet}>{'\u2022'}</Text>
          <Text style={styles.bulletText}>
            {' '}
            이메일 주소, 1.2. 개인정보는 서비스 이용 과정에서 사용자가 직접 제공하는 경우, 자동 수집된 정보, 제3자로부터
            제공받는 경우 등 다양한 방법으로 수집될 수 있습니다.
          </Text>
        </Text>
      </View>

      <View>
        <Text style={styles.sectionTitle}>2. 개인정보의 처리 목적</Text>
        <Text style={styles.paragraph}>2.1. 회사는 개인정보를 다음과 같은 목적으로 처리합니다.</Text>
        <Text style={styles.bulletPoint}>
          <Text style={styles.bullet}>{'\u2022'}</Text>
          <Text style={styles.bulletText}> 가입한 사용자의 계정 관리 및 직관 기록 백업, 복구</Text>
        </Text>
      </View>

      <View>
        <Text style={styles.sectionTitle}>3. 개인정보의 보유 및 이용 기간</Text>
        <Text style={styles.paragraph}>
          3.1. 회사는 개인정보 보유 및 이용 기간을 명확히 지정하며, 해당 기간이 종료되거나 처리 목적이 달성되면
          개인정보를 파기합니다.
        </Text>
      </View>

      <View>
        <Text style={styles.sectionTitle}>4. 개인정보의 제3자 제공</Text>
        <Text style={styles.paragraph}>
          4.1. 회사는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 관련 법령에 따라 필요한 경우 이용자의
          동의를 얻거나 법적 절차를 거쳐 제공할 수 있습니다.
        </Text>
      </View>

      <View>
        <Text style={styles.sectionTitle}>5. 개인정보의 파기</Text>
        <Text style={styles.paragraph}>
          5.1. 회사는 개인정보 처리 목적이 달성된 경우 즉시 개인정보를 파기합니다. 파기 방법은 안전한 방법으로 진행되며,
          관련 법령 및 내부 방침에 따라 진행됩니다.
        </Text>
      </View>

      <View>
        <Text style={styles.sectionTitle}>6. 이용자의 권리와 행사 방법</Text>
        <Text style={styles.paragraph}>
          6.1. 이용자는 개인정보에 대한 열람, 정정, 삭제, 처리정지 요구 등의 권리를 행사할 수 있습니다. 권리 행사를
          위해서는 회사의 고객 지원 채널을 이용하거나 별도의 절차를 따르셔야 합니다.
        </Text>
      </View>

      <View>
        <Text style={styles.sectionTitle}>7. 계정 삭제 절차</Text>
        <Text style={styles.paragraph}>7.1. 사용자가 계정을 삭제하려면 다음 단계를 따라야 합니다.</Text>
        <Text style={styles.paragraph}> 1. 서비스 내 "마이" 메뉴로 이동합니다.</Text>
        <Text style={styles.paragraph}> 2. "회원 탈퇴" 옵션을 클릭한 후 안내에 따라 절차를 진행합니다.</Text>
        <Text style={styles.paragraph}> 3. 최종 확인 후 계정이 삭제됩니다.</Text>
      </View>

      <View>
        <Text style={styles.sectionTitle}>8. 삭제되거나 보관되는 데이터 유형 및 추가 보관 기간</Text>
        <Text style={styles.paragraph}>8.1. 계정 삭제 시 즉시 삭제되는 데이터:</Text>
        <Text style={styles.bulletPoint}>
          <Text style={styles.bullet}>{'\u2022'}</Text>
          <Text style={styles.bulletText}> 사용자 프로필 정보</Text>
        </Text>
        <Text style={styles.bulletPoint}>
          <Text style={styles.bullet}>{'\u2022'}</Text>
          <Text style={styles.bulletText}> 서비스 내 활동 기록</Text>
        </Text>
        <Text style={styles.paragraph}>8.2. 법적 요구 또는 내부 정책에 따라 일정 기간 보관되는 데이터:</Text>
        <Text style={styles.bulletPoint}>
          <Text style={styles.bullet}>{'\u2022'}</Text>
          <Text style={styles.bulletText}>
            {' '}
            고객 문의 및 지원 기록: 서비스 품질 개선 및 법적 대응을 위해 최대 3년간 보관
          </Text>
        </Text>
      </View>

      <View>
        <Text style={styles.sectionTitle}>9. 개인정보의 안전성 확보 조치</Text>
        <Text style={styles.paragraph}>
          9.1. 회사는 개인정보를 안전하게 처리하기 위해 기술적, 관리적, 물리적 조치를 취하고 있습니다.
        </Text>
      </View>

      <View>
        <Text style={styles.sectionTitle}>10. 개인정보 처리 방침의 변경</Text>
        <Text style={styles.paragraph}>
          10.1. 회사는 필요한 경우 개인정보 처리 방침을 변경할 수 있으며, 변경 사항은 서비스 내 공지사항을 통해
          공지됩니다.
        </Text>
      </View>

      {/* Add more sections here */}
      <View style={{marginBottom: 16}}>
        <Text style={styles.sectionTitle}>11. 문의처</Text>
        <Text style={styles.paragraph}>
          11.1. 개인정보 처리와 관련하여 궁금한 사항이 있으면 baseballday@naver.com 로 문의하실 수 있습니다.
        </Text>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 10,
  },
  bullet: {
    fontSize: 14,
    lineHeight: 20,
    marginRight: 5,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
})

export {Privacy}
