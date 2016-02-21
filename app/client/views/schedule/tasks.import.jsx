import { Transitions , Link, ViewManager, View, createApp } from '{followupchat:app-deps}/packages/touchstonejs';
import Container from '{followupchat:app-deps}/packages/react-container';
import moment from '{followupchat:app-deps}/packages/moment';
import FeedbackModal from '/client/components/ui/FeedbackModal';
import Sentry from '{followupchat:app-deps}/packages/react-sentry';
import React from '{followupchat:app-deps}/packages/react';
import Tappable from '{followupchat:app-deps}/packages/react-tappable';
import classNames from '{followupchat:app-deps}/packages/classnames';

let emitter = new EventEmitter();


function getNavigation(props) {
    var leftLabel = 'Schedule';
    if (props.previousView === 'person') {
        leftLabel = 'Person';
    }

    return {
        leftArrow: true,
        leftLabel: leftLabel,
        leftAction: emitter.emit.bind(emitter, 'navigationBarLeftAction'),
        rightArrow: false,
        rightAction: null,
        title: 'Talk'
    }
}

export default React.createClass({
    displayName: 'Talk',
    mixins: [Sentry(), Transitions, ReactMeteorData],

    statics: {
        navigationBar: 'main',
        getNavigation: getNavigation
    },

    getDefaultProps () {
        return {
            previousView: 'schedule'
        };
    },

    getInitialState () {
        return {
            feedbackModalIsVisible: true,
            feedbackType: '',
            feedbackText: '',
            online: window.navigator.online
        }
    },

    getMeteorData() {
        var handle = Meteor.subscribe('peoples');
        return {
            speakers: FollowupChat.models.People.find({}).fetch()
        };
    },

    componentDidMount () {
        var self = this;
        var gotoView = 'main:tabs:schedule';
        if (this.props.previousView === 'person') {
            gotoView = 'main:person';
        }

        // android backbutton handler
        this.watch(document, 'backbutton', function () {
            self.transitionTo(gotoView, {
                transition: 'reveal-from-right',
                viewProps: self.props.previousViewProps
            });
        });

        // navbar actions
        this.watch(emitter, 'navigationBarLeftAction', () => {
            self.transitionTo(gotoView, {
                transition: 'reveal-from-right',
                viewProps: self.props.previousViewProps
            });
        });
    },


    submitFeedback(e) {
        this.closeFeedbackModal();

        FollowupChat.models.Feedback.insert({type: this.state.feedbackType, text: this.state.feedbackText});
    },

    openFeedbackModal() {
        var scrollableContainer = ReactDOM.findDOMNode(this.refs.scrollableContainer);

        this.setState({feedbackModalIsVisible: true}, function () {
            scrollableContainer.style.overflow = 'hidden'
        });
    },

    closeFeedbackModal () {
        var scrollableContainer = ReactDOM.findDOMNode(this.refs.scrollableContainer);

        this.setState({feedbackModalIsVisible: false}, function () {
            scrollableContainer.style.overflow = 'scroll'
        });
    },

    updateFeedbackType (type){
        this.setState({feedbackType: type})
    },

    updateFeedbackText (e) {
        this.setState({feedbackText: e.target.value});
    },

    cancelFeedback () {
        this.closeFeedbackModal();
        this.setState(this.getInitialState());
    },

    renderFeedbackModal () {
        var positiveButtonClass = classNames('FeedbackModal__button', 'FeedbackModal__button--positive', {
            'is-selected': this.state.feedbackType === 'positive'
        });
        var negativeButtonClass = classNames('FeedbackModal__button', 'FeedbackModal__button--negative', {
            'is-selected': this.state.feedbackType === 'negative'
        });
        var inputClass = classNames('FeedbackModal__body__input', {
            'has-value': this.state.feedbackText.length > 0
        });

        return (
            <FeedbackModal visible={this.state.feedbackModalIsVisible}>
                <div className="FeedbackModal__form">
                    <div className="FeedbackModal__header">
                        <div className="FeedbackModal__title">What did you think of this talk?</div>
                        <div className="FeedbackModal__subtitle">Feedback is private and anonymous</div>
                        <div className="FeedbackModal__buttons">
                            <Tappable onTap={this.updateFeedbackType.bind(this, 'positive')}
                                      className={positiveButtonClass}/>
                            <Tappable onTap={this.updateFeedbackType.bind(this, 'negative')}
                                      className={negativeButtonClass}/>
                        </div>
                    </div>
                    <div className="FeedbackModal__body">
                        <textarea value={this.state.feedbackText} onChange={this.updateFeedbackText}
                                  placeholder="Leave feedback for the speaker..." className={inputClass}/>
                    </div>
                    <div className="FeebackModal__footer">
                        {this.state.online ? (
                            <Tappable onTap={this.submitFeedback}
                                      className="FeebackModal__footer__button FeedbackModal__footer__button--primary">Save</Tappable>)
                            : (
                            <span className="FeebackModal__footer_button FeedbackModal__footer__button--disabled">Offline</span>
                        )}
                        <Tappable onTap={this.cancelFeedback}
                                  className="FeedbackModal__footer__button FeedbackModal__footer__button--link">Cancel</Tappable>
                    </div>
                </div>
            </FeedbackModal>
        );
    },

    renderSpeakers () {
        var previousView = this.props.previousView;
        var speakersIds = this.props.talk.speakers;
        var speakers = speakersIds.map(speakerId => this.data.speakers.find({'_id': speakerId}));
        var self = this;

        return speakers.map((speaker, i) => {
            var viewProps = {
                person: speaker,
                previousView: 'talk',
                previousViewProps: self.props
            };


            return previousView === 'person' ? (
                <div className="TalkDetails__speaker" key={speaker_i}>
                    <img src={speaker.picture} className="TalkDetails__speaker__avatar"/>
                    <div className="TalkDetails__speaker__name">{speaker.name}</div>
                </div>) : (
                <Link key={spekaer_i} to="main:person" transition="show-from-right" className="TalkDetails__speaker"
                      viewProps={viewProps} component="div">
                    <img src={speaker.picture} className="TalkDetails__speaker__avatar"/>
                    <div className="TalkDetails__speaker__naem">{speaker.name}</div>
                    <span className="ion-chevron-right"/>
                </Link>
            );
        });
    },

    render() {
        return (
            <Container fill>
                <Container scrollable className="TalkDetails" ref="scrollableContainer">
                    <div className="TalkDetails__details"></div>
                </Container>
                {this.renderFeedbackModal()}
            </Container>
        );
    }
});