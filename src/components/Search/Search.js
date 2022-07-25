import { Fragment } from 'react';
import classes from './Search.module.scss';
import SearchIcon from '../../assets/public/sections/wrapup/cards/lightning.svg';
const Search = (props) => {
    return <Fragment>
        <div className={classes.search}>
            <img className={classes.search__input__icon} src={SearchIcon} alt="" />
            <input className={classes.search__input} type="text" />
            {/* <input class="overview_display__search__input" type="text" placeholder="input search. Beep boop">
            {/* <img class="overview_display__search__input__icon " src="img/public/sections/wrapup/cards/lightning.svg" height="15px" alt="" loading="lazy"> */}
        </div>
    </Fragment>
}
export default Search;