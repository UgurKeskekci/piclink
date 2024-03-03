import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, StyleSheet } from "react-native";
import { useAppState } from "./AppStateContext";
import Icon from "react-native-vector-icons/Ionicons"; 

const MainPage = ({ navigation }) => {
  const { state, dispatch } = useAppState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [newEventName, setNewEventName] = useState("");
  const [newEventDetail, setNewEventDetail] = useState("");

  const handleCreateEvent = () => {
    const newEvent = {
      id: state.events.length + 1,
      name: newEventName,
      detail: newEventDetail,
    };

   
    dispatch({ type: "ADD_EVENT", payload: newEvent });

    setNewEventName("");
    setNewEventDetail("");
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("EventPage", { event: item })}>
      <View
        style={{
          width: 100,
          height: 120,
          padding: 12,
          borderWidth: 1,
          borderRadius: 20,
          borderColor: "rgba(36, 96, 253, 0.10)",
          marginBottom: 8,
          margin: 10,
          backgroundColor: "rgba(36, 96, 253, 0.10)",
        }}
      >
        <Text>{item.name}</Text>
        <View style={styles.separator} />
        <Text>{item.detail}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        My Events
      </Text>
      <FlatList
        data={state.events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={3}
      />
      <View style={styles.container}>
        {/* Home Icon */}
        <Icon name="home-outline" size={30} color="black" style={styles.icon} />

        {/* "+" Button */}
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.buttonContainer}>
          <View style={styles.addButton}>
            <Text style={{ color: "white", fontSize: 33 }}>+</Text>
          </View>
        </TouchableOpacity>

        {/* Profile Icon */}
        <Icon name="person-outline" size={30} color="black" style={styles.icon} />
      </View>

      {/* Modal for creating a new event */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <TextInput
            placeholder="Event Name"
            value={newEventName}
            onChangeText={(text) => setNewEventName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Event Detail"
            value={newEventDetail}
            onChangeText={(text) => setNewEventDetail(text)}
            multiline
            style={styles.input}
          />
          <TouchableOpacity onPress={handleCreateEvent} style={styles.createEventButton}>
            <Text style={{ color: "white"}}>Create Event</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 2,
    borderBottomColor: "rgba(36, 96, 253, 0.10)",
    marginVertical: 6,
  },
  container: {
    flexDirection: "row",
    backgroundColor: 'rgba(36, 96, 253, 0.10)',
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
    position: 'relative',
  },
  buttonContainer: {
    maxWidth: 58,
    justifyContent: 'center',
    flexDirection: 'column',
    display: 'flex',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -40,
    left:-20
  },
  createEventButton:{
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 500, // Adjust this value to position the button within the container
    left: '35%', // Center the button horizontally within the container
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    minWidth:150,
    maxWidth:150
  },
  icon: {
    padding: 10,
  },
});

export default MainPage;
