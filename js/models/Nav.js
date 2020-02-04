export default class Nav {
    constructor() {
        this.nav_A = {
            nav_A_0: false,
            nav_A_1: false,
            nav_A_2: false,
            nav_A_3: false
        }

        this.nav_B = {
            nav_A_0: {

                nav_B_0: false,
                nav_B_1: false,
                nav_B_2: false,
                nav_B_3: false,
                nav_B_4: false,
                nav_B_5: false

            },

            nav_A_1: {

                nav_B_0: false,
                nav_B_1: false,
                nav_B_2: false,
                nav_B_3: false,
                nav_B_4: false,
                nav_B_5: false

            },
            nav_A_2: {

                nav_B_0: false,
                nav_B_1: false,
                nav_B_2: false,
                nav_B_3: false,
                nav_B_4: false,
                nav_B_5: false

            },
            nav_A_3: {

                nav_B_0: false,
                nav_B_1: false,
                nav_B_2: false,
                nav_B_3: false,
                nav_B_4: false,
                nav_B_5: false

            }
        }
    }

    updateActiveNav_A = (id) => {
        // LOOP THROUGH OBJECT PROPERTIES TO REMOVE ACTIVE CLASS        console.log(id);

        for (var key in this.nav_A) {
            if (this.nav_A.hasOwnProperty(key)) {
                // console.log(key + " is " + this.nav_A[key]);
                this.nav_A[key] = false;
            }
        }

        // ADD TRUE TO SELECTED TAB
        this.nav_A[id] = true;
        // console.log(this.nav_A);

    }

    updateActiveNav_B = (nav_A_active, nav_B_id) => {
        // console.log('hi there');
        const id = nav_B_id;


        if (this.nav_B[nav_A_active][id] != true) {

            // console.log('its false, gotta set it to true');
            console.log('it was false, but it should be true now');
            this.nav_B[nav_A_active][id] = true;

            // console.log(this.nav_B[nav_A_active]);

        } else if (this.nav_B[nav_A_active][id] = true) {

            console.log('it was true, but it should be false now');
            // console.log(id);

            this.nav_B[nav_A_active][id] = false;
            // console.log(this.nav_B[nav_A_active]);
        }
    }
}