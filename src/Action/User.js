import {action, observable} from 'mobx';
import {PROFILE} from '../Config/URL';

export default class User {
  @observable user = null;

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

    console.log(USER_PROFILE_DARTA);

    return USER_PROFILE_DARTA;
  };

  @action UploadImages = async () => {};

  @action UpdateProfile = async () => {};
}
