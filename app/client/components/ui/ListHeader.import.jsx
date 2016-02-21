import classNames from '{followupchat:app-deps}/packages/classnames';
import blacklist from '{followupchat:app-deps}/packages/blacklist';

export  default React.createClass({
    displayName: 'ListHeader',
    propsTypes: {
        sticky: React.PropTypes.bool
    },

    render() {
        var className = classNames('ListHeader', {
            'ListHeader--sticky': this.props.sticky
        }, this.props.className);
        var props = blacklist(this.props, 'children', 'sticky');
        props.className = className;

        return <div {...props}>{this.props.children}</div>
    }
})