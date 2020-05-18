import {action, observable} from 'mobx';
import {GET_LIVE_CLASS, PROFILE} from '../Config/URL';

export default class User {
  @observable avatar = null;
  @observable address_proof = null;
  @observable id_proof = null;
  @observable is_premium = null;
  @observable city = null;
  @observable date_of_birth = null;
  @observable email = null;
  @observable email_verified_at = null;
  @observable first_name = null;
  @observable id = null;
  @observable last_name = null;
  @observable onesignal_player_id = null;
  @observable phone = null;
  @observable pin_code = null;
  @observable street = null;
  @observable uuid = null;
  @observable state = null;
  @observable route = 1;
  @observable liveclass = null;

  @action getLiveClass = async access_token => {
    let USER_PROFILE = await fetch(GET_LIVE_CLASS, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
    });

    let USER_PROFILE_DARTA = await USER_PROFILE.json();

    return USER_PROFILE_DARTA.live_videos;
  };

  @action getUserDetails = async access_token => {
    let USER_PROFILE = await fetch(PROFILE, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
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
      console.log(USER_PROFILE_DARTA);
      if (
        this.avatar === null ||
        this.address_proof === null ||
        (this.id_proof === null && this.is_premium === false)
      ) {
        this.route = 1;
      } else if (
        this.avatar === null ||
        this.address_proof === null ||
        (this.id_proof === null && this.is_premium === true)
      ) {
        this.route = 2;
      } else if (
        this.avatar === null ||
        this.address_proof === null ||
        (this.id_proof === null && this.is_premium === true)
      ) {
        this.route = 3;
      } else {
        this.route = 1;
      }

      return true;
    } else {
      return false;
    }
  };

  @action UploadImages = async () => {};

  @action UpdateProfile = async () => {};
}
