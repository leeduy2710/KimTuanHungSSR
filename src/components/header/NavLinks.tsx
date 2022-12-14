/* eslint-disable @typescript-eslint/no-unused-vars */
// react
import { MouseEvent as ReactMouseEvent, useEffect, useState } from 'react';

// third-party
import classNames from 'classnames';

// application
import AppLink from '../shared/AppLink';
import ArrowRoundedDown9x6Svg from '../../svg/arrow-rounded-down-9x6.svg';
import Megamenu from './Megamenu';
import Menu from './Menu';
import { useDirection } from '../../store/locale/localeHooks';
import url from '../../services/url';

// data stubs
import dataHeaderNavigation from '../../data/headerNavigation';
import { GetMenuMain } from '../../repository/menus';
// import { GetMenuMain } from '../../api/menuApi';

function NavLinks() {
    const direction = useDirection();
    const [menusMain, setMenusMain] = useState<any[]>([]);

    useEffect(() => {
        async function fetch() {
            const dataMenusMain: any[] = await GetMenuMain();
            setMenusMain(dataMenusMain);
        }
        fetch();
    }, []);

    const handleMouseEnter = (event: ReactMouseEvent) => {
        const item = event.currentTarget as HTMLElement;
        const megamenu = item.querySelector('.nav-links__megamenu') as HTMLElement;

        if (megamenu) {
            const container = megamenu.offsetParent;
            const containerWidth = container!.getBoundingClientRect().width;
            const megamenuWidth = megamenu.getBoundingClientRect().width;
            const itemOffsetLeft = item.offsetLeft;

            if (direction === 'rtl') {
                const itemPosition = containerWidth - (
                    itemOffsetLeft + item.getBoundingClientRect().width
                );

                const megamenuPosition = Math.round(
                    Math.min(itemPosition, containerWidth - megamenuWidth),
                );

                megamenu.style.left = '';
                megamenu.style.right = `${megamenuPosition}px`;
            } else {
                const megamenuPosition = Math.round(
                    Math.min(itemOffsetLeft, containerWidth - megamenuWidth),
                );

                megamenu.style.right = '';
                megamenu.style.left = `${megamenuPosition}px`;
            }
        }
    };

    const linksList = menusMain.map((item, index) => {
        let arrow;
        let submenu;

        if (item.submenu) {
            arrow = <ArrowRoundedDown9x6Svg className="nav-links__arrow" />;
        }

        if (item.submenu && item.submenu.type === 'menu') {
            submenu = (
                <div className="nav-links__menu">
                    <Menu items={item.submenu.menu} />
                </div>
            );
        }

        if (item.submenu && item.submenu.type === 'megamenu') {
            submenu = (
                <div className={`nav-links__megamenu nav-links__megamenu--size--${item.submenu.menu.size}`}>
                    <Megamenu menu={item.submenu.menu} />
                </div>
            );
        }

        const classes = classNames('nav-links__item', {
            'nav-links__item--with-submenu': item.submenu,
        });

        return (
            <li key={index} className={classes}>
                {
                    item.url === '/'
                        ? (
                            <AppLink href={url.home()} {...item.props}>
                                <span>
                                    {item.title}
                                </span>
                            </AppLink>
                        )
                        : (
                            <AppLink href={url.mainMenu(item.url)} {...item.props}>
                                <span>
                                    {item.title}
                                    {arrow}
                                </span>
                            </AppLink>
                        )
                }
                {submenu}
            </li>
        );
    });

    return (
        <ul className="nav-links__list">
            {linksList}
        </ul>
    );
}

export default NavLinks;
