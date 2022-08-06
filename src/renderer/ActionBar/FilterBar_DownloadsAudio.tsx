import { Fragment, useState, useContext } from 'react';
import sortIcon from '../../../assets/Content/Warpstagram/sort.svg';
import searchIcon from '../../../assets/Content/Warpstagram/search.svg';
import ThemeContext from '../../storage/themeContext';
import './FilterBar.scss';
const FilterBar = (props) => {
  const themeCtx = useContext(ThemeContext);
  return (
    <Fragment>
      <div className="filterBar">
        {/* <div className="filterBar__menu filterBar__menu__left">
          <div
            className={
              filterTypeAll
                ? 'filterBar__menu__item__active'
                : 'filterBar__menu__item'
            }
            onClick={filterTypeAllHandler}
          >
            All
          </div>
          <div
            className={
              filterTypeUsers
                ? 'filterBar__menu__item__active'
                : 'filterBar__menu__item'
            }
            onClick={filterTypeUsersHandler}
          >
            Users
          </div>
          <div
            className={
              filterTypeHashtags
                ? 'filterBar__menu__item__active'
                : 'filterBar__menu__item'
            }
            onClick={filterTypeHashtagsHandler}
          >
            Hashtags
          </div>
          <div
            className={
              filterTypeLocations
                ? 'filterBar__menu__item__active'
                : 'filterBar__menu__item'
            }
            onClick={filterTypeLocationsHandler}
          >
            Locations
          </div>
        </div> */}
        <div className="filterBar__menu filterBar__menu__right">
          <div className="filterBar__menu__item filterBar__menu__item__accounts_total">
            {props.audioDownloadsTotal} audio downloads
          </div>
          {/* <div className="filterBar__menu__item filterBar__menu__item__find">
            <img src={searchIcon} />
          </div> */}
          <div className="filterBar__menu__item filterBar__menu__item__sort">
            <img src={sortIcon} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default FilterBar;
