import { Link, UI, Mixins } from 'touchstonejs';
import Container from 'react-container';
import NotifyPopup from '../../components/ui/NotifyPopup';
import { IonContent, IonBody, IonButton,IonFooterBar, IonSubHeaderBar, IonSubFooterBar } from 'reactionic';
//import FooterBar from '../../components/ui/FooterBar';
import FooterBar from '{followupchat:ui}/components/FooterBar';

let emitter = new EventEmitter();

export default React.createClass({
    mixins: [Mixins.Transitions],

    statics: {
        navigationBar: 'login',
        getNavigation (props, app){
            return {
                leftLabel: 'Cancel',
                leftAction: () => {
                    app.transitionTo('onboard:on-boarding', {transition: 'reveal-from-bottom'})
                },
                rightAction: emitter.emit.bind(emitter, 'navigationBarRightAction')
            }
        }
    },


    getInitialState () {
        return {
            countryName: this.props.countryName || 'United States',
            dialCode: this.props.dialCode || '+1',
            phoneNo: '',
            popup: {
                visible: false
            }
        }
    },

    showErrorPopup(err) {
        this.setState({popup: {visible: true}})
    },

    handlePopupChange (){
        this.setState({popup: {visible: false}})
    },
    componentDidMount () {
        let self = this;
        self.setState({
            countryName: this.props.countryName || this.state.countryName,
            dialCode: this.props.dialCode || this.state.dialCode
        });

        // navbar actions
        emitter.on('navigationBarRightAction', () => {
            if (!self.state.phoneNo) {
                alert('phone number not entered');
                return
            }
            self.submitNumber(self.state.phoneNo, function () {
                self.transitionTo('login:confirmation',
                    {
                        transition: 'reveal-from-right',
                        viewProps: {phoneNo: self.state.phoneNo}
                    })
            });

        });


    },
    updatePhone (event) {
        this.setState({phoneNo: event.target.value})
    },

    submitNumber (phone, success) {
        var self = this;
        Accounts.requestPhoneVerification(phone, (err) => {
            if (err) {
                return self.showErrorPopup(err);
            }
            success();
        });
    },
    render() {
        return (
            <Container className="Login">
                <div className="Login__heading"> What's your number?</div>
                <div className="Login__subheading">Don't worry, we'll never display it publicly.</div>
                <Link className="Login__country" to="login:country-codes" transition="show-from-bottom" viewProps={{prevView: 'login',
                countryName: this.state.countryName, dialCode: this.state.dialCode }}>
                    <UI.Item showDisclosureArrow>
                        <UI.ItemInner>
                            <UI.ItemTitle >{this.state.countryName}</UI.ItemTitle>
                        </UI.ItemInner>
                    </UI.Item>
                </Link>
                <label className="list-item">
                    <UI.Item>
                        <UI.ItemInner>
                            <div className="Login__input-group input-group">
                                <div className="Login__input-group-addon input-group-addon">{this.state.dialCode}</div>
                                <UI.Input type="tel" placeholder="Your phone number" onChange={this.updatePhone}/>
                            </div>
                        </UI.ItemInner>
                    </UI.Item>
                </label>
                <p/>
                <div className="text-center instructions">
                    Please confirm your country code and enter
                    your phone number.
                </div>
                <p/>
                <div className="text-center">
                    By signing up,
                    you agree to the <a>Terms of Service</a>.
                </div>

                <div className="keyboard-attach bar-assertive" style={{position: 'fixed', bottom: '0px'}}>
                    <div>Test</div>
                </div>
                <FooterBar>testing footerbar</FooterBar>
                <UI.Popup visible={this.state.popup.visible}>
                    <UI.PopupIcon name={this.state.popup.iconName} type={this.state.popup.iconType}
                                  spinning={this.state.popup.loading}/>
                    <div><strong>{this.state.popup.header}</strong></div>
                </UI.Popup>

                <NotifyPopup template="Invalid phone number. Please try again."
                             visible={this.state.popup.visible} type="alert"
                             onChange={this.handlePopupChange}/>
            </Container>
        )
    }
});