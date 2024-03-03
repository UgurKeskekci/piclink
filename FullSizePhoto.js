// FullSizePhoto.js
import React from 'react';
import { View, Image, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FullSizePhoto = ({ photo, onClose }) => {
  return (
    <Modal visible={true} transparent={true}>
      <View style={styles.container}>
        <Image source={{ uri: photo.uri }} style={styles.fullSizeImage} />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  fullSizeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 16,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default FullSizePhoto;
