import MyTable from '../shared/MyTable';
import { useParams, useHistory } from "react-router-dom";
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Input } from 'reactstrap';

const Details = ({ mainData, updateData }) => {
  let { taskId } = useParams();
  let history = useHistory();
  const [data, setData] = useState([]);
  const [newSummary, setNewSummary] = useState([]);
  const [newStatus, setNewStatus] = useState([]);
  // Get data in local storage based on :taskId
  useEffect(() => {
    const obj = mainData.find(o => o.key === taskId);
    setData([obj]);
  }, [mainData, taskId])

  const memoData = useMemo(() => data, [data])

  // Create an editable cell renderer
  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    // updateMyData, // This is a custom function that we supplied to our table instance
  }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
      setValue(e.target.value)
      setNewSummary(e.target.value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue)
      setNewSummary(initialValue)
    }, [initialValue])

    return <Input value={value} onChange={onChange} />
  }

  // Create an editable cell renderer
  const SelectableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    // updateMyData, // This is a custom function that we supplied to our table instance
  }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
      setValue(e.target.value)
      setNewStatus(e.target.value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue)
      setNewStatus(initialValue)
    }, [initialValue])

    return <Input type='select' onChange={onChange} value={value}>
      <option value="todo">To Do</option>
      <option value="done">Done</option>
    </Input>
  }

  const columns = useMemo(() =>
    [
      {
        Header: 'Key',
        accessor: 'key',
      },
      {
        Header: 'Summary',
        accessor: 'summary',
        Cell: EditableCell
      },
      {
        Header: 'Status',
        accessor: 'status.value',
        Cell: SelectableCell
      },
    ],
    []
  )
  const handleClick = () => {
    updateData(taskId, newSummary, newStatus === 'todo' ? { 'label': 'To Do', 'value': 'todo' } : { 'label': 'Done', 'value': 'done' })
    history.push('/main')
  }
  return (
    <div>
      <MyTable columns={columns} data={memoData} />
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => history.push('/main')}>Back</Button>
        <Button color='success' onClick={handleClick}>Submit</Button>
      </div>
    </div>
  );
}

export default Details;