import { AsyncStorage } from 'react-native';

const storeSession = async (sessionObj) => {
  await AsyncStorage.setItem('@kdmApp:localSession', JSON.stringify(sessionObj));
};

const fetchSession = async () => {
  try {
    const sessionString = await AsyncStorage.getItem('@kdmApp:localSession');
    const sessionObj = await JSON.parse(sessionString);
    return sessionObj;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export {
  storeSession,
  fetchSession,
};
