import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink, useMatch } from 'react-router-dom';
import appHeaderStyles from "./AppHeader.module.css";
import { menuClassifier } from '../../utils/utils';


export default function AppHeader() {
  const rootLink = useMatch('/');
  const ordersLink = useMatch('/orders-feed');
  const profileLink = useMatch('/profile/*');
  const registerLink = useMatch('/register');
  const loginLink = useMatch('/login');
  const forgotPassLink = useMatch('/forgot-password');
  const resetPassLink = useMatch('/reset-password');

  return (
    <header className={`${appHeaderStyles.header}`}>
      <nav className={appHeaderStyles.nav}>
        <Link className={appHeaderStyles.logo} to='/'><Logo /></Link>
        <ul className={appHeaderStyles.list}>
          <li className={appHeaderStyles.item}>
            <NavLink to='/' className={`${appHeaderStyles.link} pl-5 pr-5 pt-4 pb-4 mt-4 mr-2 mb-4`}>
              <BurgerIcon type={menuClassifier('icon', rootLink)} />
              <p className={`ml-2 text text_type_main-default ${menuClassifier('text', rootLink)}`}>
                Конструктор
              </p>
            </NavLink>
          </li>
          <li className={appHeaderStyles.item}>
            <NavLink to='/orders-feed' className={`${appHeaderStyles.link} pl-5 pr-5 pt-4 pb-4 mt-4 mr-2 mb-4`}>
              <ListIcon type={menuClassifier('icon', ordersLink)} />
              <p className={`ml-2 text text_type_main-default ${menuClassifier('text', ordersLink)}`}>
                Лента заказов
              </p>
            </NavLink>
          </li>
          <li className={appHeaderStyles.item}>
          <NavLink to='/profile' className={`${appHeaderStyles.link} pl-5 pr-5 pt-4 pb-4 mt-4 mr-2 mb-4`}>
          <ProfileIcon type={menuClassifier('icon', profileLink || registerLink || loginLink || forgotPassLink || resetPassLink)} />
              <p className={`ml-2 text text_type_main-default ${menuClassifier('text', profileLink || registerLink || loginLink || forgotPassLink || resetPassLink)}`}>
                Личный кабинет
              </p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
