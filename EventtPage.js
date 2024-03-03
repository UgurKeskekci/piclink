// EventPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput, StyleSheet, Alert  } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppState } from './AppStateContext';
import FullSizePhoto from './FullSizePhoto';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EventPage = ({ route, navigation }) => {
  const { event } = route.params;
  const { state, dispatch } = useAppState();
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [isInviteModalVisible, setInviteModalVisible] = useState(false);
  const [isManageModalVisible, setManageModalVisible] = useState(false);


  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  
  useEffect(() => {
    
    loadStoredPhotos();
  }, []);

  const loadStoredPhotos = async () => {
    try {
      const storedPhotos = await AsyncStorage.getItem(`event_${event.name}_photos`);
      if (storedPhotos) {
        setSelectedPhotos(JSON.parse(storedPhotos));
      }
    } catch (error) {
      console.error('Error loading stored photos:', error);
    }
  };

  const savePhotosToStorage = async (photos) => {
    try {
      await AsyncStorage.setItem(`event_${event.name}_photos`, JSON.stringify(photos));
    } catch (error) {
      console.error('Error saving photos to storage:', error);
    }
  };

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        const newPhotos = [...selectedPhotos, { uri: result.uri, caption: newPhotoCaption }];
        setSelectedPhotos(newPhotos);
        setNewPhotoCaption('');
        setModalVisible(false);

       
        savePhotosToStorage(newPhotos);
      }
    } catch (error) {
      console.error('ImagePicker Error:', error);
    }
  };

  const renderPhotos = () => {
    return selectedPhotos.map((photo, index) => (
      <TouchableOpacity key={index} onPress={() => setSelectedPhotoIndex(index)}>
        <View style={{ margin: 2 }}>
          <Image source={{ uri: photo.uri }} style={{ width: 115, height: 120 }} />
        </View>
      </TouchableOpacity>
    ));
  };

  const handleShowQRCode = () => {
    // Implement QR code display logic here
    console.log('Show QR Code');
    setInviteModalVisible(false);
  };

  const handleSendLink = () => {
    // Implement link sending logic here
    console.log('Send Link');
    setInviteModalVisible(false);
  };


  const handleManageEvent = () => {
    setManageModalVisible(true);
  };

  const handleDeleteEvent = () => {
    console.log('Deleting event:', event);
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            console.log('Deleting...');
            // Dispatch an action to delete the event from the global state
            dispatch({ type: 'DELETE_EVENT', payload: event });
            navigation.goBack(); // Navigate back to the previous screen
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };




  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{event.name}</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={() => setInviteModalVisible(true)}>
            <Text style={styles.inviteButton}>Invite</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleManageEvent}>
            <Text style={styles.manageButton}>Manage Event</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.description}>{event.detail}</Text>
      <View style={styles.divider} />
       {/* Icons below the event description */}
  <View style={styles.iconContainer}>
    <Icon name="grid-on" size={35} color="#2460FD" style={styles.icon} />
    <Icon name="folder" size={35} color="#2460FD" style={styles.icon} />
    <Icon name="confirmation-number" size={35} color="#2460FD" style={styles.icon} />
  </View>

  {/* Divider between icons and photos */}
  <View style={styles.divider} />

      <View style={{ display:"flex",flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
        {renderPhotos()}
      </View>

      {selectedPhotoIndex !== null && (
        <FullSizePhoto photo={selectedPhotos[selectedPhotoIndex]} onClose={() => setSelectedPhotoIndex(null)} />
      )}

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addPhotoButton}>
        <View style={styles.addButtonContainer}>
          <Text style={styles.addButtonLabel}>Add Photo</Text>
        </View>
      </TouchableOpacity>


      {/* Modal for adding a new photo */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            placeholder="Photo Caption"
            value={newPhotoCaption}
            onChangeText={(text) => setNewPhotoCaption(text)}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleImagePicker} style={styles.addButton}>
            <Text style={styles.addButtonLabel}>Add Photo</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Invite Modal */}
      <Modal visible={isInviteModalVisible} animationType="slide">
        <View style={styles.inviteModal}>
          <TouchableOpacity onPress={() => setInviteModalVisible(false)} style={styles.closeInviteModalButton}>
            <Text style={styles.closeInviteModalLabel}>Close</Text>
          </TouchableOpacity>

          {/* Invite options */}
          <TouchableOpacity onPress={handleShowQRCode} style={styles.inviteOption}>
            <Text style={styles.inviteOptionLabel}>Show QR Code</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSendLink} style={styles.inviteOption}>
            <Text style={styles.inviteOptionLabel}>Copy Link</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Manage Event Modal */}
      <Modal visible={isManageModalVisible} animationType="slide">
        <View style={styles.manageModal}>
          <TouchableOpacity onPress={() => setManageModalVisible(false)} style={styles.closeManageModalButton}>
            <Text style={styles.closeManageModalLabel}>Close</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDeleteEvent} style={styles.deleteEventButton}>
            <Text style={styles.deleteEventLabel}>Delete Event</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: 'rgba(36, 96, 253, 0.10)',
    marginVertical: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 1,
  },
  icon: {
    marginRight: 50,
    marginLeft:30,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle:"normal",

  },
  manageButton: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inviteButton: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize:12,
    height:24,
    marginBottom: 16,
  },
  separator: {
    borderBottomWidth: 50,
    width:1000,
    marginLeft:-20,
    borderBottomColor: "#CBD7F3",
    marginVertical: 16,
  },
  addPhotoButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  addButtonContainer: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    elevation: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 350,
    left: 111,
    right: 111,
    backgroundColor: 'blue', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    elevation: 5,
  },
  addButtonLabel: {
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  inviteModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeInviteModalButton: {
    position: 'absolute',
    top: 55,
    right: 16,
  },
  closeInviteModalLabel: {
    color: 'blue',
    fontSize: 16,
  },
  inviteOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: '100%',
    alignItems: 'center',
  },
  inviteOptionLabel: {
    color: 'blue',
    fontSize: 16,
  },
  manageModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeManageModalButton: {
    position: 'absolute',
    top: 55,
    right: 16,
  },
  closeManageModalLabel: {
    color: 'blue',
    fontSize: 16,
  },
  deleteEventButton: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 5,
    marginTop: 16,
  },
  deleteEventLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});




export default EventPage;
