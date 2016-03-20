import { Link, UI } from '{followupchat:app-deps}/packages/touchstonejs';
import Container from '{followupchat:app-deps}/packages/react-container';


export default React.createClass({

    statics: {
        navigationBar: 'main',
        getNavigation(props, app) {
            var leftLabel = props.prevView === 'list-simple' ? 'Simple' : 'Complex';
            return {
                leftArrow: true,
                leftLabel: leftLabel,
                leftAction: () => {
                    app.transitionTo('tabs:' + props.prevView, {transition: 'reveal-from-right'})
                },
                title: 'Country'
            }
        }
    },

    getDefaultProps () {
        return {
            prevView: 'home'
        }
    },

    render () {
        let {country} = this.props;

        return (
            <Container direction="column">
                <Container fill scrollable ref="scrollContainer" className="CountryDetails">
                    <div>{country.name}</div>
                </Container>

            </Container>

        )
    }
});