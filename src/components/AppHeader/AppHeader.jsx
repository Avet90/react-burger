import React from 'react';

import { Logo, BurgerIcon, 
    ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import headerStyles from '../AppHeader/AppHeader.module.css';

function AppHeader() {
    return (
        <header className={`${headerStyles.header} p-4 mt-10`}>
            <Content />
        </header>
    )
}

function Content() {
    return (
        <div className={headerStyles.header_сontent}>
            <NavBar />
            <Logo />
            <UserCabinet />
        </div>
    )
}

function NavBar() {
    return (
        <nav>
      <ul className={headerStyles.nav_list}>
        <li>
          <div className={`${headerStyles.link_wrapper} pt-4 pb-4 pl-5 pr-5`}>
            <BurgerIcon type="primary" />
            <a className="ml-2 text text_type_main-default" href="#">
              Конструктор
            </a>
          </div>
        </li>
        <li>
          <div
            className={`${headerStyles.link_wrapper} pt-4 pb-4 pl-5 pr-5 ml-2`}
          >
            <ListIcon type="secondary" />
            <a className="ml-2 text text_type_main-default text_color_inactive" href="#">
              Лента заказов
            </a>
          </div>
        </li>
      </ul>
    </nav>
    )
}

function UserCabinet() {
    return (
      <div className={`${headerStyles.link_wrapper} pt-4 pb-4 pl-5 pr-5`}>
        <ProfileIcon type="secondary" />
        <a className="ml-2 text text_type_main-default text_color_inactive" href="#">
          Личный кабинет
        </a>
      </div>
    );
}



export default AppHeader