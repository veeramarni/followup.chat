import { Container, Link } from 'touchstonejs';
import OnBoardingHeader from '../../components/ui/header/on-boarding-header';

export default React.createClass({

    render() {
        return (
            <Container direction="column">
                <OnBoardingHeader/>
                <Container justify align="center" direction="column" className="onboarding-body">
                </Container>
                <Container justify align="center" direction="row" className="onboarding-footer">
                    <Link to="onboard:login" transition="show-from-bottom" className="onboarding-footer__button">Sign up</Link>
                    <Link to="onboard:login" transition="show-from-bottom" className="onboarding-footer__button">Log in</Link>
                </Container>
            </Container>
        )
    }

});