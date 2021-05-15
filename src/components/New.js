import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

const New = ({ numTask, addData }) => {
  let history = useHistory();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    data = {
      ...data,
      'key': `ICT-${numTask+1}`,
      'status': { 'label': 'To Do', 'value': 'todo' }
    }
    console.log('submit: ', data)
    addData(data)
    history.push('/main')
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor='key'>Key</label>
          <input 
            value={`ICT-${numTask+1}`} 
            disabled
            {...register('key')} />
        </div>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor='summary'>Summary</label>
          <input placeholder='Enter Summary' {...register('summary')} />
        </div>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor='status'>Status</label>
          <input
            value='To Do'
            disabled
            {...register("status")}
          />
        </div>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => history.push('/main')}>Back</button>
          <input type='submit' />
        </div>
      </form>
    </div>
  );
}

export default New;