import { SecureStore } from 'expo';

const storeSession = async (sessionObj) => {
  await SecureStore.setItemAsync('kdmApp-localSession', JSON.stringify(sessionObj));
};

const removeSession = async () => {
  await SecureStore.deleteItemAsync('kdmApp-localSession');
};

const fetchSession = async () => {
  try {
    const sessionString = await SecureStore.getItemAsync('kdmApp-localSession');
    const sessionObj = await JSON.parse(sessionString);
    return sessionObj;
  } catch (e) {
    return null;
  }
};

export {
  storeSession,
  removeSession,
  fetchSession,
};
