class Feedback extends FollowupChat.models._Base {
    constructor() {
        super();
        this._initModel('feedback', this._createSchema());
    }

    _createSchema () {
        return {};
    }
};

 FollowupChat.models.Feedback = new Feedback();