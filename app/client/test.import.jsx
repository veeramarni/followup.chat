//import Schedule from './views/schedule/schedule';
//import Talks from './views/schedule/tasks';
//import Feedback from './components/ui/FeedbackModal';
import App from './touchstone-starter/app';
//import App from './app';
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

Meteor.startup(function () {
    ReactDOM.render(<App />, document.getElementById("app"));
});