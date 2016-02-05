const { Route, HistoryLocation, Router, IndexRoute } = ReactRouter;

const routes = (
    <Route path="/" component={TabNav}>
        <IndexRoute component={Home} />
        <Route path="settings" component={Settings} />
        <Route path="*" component={NotFound} />
    </Route>
);

//const router = ReactRouter.create({
//    routes: routes,
//    location: ReactRouter.HistoryLocation
//})


Meteor.startup(function () {
    ReactDOM.render((<Router>{routes}</Router>),document.getElementById("app"))
});