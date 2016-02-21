import ListHeader from '/client/components/ui/ListHeader';
import Sentry from '{followupchat:app-deps}/packages/react-sentry';
import Timers from '{followupchat:app-deps}/packages/react-timers';
import Container from '{followupchat:app-deps}/packages/react-container';
import { animation } from '{followupchat:app-deps}/packages/touchstonejs'

console.dir(Container);
const scrollable = Container.initScrollable();
var emitter = new EventEmitter();
import ScheduleItem from './schedule-item';
export default React.createClass({
    displayName: 'Schedule',
    mixins: [Sentry(), Timers(), animation.Mixins.ScrollContainerToTop, ReactMeteorData],

    statics: {
        navigationBar: 'main',
        getNavigation () {
            return {
                leftIcon: 'ion-android-menu',
                title: 'Schedule'
            }
        }
    },
    // Loads items
    getMeteorData() {
        var handle = Meteor.subscribe('schedules');
        return {
            schedules: FollowupChat.models.Schedule.find({}).fetch()
        };
    },

    getInitialState () {
        return {
            timeNow: window.timeNow || Date.now(),
            searchString: ''
        }
    },

    componentDidMount () {
        var body = document.getElementsByTagName('body')[0];
        var menuWrapper = document.getElementsByClassName('Tabs-Navigator-wrapper')[0];
        body.classList.remove('android-menu-is-open');
        //menuWrapper.addEventListener('click', function (e) {
        //    body.classList.remove('android-menu-is-open');
        //});

        // navbar actions
        this.watch(emitter, 'navigationBarLeftAction', function () {
            body.classList.toggle('android-menu-is-open');
        })
    },

    render() {
        var days = [];
        var currentDay;
        var timeNow = this.state.timeNow;

        this.data.schedules.forEach(function (scheduleItem, i) {
            var itemDayName = moment(scheduleItem.startTime).utcOffset('+0200').format('dddd');

            if (!currentDay || currentDay.name !== itemDayName) {
                currentDay = {name: itemDayName, items: []};
                days.push(currentDay);
            }

            var begun = timeNow > new Date(scheduleItem.startTime).getTime();
            var finished = timeNow > new Date(scheduleItem.endTime).getTime();
            var onNow = begun && !finished;

            currentDay.items.push({
                details: scheduleItem,
                begun: false,
                finished: false,
                onNow: false
            });
        });

        return (
            <Container scrollable={scrollable} ref="scrollContainer">
                {days.map((day, i) => {
                    return (<div key={'day' + i}>
                            <ListHeader key={'schedule_header_' + day.name} sticky>{day.name} </ListHeader>
                            {day.items.map((item, i) => {
                                return (<ScheduleItem key={'schedule_' + i} talk={item.details} finished={item.finished} onNow={item.onNow} />)
                            })}
                        </div>
                    )
                })}
            </Container>
        );
    }
});
