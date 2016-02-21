import classNames from '{followupchat:app-deps}/packages/classnames';
import {Link} from '{followupchat:app-deps}/packages/touchstonejs';
export default React.createClass({
    displayName: 'ScheduleItem',

    propTypes: {
        onNow: React.PropTypes.bool,
        finished: React.PropTypes.bool,
        talk: React.PropTypes.object.isRequired
    },

    getMeteorData() {
        var handle = Meteor.subscribe('peoples');
        return {
            speakers: FollowupChat.models.People.find({}).fetch()
        };
    },

    renderSpeakers (){
        var speakerIds = this.props.talk.speakers;
        var speakers = speakerIds.map(speakerId => FollowupChat.models.People.find({_id: speakerId}));
        return speakers.map((speaker, i) => {
            return <img className="ListItem__avatar ScheduleItem__avatar-img" key={'avatar_'+i} src={speaker.picture}/>
        })
    },

    render () {
        var talk = this.props.talk;
        var linkClassName = classNames('ListItem ScheduleItem', {'is-past': this.props.finsished}, ('ScheduleItem--' + talk.type));
        var avatarWrapperClassName = classNames('ScheduleItem__avatar', {
            'ScheduleItem__avatar--multiple': talk.speakers.length > 1
        });
        var renderTheDisclosureArrow = (talk.type === 'talk') ?
            <span className="ScheduleItem__avatar-chevron ion-chevron-right"/> : null;
        var startTime = moment(talk.startTime).utcOffset('+0200').format('h:mma');

        return (
            <Link to="main:talk" transition="show-from-right" viewProps={{ talk: talk }} className={linkClassName}
                  component="div">
                <div className="ListItem__content ScheduleItem__content">
                    <div className="ListItem__text ScheduleItem__text">{startTime}</div>
                    <div className="ListItem__heading ScheduleItem__heading">{talk.title}</div>
                </div>
                <div className={avatarWrapperClassName}>
                    {this.renderSpeakers()}
                    {renderTheDisclosureArrow}
                </div>
            </Link>
        )
    }
})