const {
    Container,
    createApp,
    UI,
    View,
    ViewManager
    } = Touchstone;

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
            <div className={appWrapperClassName}>
                <div className="device-silhouette">
                    <ViewManager name="app" defaultView="main">
                        <View name="main" component={MainViewController}/>
                    </ViewManager>
                </div>
            </div>
        )
    }
});


// Main Controller
//----------------

var MainViewController = React.createClass({
    render(){
        return (
            <Container>
                <UI.NavigationBar name="main" />
            </Container>
        )
    }
});