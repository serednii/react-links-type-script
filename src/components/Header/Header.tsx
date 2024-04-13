import ButtonsAdd from './ButtonsAdd/ButtonsAdd'
import './Header.scss'

const Header: React.FC = () => {

    return (
        <div className='header'>
            <ButtonsAdd></ButtonsAdd>
            <h1 className='header__title'>Корисні ссилки</h1>
        </div>
    )
}

export default Header