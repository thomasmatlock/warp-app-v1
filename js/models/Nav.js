export default class Nav {
    constructor() {
        this.nav_A = {
            nav_A_0: false,
            nav_A_1: false,
            nav_A_2: false,
            nav_A_3: false
        }
    }

    updateActive = (id) => {
        // LOOP THROUGH OBJECT PROPERTIES TO REMOVE ACTIVE CLASS
        console.log(id);

        for (var key in this.nav_A) {
            if (this.nav_A.hasOwnProperty(key)) {
                // console.log(key + " is " + this.nav_A[key]);
                this.nav_A[key] = false;
            }
        }

        // ADD TRUE TO SELECTED TAB
        this.nav_A[id] = true;
        console.log(this.nav_A);

    }


    updateNav_A_active() {

    }
    updateNav_B_active() {

    }

}