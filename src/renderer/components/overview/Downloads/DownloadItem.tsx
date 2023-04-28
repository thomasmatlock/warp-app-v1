import { useState, useContext } from 'react';
// import DownloadsContext from 'storage/downloadsContext';
import OverviewDisplayContextProvider from '../../../store/overviewDisplayDownloadsDataContext';
import Image from 'next/image';
import ThemeContext from '../../../store/themeContext';
import iconLength from '../assets/duration.svg';
import iconFileSize from '../assets/fileSize.svg';
import IconFileTypeAudio from '../assets/fileTypeAudio.svg';
import IconFileTypeVideo from '../assets/fileTypeVideo.svg';
import iconFileResolution from '../assets/resolution.svg';
import IconFileFps from '../assets/fps1.svg';
import IconFileDownloading from '../assets/download.svg';
import IconFileETA from '../assets/infinity.svg';
import IconFileConverting from '../assets/converting.svg';
import IconDate from '../assets/date.svg';
// import menuIcon from './Warpstagram/menu.svg';
import iconFolder from '../assets/folder1.svg';
import styles from './OverviewDownloads.module.scss';
import * as generate from '../../../utils/generate';

export default function DownloadItem(props) {
    const overviewDisplayCtx = useContext(OverviewDisplayContextProvider);
    const themeCtx = useContext(ThemeContext);
    const [fileSizeExists, setFileSizeExists] = useState(props.fileSize);
    // console.log(props);
    function shortenString(str: string, maxChars: number) {
        return str.length > maxChars ? str.slice(0, maxChars - 1) + '...' : str;
    }
    const [isContentMenuVisible, setisContentMenuVisible] = useState(false);
    // const options = 'downloadItemContextMenu';
    // const sourcesCtx = useContext(SourcesContext);
    // const downloadsCtx = useContext(DownloadsContext);
    // const dateString = props.timestamp;
    // const format = props.format ? props.format.toUpperCase() : '';
    // console.log(format);

    // const fps = `${props.fps}`;
    // const length = `${props.length}`;
    // console.log(length);

    // const fileSize = `${props.fileSize}`;
    // console.log(props.fileSize);

    // const fileSizeInMB = `${(props.fileSize / 1).toFixed(1)}MB`;
    // const fileSizeInMB = `${props.fileSize}`;
    // console.log(fileSizeInMB);

    // const source = itemFormat.capitalizeFirstLetter(props.source);
    // const sourceIcon = itemFormat.findSourceIcon(props.source);
    // const resolution = `${props.resolution}`;
    // const title = `${props.title}`;
    // console.log(title);

    // const titleShortened = shortenString(title, 60);
    const audioItem = [
        styles.content__panel__downloads__list__item,
        styles.content__panel__downloads__list__item__audio,
    ].join(' ');
    const videoItem = [
        styles.content__panel__downloads__list__item,
        styles.content__panel__downloads__list__item__video,
    ].join(' ');

    const itemContainer1 = [
        styles.content__panel__downloads__list__item__info__container,
        styles.content__panel__downloads__list__item__info__container__1,
    ].join(' ');
    const itemContainer2 = [
        styles.content__panel__downloads__list__item__info__container,
        styles.content__panel__downloads__list__item__info__container__2,
    ].join(' ');
    const itemTitle = [styles.content__panel__downloads__list__item__title].join(' ');
    const itemIcon = [styles.content__panel__downloads__list__item__icon].join(' ');
    const itemText = [styles.content__panel__downloads__list__item__text].join(' ');

    // return <h1>download item</h1>;
    return (
        <li
            id={generate.randomId()}
            // onClick={() => {
            //     // getSourceID(props.id);
            //     downloadsCtx.getDownloadID(props.id);
            // }}
            // onClick={props.downloadSelectedHandler}
            // onMouseEnter={turnOffContextMenu}
            // onMouseLeave={turnOffContextMenu}
            // onClick={turnOffContextMenu}
            // className="content__panel__downloads__list__item content__panel__downloads__list__item__audio"
            className={props.type === 'audio' ? audioItem : videoItem}
            style={
                themeCtx.isDarkTheme
                    ? {
                          // backgroundImage: props.backgroundURL
                          //   ? `url(${props.backgroundURL})`
                          //   : '',
                          backgroundColor: themeCtx.nav.dark.backgroundColor,
                          //   width: downloadPercentageWidth,
                      }
                    : {
                          backgroundColor: themeCtx.nav.light.backgroundColor,
                          //   width: downloadPercentageWidth,
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
            <Image
                src={props.thumbnail}
                alt="thumbnail"
                className={styles.content__panel__downloads__list__item__thumbnail}
            />
            <div className={styles.content__panel__downloads__list__item__info}>
                <div
                    // className="content__panel__downloads__list__item__info__container content__panel__downloads__list__item__info__container__1"
                    className={itemContainer1}
                >
                    <div
                        // className="content__panel__downloads__list__item__text content__panel__downloads__list__item__title"
                        className={itemTitle}
                        style={
                            themeCtx.isDarkTheme
                                ? { filter: 'invert(0%)' }
                                : {
                                      filter: 'invert(100%)',
                                  }
                        }
                    >
                        {/* {titleShortened} */}
                        {props.title}
                    </div>
                </div>
                <div
                    // className="content__panel__downloads__list__item__info__container content__panel__downloads__list__item__info__container__2"
                    className={itemContainer2}
                >
                    {props.type === 'audio' && (
                        <Image
                            alt="audio file type"
                            src={IconFileTypeAudio}
                            // className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_length"
                            className={itemIcon}
                            style={
                                themeCtx.isDarkTheme
                                    ? { filter: 'invert(100%)' }
                                    : {
                                          filter: 'invert(0%)',
                                      }
                            }
                        />
                    )}
                    {props.type === 'video' && (
                        <Image
                            alt="video file type"
                            src={IconFileTypeVideo}
                            // className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_type"
                            className={itemIcon}
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
                        // className="content__panel__downloads__list__item__text content__panel__downloads__list__item__file_type"
                        className={itemText}
                        style={
                            themeCtx.isDarkTheme
                                ? { filter: 'invert(100%)' }
                                : {
                                      filter: 'invert(0%)',
                                  }
                        }
                    >
                        {props.format}
                    </div>
                    {/* <Image
                        alt="file length"
                        src={sourceIcon}
                        className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_source"
                        style={
                            themeCtx.isDarkTheme
                                ? { filter: 'invert(0%)' }
                                : {
                                      filter: 'invert(100%)',
                                  }
                        }
                    /> */}
                    {/* <div
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
                    </div> */}
                    <Image
                        alt="file length"
                        src={iconLength}
                        // className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_length"
                        className={itemIcon}
                        style={
                            themeCtx.isDarkTheme
                                ? { filter: 'invert(100%)' }
                                : {
                                      filter: 'invert(0%)',
                                  }
                        }
                    />
                    <div
                        // className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_length"
                        // className={itemLength}
                        className={itemText}
                        style={
                            themeCtx.isDarkTheme
                                ? { filter: 'invert(100%)' }
                                : {
                                      filter: 'invert(0%)',
                                  }
                        }
                    >
                        {/* {length} */}
                        {props.length}
                    </div>
                    {/* {props.fileSize > 0 && ( */}
                    <Image
                        alt="file size"
                        src={iconFileSize}
                        // className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_length"
                        className={itemIcon}
                        style={
                            themeCtx.isDarkTheme
                                ? { filter: 'invert(100%)' }
                                : {
                                      filter: 'invert(0%)',
                                  }
                        }
                    />
                    {/* )} */}
                    {/* {props.fileSize > 0 && ( */}
                    <div
                        // className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_size"
                        className={itemText}
                        style={
                            themeCtx.isDarkTheme
                                ? { filter: 'invert(100%)' }
                                : {
                                      filter: 'invert(0%)',
                                  }
                        }
                    >
                        {/* {fileSizeInMB} */}
                        {props.fileSize}
                    </div>
                    {/* )} */}
                    {props.type === 'video' && props.resolution !== undefined && (
                        <Image
                            alt="file resolution"
                            src={iconFileResolution}
                            // className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_length"
                            className={itemIcon}
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
                            // className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_resolution"
                            className={itemText}
                            style={
                                themeCtx.isDarkTheme
                                    ? { filter: 'invert(100%)' }
                                    : {
                                          filter: 'invert(0%)',
                                      }
                            }
                        >
                            {props.resolution}
                        </div>
                    )}
                    {props.type === 'video' && props.fps !== undefined && (
                        <Image
                            alt="file fps"
                            src={IconFileFps}
                            // className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_fps"
                            className={itemIcon}
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
                            // className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_fps"
                            className={itemText}
                            style={
                                themeCtx.isDarkTheme
                                    ? { filter: 'invert(100%)' }
                                    : {
                                          filter: 'invert(0%)',
                                      }
                            }
                        >
                            {props.fps}fps
                        </div>
                    )}
                    {/* {props.date !== undefined && ( */}
                    <Image
                        alt="file date"
                        src={IconDate}
                        // className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_date"
                        className={itemIcon}
                        style={
                            themeCtx.isDarkTheme
                                ? { filter: 'invert(100%)' }
                                : {
                                      filter: 'invert(0%)',
                                  }
                        }
                    />
                    {/* )} */}
                    {props.date !== undefined && (
                        // {props.type === 'video' && (
                        <div
                            // className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_date content__panel__downloads__list__item__file_date__text"
                            className={itemText}
                            style={
                                themeCtx.isDarkTheme
                                    ? { filter: 'invert(100%)' }
                                    : {
                                          filter: 'invert(0%)',
                                      }
                            }
                        >
                            {props.timestamp}
                        </div>
                    )}
                </div>
            </div>
            {/* </div> */}
        </li>
    );
}

// export default DownloadItem;
