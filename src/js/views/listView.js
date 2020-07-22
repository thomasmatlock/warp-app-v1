// import { elements } from './base.js';
// const elements =require('./base')

exports.renderItem = (nav_A_active) => {
    const markup = `
    <li>
    <a href="#" class="content__link test_add_item_0">
        <figure class="content__thumbnail">
            <img src="img/youtube-thumbnail.jpg" alt="Test" />
        </figure>
        <div class="content__data">
            <h4 class="content__file-property content__file-title">One Breath Around The World</h4>
            <p class="content__file-property content__file-length">0:45:18</p>
            <p class="content__file-property content__file-size">297.4 MB</p>
            <p class="content__file-property content__file-format">MP4</p>
            <p class="content__file-property content__file-resolution">1080p</p>
        </div>
    </a>
</li>
    `;

    if (nav_A_active.includes('0')) {
        elements.content__list_0.insertAdjacentHTML('beforeend', markup);
    } else if (nav_A_active.includes('1')) {
        elements.content__list_1.insertAdjacentHTML('beforeend', markup);
    } else if (nav_A_active.includes('2')) {
        elements.content__list_2.insertAdjacentHTML('beforeend', markup);
    } else if (nav_A_active.includes('3')) {
        elements.content__list_3.insertAdjacentHTML('beforeend', markup);
    }
};

exports.deleteItem = () => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    if (item) item.parentElement.removeChild(item);
};