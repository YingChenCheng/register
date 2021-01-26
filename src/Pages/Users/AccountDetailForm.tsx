import React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Col, Card, CardBody, Button, FormGroup } from 'reactstrap';
import { FaChevronLeft, FaSpinner, FaRegSave } from 'react-icons/fa';

import validate from './validate';
import ReduxFormInput from '../../components/ReduxFormInput';
import { accountNumber, name, bankCode } from '../../lib/normalize';

interface Props {
  previousPage: any;
  isLoading: boolean;
}

export const AccountDetailForm: React.FC<Props & InjectedFormProps< {}, Props>> = (props: any) => {
  const { isLoading, handleSubmit, previousPage, pristine, submitting } = props;
  
  return (
    <form onSubmit={handleSubmit} noValidate={true}>
      <Col sm="12">
        <Card className="card-border">
          <CardBody>
            <FormGroup row={true}>
              <Col xs="12" lg="6">
                <Field
                  name="userAccountNumber"
                  type="text"
                  component={ReduxFormInput}
                  label="Account Number *"
                  placeHolder="Enter Account Number"
                  normalize={accountNumber}
                />
              </Col>
              <Col xs="12" lg="3">
                <Field
                  name="userBankName"
                  type="text"
                  component={ReduxFormInput}
                  label="Bank Name *"
                  placeHolder="Enter Bank Name"
                  normalize={name}
                />
              </Col>
              <Col xs="12" lg="3">
                <Field
                  name="userBankCode"
                  type="text"
                  component={ReduxFormInput}
                  label="Bank Code *"
                  placeHolder="Enter Bank Code"
                  normalize={bankCode}
                />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Col xs="12" lg="12">
                <Field
                  name="userBankAddress"
                  type="textarea"
                  component={ReduxFormInput}
                  label="Bank Address *"
                  placeHolder="Enter Bank Address"
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
              color="success"
              onClick={previousPage}
              disabled={isLoading}
              style={{marginLeft:'20px', float:"left"}}
            > &nbsp; Previous
              <FaChevronLeft className="button-padding" size={18} />
            </Button>
            <Button
              color="success"
              isLoading={isLoading}
              type="submit"
              style={{marginRight:'20px', float:"right"}}
              disabled = { pristine || submitting }
            >
              {isLoading && <span>Saving</span>} &nbsp;
              {isLoading && <FaSpinner className="icon-spin" />}
              {!isLoading && <span>Save</span>}
              {!isLoading && <FaRegSave className="button-padding" size={18} />}
            </Button>
          </div>
        </Card>
      </Col>
    </form>
  );
};

const form = reduxForm<{}, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: 'user',
  touchOnChange: true,
  validate,
})(AccountDetailForm);

export default connect(null)(form);