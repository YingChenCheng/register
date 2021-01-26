import React, { useState } from 'react';
import { InjectedFormProps } from 'redux-form';
import { Card } from 'reactstrap';
import Stepper from 'react-stepper-horizontal';

import AccountDetailForm from './AccountDetailForm';
import PersonalDetailForm from './PersonalDetailForm';

export const Form: React.FC<InjectedFormProps> = (props: any) => {
  const [page, setPage] = useState(0);
  const steps = [{ title: 'Personal' }, { title: 'Account' }];

  const { onSubmit, isLoading } = props;

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  return (
    <Card>
      <h1 id="register_GIST">
        <span id="register_R1">R </span>
        <span id="register_E1">E </span>
        G I S T
        <span id="register_E2"> E</span>
        <span id="register_R2"> R</span>
      </h1>

      <div className = "stepper">
        <Stepper steps={steps} activeStep={page} />
      </div>
      {page === 0 && (<PersonalDetailForm onSubmit={nextPage} />)}
      {page === 1 && (<AccountDetailForm isLoading={isLoading} previousPage={previousPage} onSubmit={onSubmit} />)}
    </Card>
  );
}

export default Form;
