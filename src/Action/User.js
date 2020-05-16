import {action, observable} from 'mobx';

export default class Auth {
  @observable user = null;

  @action getUserDetails = async () => {};

  @action UploadImages = async () => {};

  @action UpdateProfile = async () => {};
}
