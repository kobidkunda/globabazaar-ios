import {action, observable} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import {
  ADD_PROSPECT,
  APP_CONFIG,
  APP_VERSON,
  CLIENT_SECRET,
  CLIENT_SECRET_ID,
  LOGIN,
  REGISTER,
} from '../Config/URL';
import NetInfo from '@react-native-community/netinfo';
import {ENGLISH, HINDI, NEPALI} from '../Config/Lang/language';

export default class Auth {
  @observable logged = null;
  @observable online = false;
  @observable access_token = null;
  @observable expires_in = null;
  @observable refresh_token = null;
  @observable token_type = null;
  @observable app_conf = null;
  @observable update_modal = false;
  @observable local = 'en-in';
  @observable langfile = ENGLISH;
  @observable langpopup = false;
  @observable otpretry = 3;

  @action ChangeLang = async lang => {
    this.local = lang;
    if (this.local === 'en-in') {
      this.langfile = ENGLISH;
    } else if (this.local === 'ne') {
      this.langfile = NEPALI;
    } else if (this.local === 'hi') {
      this.langfile = HINDI;
    } else {
      this.langfile = ENGLISH;
    }
    this.langpopup = false;
    console.log(this.langfile);
  };

  @action GetConfig = async () => {
    let USER_PROFILE = await fetch(APP_CONFIG, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0,
      },
    });

    let CONF = await USER_PROFILE.json();
    console.log(CONF.verson_android);
    console.log(APP_VERSON);
    this.app_conf = CONF;

    if (Number(CONF.verson_android) !== Number(APP_VERSON)) {
      this.update_modal = true;
    }

    console.log(CONF);
  };
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

  @action Register = async (values, lang) => {
    let POST_REG = await fetch(REGISTER, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: values.fname,
        last_name: values.lname,
        email: values.email,
        password: values.password,
        phone: values.phone,
        street: values.street,
        city: values.city,
        state: values.state,
        pin_code: values.pincode,
        preferred_language: lang,
      }),
    });
    // return await POST_REG.json();
    return {
      status: POST_REG,
      data: POST_REG.json(),
    };
  };

  @action SendSelfForm = async (
    values,
    signature_base64,
    gender,
    access_token,
    financial_status,
    marital_status
  ) => {
    console.log(access_token);

    //  console.log(gender);
    let POST_REG = await fetch(ADD_PROSPECT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
      body: JSON.stringify({
        fname: values.fname,
        lname: values.lname,
        gender: gender,
        city: values.fname,
        street: values.city,
        state: values.state,
        country: values.country,
        pin_code: values.pincode,
        phone: values.phone,
        marital_status: marital_status,
        education: values.education,
        financial_source: values.financial_source,
        financial_status: financial_status,
        work_experience: values.work_experience,
        type_of_work: values.type_of_work,
        health_condition: values.health_condition,
        talent: values.talent,
        whatsapp_id: values.whatsapp_id,
        email: values.email,
        why_attend: values.why_attend,
        what_sponsor_told: values.what_sponsor_told,
        goal_in_life: values.goal_in_life,
        signature_base64: signature_base64,
        sponsor_name: values.sponsor_name,
        sponsor_rank: values.sponsor_rank,
        sponsor_id: values.sponsor_id,
        relationship_with_sponsor: values.relationship_with_sponsor,
      }),
    });
    // return await POST_REG.json();

    let data = POST_REG.json();
    let status = POST_REG.status;

    return {
      data: data,
      status: status,
    };
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
      }),
    });
    let LoginData = await POST_ORDER.json();
    console.log(LoginData);

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

  @action SendOtpmsg = async (hhaasshh, values) => {
    let uurrll =
      'http://bulksms.tecions.com/api/sendmsg.php?user=tecions1&pass=tecions1&sender=TECION&phone=';
    let phone = values;
    let msg = encodeURI('Your OTP to reset your password is 1234 ' + hhaasshh);
    let uurrll2 =
      uurrll + phone + '&text=' + msg + '&priority=ndnd&stype=normal';
    let USER_PROFILE = await fetch(uurrll2, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0,
      },
    });

    return USER_PROFILE;
  };
}
