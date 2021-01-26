import { FormErrors } from 'redux-form';
import { AddUserParams } from './AddUser.d';

const validate = (values: AddUserParams): FormErrors<AddUserParams> => {
  const errors: FormErrors<AddUserParams> = {};

  if (!values.userRealName) {
    errors.userRealName = "User name is required";
  }
  if (!values.idNumber) {
    errors.idNumber = "ID number is required";   
  }
  if (!values.userDOB) {
    errors.userDOB = "Use's DOB is required";   
  }
  if (!values.userAge) {
    errors.userAge = "Use's age is required";
  }
  if (!values.userGender) {
    errors.userGender = "User's gender is required";
  }
  if (!values.userMobileNumber) {
    errors.userMobileNumber = "User's mobile is number required";
  }
  if (!values.userAddress) {
    errors.userAddress = "User's address is required";
  }
  if (!values.useraccountNumber) {
    errors.useraccountNumber = "User's account number is required";
  }
  if (!values.userBankName) {     
    errors.userBankName = "The bank name is required";
  }
  if (!values.userBankCode) {
    errors.userBankCode = "The bank code is required";
  }
  if (!values.userbankAddress) {
    errors.userbankAddress = "The bank addressvis required";
  }
  return errors;
};

export default validate;
