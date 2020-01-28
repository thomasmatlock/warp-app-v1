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
navSecondaryView.updateNavSecondaryTitles('nav_A_00');
// navSecondaryView.highlightSelected();

const state = {
	nav1: {
		nav_A_00: false,
		nav_A_01: false,
		nav_A_02: false,
		nav_A_03: false
	}
}






/**
 * NAV PRIMARY CONTROLLER
 */
elements.navPrimaryTabs.addEventListener("click", e => {
	// PRODUCTION MODE
	// GETS CLICK EVENT TARGET
	const target = e.target;

	// while(target && !target.id) target = target.parentNode;

	if (target) {
		// console.log("You clicked nav_A__" + target.id);

	}

	const id = target.id;

	if (id) {
		// console.log('yea its tab 2');
		// console.log(id);
		navSecondaryView.updateNavSecondaryTitles(id);
		updateNav1Active(id);
		// state.nav1[tabID] = true;
	}
	console.log(state.nav1);

	highlightSelected(id);

	// console.log(state.nav1_0);


	// console.log(target.textContent);

	const tabTextContent = target.textContent;
	const textSubString1 = 'ownload';
	const nav2SmartModeTab = 'nav_B_1'; //test

	if (tabTextContent.includes(textSubString1) === true) {
		// console.log('hi');
		// navSecondaryView.toggleHighlightSelected('remove', nav2SmartModeTab);
	}

	// if (text.includes(textSubString) && target.className.includes('active') === false) {
	// 	navSecondaryView.toggleHighlightSelected('add', nav2TestTab);




});

const highlightSelected = id => {
	// GET ARRAY OF NAV TABS
	// console.log(id);

	const tabsArr = Array.from(document.querySelectorAll(".nav_A-tab"));
	// console.log(tabsArr);


	// REMOVE ACTIVE CLASS FROM ALL TABS
	tabsArr.forEach(el => {
		el.classList.remove("nav_A-tab--active");
	});

	// Add active class to selected tabs
	let tab = document.getElementById(`${id}`);
	tab.classList.add('nav_A-tab--active');
};


const updateNav1Active = (tabID) => {
	// LOOP THROUGH OBJECT PROPERTIES TO REMOVE ACTIVE CLASS
	for (var key in state.nav1) {
		if (state.nav1.hasOwnProperty(key)) {
			// console.log(key + " is " + state.nav1[key]);
			state.nav1[key] = false;
		}
	}

	// ADD TRUE TO SELECTED TAB
	state.nav1[tabID] = true;
}

/**
 * NAV SECONDARY CONTROLLER
 */

elements.navSecondaryTabs.addEventListener("click", e => {
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