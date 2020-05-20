import {action, observable} from 'mobx';
import {
  CLIENT_SECRET,
  CLIENT_SECRET_ID, CONFIRM_PAYMENT,
  CREATE_ORDER,
  GET_RANDOM_TEACHER,
  UPLOAD_ADDRESS_PROOF,
  UPLOAD_AVATAR, UPLOAD_IDENTITY_PROOF,
} from '../Config/URL';

export default class Payment {
  @observable razorpay_order_id = null;
  @observable paymentData = null;
  @observable order_id = null;
  @observable amount = null;
  @observable gross_amount = null;
  @observable short_url = null;
  @observable sms_status = null;
  @observable status = null;
  @observable tax_amount = null;
  @observable type = null;
  @observable customer_id = null;
  @observable id = null;

  @action CreatePayment = async access_token => {
    let USER_PROFILE = await fetch(CREATE_ORDER, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
    });
    let USER_PROFILE_DARTA = await USER_PROFILE.json();
    let order = USER_PROFILE_DARTA;
    this.paymentData = JSON.stringify(order.link);
    this.order_id = order.link.order_id;
    this.amount = order.link.amount;
    this.gross_amount = order.link.gross_amount;
    this.short_url = order.link.short_url;
    this.sms_status = order.link.sms_status;
    this.status = order.link.status;
    this.tax_amount = order.link.tax_amount;
    this.type = order.link.type;
    this.customer_id = order.link.customer_id;
    this.id = order.link.id;
    return order;
  };


  @action ConfitmPayment = async access_token => {
    let USER_PROFILE = await fetch(CONFIRM_PAYMENT, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
    });
    let USER_PROFILE_DARTA = await USER_PROFILE.json();
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
    let USER_PROFILE_DARTA = await USER_PROFILE.json();

    if (USER_PROFILE.status === 200) {
      return {
        status: true,
        data: USER_PROFILE_DARTA.user,
      };
    } else {
      return {
        status: false,
      };
    }
  };

  @action AddressUpload = async (access_token, base64) => {
    let image = 'data:image/jpeg;base64,' + base64;
    let USER_PROFILE = await fetch(UPLOAD_ADDRESS_PROOF, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
      body: JSON.stringify({
        address_proof: image,
      }),
    });

    let USER_PROFILE_DARTA = await USER_PROFILE.json();
    if (USER_PROFILE.status === 200) {
      return {
        status: true,
        data: USER_PROFILE_DARTA.user,
      };
    } else {
      return {
        status: false,
      };
    }
  };

  @action IdentityUpload = async (access_token, base64) => {
    let image = 'data:image/jpeg;base64,' + base64;
    let USER_PROFILE = await fetch(UPLOAD_IDENTITY_PROOF, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
      body: JSON.stringify({
        id_proof: image,
      }),
    });

    let USER_PROFILE_DARTA = await USER_PROFILE.json();
    if (USER_PROFILE.status === 200) {
      return {
        status: true,
        data: USER_PROFILE_DARTA.user,
      };
    } else {
      return {
        status: false,
      };
    }
  };
}
