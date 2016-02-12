const {
    createApp,
    Container,
    NavigationBar,
    Tabs,
    ViewManager,
    View
    } = Touchstone;

import Onboard from './views/onboard/onboard';

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
    document.getElementById('app').style.height = h;
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
}

function keyboardHideHandler(e) {
    keyboardIsVisible = false;
    updateAppHeight(lastWindowHeight);
    console.log('Keyboard is hidden, window height is: ' + window.innerHeight + ', last window height is: ' + lastWindowHeight);
}

export default React.createClass({
    mixins: [createApp(), Sentry()],

    childContextTypes: {},

    getInitialState () {
        return {
            defaultView: Meteor.currentUser() ? 'main' : 'login'
        };
    },

    componentDidMount() {

    },

    updateAppState (settings){

    },

    render () {
        const appWrapperClassName = 'app-wrapper device--' + bjse.client.deviceType;

        return (
            <div className={appWrapperClassName}>
                <div className="device-silhouette">
                    <ViewManager ref="vm" name="app" defaultView={this.state.defaultView}>
                        <View name="onboarding" component={Onboard}/>
                    </ViewManager>
                </div>
            </div>
        )
    }
});