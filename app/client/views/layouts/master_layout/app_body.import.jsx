const { Link } = ReactRouter;
const {
    Container,
    createApp,
    UI,
    View,
    ViewManager
} = Touchstone;

AppBody = React.createClass({
    render() {
        return(
            <div className="ionic-body">
                <div className="tabs tabs-icon-only">
                    <Link className="button button-icon icon ion-gear-a" to={"/settings"}></Link>
                    <Link className="h1 title" to={"/"}>Followup Chat</Link>
                    <Link className="button button-icon icon ion-heart" to={"/other"}></Link>
                </div>

                <div className="view">
                    <div className="scroll-content ionic-scroll">
                        <div className="content overflow-scroll has-header">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});