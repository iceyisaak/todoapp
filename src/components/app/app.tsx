import { deleteAllTasks, useTaskStore } from '../../features/todo-feature/todo-store'
import TaskForm from '../task-form/task-form'
import TaskList from '../task-list/task-list'

import { MdOutlineClose } from 'react-icons/md'
import style from './app.module.scss'

const App = () => {

  const { tasks } = useTaskStore((state) => state)

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
          <header className={`${style['header']}`}>
            <h1 className={`${style['h1']}`}>TodoApp</h1>
            <h4 className={`${style['h4']}`}>ReactTS Zustand</h4>
          </header>
          <TaskForm />
          <TaskList />
        </main>
      </div>
    </>
  )
}

export default App