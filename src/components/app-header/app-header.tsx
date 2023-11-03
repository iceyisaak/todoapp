
import style from './app-header.module.scss'

export const AppHeader = () => {
    return (
        <header className={`${style['header']}`}>
            <h1 className={`${style['h1']}`}>TodoApp</h1>
            <h4 className={`${style['h4']}`}>ReactTS Jotai</h4>
        </header>
    )
}
