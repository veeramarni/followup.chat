import classNames from 'classnames';
import blacklist from 'blacklist';
import '../styles/less/list-header.import.less';

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