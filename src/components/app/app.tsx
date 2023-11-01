import { deleteAllTasks, useTaskStore } from '../../features/todo-feature/todo-store'
import TaskForm from '../task-form/task-form'
import TaskList from '../task-list/task-list'
import { AppHeader } from '../app-header/app-header'

import { MdOutlineClose } from 'react-icons/md'
import style from './app.module.scss'



const App = () => {

  const { tasks } = useTaskStore(
    (state) => ({
      tasks: state.tasks
    })
  )

  const deleteAllTasksHandler = () => {
    const deleteAllTasksConfirm = confirm('Delete All Tasks?')
    if (deleteAllTasksConfirm) {
      deleteAllTasks()
    }
  }


  return (
    <>
      <div className={`${style['container']}`}>
        <main className={`${style['main']}`}>
          {
            tasks.length > 0 &&
            <MdOutlineClose
              title='Delete All Tasks'
              onClick={deleteAllTasksHandler}
              className={`
                ${'pointer'}
                ${style['btn-delall']}
                ${style['btn-delete-all']}
              `}
            />
          }
          <AppHeader />
          <TaskForm />
          <TaskList />
        </main>
      </div>
    </>
  )
}

export default App