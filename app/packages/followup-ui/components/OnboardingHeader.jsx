//const { Container } = Touchstone;
import {Container} from 'touchstonejs';
export default React.createClass({
    getInitialState () {
        return {};
    },
    render () {
        return (
            <Container align="center" justify="center" direction="column" className="onboarding-header">
                <img src="./img/logo-mark.svg" className="onboarding-logo"/>
                <div className="onboarding-heading onboarding-heading-1">Followup.Chat 2016</div>
                <div className="onboarding-heading onboarding-heading-2">February 10 &amp; </div>
            </Container>
        )
    }
});