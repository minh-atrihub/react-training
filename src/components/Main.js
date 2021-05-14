import { Link, useRouteMatch } from "react-router-dom";
import React, { useEffect, useMemo, useState } from 'react';
import Table from '../shared/Table';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Details from "./Details";

const initData = [
  {
    key: 'ICT-1',
    summary: 'Django Training',
    status: { 'label': 'To Do', 'value': 'todo' }
  },
  {
    key: 'ICT-2',
    summary: 'TDD Training',
    status: { 'label': 'Done', 'value': 'done' }
  },
  {
    key: 'ICT-3',
    summary: 'React Training',
    status: { 'label': 'To Do', 'value': 'todo' }
  },
]

const Main = () => {
  let { path, url } = useRouteMatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(initData)
  }, [])
  const memoData = useMemo(() => data, [data])
  const columns = useMemo(() =>
    [
      {
        Header: 'Key',
        accessor: 'key',
        Cell: ({ cell: { value } }) => <Link to={`${url}/${value}`}>{value}</Link>
      },
      {
        Header: 'Summary',
        accessor: 'summary',
      },
      {
        Header: 'Status',
        accessor: 'status.label',
      },
    ],
    [url]
  )

  const handleUpdate = (id, newData) => () => {
    setData(old =>
      old.map((row) => {
        if (row.key === id) {
          return {
            ...row,
            'summary': newData,
          }
        }
        return row
      })
    )
  }

  return (
    <div className='container' style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <Table columns={columns} data={memoData} />
      </div>
      <div>
        <Link to="/new">
          <button>Create New Task</button>
        </Link>
      </div>
      <Switch>
        <Route path={`${path}/:taskId`}>
          <Details mainData={memoData} updateData={handleUpdate} />
        </Route>
      </Switch>
    </div>
  );
}

export default Main;