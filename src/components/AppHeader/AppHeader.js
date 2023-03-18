

import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderItem from "../AppHeaderItem/AppHeaderItem";
import styles from "./AppHeader.module.css";

function AppHeader() {
    return (
        <header className={styles.navPanel}>
            <div className={styles.navList}>
                <nav className={`${styles.navigation} ${styles.first}`}>
                    <AppHeaderItem type="primary">
                        <BurgerIcon type="primary"/> Конструктор
                    </AppHeaderItem>
                    <AppHeaderItem type="secondary">
                        <ListIcon type="secondary"/> Лента заказов
                    </AppHeaderItem>
                </nav>
                <Logo/>
                <AppHeaderItem type="secondary" extraClass={styles.last}>
                    <ProfileIcon type="secondary"/> Личный кабинет
                </AppHeaderItem>
            </div>
        </header>
    );
}

export default AppHeader;