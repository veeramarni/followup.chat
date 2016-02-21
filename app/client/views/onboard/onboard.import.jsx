import React from '{followupchat:app-deps}/packages/react';
import { Container, Link, Transitions } from '{followupchat:app-deps}/packages/touchstonejs';
import OnboardingHeader from '../../components/ui/OnboardingHeader';
import Sentry from '{followupchat:app-deps}/packages/react-sentry';

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