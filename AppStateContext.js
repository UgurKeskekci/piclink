import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  events: [],
};

const AppStateContext = createContext();

const appStateReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case 'DELETE_EVENT':
      const eventIdToDelete = action.payload.id; // Use id for comparison
      const updatedEvents = state.events.filter((event) => event.id !== eventIdToDelete);
      saveEventsToStorage(updatedEvents);
      return {
        ...state,
        events: updatedEvents,
      };
    default:
      return state;
  }
};

const saveEventsToStorage = async (events) => {
  try {
    await AsyncStorage.setItem('events', JSON.stringify(events));
  } catch (error) {
    console.error('Error saving events to storage:', error);
  }
};

const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  useEffect(() => {
    const loadEventsFromStorage = async () => {
      try {
        const storedEvents = await AsyncStorage.getItem('events');
        if (storedEvents) {
          dispatch({ type: 'SET_EVENTS', payload: JSON.parse(storedEvents) });
        }
      } catch (error) {
        console.error('Error loading events from storage:', error);
      }
    };

    loadEventsFromStorage();
  }, []);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

export { AppStateProvider, useAppState };
