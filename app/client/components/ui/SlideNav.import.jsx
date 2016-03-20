import classNames from '{followupchat:app-deps}/packages/classnames';
import Tappable from '{followupchat:app-deps}/packages/react-tappable';



export default React.createClass({


    contextTypes: {
        app: React.PropTypes.object
    },

    getInitialState () {
        return {sidebarOpen: false};
    },

    onSetSidebarOpen: function (open) {
        this.setState({sidebarOpen: open});
    },

    render() {
        const sidebarContent = <b>Sidebar content</b>;
        return (
            <Sidebar sidebar={sidebarContent}
                     open={this.state.sidebarOpen}
                     onSetOpen={this.onSetSidebarOpen}>
                <b>Main Content</b>
            </Sidebar>
        )
    }
});