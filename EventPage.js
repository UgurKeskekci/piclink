import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';  
const EventPage = () => {
  const [eventName, setEventName] = useState('Your Event Name');
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        // Update here to use assets array
        setSelectedPhotos([...selectedPhotos, ...result.assets]);
      }
    } catch (error) {
      console.error('ImagePicker Error:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>{eventName}</Text>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginBottom: 16 }} />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {selectedPhotos.map((photo) => (
          <Image key={photo.uri} source={{ uri: photo.uri }} style={{ width: 100, height: 100, margin: 4 }} />
        ))}
      </View>

      <TouchableOpacity onPress={handleImagePicker} style={{ marginTop: 16 }}>
        <View
          style={{
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white' }}>Add Photo</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EventPage;