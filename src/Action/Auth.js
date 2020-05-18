import {observable, computed, action} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import {
  CLIENT_SECRET,
  CLIENT_SECRET_ID,
  LOGIN,
  REGISTER,
  TOKEN,
} from '../Config/URL';
import NetInfo from '@react-native-community/netinfo';
export default class Auth {
  @observable logged = null;
  @observable online = false;
  @observable access_token = null;
  @observable expires_in = null;
  @observable refresh_token = null;
  @observable token_type = null;

  @action CheckLogin = async () => {};
  @action GetToken = async () => {
    const value = await AsyncStorage.getItem('@access_token');
    return value;
  };

  @action CheckOnline = async () => {
    let CHKINT = await NetInfo.fetch();

    return CHKINT.isConnected === true;
  };

  @action Logout = async () => {
    await AsyncStorage.removeItem('@token_type');
    await AsyncStorage.removeItem('@access_token');
    await AsyncStorage.removeItem('@refresh_token');
    this.logged = false;
  };

  @action Register = async values => {
    let POST_REG = await fetch(REGISTER, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: values.fname,
        email: values.email,
        password: values.password,
        phone: values.phone,
        street: values.street,
        city: values.city,
        state: values.state,
        pin_code: values.pincode,
      }),
    });
    return await POST_REG.json();
  };

  @action Login = async values => {
    let POST_ORDER = await fetch(LOGIN, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
        grant_type: 'password',
        client_id: CLIENT_SECRET_ID,
        client_secret: CLIENT_SECRET,
        provider: 'users',
      }),
    });

    let LoginData = await POST_ORDER.json();
    if (POST_ORDER.status === 200) {
      await AsyncStorage.setItem('@token_type', LoginData.token_type);
      await AsyncStorage.setItem('@access_token', LoginData.access_token);
      await AsyncStorage.setItem('@refresh_token', LoginData.refresh_token);
      this.access_token = LoginData.access_token;
      this.expires_in = LoginData.expires_in;
      this.refresh_token = LoginData.refresh_token;
      this.token_type = LoginData.token_type;
      return true;
    } else {
      return false;
    }
  };
}
