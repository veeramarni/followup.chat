import React from 'react';
import {
Link, UI
} from 'touchstonejs';
//const { Link, UI } = Touchstone;



lists= React.createClass({
    statics: {
        navigationBar: 'main',
        getNavigation() {
            return {
                title: 'Lists'
            }
        }
    },

    render: () => {
        return (
            <Container scrollable>
                <UI.GROUP>
                    <UI.GroupHeader>Lists</UI.GroupHeader>
                    <UI.GroupBody>
                        <Link to="tabs:list-simple" transistion="show-from-right">
                            <UI.Item showDisclosureArrow>
                                <UI.ItemInner>
                                    Simple List
                                </UI.ItemInner>
                            </UI.Item>
                        </Link>
                        <Link to="tabs:list-complex" transition="show-from-right">
                            <UI.Item showDisclosureArrow>
                                <UI.ItemInner>
                                    Complex List
                                </UI.ItemInner>
                            </UI.Item>
                        </Link>
                    </UI.GroupBody>
                </UI.GROUP>
                <UI.Group>
                    <UI.GroupHeader>GroupHeader</UI.GroupHeader>
                    <UI.GroupBody>
                        <UI.GroupInner>
                            <p>Use groups to contain content or lists. Where appropriate a Group should be accompanied
                                by a GroupHeading and optionally a GroupFooter.</p>
                            GroupBody will apply the background for content inside groups.
                        </UI.GroupInner>
                    </UI.GroupBody>
                </UI.Group>
            </Container>
        )
    }
});