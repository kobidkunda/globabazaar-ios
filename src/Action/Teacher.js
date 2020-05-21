import {action, observable} from 'mobx';
import {GET_RANDOM_TEACHER, PROFILE} from '../Config/URL';

export default class Teacher {
  @observable teacherList = {};

  @action GetRandomTeacher = async access_token => {
    let USER_PROFILE = await fetch(GET_RANDOM_TEACHER + 3, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
    });

    let USER_PROFILE_DARTA = await USER_PROFILE.json();
    console.log(USER_PROFILE_DARTA);
    this.teacherList = USER_PROFILE_DARTA.random_teachers;
    return USER_PROFILE_DARTA.random_teachers;
  };
}
