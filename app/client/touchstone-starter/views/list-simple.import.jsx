import { Link, UI } from '{followupchat:app-deps}/packages/touchstonejs';
import Container from '{followupchat:app-deps}/packages/react-container';
import Tappable from '{followupchat:app-deps}/packages/react-tappable';

var scrollable = Container.initScrollable({left: 0, top: 44});

var SimpleLinkItem = React.createClass({
    propTypes: {
        country: React.PropTypes.object.isRequired
    },

    render () {
        return (
            <Link to="tabs:lists" transition="show-from-right"
                  viewProps={{ country: this.props.country, prevView: 'list-simple'}}>
                <UI.Item showDisclousureArrow>
                    <UI.ItemInner>
                        <UI.ItemTitle>{this.props.country.name}</UI.ItemTitle>
                    </UI.ItemInner>
                </UI.Item>
            </Link>
        )
    }
});
export default React.createClass({

    statics: {
        // referring to the navigationBar component that was used as placeholder in app.import.jsx
        navigationBar: 'main',
        // NavigationBar component takes following configurations. Check NavigationBar component
        getNavigation(props, app) {
            return {
                title: 'Simple List',
                leftLabel: 'Lists',
                leftArrow: true,
                leftAction: () => {
                    app.transitionTo('tabs:lists', {transition: 'reveal-from-right'})
                }
            }
        }
    },
    getInitialState () {
        return {
            searchString: '',
            country: CountryCodes
        }
    },

    clearSearch () {
        this.setState({searchString: ''});
    },

    updateSearch (str) {
        this.setState({searchString: str});
    },

    submitSearch (str) {
        console.log(str);
    },

    render() {
        let { country, searchString } = this.state;
        let searchRegex = new RegExp(searchString);

        let filteredCountry = country.find({
            $or: [{
                'name': {
                    '$regex': searchRegex,
                    '$options': 'i'
                }
            }, {'ITU': {'$regex': searchRegex, '$options': 'i'}}]
        }).fetch();

        let results;

        if (searchString && !filteredCountry.length) {
            results = (
                <Container direction="column" align="center" justify="center" className="no-results">
                    <div className="no-results__icon ion-ios-search-strong"/>
                    <div className="no-results__text">{'No results for "' + searchString + '"'}</div>
                </Container>
            )
        } else {
            results = (
                <UI.GroupBody>
                    {filteredCountry.map((country, i) => {
                        return <SimpleLinkItem key={'person'+i} country={country}/>
                    })}
                </UI.GroupBody>
            )
        }

        return (
            <Container ref="scrollContainer" scrollable={scrollable}>
                <UI.SearchField type="dark" value={this.state.searchString} onSubmit={this.submitSearch}
                                onChange={this.updateSearch} onCancel={this.clearSearch} placeholder="Search..."/>
                {results}
            </Container>

        )
    }
})