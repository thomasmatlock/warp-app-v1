import Nav from './models/Nav.js';

import * as navPrimaryView from "./views/navPrimaryView.js";
import * as navSecondaryView from "./views/navSecondaryView.js";
import * as listView from "./views/listView.js";
import * as navTitles from "./models/config.js";

// console.log(navTitles.menus.warpstogram.Edit[2]); // TEST
// console.log(navTitles.navSecondaryTitles.audioTools[2]); // TEST

import {
	elements
} from "./views/base.js";

/**
 * STARTUP INIT
 */
const init = () => {
	// navSecondaryView.updateTitles('nav_A_0');
	// navSecondaryView.highlightSelected();
}
init();


const state = {
	nav_A: {
		nav_A_0: false,
		nav_A_1: false,
		nav_A_2: false,
		nav_A_3: false
	}
}

state.nav = new Nav();
// console.log(state.nav.nav_A);


// updates selected nav_A tab to state as active
// const updateActive = (tabID) => {
// 	// LOOP THROUGH OBJECT PROPERTIES TO REMOVE ACTIVE CLASS
// 	console.log(tabID);

// 	for (var key in state.nav_A) {
// 		if (state.nav_A.hasOwnProperty(key)) {
// 			// console.log(key + " is " + state.nav_A[key]);
// 			state.nav_A[key] = false;
// 		}
// 	}

// 	// ADD TRUE TO SELECTED TAB
// 	state.nav_A[tabID] = true;
// }

let nav_A_active = 'nav_A_0';

/**
 * NAV PRIMARY CONTROLLER
 */
elements.nav_A.addEventListener("click", e => {
	// GETS CLICK EVENT TARGET
	const target = e.target;
	const id = target.id;
	nav_A_active = id;
	console.log(id);


	if (id) {
		state.nav.updateActiveNav_A(id);
		navSecondaryView.updateTitles(id); // updateTitles NEEDS WORK
	}

	// 	CLEARS ACTIVE AND ADDS IT TO SELECTED TAB
	navPrimaryView.clearActive();
	navPrimaryView.highlightSelected(id);
	// console.log(state.nav.nav_A);


	navSecondaryView.clearActive();
});




/**
 * NAV SECONDARY CONTROLLER
 */
elements.nav_B.addEventListener("click", e => {
	const target = e.target;
	const id = target.id;
	const subString = 'mart';


	navSecondaryView.clearActive();
	navSecondaryView.checkForSubstring(target, subString);

	state.nav.updateActiveNav_B(nav_A_active, id);

	// if (state.nav.nav_B[nav_A_active][id] != true) {
	// 	state.nav.nav_B[nav_A_active][id] = true;
	// } else if (state.nav.nav_B[nav_A_active][id] = true;) {
	// 	state.nav.nav_B[nav_A_active][id] = false;
	// }

	// console.log(state.nav.nav_B[nav_A_active][id]);



});



/**
 * LIST CONTROLLER
 */

document.querySelector(".test_add_item").addEventListener("click", e => {
	listView.renderItem();
});