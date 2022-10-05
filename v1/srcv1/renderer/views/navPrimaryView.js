const elements = require('./elements');

const clearActive = () => {
    elements.nav_A_buttonArr.forEach((el) => {
        el.classList.remove('nav_A_tab__active');
    });
};

const updateHighlighted = (id) => {
    clearActive();
    let orangeGradient = 'linear-gradient(268deg, #da2c4d, #f8ab37)';
    let blueGradient = 'linear-gradient( to left, #0463db 0%, #0b88e6 33%, #13aff2 66%, #19d2fc 100%)';
    const tab = document.getElementById(`${id}`);
    tab.classList.add('nav_A_tab__active');
    tab.style.backgroundImage = blueGradient;
};
const setActiveNav_A = (storage) => {
    for (var key in storage.user.prefs) {
        if (key.includes('startupTab')) {
            if (key && key.includes('audio')) {
                elements.nav_A_active = elements.nav_A_audio;
            }
            if (key && key.includes('video')) {
                elements.nav_A_active = elements.nav_A_video;
            }
            if (key && key.includes('warpstagram')) {
                elements.nav_A_active = elements.nav_A_warpstagram;
            }
        }
    }
};


module.exports = {
    clearActive,
    updateHighlighted,
    // setActiveNav_A,
}