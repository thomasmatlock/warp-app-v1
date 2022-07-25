const instagramPosts = require('instagram-posts'); // https://www.npmjs.com/package/instagram-posts
const instaScrape = require('instagram-scraping'); // https://www.npmjs.com/package/instagram-scraping
const instaObj = require('instagram-basic-data-scraper-with-username'); // https://www.npmjs.com/package/instagram-basic-data-scraper-with-username
const instagramSave = require('instagram-save');

// const user = 'thedonaldonline';
// const user = 'tomtacular';
const user = 'realdonaldtrump';

// instaObj.specificField(user, 'posts').then((id) => {
//     console.log(id);
//     // => { data: '1429637717' }
// });
// instagram-scraping
// instaScrape.scrapeTag(user).then((result) => {
//     console.dir(result.posts);
// });
let post = 'https://www.instagram.com/p/CFQjfzJH-gb/';

instagramSave(
    'CFQjfzJH-gb',
    'C:\\Users\\Tommy\\Documents\\GitHub\\Projects\\Warp-App'
).then((res) => {
    console.log(res.file);
});

// instagramPosts
// (async() => {
//     const posts = await instagramPosts(user, {
//         count: 25,
//     });
//     console.log(`${Object.size(posts)} posts on ${user}`);
//     /*
//     [
//         {
//             id: 'BRWBBbXjT40',
//             username: 'cats_of_instagram',
//             time: 1488904930,
//             type: 'image',
//             likes: 809,
//             comments: 10,
//             text: 'This is my post',
//             media: 'https://instagram.fbma1-1.fna.fbcdn.net/t51.2885-15/s640x640/sh0.08/e35/1231231_123123_1231231.jpg',
//             …
//         },
//         …
//     ]
//     */
// })();
