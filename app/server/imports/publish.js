Meteor.publish('schedules', function () {
    return FollowupChat.models.Schedule.find({});
});

Meteor.publish('people', function() {
    return FollowupChat.models.People.find({});
});