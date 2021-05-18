import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Button, Form, Input } from "reactstrap";
import MyInput from '../shared/MyInput'

const New = ({ numTask, addData }) => {
  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors } } = useForm({ mode: 'onSubmit' });

  const onSubmit = (data) => {
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
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => history.push('/main')}>Back</Button>
        <Input type='submit' style={{ width: '50%' }} />
      </div>
    </Form>
  );
}

export default New;