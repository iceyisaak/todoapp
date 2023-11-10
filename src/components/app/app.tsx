import { useAtom } from 'jotai'
import { tasksAtom } from '../../features/todo-feature/todo-initialstate'
import { deleteAllTasksAtom } from '../../features/todo-feature/todo-store'

import { AppHeader } from '../app-header/app-header'
import TaskForm from '../task-form/task-form'
import TaskList from '../task-list/task-list'

import { MdOutlineClose } from 'react-icons/md'
import style from './app.module.scss'
import { useDeleteAllTasks, useGetAllTasks } from '../../api/tasks-api'



const App = () => {

  // const [tasks] = useAtom(tasksAtom)
  // const [, deleteAllTasks] = useAtom(deleteAllTasksAtom)
  const { data: tasks } = useGetAllTasks()
  const { mutate: deleteAllTasks } = useDeleteAllTasks()


  const deleteAllTasksHandler = async () => {
    const deleteAllTasksConfirm = confirm('Delete All Tasks?')
    if (deleteAllTasksConfirm) {
      try {
        await deleteAllTasks()
      } catch (err) {
        console.log('Error when trying to delete All tasks.', err)
      }
    }
  }



  return (
    <div className={`${style['container']}`}>
      <main className={`${style['main']}`}>
        {
          tasks && tasks?.length > 0 &&
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


  )
}

export default App