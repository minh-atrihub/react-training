import Table from '../shared/Table';
import { useParams, useHistory } from "react-router-dom";
import React, { useEffect, useMemo, useState } from 'react';

const Details = ({ mainData, updateData }) => {
  let { taskId } = useParams();
  let history = useHistory();
  const [data, setData] = useState([]);
  const [res, setRes] = useState([]);
  // Get data in local storage based on :taskId
  useEffect(() => {
    const obj = mainData.find(o => o.key === taskId);
    setData([obj]);
  }, [mainData, taskId])

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
      setRes(e.target.value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    return <input value={value} onChange={onChange} />
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
        accessor: 'status.label',
      },
    ],
    []
  )
  return (
    <div>
      <Table columns={columns} data={data} />
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => history.push("/main")}>Back</button>
        <button onClick={updateData(taskId, res)}>Submit</button>
      </div>
    </div>
  );
}

export default Details;