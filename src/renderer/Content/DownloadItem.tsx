// import classes from './CartItem.module.css';
import React, { useState, useState, useContext } from 'react';
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
import IconFileDownloading from '../../../assets/Downloads/download.svg';
import IconFileConverting from '../../../assets/Downloads/converting.svg';
import IconDate from '../../../assets/Downloads/date.svg';
// import IconDate from '../../../assets/Downloads/date2.svg';
import SourcesContext from '../../storage/sourcesContext';
import ThemeContext from 'storage/themeContext';
import DownloadsContext from 'storage/downloadsContext';
import menuIcon from '../../../assets/Warpstagram/menu.svg';
import iconFolder from '../../../assets/Downloads/folder1.svg';
import ContextMenu from '../ContextMenu/ContextMenu';
import ContextMenuDownloadItemOptions from '../ContextMenu/ContextMenuDownloadItemOptions';
import itemFormat from './DownloadItemFormat';
// console.log(itemFormat);

const DownloadItem = (props) => {
  const [fileSizeExists, setFileSizeExists] = useState(props.fileSize);
  // console.log(props);

  const [isContentMenuVisible, setisContentMenuVisible] = useState(false);
  const options = 'downloadItemContextMenu';
  const sourcesCtx = useContext(SourcesContext);
  const themeCtx = useContext(ThemeContext);
  const downloadsCtx = useContext(DownloadsContext);
  const dateString = props.timestamp;
  const format = props.format ? props.format.toUpperCase() : '';
  const fps = `${props.fps}`;
  const length = `${props.length}`;
  const fileSize = `${props.fileSize}`;
  const fileSizeInMB = `${(props.fileSize / 1000000).toFixed(1)}MB`;
  const source = itemFormat.capitalizeFirstLetter(props.source);
  const sourceIcon = itemFormat.findSourceIcon(props.source);
  const resolution = `${props.resolution}`;
  const title = `${props.title}`;
  const downloadPercentageWidth = `${props.downloadedPercentage}%`;
  // console.log(downloadPercentageWidth);

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
          ? {
              // backgroundImage: props.backgroundURL
              //   ? `url(${props.backgroundURL})`
              //   : '',
              backgroundColor: themeCtx.nav.dark.backgroundColor,
              width: downloadPercentageWidth,
            }
          : {
              backgroundColor: themeCtx.nav.light.backgroundColor,
              width: downloadPercentageWidth,
              // width: `${props.downloadedPercentage}}%`,
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
        <div className="content__panel__downloads__list__item__info__container content__panel__downloads__list__item__info__container__1">
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
        <div className="content__panel__downloads__list__item__info__container content__panel__downloads__list__item__info__container__2">
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
              className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_type"
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
            {props.author}
          </div>
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
          {props.fileSize > 0 && (
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
          )}
          {props.fileSize > 0 && (
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
              {fileSizeInMB}
            </div>
          )}
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
          {!props.downloadComplete && (
            <img
              src={IconFileDownloading}
              className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_downloading"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(100%)' }
                  : {
                      filter: 'invert(0%)',
                    }
              }
            ></img>
          )}
          {!props.downloadComplete && (
            <div
              className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_date content__panel__downloads__list__item__file_date__text"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(100%)' }
                  : {
                      filter: 'invert(0%)',
                    }
              }
            >
              {props.downloadedPercentage}% downloaded
            </div>
          )}
          {!props.conversionComplete && props.downloadComplete && (
            <img
              src={IconFileConverting}
              className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_converting"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(100%)' }
                  : {
                      filter: 'invert(0%)',
                    }
              }
            ></img>
          )}
          {!props.conversionComplete && props.downloadComplete && (
            <div
              className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_date content__panel__downloads__list__item__file_date__text"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(100%)' }
                  : {
                      filter: 'invert(0%)',
                    }
              }
            >
              {props.conversionPercentage}% converted to {format}
            </div>
          )}
          {props.date != undefined &&
            props.conversionComplete &&
            props.downloadComplete && (
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
          {props.date != undefined &&
            props.conversionComplete &&
            props.downloadComplete && (
              // {props.type === 'video' && (
              <div
                className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_date content__panel__downloads__list__item__file_date__text"
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
            <ContextMenu
              options={ContextMenuDownloadItemOptions}
              downloadID={props.id}
            />
          )}
        </div>
      </div>
    </li>
  );
};

export default DownloadItem;
