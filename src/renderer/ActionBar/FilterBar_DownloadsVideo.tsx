import { Fragment, useState } from 'react';
import sortIcon from '../../../assets/Content/Warpstagram/sort.svg';
import searchIcon from '../../../assets/Content/Warpstagram/search.svg';
import './FilterBar.scss';
const FilterBar = (props) => {
  const [filterTypeAll, setFilterTypeAll] = useState(true);
  const [filterTypeUsers, setFilterTypeUsers] = useState(false);
  const [filterTypeHashtags, setFilterTypeHashtags] = useState(false);
  const [filterTypeLocations, setFilterTypeLocations] = useState(false);

  const filterTypeAllHandler = () => {
    window.electron.ipcRenderer.sendMessage(
      'FilterBar: Warpstagram: FilterTypeAll',
      [`FilterBar: Warpstagram: FilterTypeAll`]
    );
    setFilterTypeAll(true);
    setFilterTypeUsers(false);
    setFilterTypeHashtags(false);
    setFilterTypeLocations(false);
  };
  const filterTypeUsersHandler = () => {
    window.electron.ipcRenderer.sendMessage(
      'FilterBar: Warpstagram: FilterTypeUsers',
      [`FilterBar: Warpstagram: FilterTypeUsers`]
    );
    setFilterTypeAll(false);
    setFilterTypeUsers(true);
    setFilterTypeHashtags(false);
    setFilterTypeLocations(false);
  };
  const filterTypeHashtagsHandler = () => {
    window.electron.ipcRenderer.sendMessage(
      'FilterBar: Warpstagram: FilterTypeHashtags',
      [`FilterBar: Warpstagram: FilterTypeHashtags`]
    );
    setFilterTypeAll(false);
    setFilterTypeUsers(false);
    setFilterTypeHashtags(true);
    setFilterTypeLocations(false);
  };
  const filterTypeLocationsHandler = () => {
    window.electron.ipcRenderer.sendMessage(
      'FilterBar: Warpstagram: FilterTypeLocations',
      [`FilterBar: Warpstagram: FilterTypeLocations`]
    );
    setFilterTypeAll(false);
    setFilterTypeUsers(false);
    setFilterTypeHashtags(false);
    setFilterTypeLocations(true);
  };
  let items;
  // document.querySelectorAll('.filter-content__panel__warpstagram__account');
  // console.log(items);
  setTimeout(() => {
    items = document.querySelectorAll('.filter-filterBar__menu__item');
    // console.log(items);
  }, 1000);

  return (
    <Fragment>
      <div className="filterBar">
        <div className="filterBar__menu filterBar__menu__right">
          <div className="filterBar__menu__item filterBar__menu__item__accounts_total">
            {props.videoDownloadsTotal} video downloads
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
