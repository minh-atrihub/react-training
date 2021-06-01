import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Button, Form, Input, FormGroup, Label, Col } from "reactstrap";
import MyInput from '../shared/MyInput';
import DatePicker from "react-datepicker";

const NewTask = ({ numTask, addData }) => {
  let history = useHistory();
  const [startDate, setStartDate] = useState(new Date());
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    // console.log('submit', data)
    data = {
      ...data,
      'key': `ICT-${numTask + 1}`,
      'status': { 'label': 'To Do', 'value': 'todo' }
    }
    addData(data)
    history.push('/main')
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <MyInput register={register} errors={errors} labelName="Key" inputValue={`ICT-${numTask + 1}`} setReadOnly />
      <MyInput register={register} errors={errors} labelName="Summary" setRequired />
      <MyInput register={register} errors={errors} labelName="Status" inputValue='To Do' setReadOnly />
      <FormGroup row style={{ marginBottom: '10px' }}>
        <Label for='date' sm={4}>Due Date</Label>
        <Col sm={8}>
          <Controller
            name="ReactDatepicker"
            control={control}
            render={() => (
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            )}
          />
        </Col>
      </FormGroup>
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => history.push('/main')}>Back</Button>
        <Button type='submit' color='success'>Submit</Button>
      </div>
    </Form>
  );
}

export default NewTask;