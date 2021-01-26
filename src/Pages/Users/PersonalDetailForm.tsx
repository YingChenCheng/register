import React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm, change } from 'redux-form';
import { Button, Card, CardBody, Col, FormGroup } from 'reactstrap';
import { FaChevronRight } from 'react-icons/fa';

import ReduxFormInput from '../../components/ReduxFormInput';
import ReduxFormSelect from '../../components/ReduxFormSelect';
import { Gender, CurrentDate } from '../../config/constants';
import { name, mobile, idNumber } from '../../lib/normalize';
import validate from './validate';
import '../../style/css/reduxform.css';

interface Props {};

export const PersonalDetailForm: React.FC<Props & InjectedFormProps< {}, Props>> = (props: any) => {
  const { handleSubmit } = props;

  // run on every keystroke to update the React state, 
  // and the displayed value updates as typing
  const handleChange = (event: any) => {
    // the type of event.target.value is yyyy-mm-dd
    var birthYear:    any = event.target.value.slice(0, 4);
    var birthMonth:   any = event.target.value.slice(5, 7);
    var birthDate:    any = event.target.value.slice(8, 10);

    // the type of Current is yyyy-mm-dd
    var currentYear:  any = CurrentDate.slice(0, 4);
    var currentMonth: any = CurrentDate.slice(5, 7);
    var currentDate:  any = CurrentDate.slice(8, 10);
    var userAge: number;

    // calculate the user's age.
    function calculate() {
      if (currentMonth > birthMonth) {
        userAge = currentYear - birthYear;
      }
      else if (currentMonth < birthMonth) {
        userAge = currentYear - birthYear - 1;
      }
      else {
        if (currentDate > birthDate) {
          userAge = currentYear - birthYear;
        }
        else {
          userAge = currentYear - birthYear - 1;
        }
      }
      props.dispatch(change('user', 'userAge', userAge));
    }

    // determine the user's age
    if (currentYear < birthYear) {
      alert("Your DOB is wrong!!");
    }
    else if (currentYear === birthYear) {
      if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate > birthDate)) {
        alert("Your DOB is wrong!!");
      }
      else {
        // let the age equal 1 if it's less than 1
        userAge = 1;
        props.dispatch(change('user', 'userAge', userAge));
      }
    }
    else {
      calculate()
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate={true}>
      <Col sm="12">
        <Card className="card-border">
          <CardBody>
            <FormGroup row={true}>
              <Col xs="12" lg="6">
                <Field
                  name="userRealName"
                  type="text"
                  component={ReduxFormInput}
                  label=" Name *"
                  placeHolder="Enter User Name"
                  normalize={name}
                />
              </Col>
              <Col xs="12" lg="6">
                <Field
                  name="idNumber"
                  type="text"
                  component={ReduxFormInput}
                  label=" ID Number *"
                  placeHolder="Enter ID Number"
                  normalize={idNumber}
                />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Col xs="12" lg="2">
                <Field
                  name="userDOB"
                  type="date"
                  component={ReduxFormInput}
                  label=" Date of Birth *"
                  placeHolder="Enter Date of Birth"
                  onChange={handleChange}
                  maxDate={CurrentDate}
                />
              </Col>
              <Col xs="12" lg="2">
                <Field
                  name="userAge"
                  type="text"
                  component={ReduxFormInput}
                  label="Age *"
                  placeHolder="Enter User Age"
                />
	            </Col>
              <Col xs="12" lg="2">
                <Field
                  name="userGender"
                  type="text"
                  datas={Gender}
                  component={ReduxFormSelect}
                  label="Gender *"
                  placeHolder="Select Gender"
                />
              </Col>
	            <Col xs="12" lg="6">
                <Field
                  name="userMobileNumber"
                  type="text"
                  component={ReduxFormInput}
                  label="Mobile Number *"
                  placeHolder="Enter Mobile Number"
                  normalize={mobile}
                />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Col xs="12" lg="12">
                <Field
                  name="userAddress"
                  type="textarea"
                  component={ReduxFormInput}
                  label="Address *"
                  placeHolder="Enter Address"
                />
              </Col>
	          </FormGroup>
	          <FormGroup row={true}>
              <Col xs="12" lg="12">
	              <Field
                  name="note"
                  type="textarea"
                  component={ReduxFormInput}
                  label="Note"
                  placeHolder="Enter Note"
                />  
              </Col>
            </FormGroup>
          </CardBody>
          <div style={{paddingBottom:30}}>
          <Button
            className="float-right"
            color="success"
            type="submit"
            style={{marginRight:'10px'}}
          >Next &nbsp;
          <FaChevronRight className="button-padding" size={18} />
          </Button>
          </div>
        </Card>
      </Col>
    </form>
  );
}

const form = reduxForm<{}, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  form: 'user',
  validate,
})(PersonalDetailForm);

export default connect(null)(form);
