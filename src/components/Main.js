import { Link, useRouteMatch } from "react-router-dom";
import React, { useEffect, useMemo, useState } from 'react';
import Table from '../shared/Table';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Details from "./Details";
import New from "./New";

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
  const [counter, setCounter] = useState();
  useEffect(() => {
    setData(initData)
  }, [])
  useEffect(() => {
    setCounter(data.length)
  }, [data])
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

  const handleUpdate = (id, newSummary, newStatus) => {
    setData(old =>
      old.map((row) => {
        if (row.key === id) {
          return {
            ...row,
            'summary': newSummary,
            'status': newStatus,
          }
        }
        return row
      })
    )
  }

  const handleAdd = (newData) => {
    setData(data.concat(newData))
  }

  return (
    <div className='container' style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-around' }}>
      <Switch>
        <Route exact path={`${path}`}>
          <div>
            <Table columns={columns} data={memoData} />
          </div>
          <div>
            <Link to={`${url}/new`}>
              <button>Create New Task</button>
            </Link>
          </div>
        </Route>
        <Route path={`${path}/new`}>
          <New numTask={counter} addData={handleAdd} />
        </Route>
        <Route path={`${path}/:taskId`}>
          <Details mainData={memoData} updateData={handleUpdate} />
        </Route>
      </Switch>
    </div>
  );
}

export default Main;