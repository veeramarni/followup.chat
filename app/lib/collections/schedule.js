class Schedule extends FollowupChat.models._Base {
    constructor()
    {
        super();
        this._initModel('schedule', this._createSchema());
    }

    _createSchema () {
        return new SimpleSchema({
            key: {
                type: String,
                max: 100
            },
            duration: {
                type: Number,
                min: 0
            },
            endTime: {
                type: Date
            },
            startTime: {
                type: Date
            },
            type: {
                type: String,
                max: 100
            },
            title: {
                type: String,
                max: 100
            },
            description: {
                type: String,
                max: 500
            },
            speakers: {
                type: [String]
            },
            feedback: {
                type: FollowupChat.models.feedback
            }
        });
    }
};

FollowupChat.models.Schedule = new Schedule();