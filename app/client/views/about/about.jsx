import React from 'react';
import {
    animation,
    Container
} from 'touchstonejs';
//const {animation, Container} = Touchstone;


const scrollable = Container.initScrollable();


export default React.createClass({
    displayName: 'ViewAbout',
    mixins: [animation.Mixins.ScrollContainerToTop],

    statics: {
        navigationBar: 'main',
        getNavigation () {
            return {
                title: 'About'
            }
        }
    },

    getDefaultProps () {
        return {
            aboutButtonLink: 'http://thinkmill.com.au/',
            aboutButtonLabel: 'Learn More'
        }
    },

    handleButton () {
        window.open(this.props.aboutButtonLink, '_blank', 'toolbar=yes, location=no, transitionstyle=coververtical');
    },

    render() {

        return (
            <Container scrollable={scrollable} className="About" ref="scrollConainer">
                <div className="About-section">
                    <img src="" className="About__logo"/>
                    <div className="About__heading">Made by Thinkmill</div>
                </div>
            </Container>
        )
    }
})