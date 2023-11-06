import { useAtom } from 'jotai'
import { tasksAtom } from '../../features/todo-feature/todo-initialstate'
import { deleteAllTasksAtom } from '../../features/todo-feature/todo-store'

import { AppHeader } from '../app-header/app-header'
import TaskForm from '../task-form/task-form'
import TaskList from '../task-list/task-list'

import { MdOutlineClose } from 'react-icons/md'
import style from './app.module.scss'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'



const App = () => {

  const [tasks] = useAtom(tasksAtom)
  const [, deleteAllTasks] = useAtom(deleteAllTasksAtom)


  const deleteAllTasksHandler = () => {
    const deleteAllTasksConfirm = confirm('Delete All Tasks?')
    if (deleteAllTasksConfirm) {
      deleteAllTasks()
    }
  }


  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>

  )
}

export default App