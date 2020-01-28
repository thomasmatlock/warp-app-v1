export default class Nav {
    // constructor() {
    //     this.items = [];
    // }

    // addItem(count, unit, ingredient) {
    //     const item = {
    //         id: uniqid(),
    //         count,
    //         unit,
    //         ingredient
    //     }
    //     this.items.push(item);
    //     return item;
    // }

    // deleteItem(id) {
    //     const index = this.items.findIndex(el => el.id === id);
    //     // [2,4,8] splice(1, 2) -> returns [4, 8], original array is [2]
    //     // [2,4,8] slice(1, 2) -> returns 4, original array is [2,4,8]
    //     this.items.splice(index, 1);
    // }

    // updateCount(id, newCount) {
    //     this.items.find(el => el.id === id).count = newCount;
    // }
}

export class Likes {
    // constructor() {
    //     this.likes = [];
    // }

    // addLike(id, title, author, img) {
    //     const like = { id, title, author, img };
    //     this.likes.push(like);

    //     // Perist data in localStorage
    //     this.persistData();

    //     return like;
    // }

    // deleteLike(id) {
    //     const index = this.likes.findIndex(el => el.id === id);
    //     this.likes.splice(index, 1);

    //     // Perist data in localStorage
    //     this.persistData();
    // }

    // isLiked(id) {
    //     return this.likes.findIndex(el => el.id === id) !== -1;
    // }

    // getNumLikes() {
    //     return this.likes.length;
    // }

    // persistData() {
    //     localStorage.setItem('likes', JSON.stringify(this.likes));
    // }

    // readStorage() {
    //     const storage = JSON.parse(localStorage.getItem('likes'));

    //     // Restoring likes from the localStorage
    //     if (storage) this.likes = storage;
    // }
}

export class Recipe {
    // constructor(id) {
    //     this.id = id;
    // }

    // async getRecipe() {
    //     try {
    //         const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
    //         this.title = res.data.recipe.title;
    //         this.author = res.data.recipe.publisher;
    //         this.img = res.data.recipe.image_url;
    //         this.url = res.data.recipe.source_url;
    //         this.ingredients = res.data.recipe.ingredients;
    //     } catch (error) {
    //         console.log(error);
    //         alert('Something went wrong :(');
    //     }
    // }

    // calcTime() {
    //     // Assuming that we need 15 min for each 3 ingredients
    //     const numIng = this.ingredients.length;
    //     const periods = Math.ceil(numIng / 3);
    //     this.time = periods * 15;
    // }

    // calcServings() {
    //     this.servings = 4;
    // }

    // parseIngredients() {
    //     const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    //     const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    //     const units = [...unitsShort, 'kg', 'g'];

    //     const newIngredients = this.ingredients.map(el => {
    //         // 1) Uniform units
    //         let ingredient = el.toLowerCase();
    //         unitsLong.forEach((unit, i) => {
    //             ingredient = ingredient.replace(unit, unitsShort[i]);
    //         });

    //         // 2) Remove parentheses
    //         ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

    //         // 3) Parse ingredients into count, unit and ingredient
    //         const arrIng = ingredient.split(' ');
    //         const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

    //         let objIng;
    //         if (unitIndex > -1) {
    //             // There is a unit
    //             // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
    //             // Ex. 4 cups, arrCount is [4]
    //             const arrCount = arrIng.slice(0, unitIndex);

    //             let count;
    //             if (arrCount.length === 1) {
    //                 count = eval(arrIng[0].replace('-', '+'));
    //             } else {
    //                 count = eval(arrIng.slice(0, unitIndex).join('+'));
    //             }

    //             objIng = {
    //                 count,
    //                 unit: arrIng[unitIndex],
    //                 ingredient: arrIng.slice(unitIndex + 1).join(' ')
    //             };

    //         } else if (parseInt(arrIng[0], 10)) {
    //             // There is NO unit, but 1st element is number
    //             objIng = {
    //                 count: parseInt(arrIng[0], 10),
    //                 unit: '',
    //                 ingredient: arrIng.slice(1).join(' ')
    //             }
    //         } else if (unitIndex === -1) {
    //             // There is NO unit and NO number in 1st position
    //             objIng = {
    //                 count: 1,
    //                 unit: '',
    //                 ingredient
    //             }
    //         }

    //         return objIng;
    //     });
    //     this.ingredients = newIngredients;
    // }

    // updateServings (type) {
    //     // Servings
    //     const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

    //     // Ingredients
    //     this.ingredients.forEach(ing => {
    //         ing.count *= (newServings / this.servings);
    //     });

    //     this.servings = newServings;
    // }
}