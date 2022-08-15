// import classes from './CartItem.module.css';
import React, { useState, useContext } from 'react';
import iconSourceFacebook from '../../../assets/BrowserBar/facebook.svg';
import iconSourceInstagram from '../../../assets/BrowserBar/instagram.svg';
import iconSourcePinterest from '../../../assets/BrowserBar/pinterest.svg';
import iconSourceSoundcloud from '../../../assets/BrowserBar/soundcloud.svg';
import iconSourceSnapchat from '../../../assets/BrowserBar/snapchat.svg';
import iconSourceTiktok from '../../../assets/BrowserBar/tiktok.svg';
import iconSourceTwitch from '../../../assets/BrowserBar/twitch.svg';
import iconSourceTwitter from '../../../assets/BrowserBar/twitter.svg';
import iconSourceVimeo from '../../../assets/BrowserBar/vimeo.svg';
import iconSourceYoutube from '../../../assets/BrowserBar/youtube.svg';
import iconLength from '../../../assets/Downloads/duration.svg';
import iconFileSize from '../../../assets/Downloads/fileSize.svg';
import IconFileTypeAudio from '../../../assets/Downloads/fileTypeAudio.svg';
import IconFileTypeVideo from '../../../assets/Downloads/fileTypeVideo.svg';
import iconFileResolution from '../../../assets/Downloads/resolution.svg';
import IconFileFps from '../../../assets/Downloads/fps1.svg';
import IconDate from '../../../assets/Downloads/calendar.svg';
// import IconDate
import SourcesContext from '../../storage/sourcesContext';
import ThemeContext from 'storage/themeContext';
import DownloadsContext from 'storage/downloadsContext';
import menuIcon from '../../../assets/Warpstagram/menu.svg';
import iconFolder from '../../../assets/Downloads/folder1.svg';
import ContextMenu from '../ContextMenu/ContextMenu';
import ContextMenuDownloadItemOptions from '../ContextMenu/ContextMenuDownloadItemOptions';

