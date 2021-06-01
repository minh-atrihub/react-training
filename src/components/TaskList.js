import { Link, useRouteMatch } from "react-router-dom";
import React, { useEffect, useMemo, useState } from 'react';
import MyTable from '../shared/MyTable';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import TaskDetails from "./TaskDetail";
import NewTask from "./NewTask";
import { Container, Button } from 'reactstrap';

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

const TaskList = () => {
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
    <Container style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-around' }}>
      <Router>
        <Switch>
          <Route exact path={`${path}`}>
            <div style={{ width: '500px' }}>
              <MyTable columns={columns} data={memoData} />
            </div>
            <div>
              <Link to={`${url}/new`}>
                <Button color='success'>Create New Task</Button>
              </Link>
            </div>
          </Route>
          <Route path={`${path}/new`}>
            <NewTask numTask={counter} addData={handleAdd} />
          </Route>
          <Route path={`${path}/:taskId`}>
            <TaskDetails mainData={memoData} updateData={handleUpdate} />
          </Route>
        </Switch>
      </Router>

    </Container>
  );
}

export default TaskList;