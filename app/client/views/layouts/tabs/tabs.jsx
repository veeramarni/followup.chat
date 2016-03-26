import React from 'react';
import {
    createApp,
    Container,
    UI,
    ViewManager,
    View
} from 'touchstonejs';
//const {
//    Container,
//    createApp,
//    UI,
//    View,
//    ViewManager
//    } = Touchstone;

var lastSelectedTab = 'lists'
TabNav = React.createClass({
    mixins: [createApp()],

    componentDidMount () {
        // Hide the splash screen when the app is mounted
        if (navigator.splashscreen) {
            navigator.splashscreen.hide();
        }
    },
    render() {
        let appWrapperClassName = 'app-wrapper device--' + (window.device || {}).platform;
        return (

            <ViewManager name="app" defaultView="main">
                <View name="main" component={MainViewController}/>
            </ViewManager>

        )
    }
});


// Main Controller
//----------------

var MainViewController = React.createClass({
    render(){
        return (
            <Container>
                <ViewManager name="main" defaultView="tabs">
                    <View name="tabs" component={TabViewController}/>
                </ViewManager>
            </Container>
        )
    }
});


// Tab Controller
// --------------

var TabViewController = React.creatClass({

})