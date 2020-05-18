import {action, observable} from 'mobx';
import {
  CLIENT_SECRET,
  CLIENT_SECRET_ID,
  CREATE_ORDER,
  GET_RANDOM_TEACHER,
  UPLOAD_AVATAR,
} from '../Config/URL';

export default class Payment {
  @observable razorpay_order_id = null;
  @action CreatePayment = async access_token => {
    let USER_PROFILE = await fetch(CREATE_ORDER, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
    });
    let USER_PROFILE_DARTA = await USER_PROFILE.json().order;
    console.log(USER_PROFILE_DARTA);
    this.razorpay_order_id = USER_PROFILE_DARTA.razorpay_order_id;
    return USER_PROFILE_DARTA;
  };

  @action AvatarUpload = async (access_token, base64) => {
    let image = 'data:image/jpeg;base64,' + base64;
    let USER_PROFILE = await fetch(UPLOAD_AVATAR, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
      body: JSON.stringify({
        avatar: image,
      }),
    });
    let USER_PROFILE_DARTA = await USER_PROFILE.json().user;

    if (USER_PROFILE.status === 200) {
      return {
        status: true,
        data: USER_PROFILE_DARTA,
      };
    } else {
      return {
        status: false,
      };
    }
  };

  @action AddressUpload = async access_token => {
    let USER_PROFILE = await fetch(CREATE_ORDER, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
    });
    let USER_PROFILE_DARTA = await USER_PROFILE.json().order;
    console.log(USER_PROFILE_DARTA);
    this.razorpay_order_id = USER_PROFILE_DARTA.razorpay_order_id;
    return USER_PROFILE_DARTA;
  };

  @action AddressIdentity = async access_token => {
    let USER_PROFILE = await fetch(CREATE_ORDER, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
    });
    let USER_PROFILE_DARTA = await USER_PROFILE.json().order;
    console.log(USER_PROFILE_DARTA);
    this.razorpay_order_id = USER_PROFILE_DARTA.razorpay_order_id;
    return USER_PROFILE_DARTA;
  };
}
