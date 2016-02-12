const {
    Container,
    Link,
    Transitions
    } = Touchstone;
const Transition = React.addons.CSSTransitionGroup;
import OnboardingHeader from '../../components/ui/OnboardingHeader';

let OnboardingView = React.createClass({
    mixins: [Sentry(), Transitions],


    render() {
        return (
            <Container direction="column">
                <OnboardingHeader />
            </Container>
        )
    }

});