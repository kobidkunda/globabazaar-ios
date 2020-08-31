import Auth from './Auth';
import Teacher from './Teacher';
import Class from './Class';
import User from './User';
import Payment from './Payment';

const AuthData = new Auth();
const TeacherData = new Teacher();
const ClassData = new Class();
const UserData = new User();
const PaymentData = new Payment();

export default {
  Auth: AuthData,
  Teacher: TeacherData,
  Class: ClassData,
  User: UserData,
  Payment: PaymentData,
};
