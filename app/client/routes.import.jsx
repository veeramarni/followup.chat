//import App from '/client/app';
import ListHeader from './components/ui/ListHeader'

Meteor.startup(function () {
    ReactDOM.render(<ListHeader />, document.getElementById("app"));
});