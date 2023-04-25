/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import classes from './CartItem.module.css';
import { useState, useContext } from 'react';
import DownloadsContext from 'store/downloadsContext';
import ThemeContext from 'store/themeContext';
import iconLength from './duration.svg';
import iconFileSize from './fileSize.svg';
import IconFileTypeAudio from './fileTypeAudio.svg';
import IconFileTypeVideo from './fileTypeVideo.svg';
import iconFileResolution from './resolution.svg';
import IconFileFps from './fps1.svg';
import IconFileDownloading from './download.svg';
import IconFileETA from './infinity.svg';
import IconFileConverting from './converting.svg';
import IconDate from './date.svg';
import menuIcon from './Warpstagram/menu.svg';
import iconFolder from './folder1.svg';
import ContextMenu from '../ContextMenu/ContextMenu';
import ContextMenuDownloadItemOptions from '../ContextMenu/ContextMenuDownloadItemOptions';
import itemFormat from './DownloadItemFormat';
// console.log(itemFormat);

const DownloadItem = (props) => {
  const [fileSizeExists, setFileSizeExists] = useState(props.fileSize);
  // console.log(props);
  function shortenString(str: string, maxChars: number) {
    return str.length > maxChars ? str.slice(0, maxChars - 1) + '...' : str;
  }
  const [isContentMenuVisible, setisContentMenuVisible] = useState(false);
  // const options = 'downloadItemContextMenu';
  // const sourcesCtx = useContext(SourcesContext);
  const themeCtx = useContext(ThemeContext);
  const downloadsCtx = useContext(DownloadsContext);
  const dateString = props.timestamp;
  const format = props.format ? props.format.toUpperCase() : '';
  const fps = `${props.fps}`;
  const length = `${props.length}`;
  // const fileSize = `${props.fileSize}`;
  const fileSizeInMB = `${(props.fileSize / 1000000).toFixed(1)}MB`;
  // const source = itemFormat.capitalizeFirstLetter(props.source);
  const sourceIcon = itemFormat.findSourceIcon(props.source);
  const resolution = `${props.resolution}`;
  const title = `${props.title}`;
  const titleShortened = shortenString(title, 120);
  let downloadPercentageWidth = props.downloadComplete
    ? 'calc(100% - 1.5rem)'
    : `calc(${props.downloadedPercentage}% - 1.5rem)`;

  const showInFolderHandler = () => {
    downloadsCtx.showInFolder(props.id);
    // console.log('show in folder');
  };

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
            {titleShortened}
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
            />
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
            />
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
          />
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
          />
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
            />
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
          {props.type === 'video' && props.resolution !== undefined && (
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
          {props.type === 'video' && props.resolution !== undefined && (
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
          {props.type === 'video' && props.fps !== undefined && (
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
            />
          )}
          {props.type === 'video' && props.fps !== undefined && (
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
            />
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
          )}{' '}
          {!props.downloadComplete && (
            <img
              src={IconFileETA}
              className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_converting content__panel__downloads__list__item__file_eta_downloading"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(100%)' }
                  : {
                      filter: 'invert(0%)',
                    }
              }
            />
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
              ETA: {props.downloadSecondsRemaining} seconds
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
            />
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
          {!props.conversionComplete && props.downloadComplete && (
            <img
              src={IconFileETA}
              className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_converting content__panel__downloads__list__item__file_eta_conversion"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(100%)' }
                  : {
                      filter: 'invert(0%)',
                    }
              }
            />
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
              ETA: {props.conversionSecondsRemaining} seconds
            </div>
          )}
          {props.date !== undefined &&
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
              />
            )}
          {props.date !== undefined &&
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
        {props.conversionComplete && (
          <div
            className="filterBar__menu__item filterBar__menu__item__sort"
            onClick={showInFolderHandler}
          >
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
        )}
        {/* {props.downloadComplete && ( */}
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
        {/* )} */}
      </div>
    </li>
  );
};

export default DownloadItem;
