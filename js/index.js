document.querySelector(".test_add_item").addEventListener("click", e => {
	// PRODUCTION MODE
	// e.preventDefault(); // prevents page from reloading on click submit button
	console.log("Hi there");
	listView.renderItem();
});
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
navSecondaryView.updateTitles('nav_A_0');
// navSecondaryView.highlightSelected();

const state = {
	nav_A: {
		nav_A_0: false,
		nav_A_1: false,
		nav_A_2: false,
		nav_A_3: false
	}
}

// const updateState = (navType, NavIndex) => {

// }

// const updateView = () => {

// }






/**
 * NAV PRIMARY CONTROLLER
 */
elements.nav_A.addEventListener("click", e => {
	// GETS CLICK EVENT TARGET
	const target = e.target;
	const nav_A_id = target.id;

	if (nav_A_id) {
		navSecondaryView.updateTitles(nav_A_id);
		updateState(nav_A_id);
		console.log(state.nav_A);
	}

	// 	CLEARS ACTIVE AND ADDS IT TO SELECTED TAB
	navPrimaryView.clearActive();
	navPrimaryView.highlightSelected(nav_A_id);
});

const updateState = (tabID) => {
	// LOOP THROUGH OBJECT PROPERTIES TO REMOVE ACTIVE CLASS
	for (var key in state.nav_A) {
		if (state.nav_A.hasOwnProperty(key)) {
			// console.log(key + " is " + state.nav_A[key]);
			state.nav_A[key] = false;
		}
	}

	// ADD TRUE TO SELECTED TAB
	state.nav_A[tabID] = true;
}

/**
 * NAV SECONDARY CONTROLLER
 */

elements.nav_B.addEventListener("click", e => {
	// GETS CLICK EVENT TARGET
	const target = e.target;
	let id = target.id;
	// console.log(id);
	const text = target.textContent;
	const textSubString = 'mart'; // looks for [s]mart mode, skip 'S' cuz maybe not always in caps
	// console.log(text);
	// console.log(text.includes(textSubString));

	// console.log(target.className);

	const nav2TestTab = 'nav_B_1'; //test
	if (text.includes(textSubString) && target.className.includes('active') === false) {
		navSecondaryView.toggleHighlightSelected('add', nav2TestTab);
	} else if (text.includes(textSubString) && target.className.includes('active') === true) {
		navSecondaryView.toggleHighlightSelected('remove', nav2TestTab);
	}

	// console.log(target.class); //testing
	// console.log(target.classList); //testing

	// CHECK FOR BUTTON CLICK
	if (target.classList.contains("nav_B-tab")) {
		// checks if event has a classname i want
		// console.log("You clicked nav_B__" + target.id);

		if (id) {
			// console.log(id);
			// highlightSelected(id);
		}
		return id; // NOT WORKING!!!
	}
});

/**
 * LIST CONTROLLER
 */