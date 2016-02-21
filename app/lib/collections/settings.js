class Settings extends FollowupChat.models._Base {
    constructor (){
        super();
        this._initModel('settings', this._createSchema());
    }

    _createSchema ()  {
        return new SimpleSchema({
            "eventFacebookPageId": {
                type: String,
                max: 100
            },
            "eventFacebook": {
                type: String,
                max: 100
            },
            "eventTwitter": {
                type: String,
                max: 100
            },
            "eventMapsAddress": {
                type: String,
                max: 400
            },
            "eventAddress": {
                type: String,
                max: 400
            },
            "name": {
                type: String,
                max: 200
            },
            "aboutHeading": {
                type: String,
                max: 100
            },
            "aboutLogo": {
                type: String,
                max: 100
            },
            "showResendEmail": {
                type: Boolean
            },
            "registrationsOpen": {
                type: Boolean
            },
            "refreshInterval": {
                type: Number
            },
            "aboutContent": {
                type: String,
                max: 300
            },
            "aboutButtonLabel": {
                type: String,
                max: 300
            },
            "aboutButtonLink": {
                type: String,
                max: 300
            },
            "showAboutView": {
                type: Boolean
            }
        });
    }
};
FollowupChat.models.Settings = new Settings();