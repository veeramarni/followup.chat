import {
    createApp,
    Container,
    NavigationBar,
    UI,
    ViewManager,
    View
} from '{followupchat:app-deps}/packages/touchstonejs';

import OnBoarding from '/client/views/on-boarding/on-boarding';

import about from './views/about/about';
import Sentry from '{followupchat:app-deps}/packages/react-sentry';

import LoginView from '/client/views/login/login-view';




export default React.createClass({
    mixins: [createApp(), Sentry()],

    childContextTypes: {},

    getInitialState () {
        return {
            defaultView: Meteor.userId() ? 'main' : 'on-boarding'
        };
    },

    componentDidMount() {
    },

    updateAppState (settings){

    },

    render () {
        return (
            <ViewManager ref="vm" name="app" defaultView={this.state.defaultView}>
                <View name="main" component={MainViewController}/>
                <View name="on-boarding" component={OnBoardViewController}/>
            </ViewManager>
        )
    }
});

var OnBoardViewController = React.createClass({
    render () {
        return (
            <Container>
                <ViewManager name="onboard" defaultView="on-boarding">
                    <View name="login" component={LoginView}/>
                    <View name="on-boarding" component={OnBoarding}/>
                </ViewManager>
            </Container>
        )
    }
});

var MainViewController = React.createClass({
    render () {
        return (
            <Container>
                <UI.NavigationBar name="main"/>
                <ViewManager name="main" defaultView="tabs">
                    <View name="tabs" component={TabViewController}/>
                </ViewManager>
            </Container>
        )
    }
});


let lastSelectedTab = 'me';
var TabViewController = React.createClass({

    mixins: [Sentry()],

    getInitialState() {
        return {
            selectedTab: lastSelectedTab
        }
    },

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

    onSelectTab (tab) {
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
                </ViewManager>
                <UI.Tabs.Navigator value={selectedTab} onChange={this.onSelectTab}>
                    <UI.Tabs.Tab value="schedule">
                        <span className="Tabs-Icon Tabs-Icon--schedule"/>
                        <UI.Tabs.Label>Schedule</UI.Tabs.Label>
                    </UI.Tabs.Tab>
                    <UI.Tabs.Tab value="about">
                        <span className="Tabs-Icon Tabs-Icon--about"/>
                        <UI.Tabs.Label>About</UI.Tabs.Label>
                    </UI.Tabs.Tab>
                </UI.Tabs.Navigator>
            </Container>
        )
    }
});
