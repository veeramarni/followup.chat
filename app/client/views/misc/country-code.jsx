import { Link, UI } from 'touchstonejs';
import Container from 'react-container';
import Tappable from 'react-tappable';

var scrollable = Container.initScrollable({left: 0, top: 44});

var CountryLinkItem = React.createClass({
    propTypes: {
        dial: React.PropTypes.object.isRequired
    },

    render () {
        return (
            <Link to="login:login" transition="reveal-from-bottom" viewProps={{countryName: this.props.dial.name,
            dialCode: this.props.dial.code, prevView: 'list-simple'}}
                  dial={this.props.dial}>
                <UI.Item className="Country__item">
                    <UI.ItemInner>
                        <UI.ItemTitle>{this.props.dial.name}</UI.ItemTitle>
                        <UI.ItemSubTitle className="text-left">{this.props.dial.code}</UI.ItemSubTitle>
                    </UI.ItemInner>
                </UI.Item>
            </Link>
        )
    }
});
export default React.createClass({

    statics: {
        navigationBar: 'login',
        getNavigation (props, app){
            return {
                leftLabel: 'Cancel',
                title: 'Country',
                leftAction: () => {
                    app.transitionTo('login:' + props.prevView, {transition: 'reveal-from-bottom',
                        viewProps: {countryName: props.countryName, dialCode: props.dialCode} })
                }
            }
        }
    },

    getInitialState () {
        return {
            searchString: ''
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

    renderHeaderLetter (firstChar) {
        return (
            <UI.ListHeader key={'country_' } sticky={true}>{firstChar}</UI.ListHeader>
        )

    },
    render() {
        let { searchString} = this.state;
        let results;
        let searchRegex = new RegExp(searchString);

        let filteredCountry = CountryCodes.find({
            $or: [{
                'name': {
                    '$regex': searchRegex,
                    '$options': 'i'
                }
            }, {'ITU': {'$regex': searchRegex, '$options': 'i'}}]
        }).fetch();

        let alph;

        if (searchString && !filteredCountry.length) {
            results = (
                <Container direction="column" align="center" justify="center" className="no-results">
                    <div className="no-results__icon ion-ios-search-strong"/>
                    <div className="no-results__text">{'No results for "' + searchString + '"'}</div>
                </Container>
            );
        } else {
            results = (
                <UI.GroupBody>
                    {filteredCountry.map((country, i) => {
                        let dial = {};
                        dial.code = '+' + country.Dial.replace('-', '');
                        dial.name = country.name;
                        let firstChar = country.name.charAt(0);
                        return (<div key={'wrapper'+ i}>
                                {searchString.length < 1 && firstChar != alph ? (alph = firstChar, this.renderHeaderLetter(firstChar)) : false }
                                <CountryLinkItem key={'country' + i} dial={dial} prevView={this.props.prevView} />
                            </div>
                        )
                    })}
                </UI.GroupBody>
            )
        }
        return (
            <Container ref="scrollContainer" scrollable={scrollable}>
                <UI.SearchField type="dark" value={this.state.searchString} onSubmit={this.submitSearch}
                                onChange={this.updateSearch} onCancel={this.clearSearch} onClear={this.clearSearch}
                                placeholder="Search..."/>
                    {results}
            </Container>
        )
    }
});