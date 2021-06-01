import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import TaskList from '../components/TaskList';
import { MemoryRouter, Route } from 'react-router-dom';


const renderComponent = ({ path, componentToRender }) => {
   render(
      <MemoryRouter initialEntries={[path]}>
         <Route path={path}>
            {componentToRender}
         </Route>
      </MemoryRouter>
   );
}

// it("get snapshot to check if route is rendered properly", async () => {
//    const { asFragment } = render(renderComponent({path: '/main', componentToRender: <TaskList/>}))
//    expect(asFragment(<TaskList />)).toMatchSnapshot()
// })


it("button 'create new task' is present", () => {
   const { getByText } = render(renderComponent({ path: '/main', componentToRender: <TaskList /> }))
   expect(getByText('Create New Task')).toBeInTheDocument()
})


it("new task form is present", () => {
   const { getByText } = render(renderComponent({ path: '/main', componentToRender: <TaskList /> }))

   fireEvent.click(screen.getByText('Create New Task'))

   expect(
      screen.getByRole("textbox", { name: /Key/ })
   ).toBeInTheDocument()
   expect(
      screen.getByRole("textbox", { name: /Summary/ })
   ).toBeInTheDocument();
   expect(
      screen.getByRole("textbox", { name: /Status/ })
   ).toBeInTheDocument();
})


it("fill in form and submit to create new task", async () => {
   const { getByText } = render(renderComponent({ path: '/main', componentToRender: <TaskList /> }))

   fireEvent.click(screen.getByText('Create New Task'))
   // Fill in form
   fireEvent.change(screen.getByRole("textbox", { name: /Summary/ }), { target: { value: 'Test App' } });
   // Submit form
   fireEvent.click(getByText(/Submit/))

   await waitFor(() => screen.getByText('Create New Task'))

   expect(getByText('Create New Task')).toBeInTheDocument()

})