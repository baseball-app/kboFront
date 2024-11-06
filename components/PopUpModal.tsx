import { horizontalScale } from "@/utils/metrics";
import { moderateScale } from "@/utils/metrics";
import { verticalScale } from "@/utils/metrics";
import { Modal, TouchableOpacity, View, Text } from "react-native";
import { StyleSheet } from "react-native";

interface PopUpModalProps {
  isInviteModalVisible: boolean;
  setIsInviteModalVisible: (value: boolean) => void;
  isWithdrawalModalVisible: boolean;
  setIsWithdrawalModalVisible: (value: boolean) => void;
}

const PopUpModal = ({
  isInviteModalVisible,
  setIsInviteModalVisible,
  isWithdrawalModalVisible,
  setIsWithdrawalModalVisible,
}: PopUpModalProps) => {

  const handleInviteModalClose = () => {
    setIsInviteModalVisible(false);
  };

  const handleWithdrawalModalClose = () => {
    setIsWithdrawalModalVisible(false);
  };

  if (isInviteModalVisible) {
    return (
      <Modal
        visible={isInviteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleInviteModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderContainer}>
              <Text style={styles.modalHeaderTitle}>안내</Text>
            </View>

            <View style={styles.modalTextContainer}>
              <Text style={styles.modalText}>
                초대코드가 복사되었어요! {"\n"} 초대코드를 공유해주세요.
              </Text>
            </View>

            {/* <View style={styles.buttonInviteContainer}> */}
              <TouchableOpacity
                style={[styles.inviteButton]}
                onPress={handleInviteModalClose}
              >
                <Text style={styles.modalButtonText}>확인</Text>
              </TouchableOpacity>
            {/* </View> */}
          </View>
        </View>
      </Modal>
    );
  } else if (isWithdrawalModalVisible) {
    return (
      <Modal
        visible={isWithdrawalModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleWithdrawalModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderContainer}>
              <Text style={styles.modalHeaderTitle}>안내</Text>
            </View>

            <View style={styles.modalTextContainer}>
              <Text style={styles.modalText}>
                회원 탈퇴를 진행하시겠습니까?{"\n"}
                회원 탈퇴시, 계정은 삭제되며 복구되지 않습니다.
              </Text>
            </View>

            <View style={styles.buttonWithdrawalContainer}>
              <TouchableOpacity
                style={[styles.cancelButton]}
                onPress={handleWithdrawalModalClose}
              >
                <Text style={[styles.cancelButtonText]}>취소</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.withdrawButton]}
                onPress={handleWithdrawalModalClose}
              >
                <Text style={styles.withdrawalButtonText}>회원탈퇴</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
};

export default PopUpModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    backgroundColor: "white",
    padding: 20,
    // width: '100%',
    alignItems: "center",
  },
  modalHeaderTitle: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    lineHeight: 24,
    fontSize: moderateScale(16),
    textAlign: "center",
  },
  modalButton: {
    // flex: 1,
    width: "100%",
    paddingVertical: verticalScale(12),
    borderRadius: 8,
  },
  withdrawalButtonText: {
    color: "white",
    fontSize: moderateScale(16),
    fontWeight: "600",
    textAlign: "center",
  },

  modalButtonText: {
    color: "white",
    fontSize: moderateScale(16),
    fontWeight: "600",
    textAlign: "center",
  },
  inviteButton: {
    // flex: 1,
    // width: "100%",
    width: "100%",
    paddingVertical: verticalScale(12),
    borderRadius: 8,
    backgroundColor: "#1E5EF4",
  },    
  modalHeaderContainer: {
    marginBottom: verticalScale(24),
  },
  modalTextContainer: {
    marginBottom: verticalScale(28),
  },
  buttonInviteContainer: {
    // width: '100%',
  },

  buttonWithdrawalContainer: {
    flexDirection: 'row',
    gap: horizontalScale(8),
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#EEEEEE',
    flex: 1,
    paddingVertical: verticalScale(12),
    borderRadius: 8,
  },
  withdrawButton: {
    backgroundColor: '#1E5EF4',
    flex: 1,
    paddingVertical: verticalScale(12),
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#000000',
      fontSize: moderateScale(16),
    fontWeight: "600",
    textAlign: "center",
  },
});
