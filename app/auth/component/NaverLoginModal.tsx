import React from 'react';
import { Modal, SafeAreaView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

interface NaverLoginModalProps {
  showWebView: boolean;
  setShowWebView: (show: boolean) => void;
  NAVER_AUTH_URL: string;
  onLoginSuccess: (code: string) => void;
}

const NaverLoginModal: React.FC<NaverLoginModalProps> = ({
  showWebView,
  setShowWebView,
  NAVER_AUTH_URL,
  onLoginSuccess,
}) => {

  return (
    <Modal
      visible={showWebView}
      onRequestClose={() => setShowWebView(false)}
      animationType="slide"
    >
      <SafeAreaView style={styles.webViewContainer}>
        <WebView
          source={{ uri: NAVER_AUTH_URL }}
          onNavigationStateChange={(navState) => {

            console.log("navState", navState)
            try{
              if (navState.url.startsWith(NAVER_AUTH_URL)) {
                const code = navState.url.split('code=')[1]?.split('&')[0];
              if (code) {
                console.log('Naver auth code:', code);
                onLoginSuccess(code);
                setShowWebView(false);
              }
            }
          }
          catch (error) {
            console.log(error);
          }
          }}
          injectedJavaScript={`
            (function() {
              var style = document.createElement('style');
              style.textContent = 'header { display: none !important; }';
              document.head.appendChild(style);
            })();
          `}
        />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setShowWebView(false)}
        >
          <Text>Close</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    
  },
});

export default NaverLoginModal;
