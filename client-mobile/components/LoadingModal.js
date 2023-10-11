import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const LoadingModal = ({ isVisible }) => {
  return (
    <Modal isVisible={isVisible} animationIn="fadeIn" animationOut="fadeOut">
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingModal;
