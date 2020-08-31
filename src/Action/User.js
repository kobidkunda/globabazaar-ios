import {action, observable} from 'mobx';
import {
  ADD_NOTIFY_LIST,
  GET_LIVE_CLASS,
  GET_NOTIFY_LIST,
  PROFILE,
} from '../Config/URL';
export default class User {
  @observable first_name = null;
  @observable last_name = null;
  @observable avatar = null;
  @observable address_proof = null;
  @observable id_proof = null;
  @observable is_premium = null;
  @observable city = null;
  @observable date_of_birth = null;
  @observable email = null;
  @observable email_verified_at = null;
  @observable id = null;
  @observable onesignal_player_id = null;
  @observable phone = null;
  @observable pin_code = null;
  @observable street = null;
  @observable uuid = null;
  @observable state = null;
  @observable route = 1;
  @observable liveclass = null;
  @observable device_uuid = null;
  @observable is_prospect_filled = null;
  @observable BottomTab = true;

  @action getLiveClass = async access_token => {
    let USER_PROFILE = await fetch(GET_LIVE_CLASS, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0,
      },
    });

    let USER_PROFILE_DARTA = await USER_PROFILE.json();



    return USER_PROFILE_DARTA.live_videos;
  };

  @action GET_ALL_NOTIFICATION = async access_token => {
    let USER_PROFILE = await fetch(GET_NOTIFY_LIST, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0,
      },
    });

    let USER_PROFILE_DARTA = await USER_PROFILE.json();

    console.log(USER_PROFILE_DARTA);

    return USER_PROFILE_DARTA;
  };

  @action getUserDetails = async access_token => {
    let USER_PROFILE = await fetch(PROFILE, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0,
      },
    });

    let USER_PROFILE_DARTA = await USER_PROFILE.json();

    if (USER_PROFILE.status === 200) {
      this.avatar = USER_PROFILE_DARTA.avatar;
      this.uuid = USER_PROFILE_DARTA.uuid;
      this.pin_code = USER_PROFILE_DARTA.pin_code;
      this.phone = USER_PROFILE_DARTA.phone;
      this.onesignal_player_id = USER_PROFILE_DARTA.onesignal_player_id;
      this.last_name = USER_PROFILE_DARTA.last_name;
      this.id = USER_PROFILE_DARTA.id;
      this.first_name = USER_PROFILE_DARTA.first_name;
      this.email_verified_at = USER_PROFILE_DARTA.email_verified_at;
      this.date_of_birth = USER_PROFILE_DARTA.date_of_birth;
      this.city = USER_PROFILE_DARTA.city;
      this.street = USER_PROFILE_DARTA.street;
      this.email = USER_PROFILE_DARTA.email;
      this.state = USER_PROFILE_DARTA.state;
      this.address_proof = USER_PROFILE_DARTA.address_proof;
      this.is_premium = USER_PROFILE_DARTA.is_premium;
      this.id_proof = USER_PROFILE_DARTA.id_proof;
      this.is_prospect_filled = USER_PROFILE_DARTA.is_prospect_filled;
      console.log(USER_PROFILE_DARTA);
      return true;
    } else {
      return false;
    }
  };

  @action getUserDetailsRecheck = async access_token => {
    let USER_PROFILE = await fetch(PROFILE, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0,
      },
    });

    let USER_PROFILE_DARTA = await USER_PROFILE.json();

    if (USER_PROFILE.status === 200) {
      this.avatar = USER_PROFILE_DARTA.avatar;
      this.uuid = USER_PROFILE_DARTA.uuid;
      this.pin_code = USER_PROFILE_DARTA.pin_code;
      this.phone = USER_PROFILE_DARTA.phone;
      this.onesignal_player_id = USER_PROFILE_DARTA.onesignal_player_id;
      this.last_name = USER_PROFILE_DARTA.last_name;
      this.id = USER_PROFILE_DARTA.id;
      this.first_name = USER_PROFILE_DARTA.first_name;
      this.email_verified_at = USER_PROFILE_DARTA.email_verified_at;
      this.date_of_birth = USER_PROFILE_DARTA.date_of_birth;
      this.city = USER_PROFILE_DARTA.city;
      this.street = USER_PROFILE_DARTA.street;
      this.email = USER_PROFILE_DARTA.email;
      this.state = USER_PROFILE_DARTA.state;
      this.address_proof = USER_PROFILE_DARTA.address_proof;
      this.is_premium = USER_PROFILE_DARTA.is_premium;
      this.id_proof = USER_PROFILE_DARTA.id_proof;
      this.is_prospect_filled = USER_PROFILE_DARTA.is_prospect_filled;
      return USER_PROFILE_DARTA;
    } else {
      return false;
    }
  };

  @action CheckRoute = async () => {
    if (this.is_premium === 0) {
      this.route = 1;
    } else if (
      this.is_premium === 1 &&
      (this.avatar === null ||
        this.address_proof === null ||
        this.id_proof === null)
    ) {
      this.route = 2;
    } else if (
      this.avatar !== null ||
      this.address_proof !== null ||
      (this.id_proof !== null &&
        this.is_premium === true &&
        this.is_prospect_filled === 1)
    ) {
      this.route = 3;
    } else {
      this.route = 1;
    }


    /*  else if (this.is_prospect_filled === 0) {
    this.route = 4;
  }*/

    console.log('route ' + this.route);
    console.log('route2 ' + this.is_prospect_filled);
  };

  @action ADD_NOTIFY_DEVICES = async (access_token, uuid) => {
    console.log(uuid);
    let USER_PROFILE = await fetch(ADD_NOTIFY_LIST, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0,
      },
      body: JSON.stringify({
        device_uuid: uuid,
      }),
    });

    let NitifyStatus = await USER_PROFILE.json().status;
    let Nitify = await USER_PROFILE.json().notification;

    return {
      status: NitifyStatus,
      data: Nitify,
    };
  };

  @action UpdateProfile = async () => {};
}
