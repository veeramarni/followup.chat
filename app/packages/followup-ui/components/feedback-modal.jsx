import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import classNames from 'classnames';
import Sentry from 'react-sentry';

import  '../styles/less/feedback-modal.import.less';


export default React.createClass({

    displayName: 'FeedbackModal',

    propTypes: {
        className: React.PropTypes.string,
        visible: React.PropTypes.bool
    },

    getDefaultProps () {
        return {
            transition: 'none'
        };
    },

    renderBackdrop (){
        if (!this.props.visible) return null;
        return <div className="FeedbackModal-backdrop"/>
    },

    renderDialog () {
        if (!this.props.visible) return null;

        var dialogClassName = classNames('FeedbackModal-dialog', this.props.className);

        return (
            <div className={dialogClassName}>
                {this.props.children}
            </div>
        )
    },

    render () {
        return (
            <div className="FeedbackModal">
                <ReactCSSTransitionGroup transitionName="FeedbackModal-dialog" component="div" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {this.renderDialog()}
                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup transitionName="FeedbackModal-backdrop" component="div" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {this.renderBackdrop()}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
});