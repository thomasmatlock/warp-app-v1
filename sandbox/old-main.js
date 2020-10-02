/**
 * NAV SECONDARY CONTROLLER
 */

elements.nav_B0.addEventListener('click', (e) => {
    nav_B_sequence(e);
});
elements.nav_B1.addEventListener('click', (e) => {
    nav_B_sequence(e);
});
elements.nav_B2.addEventListener('click', (e) => {
    nav_B_sequence(e);
});
elements.nav_B3.addEventListener('click', (e) => {
    nav_B_sequence(e);
});

const nav_B_sequence = (e) => {
    const target = e.target;
    const id = target.id;
    const subString = 'mart';
    const classString = 'active';
    // console.log(id);
    // console.log(`${id} is ${state.nav.nav_B[nav_A_active][id]}`);
    // console.log(state.nav.nav_B);

    navSecondaryView.clearActive();

    const containsSubString = navSecondaryView.checkForSubstring(
        target,
        subString
    );
    const isActive = navSecondaryView.checkActive(target, classString);
    if (containsSubString) {
        // console.log(`Contains substring: true`);
        if (isActive) {
            // console.log(`ACTIVE`);
            navSecondaryView.highlightSelected('remove', id);
            // console.log(`INACTIVE`);
            state.nav.updateActiveNav_B(nav_A_active, id);
        } else if (isActive === false) {
            // console.log(`INACTIVE`);
            navSecondaryView.highlightSelected('add', id);
            // console.log(`ACTIVE`);
            state.nav.updateActiveNav_B(nav_A_active, id);
        }
    } else if (containsSubString === false) {
        navSecondaryView.highlightSelected('remove', id);
    }
    console.table(state.nav.nav_B[nav_A_active]);
};

/**
 * LIST CONTROLLER
 */
// elements.test_add_item_0_arr[0].addEventListener('click', e => {
// 	console.log(elements.test_add_item_0_arr.length);
// 	listItemFunction(e);
// });
elements.test_add_item_0.addEventListener('click', (e) => {
    listItemFunction(e);
});
elements.test_add_item_1.addEventListener('click', (e) => {
    listItemFunction(e);
});
elements.test_add_item_2.addEventListener('click', (e) => {
    listItemFunction(e);
});
elements.test_add_item_3.addEventListener('click', (e) => {
    listItemFunction(e);
});

const listItemFunction = (e) => {
    console.log(e.target);

    // console.log(nav_A_active);
    // console.log(elements.test_add_item_0_arr[0]);

    listView.renderItem(nav_A_active);
};