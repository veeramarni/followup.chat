import {
    createApp,
    Container,
    NavigationBar,
    Tabs,
    ViewManager,
    View
    } from '{followupchat:app-deps}/packages/touchstonejs';

import Onboard from './views/onboard/onboard';
import about from './views/about/about';
import Sentry from '{followupchat:app-deps}/packages/react-sentry';

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
            defaultView: Meteor.userId() ? 'login' : 'main'
        };
    },

    componentDidMount() {

    },

    updateAppState (settings){

    },

    render () {
        const appWrapperClassName = 'app-wrapper device--' + bjse.client.deviceType;

        return (
            <ViewManager ref="vm" name="app" defaultView={this.state.defaultView}>
                <View name="main" component={MainViewController}/>
            </ViewManager>
        )
    }
});

var MainViewController = React.createClass({
    render () {
        return (
            <Container>
                <NavigationBar name="main"/>
                <ViewManager name="main" defaultView="tabs">
                    <View name="tabs" component={TabViewController}/>
                </ViewManager>
            </Container>
        )
    }
});

var TabViewController = React.createClass({

    mixins: [Sentry()],

    componentDidMount() {

        this.watch(document, 'backbutton', () => {
            var body = document.getElementsByTagName('body')[0];
            body.classList.remove('android-menu-is-open');
        });
    },

    onViewChange (nextView) {
        lastSelectedTab = nextView;

        this.setState({
            selectedTab: nextView
        });
    },

    selectTab (tab) {
        var viewProps;

        this.refs.vm.transitionTo(tab.value, {
            viewProps: viewProps
        })
    },

    updatedTabState (settings) {
    },

    render () {
        var selectedTab = this.state.selectedTab;
        if (selectedTab === 'me' || selectedTab === 'me-edit') {
            selectedTab = 'me';
        }

        return (
            <Container>
                <ViewManager ref="vm" name="tabs" defaultView='about' onViewChange={this.onViewChange}>
                    <View name="about" component={about}/>
                    <View name="schedule" component={schedule}/>
                </ViewManager>
                <Tabs.Navigator value={selectedTab} onChange={this.selectTab}>
                    <Tabs.Tab value="schedule">
                        <span className="Tabs-Icon Tabs-Icon--schedule"/>
                        <Tabs.Label>Schedule</Tabs.Label>
                    </Tabs.Tab>
                    <Tabs.Tab value="about">
                        <span className="Tabs-Icon Tabs-Icon--about"/>
                        <Tabs.Label>About</Tabs.Label>
                    </Tabs.Tab>
                </Tabs.Navigator>
            </Container>
        )
    }
});