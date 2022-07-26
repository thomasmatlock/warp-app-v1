import { Fragment } from 'react';
import  './Search.scss';
// import SearchIcon from '../../assets/public/sections/wrapup/cards/lightning.svg';
import SearchIcon from '../../../assets/Search/lightning.svg';

const Search = () => {
    return <Fragment>
        <div className="search">
            <input id="search__input" className="search__input" type="text" />
            <img id="search__input__icon__unfocused" className="search__input__icon search__input__icon__unfocused" src={SearchIcon} />
            <img id="search__input__icon__focused" className="search__input__icon search__input__icon__focused" src={SearchIcon} />
            {/* <input class="overview_display__search__input" type="text" placeholder="input search. Beep boop">
            {/* <img class="overview_display__search__input__icon " src="img/public/sections/wrapup/cards/lightning.svg" height="15px" alt="" loading="lazy"> */}
        </div>
    </Fragment>
}
export default Search;