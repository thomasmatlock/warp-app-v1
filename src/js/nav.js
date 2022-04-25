class nav {
    constructor() {
        this.nav_A = {
            audio: false,
            video: false,
            warpstagram: false,
        };

        this.nav_B = {
            nav_A_audio: [false, false, false, false, false, false],
            nav_A_video: [false, false, false, false, false, false],
            nav_A_warpstagram: [false, false, false, false, false, false],
        };
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
    };

    updateActiveNav_B = (nav_A_active, nav_B_id) => {
        // console.log('hi there');
        // console.log(nav_A_active, nav_B_id);

        const id = nav_B_id;
        // console.log(`This button's state was ${this.nav_B[nav_A_active][id]}`);
        // console.log(`${this.nav_B[nav_A_active][id]}`);

        if (this.nav_B[nav_A_active][id] === false) {
            // console.log('its inactive, gotta set it to active');
            this.nav_B[nav_A_active][id] = true;
            // console.log('it was inactive, but it should be active now');
            // console.log(this.nav_B[nav_A_active]);
        } else if (this.nav_B[nav_A_active][id] === true) {
            // console.log('it was active, but it should be inactive now');
            // console.log(id);
            this.nav_B[nav_A_active][id] = false;
            // console.log('it was active, but it should be inactive now');
            // console.log(this.nav_B[nav_A_active]);
        }
        console.log(`Its ${this.nav_B[nav_A_active][id]} now`);
    };
}

module.exports = nav;