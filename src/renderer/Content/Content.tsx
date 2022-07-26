import { Fragment } from 'react';
import thumbnail from '../../../assets/Content/dummy_thumbnail.png';
import dummy_avatar from '../../../assets/Content/peaky/3.jpg'
import dummy_post3 from '../../../assets/Content/peaky/3.jpg'
import dummy_post4 from '../../../assets/Content/peaky/4.jpg'
import dummy_post5 from '../../../assets/Content/peaky/5.jpg'
import dummy_post6 from '../../../assets/Content/peaky/6.jpg'
import dummy_post7 from '../../../assets/Content/peaky/7.jpg'
import dummy_post8 from '../../../assets/Content/peaky/8.jpg'
import dummy_post9 from '../../../assets/Content/peaky/9.jpg'
import dummy_post10 from '../../../assets/Content/peaky/10.jpg'
import dummy_post11 from '../../../assets/Content/peaky/11.jpg'
import dummy_post12 from '../../../assets/Content/peaky/12.jpg'
import dummy_post13 from '../../../assets/Content/peaky/13.jpg'
import dummy_post14 from '../../../assets/Content/peaky/14.jpg'
// import thumbnail from '../../../assets/Content/thumbnail.png'
import  './Content.scss';
const Content = () => {
    return <Fragment>
        <div className="content">
            {/* <div className="contentPanel"/> */}

            {/* <div className="contentPanel">
                        <ul className="content__panel__downloads__list">
                            <li className="content__panel__downloads__list__item">
                                <img src={thumbnail}  className="content__panel__downloads__list__item__thumbnail" />
                                <div className="content__panel__downloads__list__item__text content__panel__downloads__list__item__title">Magic of Hong Kong cyberpunk drone video</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_length">7:36</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_type">MP3</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_size">8.6MB</div>
                            </li><li className="content__panel__downloads__list__item">
                                <img src={thumbnail}  className="content__panel__downloads__list__item__thumbnail" />
                                <div className="content__panel__downloads__list__item__text content__panel__downloads__list__item__title">Magic of Hong Kong cyberpunk drone video</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_length">7:36</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_type">MP3</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_size">8.6MB</div>
                            </li><li className="content__panel__downloads__list__item">
                                <img src={thumbnail}  className="content__panel__downloads__list__item__thumbnail" />
                                <div className="content__panel__downloads__list__item__text content__panel__downloads__list__item__title">Magic of Hong Kong cyberpunk drone video</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_length">7:36</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_type">MP3</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_size">8.6MB</div>
                            </li><li className="content__panel__downloads__list__item">
                                <img src={thumbnail}  className="content__panel__downloads__list__item__thumbnail" />
                                <div className="content__panel__downloads__list__item__text content__panel__downloads__list__item__title">Magic of Hong Kong cyberpunk drone video</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_length">7:36</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_type">MP3</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_size">8.6MB</div>
                            </li><li className="content__panel__downloads__list__item">
                                <img src={thumbnail}  className="content__panel__downloads__list__item__thumbnail" />
                                <div className="content__panel__downloads__list__item__text content__panel__downloads__list__item__title">Magic of Hong Kong cyberpunk drone video</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_length">7:36</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_type">MP3</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_size">8.6MB</div>
                            </li><li className="content__panel__downloads__list__item">
                                <img src={thumbnail}  className="content__panel__downloads__list__item__thumbnail" />
                                <div className="content__panel__downloads__list__item__text content__panel__downloads__list__item__title">Magic of Hong Kong cyberpunk drone video</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_length">7:36</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_type">MP3</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_size">8.6MB</div>
                            </li><li className="content__panel__downloads__list__item">
                                <img src={thumbnail}  className="content__panel__downloads__list__item__thumbnail" />
                                <div className="content__panel__downloads__list__item__text content__panel__downloads__list__item__title">Magic of Hong Kong cyberpunk drone video</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_length">7:36</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_type">MP3</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_size">8.6MB</div>
                            </li><li className="content__panel__downloads__list__item">
                                <img src={thumbnail}  className="content__panel__downloads__list__item__thumbnail" />
                                <div className="content__panel__downloads__list__item__text content__panel__downloads__list__item__title">Magic of Hong Kong cyberpunk drone video</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_length">7:36</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_type">MP3</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_size">8.6MB</div>
                            </li><li className="content__panel__downloads__list__item">
                                <img src={thumbnail}  className="content__panel__downloads__list__item__thumbnail" />
                                <div className="content__panel__downloads__list__item__text content__panel__downloads__list__item__title">Magic of Hong Kong cyberpunk drone video</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_length">7:36</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_type">MP3</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_size">8.6MB</div>
                            </li><li className="content__panel__downloads__list__item">
                                <img src={thumbnail}  className="content__panel__downloads__list__item__thumbnail" />
                                <div className="content__panel__downloads__list__item__text content__panel__downloads__list__item__title">Magic of Hong Kong cyberpunk drone video</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_length">7:36</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_type">MP3</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_size">8.6MB</div>
                            </li><li className="content__panel__downloads__list__item">
                                <img src={thumbnail}  className="content__panel__downloads__list__item__thumbnail" />
                                <div className="content__panel__downloads__list__item__text content__panel__downloads__list__item__title">Magic of Hong Kong cyberpunk drone video</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_length">7:36</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_type">MP3</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_size">8.6MB</div>
                            </li><li className="content__panel__downloads__list__item">
                                <img src={thumbnail}  className="content__panel__downloads__list__item__thumbnail" />
                                <div className="content__panel__downloads__list__item__text content__panel__downloads__list__item__title">Magic of Hong Kong cyberpunk drone video</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_length">7:36</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_type">MP3</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_size">8.6MB</div>
                            </li><li className="content__panel__downloads__list__item">
                                <img src={thumbnail}  className="content__panel__downloads__list__item__thumbnail" />
                                <div className="content__panel__downloads__list__item__text content__panel__downloads__list__item__title">Magic of Hong Kong cyberpunk drone video</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_length">7:36</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_type">MP3</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_size">8.6MB</div>
                            </li><li className="content__panel__downloads__list__item">
                                <img src={thumbnail}  className="content__panel__downloads__list__item__thumbnail" />
                                <div className="content__panel__downloads__list__item__text content__panel__downloads__list__item__title">Magic of Hong Kong cyberpunk drone video</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_length">7:36</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_type">MP3</div>
                                <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_size">8.6MB</div>
                            </li>
                          
                        </ul>
            </div>  */}

                <div className="contentPanel">
                         <ul className="content__panel__warpstagram__accounts">
                            <li className="content__panel__warpstagram__account">
                                <div className="content__panel__warpstagram__account__info">
                                    <img src={dummy_avatar} className=" content__panel__warpstagram__account__info__avatar" ></img>
                                    <div className="content__panel__warpstagram__account__info__text content__panel__warpstagram__account__info__name">thedreamsetup</div>
                                    <div className="content__panel__warpstagram__account__info__text content__panel__warpstagram__account__info__posts">143 items</div>
                                    <div className="content__panel__warpstagram__account__info__text content__panel__warpstagram__account__info__posts-type">posts, stories, highlights</div>
                                </div>
                                <div className="content__panel__warpstagram__account__posts">
                                    <img src={dummy_post3} alt="" className="content__panel__warpstagram__account__posts__item" />
                                    <img src={dummy_post4} alt="" className="content__panel__warpstagram__account__posts__item" />
                                    <img src={dummy_post5} alt="" className="content__panel__warpstagram__account__posts__item" />
                                    <img src={dummy_post6} alt="" className="content__panel__warpstagram__account__posts__item" />
                                    <img src={dummy_post7} alt="" className="content__panel__warpstagram__account__posts__item" />
                                    <img src={dummy_post8} alt="" className="content__panel__warpstagram__account__posts__item" />
                                    <img src={dummy_post9} alt="" className="content__panel__warpstagram__account__posts__item" />
                                    <img src={dummy_post10} alt="" className="content__panel__warpstagram__account__posts__item" />
                                    <img src={dummy_post11} alt="" className="content__panel__warpstagram__account__posts__item" />
                                    <img src={dummy_post12} alt="" className="content__panel__warpstagram__account__posts__item" />
                                    <img src={dummy_post13} alt="" className="content__panel__warpstagram__account__posts__item" />
                                    <img src={dummy_post14} alt="" className="content__panel__warpstagram__account__posts__item" />
                                </div>
                            </li>
                        </ul> 
                </div>
        </div>
    </Fragment>
}
export default Content;