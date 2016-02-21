class People extends FollowupChat.models._Base {
    constructor()
    {
        super();
        this._initModel('people', this._createSchema());
    }

    _createSchema () {
        return new SimpleSchema({
            name: {
                type: String,
                max: 100
            },
            bio: {
                type: String,
                min: 500
            },
            github: {
                type: String,
                max: 100
            },
            organiser: {
                type: Boolean,
                label: "isOrganiser"
            },
            speaker: {
                type: Boolean,
                label: "isSpeaker"
            },
            picture: {
                type: String,
                max: 150
            },
            twitter: {
                type: String,
                max: 100
            },
            talks: {
                type: FollowupChat.models.Schedule
            }
        });
    }
};

FollowupChat.models.People = new People;