const DownloadItem = (props) => {
  // console.log(props);

  const [isContentMenuVisible, setisContentMenuVisible] = useState(false);
  const options = 'downloadItemContextMenu';
  const sourcesCtx = useContext(SourcesContext);
  const themeCtx = useContext(ThemeContext);
  const downloadsCtx = useContext(DownloadsContext);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function findSourceIcon(source) {
    // console.log(source);
    if (source === 'facebook') {
      return iconSourceFacebook;
    } else if (source === 'instagram') {
      return iconSourceInstagram;
    } else if (source === 'pinterest') {
      return iconSourcePinterest;
    } else if (source === 'soundcloud') {
      return iconSourceSoundcloud;
    } else if (source === 'snapchat') {
      return iconSourceSnapchat;
    } else if (source === 'tiktok') {
      return iconSourceTiktok;
    } else if (source === 'twitch') {
      return iconSourceTwitch;
    } else if (source === 'twitter') {
      return iconSourceTwitter;
    } else if (source === 'vimeo') {
      return iconSourceVimeo;
    } else if (source === 'youtube') {
      return iconSourceYoutube;
    }
  }
  const title = `${props.title}`;
  const length = `${props.length}`;
  const size = `${props.size}`;
  const format = props.format.toUpperCase();
  const source = capitalizeFirstLetter(props.source);
  const sourceIcon = findSourceIcon(props.source);
  const resolution = `${props.resolution}`;
  const fps = `${props.fps}`;
  // const date = new Date();
  // console.log(props.date);
  let itemDay;
  let itemMonth;
  let itemDate;
  let itemYear = props.date.getFullYear();
  let itemHour = props.date.getHours();
  let itemMinute = props.date.getMinutes();
  let itemSecond = props.date.getSeconds();
  // console.log(itemHour);

  function convertDayToWeekday() {
    var weekday = new Array(
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    );
    itemDay = `${weekday[props.date.getDay()]}`;
  }
  function convertMonthToMonthName() {
    var month = new Array(
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    );
    itemMonth = `${month[props.date.getMonth()]}`;
  }

  function convertDateToDate() {
    itemDate = `${props.date.getDate()}`;
  }
  convertDayToWeekday();
  convertDateToDate();
  convertMonthToMonthName();
  // console.log(itemDay, itemDate, itemMonth);
  const dateString = `${itemDay}, ${itemMonth} ${itemDate}, ${itemYear}, ${itemHour}:${itemMinute}:${itemSecond}`;
  const toggleContextMenu = () => {
    if (isContentMenuVisible) {
      setisContentMenuVisible(false);
    } else {
      setisContentMenuVisible(true);
    }
  };
  const turnOffContextMenu = () => {
    setisContentMenuVisible(false);
  };
  return (
    <li
      onClick={() => {
        // getSourceID(props.id);
        downloadsCtx.getDownloadID(props.id);
      }}
      // onClick={props.downloadSelectedHandler}
      onMouseEnter={turnOffContextMenu}
      onMouseLeave={turnOffContextMenu}
      // onClick={turnOffContextMenu}
      className={
        props.type === 'audio'
          ? 'content__panel__downloads__list__item content__panel__downloads__list__item__audio'
          : 'content__panel__downloads__list__item content__panel__downloads__list__item__video'
      }
      // className="content__panel__downloads__list__item content__panel__downloads__list__item__audio"
      style={
        themeCtx.isDarkTheme
          ? { backgroundColor: themeCtx.nav.dark.backgroundColor }
          : {
              backgroundColor: themeCtx.nav.light.backgroundColor,
            }
      }
      // style={
      //   themeCtx.isDarkTheme
      //     ? { filter: 'invert(0%)' }
      //     : {
      //         filter: 'invert(100%)',
      //       }
      // }
    >
      <img
        src={props.thumbnail}
        className="content__panel__downloads__list__item__thumbnail"
      />
      <div className="content__panel__downloads__list__item__info">
        <div className="content__panel__downloads__list__item__info__container">
          <div
            className="content__panel__downloads__list__item__text content__panel__downloads__list__item__title"
            style={
              themeCtx.isDarkTheme
                ? { filter: 'invert(0%)' }
                : {
                    filter: 'invert(100%)',
                  }
            }
          >
            {title}
          </div>
        </div>
        <div className="content__panel__downloads__list__item__info__container">
          <img
            src={sourceIcon}
            className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_source"
            style={
              themeCtx.isDarkTheme
                ? { filter: 'invert(0%)' }
                : {
                    filter: 'invert(100%)',
                  }
            }
          ></img>
          <div
            className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_source"
            style={
              themeCtx.isDarkTheme
                ? { filter: 'invert(100%)' }
                : {
                    filter: 'invert(0%)',
                  }
            }
          >
            {source}
          </div>{' '}
          <img
            src={iconLength}
            className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_length"
            style={
              themeCtx.isDarkTheme
                ? { filter: 'invert(100%)' }
                : {
                    filter: 'invert(0%)',
                  }
            }
          ></img>
          <div
            className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_length"
            style={
              themeCtx.isDarkTheme
                ? { filter: 'invert(100%)' }
                : {
                    filter: 'invert(0%)',
                  }
            }
          >
            {length}
          </div>
          <img
            src={iconFileSize}
            className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_length"
            style={
              themeCtx.isDarkTheme
                ? { filter: 'invert(100%)' }
                : {
                    filter: 'invert(0%)',
                  }
            }
          ></img>
          <div
            className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_size"
            style={
              themeCtx.isDarkTheme
                ? { filter: 'invert(100%)' }
                : {
                    filter: 'invert(0%)',
                  }
            }
          >
            {size}
          </div>
          {props.type === 'audio' && (
            <img
              src={IconFileTypeAudio}
              className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_length"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(100%)' }
                  : {
                      filter: 'invert(0%)',
                    }
              }
            ></img>
          )}{' '}
          {props.type === 'video' && (
            <img
              src={IconFileTypeVideo}
              className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_length"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(100%)' }
                  : {
                      filter: 'invert(0%)',
                    }
              }
            ></img>
          )}
          <div
            className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_type"
            style={
              themeCtx.isDarkTheme
                ? { filter: 'invert(100%)' }
                : {
                    filter: 'invert(0%)',
                  }
            }
          >
            {format}
          </div>
          {props.type === 'video' && props.resolution != undefined && (
            <img
              src={iconFileResolution}
              className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_length"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(100%)' }
                  : {
                      filter: 'invert(0%)',
                    }
              }
            />
          )}
          {props.type === 'video' && props.resolution != undefined && (
            <div
              className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_resolution"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(100%)' }
                  : {
                      filter: 'invert(0%)',
                    }
              }
            >
              {resolution}
            </div>
          )}
          {props.type === 'video' && props.fps != undefined && (
            <img
              src={IconFileFps}
              className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_fps"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(100%)' }
                  : {
                      filter: 'invert(0%)',
                    }
              }
            ></img>
          )}
          {props.type === 'video' && props.fps != undefined && (
            <div
              className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_fps"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(100%)' }
                  : {
                      filter: 'invert(0%)',
                    }
              }
            >
              {fps} fps
            </div>
          )}
          {props.date != undefined && (
            <img
              src={IconDate}
              className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_date"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(100%)' }
                  : {
                      filter: 'invert(0%)',
                    }
              }
            ></img>
          )}
          {props.date != undefined && (
            // {props.type === 'video' && (
            <div
              className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_date"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(100%)' }
                  : {
                      filter: 'invert(0%)',
                    }
              }
            >
              {dateString}
            </div>
          )}
        </div>
      </div>
      <div className="filterBar__menu filterBar__menu__right">
        <div className="filterBar__menu__item filterBar__menu__item__sort">
          <img
            title="Show in folder"
            src={iconFolder}
            style={
              themeCtx.isDarkTheme
                ? { filter: 'invert(100%)' }
                : {
                    filter: 'invert(0%)',
                  }
            }
          />
        </div>
        <div
          onClick={toggleContextMenu}
          className="filterBar__menu__item filterBar__menu__item__sort"
        >
          <img
            title="More"
            src={menuIcon}
            style={
              themeCtx.isDarkTheme
                ? { filter: 'invert(0%)' }
                : {
                    filter: 'invert(100%)',
                  }
            }
          />
          {isContentMenuVisible && (
            <ContextMenu options={ContextMenuDownloadItemOptions} />
          )}
        </div>
      </div>
    </li>
  );
};

export default DownloadItem;
