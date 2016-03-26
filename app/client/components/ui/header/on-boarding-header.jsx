
import {Container} from 'touchstonejs';

export default React.createClass({
    getInitialState () {
        return {};
    },
    render (){
        return (
            <Container align="center" justify="center" direction="column" className="onboarding-header">
                <img src="/images/logo/mstile-70x70.png" className="onboarding-logo"/>
                <div className="onboarding-heading onboarding-heading-1">Welcome to FollowUp.Chat<span className="onboarding-period">.</span></div>
                <div className="onboarding-heading onboarding-heading-2">Pickup from where you left.</div>
            </Container>
        )
    }
})