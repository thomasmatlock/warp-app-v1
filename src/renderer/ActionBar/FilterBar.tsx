import { Fragment } from 'react';
import  './FilterBar.scss';
const FilterBar = () => {
    return <Fragment>
        <div className="filterBar">
            <div className="filterBarMenu">
                {/* <div className="filter_bar__menu__item ">All</div>
                <div className="filter_bar__menu__item filter_bar__menu__item__selected">Users</div>
                <div className="filter_bar__menu__item">Hashtags</div>
                <div className="filter_bar__menu__item">Locations</div> */}
            </div>
            <div className="filterBarMenu">
                {/* <div className="filter_bar__menu__item">16 accounts</div>
                <div className="filter_bar__menu__item filter_bar__menu__item__find">
                    <img src="img/public/sections/overview/warpstagram/search.svg" alt="" />
                </div>
                <div className="filter_bar__menu__item filter_bar__menu__item__sort">
                    <img src="img/public/sections/overview/warpstagram/sort.svg" alt="" />
                </div> */}
            </div>
        </div>
    </Fragment>
}
export default FilterBar;