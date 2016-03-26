import {
    createApp,
    Container,
    NavigationBar,
    UI,
    ViewManager,
    View
} from 'touchstonejs';


import Confirmation from './confirmation/confirmation';
import CountryCodes from '../../views/misc/country-code';
import PhoneNumber from './phone-number';
import Login from './login';


export default React.createClass({
    render() {
        return (
            <Container>
                <UI.NavigationBar name="login"/>
                <ViewManager name="login" defaultView="login">
                    <View name="login" component={Login}/>
                    <View name="country-codes" component={CountryCodes}/>
                    <View name="confirmation" component={Confirmation}/>
                </ViewManager>
            </Container>
        )
    }
});