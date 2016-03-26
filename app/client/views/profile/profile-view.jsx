import {
    createApp,
    Container,
    NavigationBar,
    UI,
    ViewManager,
    View
} from 'touchstonejs';

import Username from './username';
import Picture from './picture';
import Interests from './interests';

React.createClass({
    render() {
        return (
            <Container>
                <UI.NavigationBar name="profile"/>
                <ViewManager name="profile" defaultView="profile">

                </ViewManager>
            </Container>
        )
    }
});