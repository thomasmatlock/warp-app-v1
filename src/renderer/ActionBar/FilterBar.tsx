import { Fragment, useState } from 'react';
import sortIcon from '../../../assets/Content/Warpstagram/sort.svg';
import searchIcon from '../../../assets/Content/Warpstagram/search.svg';
import './FilterBar.scss';
const FilterBar = () => {
  const [filterTypeAll, setFilterTypeAll] = useState(true);
  const [filterTypeUsers, setFilterTypeUsers] = useState(false);
  const [filterTypeHashtags, setFilterTypeHashtags] = useState(false);
  const [filterTypeLocations, setFilterTypeLocations] = useState(false);

  const filterTypeAllHandler = () => {
    setFilterTypeAll(true);
    setFilterTypeUsers(false);
    setFilterTypeHashtags(false);
    setFilterTypeLocations(false);
  };
  const filterTypeUsersHandler = () => {
    setFilterTypeAll(false);
    setFilterTypeUsers(true);
    setFilterTypeHashtags(false);
    setFilterTypeLocations(false);
  };
  const filterTypeHashtagsHandler = () => {
    setFilterTypeAll(false);
    setFilterTypeUsers(false);
    setFilterTypeHashtags(true);
    setFilterTypeLocations(false);
  };
  const filterTypeLocationsHandler = () => {
    setFilterTypeAll(false);
    setFilterTypeUsers(false);
    setFilterTypeHashtags(false);
    setFilterTypeLocations(true);
  };

  return (
    <Fragment>
      <div className="filterBar">
        <div className="filterBar__menu filterBar__menu__left">
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
        </div>
        <div className="filterBar__menu filterBar__menu__right">
          <div className="filterBar__menu__item filterBar__menu__item__accounts_total">
            16 accounts
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
