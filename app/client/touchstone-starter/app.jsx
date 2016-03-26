import {createApp, UI, View, ViewManager} from '{followupchat:app-deps}/packages/touchstonejs';
import Container from '{followupchat:app-deps}/packages/react-container';
import Lists from './views/lists';
import Forms from './views/forms';
import Controls from './views/controls';
import TransistionComp from './views/transitions';

import ListSimple from './views/list-simple';
import ListComplex from './views/list-complex';
import ListDetails from './views/list-details';

export default React.createClass({
    mixins: [createApp()],

    getInitialState () {
        return {
            defaultView: 'main'
        }
    },

    render() {
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
            <Container name="main">
                <UI.NavigationBar name="main" />
                <ViewManager name="main" defaultView="tabs">
                    <View name="tabs" component={TabViewController}/>
                </ViewManager>
            </Container>
        )
    }
});

var lastSelectedTab = "lists";
var TabViewController = React.createClass({

    getInitialState() {
        return {
            selectedTab: lastSelectedTab
        }
    },

    onViewChange (nextView) {
        lastSelectedTab = nextView

        this.setState({
            selectedTab: nextView
        })
    },
    onSelectTab(value) {
        let viewProps;

        this.refs.vm.transitionTo(value, {
            transition: 'instant',
            viewProps: viewProps
        });
    },
    render() {
        let selectTab = this.state.selectedTab;
        let selectedTabSpan = selectTab;

        if(selectTab == "list"){
            selectedTabSpan = "lists";
        }
        return (
            <Container >
                <ViewManager ref="vm" name="tabs" defaultView="lists" onViewChange={this.onViewChange}>
                    <View name="lists" component={Lists} />
                    <View name="forms" component={Forms}/>
                    <View name="controls" component={Controls}/>
                    <View name="transitions" component={TransistionComp}/>
                    <View name="list-simple" component={ListSimple}/>
                    <View name="list-complex" component={ListComplex}/>
                    <View name="list-details" component={ListDetails}/>
                </ViewManager>
                <UI.Tabs.Navigator >
                    <UI.Tabs.Tab onTap={this.onSelectTab.bind(this, 'lists')} selected={selectedTabSpan === 'lists'}>
                        <span className="Tabs-Icon Tabs-Icon--lists"/>
                        <UI.Tabs.Label>Lists</UI.Tabs.Label>
                    </UI.Tabs.Tab>
                    <UI.Tabs.Tab onTap={this.onSelectTab.bind(this, 'forms')} selected={selectedTabSpan === 'forms'}>
                        <span className="Tabs-Icon Tabs-Icon--forms"/>
                        <UI.Tabs.Label>Forms</UI.Tabs.Label>
                    </UI.Tabs.Tab>
                    <UI.Tabs.Tab onTap={this.onSelectTab.bind(this, 'controls')} selected={selectedTabSpan === 'controls'}>
                        <span className="Tabs-Icon Tabs-Icon--controls"/>
                        <UI.Tabs.Label>Controls</UI.Tabs.Label>
                    </UI.Tabs.Tab>
                    <UI.Tabs.Tab onTap={this.onSelectTab.bind(this, 'transitions')} selected={selectedTabSpan === 'transitions'}>
                        <span className="Tabs-Icon Tabs-Icon--transitions"/>
                        <UI.Tabs.Label>Transitions</UI.Tabs.Label>
                    </UI.Tabs.Tab>
                </UI.Tabs.Navigator>
            </Container>
        )
    }
});