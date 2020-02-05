import Nav from "./models/Nav.js";

import * as navPrimaryView from "./views/navPrimaryView.js";
import * as navSecondaryView from "./views/navSecondaryView.js";
import * as listView from "./views/listView.js";
import * as navTitles from "./models/config.js";

// console.log(navTitles.menus.warpstogram.Edit[2]); // TEST
// console.log(navTitles.navSecondaryTitles.audioTools[2]); // TEST

import { elements } from "./views/base.js";

/**
 * STARTUP INIT
 */
const init = () => {
	// navSecondaryView.updateTitles('nav_A_0');
	// navSecondaryView.highlightSelected();
};
init();

const state = {
	nav_A: {
		nav_A_0: false,
		nav_A_1: false,
		nav_A_2: false,
		nav_A_3: false
	}
};

state.nav = new Nav();
let nav_A_active = "nav_A_0";

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

	navSecondaryView.clearActive();

	const nav_B_actives = state.nav.nav_B[nav_A_active];
	for (var key in nav_B_actives) {
		if (nav_B_actives.hasOwnProperty(key) && nav_B_actives[key] === true) {
			// console.log(key + " is " + nav_B_actives[key]);
			navSecondaryView.highlightSelected("add", key);
		}
	}
});

/**
 * NAV SECONDARY CONTROLLER
 */
elements.nav_B.addEventListener("click", e => {
	const target = e.target;
	const id = target.id;
	const subString = "e";
	console.log(id);

	navSecondaryView.clearActive();

	const containsSubString = navSecondaryView.checkForSubstring(
		target,
		subString
	);
	if (containsSubString === false) {
		navSecondaryView.highlightSelected("add", id);
		state.nav.updateActiveNav_B(nav_A_active, id);
	} else if (containsSubString === true) {
		navSecondaryView.highlightSelected("remove", id);
	}
});

/**
 * LIST CONTROLLER
 */

document.querySelector(".test_add_item").addEventListener("click", e => {
	listView.renderItem();
});
