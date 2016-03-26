import App from './app';


function blockBodyTouchMove(e) {
    var currentTarget = e.target;
    while (currentTarget && currentTarget !== document.body) {
        if (currentTarget.scrollHeight > currentTarget.offsetHeight) {
            // we found a scrollable area; allow it.
            return;
        }
        currentTarget = currentTarget.parentNode;
    }
    // no scrollable parent elements; prevent the move.
    e.preventDefault();
}

function bindBlockBodyTouchMove() {
    window.addEventListener('touchmove', blockBodyTouchMove);
}

function unbindBlockBodyTouchMove() {
    window.removeEventListener('touchmove', blockBodyTouchMove);
}

let lastWindowHeight = 0;
let keyboardIsVisible = false;

function updateAppHeight(h) {
    if (typeof h === 'number') h = h + 'px';
    var el = document.getElementById('app');
    if (el) {
        el.style.height = h;
    }
}

function fixWindowHeight() {
    var resetAppHeight = () => {
        if (keyboardIsVisible || window.innerHeight === lastWindowHeight) return;
        lastWindowHeight = window.innerHeight;
        updateAppHeight(lastWindowHeight);
        // if the iOS in-call status bar is visible, this fixes the scrolling
        // bug that's present on the document.body.
        if (document.body.scrollHeight > window.innerHeight) {
            bindBlockBodyTouchMove();
        } else {
            unbindBlockBodyTouchMove();
        }
    };
    resetAppHeight();
    setInterval(resetAppHeight, 250);
}

function keyboardShowHandler(e) {
    keyboardIsVisible = true;
    delete document.getElementById('app').style.height;
    console.log('Keyboard height is: ' + e.keyboardHeight + ', width height is: ' + window.innerHeight + ', last window height is: ' + lastWindowHeight);

    $('.keyboard-attach').css({bottom: e.keyboardHeight});
}

function keyboardHideHandler(e) {
    keyboardIsVisible = false;
    updateAppHeight(lastWindowHeight);
    console.log('Keyboard is hidden, window height is: ' + window.innerHeight + ', last window height is: ' + lastWindowHeight);
    $('.keyboard-attach').css({bottom: 0});
}

function startApp() {
    if (window.StatusBar) {
        window.StatusBar.styleLightContent();
    }
    fixWindowHeight();
    ReactDOM.render(<App/>, document.getElementById("app"));
}

Meteor.startup(function () {

    if (Meteor.isCordova) {
        window.addEventListener('native.keyboardshow', keyboardShowHandler);
        window.addEventListener('native.keyboardhide', keyboardHideHandler);
        if (cordova && cordova.plugins.Keyboard) {
            console.log("............................")
            console.log("Checking the keyboard...");
            console.log("............................")
            //  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
         //   cordova.plugins.Keyboard.disableScroll(true);
        }
        // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        document.addEventListener('deviceready', startApp, false);
        /**
         * TODO:
         * Check Android Notes for Android Specifics
         * http://ionicframework.com/docs/api/page/keyboard/
         */
    } else {
        startApp();
    }
});
