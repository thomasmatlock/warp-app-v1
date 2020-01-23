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
navSecondaryView.updateNavSecondaryTitles('tab-0');
// navSecondaryView.highlightSelected();


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
	// console.log(target.href);

	// const href = target.href;
	// console.log(href);
	// console.log(id);


	if (id) {
		// console.log('yea its tab 2');
		navSecondaryView.updateNavSecondaryTitles(id);
	}

	// highlightSelected(id);
	highlightSelected(id);
});

const highlightSelected = id => {
	// GET ARRAY OF NAV TABS
	// console.log(id);

	const tabsArr = Array.from(document.querySelectorAll(".nav-primary-tab"));
	// console.log(tabsArr);


	// REMOVE ACTIVE CLASS FROM ALL TABS
	tabsArr.forEach(el => {
		el.classList.remove("nav-primary-tab--active");
	});

	// Add active class to selected tabs
	let tab = document.getElementById(`${id}`);
	tab.classList.add('nav-primary-tab--active');
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
	const text = target.textContent;
	const textSubString = 'mart'; // looks for [s]mart mode, skip 'S' cuz maybe not always in caps
	// console.log(text);
	// console.log(text.includes(textSubString));

	// console.log(target.className);

	const nav2TestTab = 'tab-b'; //test
	if (text.includes(textSubString) && target.className.includes('active') === false) {
		navSecondaryView.toggleHighlightSelected('add', nav2TestTab);
	} else if (text.includes(textSubString) && target.className.includes('active') === true) {
		navSecondaryView.toggleHighlightSelected('remove', nav2TestTab);
	}

	// console.log(target.class); //testing
	// console.log(target.classList); //testing

	// CHECK FOR BUTTON CLICK
	if (target.classList.contains("nav-secondary-tab")) {
		// checks if event has a classname i want
		// console.log("You clicked nav-secondary__" + target.id);

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