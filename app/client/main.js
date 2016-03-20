import App from './test1';
import ReactDOM from 'react-dom';

Meteor.startup(function () {
    ReactDOM.render(<App/>, document.getElementById("app"));
});