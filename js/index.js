document.querySelector(".test_add_item").addEventListener("click", e => {
	// PRODUCTION MODE
	// e.preventDefault(); // prevents page from reloading on click submit button
	console.log("Hi there");
	listView.renderItem();
});

// document.querySelector('.test_remove_item').addEventListener('click', e => { // PRODUCTION MODE
//     // e.preventDefault(); // prevents page from reloading on click submit button
//     // console.log('Hi there');
//     listView.deleteItem();
// });

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
navPrimaryView.updateNavSecondaryTitles('tab-0');


/**
 * NAV PRIMARY CONTROLLER
 */
elements.navPrimaryTabs.addEventListener("click", e => {
	// PRODUCTION MODE
	// GETS CLICK EVENT TARGET
	const target = e.target;

	// while(target && !target.id) target = target.parentNode;

	if (target) {
		// console.log("You clicked nav-primary__" + target.id);

	}

	const id = target.id;
	// console.log(id);
	if (id) {
		// console.log('yea its tab 2');
		navPrimaryView.updateNavSecondaryTitles(id);
	}

	highlightSelected(id);
});

const highlightSelected = id => {
	// GET ARRAY OF NAV TABS
	const tabsArr = Array.from(document.querySelectorAll(".nav-primary-tab"));

	// REMOVE ACTIVE CLASS FROM ALL TABS
	tabsArr.forEach(el => {
		el.classList.remove("nav-primary-tab--active");
	});

	// Add active class to selected tabs
	document
		.querySelector(`.nav-primary-tab[href*="${id}"]`)
		.classList.add("nav-primary-tab--active");
};

/**
 * NAV SECONDARY CONTROLLER
 */

elements.navSecondaryTabs.addEventListener("click", e => {
	// PRODUCTION MODE
	// GETS CLICK EVENT TARGET
	const target = e.target;
	let id = target.id;
	// console.log(id);

	// console.log(target.class); //testing
	// console.log(target.classList); //testing

	// CHECK FOR BUTTON CLICK
	if (target.classList.contains("nav-secondary-tab")) {
		// checks if event has a classname i want
		console.log("You clicked nav-secondary__" + target.id);

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