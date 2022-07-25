import { Fragment } from 'react';
import classes from './FilterBar.module.scss';
const FilterBar = (props) => {
    return <Fragment>
        <div className={classes.filterBar}>
            <div class={classes.filterBarMenu}>
                <div class="filter_bar__menu__item ">All</div>
                <div class="filter_bar__menu__item filter_bar__menu__item__selected">Users</div>
                <div class="filter_bar__menu__item">Hashtags</div>
                <div class="filter_bar__menu__item">Locations</div>
            </div>
            <div class={classes.filterBarMenu}>
                <div class="filter_bar__menu__item">16 accounts</div>
                <div class="filter_bar__menu__item filter_bar__menu__item__find">
                    <img src="img/public/sections/overview/warpstagram/search.svg" alt="" />
                </div>
                <div class="filter_bar__menu__item filter_bar__menu__item__sort">
                    <img src="img/public/sections/overview/warpstagram/sort.svg" alt="" />
                </div>
            </div>
        </div>
    </Fragment>
}
export default FilterBar;