import {observable, computed, action} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';

export default class Auth {
  @observable logged = false;
  @observable online = false;
  @observable token = null;

  @action CheckLogin = async () => {

  };

    @action CheckOnline = async () => {

    };

    @action Login = async () => {

    };

    @action Register = async () => {

    };

}
