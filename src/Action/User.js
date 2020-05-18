import {action, observable} from 'mobx';
import {PROFILE} from '../Config/URL';

export default class User {
  @observable avatar = null;
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

      return true;
    } else {
      return false;
    }
  };

  @action UploadImages = async () => {};

  @action UpdateProfile = async () => {};
}
