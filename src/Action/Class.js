import {action} from 'mobx';
import {
  FREE_CLASS,
  GET_RANDOM_TEACHER,
  UPCOMING_CLASS,
  UPCOMING_CLASSDETAILS,
} from '../Config/URL';

export default class Class {
  @action upcomingClass = async (access_token, count) => {
    //    ]UPCOMING_CLASS

    console.log(UPCOMING_CLASS + count);

    let USER_PROFILE = await fetch(UPCOMING_CLASS + count, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
    });

    let USER_PROFILE_DARTA = await USER_PROFILE.json();
    console.log(USER_PROFILE_DARTA);
    return USER_PROFILE_DARTA.upcoming;
  };

  @action upcomingPremiumClass = async (access_token, count) => {
    //    ]UPCOMING_CLASS

    console.log(UPCOMING_CLASS + count);

    let USER_PROFILE = await fetch(UPCOMING_CLASS + count, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
    });

    let USER_PROFILE_DARTA = await USER_PROFILE.json();
    console.log(USER_PROFILE_DARTA);
    return USER_PROFILE_DARTA.upcoming;
  };

  @action FreeClass = async (access_token) => {
    //    ]UPCOMING_CLASS


    let USER_PROFILE = await fetch(FREE_CLASS, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
    });

    let USER_PROFILE_DARTA = await USER_PROFILE.json();
    console.log(USER_PROFILE_DARTA);
    return USER_PROFILE_DARTA.seminars;
  };

  @action upcomingClassDETAILS = async (access_token, ID) => {
    //    ]UPCOMING_CLASS

    let USER_PROFILE = await fetch(UPCOMING_CLASSDETAILS + ID, {
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
}
