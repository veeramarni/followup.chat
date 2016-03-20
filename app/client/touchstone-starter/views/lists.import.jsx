import {UI, Link} from '{followupchat:app-deps}/packages/touchstonejs';
import Container from '{followupchat:app-deps}/packages/react-container';

export default React.createClass({

    statics: {
        navigationBar: "main",

        getNavigation() {
            return {
                title: "Lists"
            }
        }
    },

    render() {
        let {country} = this.props;
        return (
            <Container scrollable >
                <div>{ country ? country.name : 'null'} </div>
                <UI.Group>
                    <UI.GroupHeader>Lists</UI.GroupHeader>
                    <UI.GroupBody>
                        <Link to="tabs:list-simple" transition="show-from-right">
                            <UI.Item showDisclosureArrow>
                                <UI.ItemInner>
                                    Simple List
                                </UI.ItemInner>
                            </UI.Item>
                        </Link>
                        <Link to="tabs:list-complex" transition="show-from-right">
                            <UI.Item showDisclosureArrow>
                                <UI.ItemInner>
                                    Complex LIst
                                </UI.ItemInner>
                            </UI.Item>
                        </Link>
                    </UI.GroupBody>
                </UI.Group>

            </Container>
        )
    }
})