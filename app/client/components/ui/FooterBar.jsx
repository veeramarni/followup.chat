import classnames from 'classnames';

//import 'reactionic/src/ionic-scss/_ionic.scss';
//import 'reactionic/src/styles/_reactionic.scss';

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