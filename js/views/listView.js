import {
    elements
} from './base.js'

export const testVars = {
    firstName: 'money'
}

export const renderItem = () => {
    const markup = `
    <li>
    <a href="#" class="content__link test_add_item">
        <figure class="content__thumbnail">
            <img src="img/youtube-thumbnail.jpg" alt="Test" />
        </figure>
        <div class="content__data">
            <h4 class="content__file-property content__file-title">One Breath Around The World Breath</h4>
            <p class="content__file-property content__file-length">0:45:18</p>
            <p class="content__file-property content__file-size">297.4 MB</p>
            <p class="content__file-property content__file-format">MP4</p>
            <p class="content__file-property content__file-resolution">1080p</p>
        </div>
    </a>
</li>
    `;
    elements.content__list.insertAdjacentHTML('beforeend', markup);
};

// export const deleteItem = () => {
//     const item = document.querySelector(`[data-itemid="${id}"]`);
//     if (item) item.parentElement.removeChild(item);
// };