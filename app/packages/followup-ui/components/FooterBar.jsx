import classnames from 'classnames';
import React from 'react';

import 'reactionic/src/ionic-scss/_bar.scss';

var FooterBar = React.createClass({
    propTypes: {
        customClasses: React.PropTypes.string,
        hasTabs: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            customClasses: '',
            hasTabs: false
        };
    },

    render () {
        var classes = classnames(
            {'bar': true, 'bar-footer': true, 'keyboard-attach': true},
            this.props.customClasses || 'bar-stable',
            {'has-tabs': this.props.hasTabs}
        );
        return (
            <div className={ classes }>
                { this.props.children}
            </div>
        )
    }
});

export default FooterBar;