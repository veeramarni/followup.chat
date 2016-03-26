import { Link, UI } from 'touchstonejs';
import Container from 'react-container';

export default React.createClass({

    statics: {
        navigationBar: 'login',
        getNavigation (props, app){
            return {
                rightLabel: 'Next',
                leftLabel: 'Back',
                leftArrow: true,
                title: props.phoneNo,
                leftAction: () => {
                    app.transitionTo('login:login');
                },
                rightAction: () => {
                    app.transitionTo('tabs:profile', {transition: 'reveal-from-right'});
                }
            }
        }
    },

    render () {

        return (<Container>
                <UI.Input placeholder="Code"></UI.Input>
                <div>
                    <p/>
                    <div>
                        We have sent yhou an SMS with the code
                    </div>
                    <p/>
                    <div>
                        <a>Resend code?</a>
                    </div>
                    <p/>
                    <div>
                        <a>Still didn't get the code?</a>
                    </div>
                </div>
            </Container>
        )
    }
})