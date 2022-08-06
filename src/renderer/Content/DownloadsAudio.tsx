import { Fragment, useState, useContext } from 'react';
import thumbnail from '../../../assets/Content/dummy_thumbnail.png';
import ThemeContext from '../../storage/themeContext';

import './Downloads.scss';

const DownloadsAudio = () => {
  const themeCtx = useContext(ThemeContext);
  const [searchInput, setSearchInput] = useState('');

  window.electron.ipcRenderer.on('Search: InputChange', (arg) => {
    setSearchInput(arg[0]);
  });
  const mouseEnterHandler = () => {
    // console.log('mouse enter');
    window.electron.ipcRenderer.sendMessage('browserNotHovered');
  };
  const mouseLeaveHandler = () => {
    // console.log('mouse leave');
  };
  //  const audioItems = (
  //    <ul className={classes['cart-items']}>
  //      {cartCtx.items.map((item) => (
  //        <CartItem
  //          key={item.id}
  //          name={item.name}
  //          amount={item.amount}
  //          price={item.price}
  //          onRemove={cartItemRemoveHandler.bind(null, item.id)}
  //          onAdd={cartItemAddHandler.bind(null, item)}
  //        />
  //      ))}
  //    </ul>
  //  );
  return (
    <Fragment>
      {/* {audioItems} */}
      <div
        // onMouseEnter={mouseEnterHandler}
        // onMouseLeave={mouseLeaveHandler}
        className="contentPanel"
        style={
          themeCtx.isDarkTheme
            ? { backgroundColor: themeCtx.content.dark.backgroundColor }
            : {
                backgroundColor: themeCtx.content.light.backgroundColor,
              }
        }
      >
        {/* <div className="content__panel__toggle_collapse"></div> */}
        <ul className="content__panel__downloads__list">
          {/* <li
            className="content__panel__downloads__list__item content__panel__downloads__list__item__audio"
            style={
              themeCtx.isDarkTheme
                ? { backgroundColor: themeCtx.nav.dark.backgroundColor }
                : {
                    backgroundColor: themeCtx.nav.light.backgroundColor,
                  }
            }
          >
            <img
              src={thumbnail}
              className="content__panel__downloads__list__item__thumbnail"
            />
            <div className="content__panel__downloads__list__item__text content__panel__downloads__list__item__title">
              Magic of Hong Kong cyberpunk drone video
            </div>
            <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_length">
              7:36
            </div>
            <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_type">
              MP3
            </div>
            <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_size">
              8.6MB
            </div>
          </li> */}
        </ul>
      </div>
    </Fragment>
  );
};
export default DownloadsAudio;
