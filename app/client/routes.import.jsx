//const { Route, NotFoundRoute, DefaultRoute, history, Router, IndexRoute } = ReactRouter;

import App from '/client/app';


//const routes = (
//    <Router history={history.createHistory()}>
//        <Route path="/" component={App}>
//        </Route>
//    </Router>
//);

Meteor.startup(function () {
    ReactDOM.render(<App />, document.getElementById("app"));
});