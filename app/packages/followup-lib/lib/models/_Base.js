FollowupChat.models._Base = class  {
    // public variables
    // schema, model
    _baseName(){
        return 'followup_';
    };

    _initModel(name, schema) {
        check(name, String);
        schema && (this.schema = schema);
        this.model = new Mongo.Collection(this._baseName() + name)
        return (this.schema && this.model.attachSchema(this.schema), this.model);
    };

    find(){
        return this.model.find.apply(this.model, arguments);
    };

    findOne() {
        return this.model.findOne.apply(this.model, arguments);
    };

    insert() {
        return this.model.insert.apply(this.model, arguments);
    };

    update() {
        return this.model.update.apply(this.model, arguments);
    };

    upsert() {
        return this.model.upsert.apply(this.model, arguments);
    };

    remove() {
        return this.model.remove.apply(this.model, arguments);
    };

    allow() {
        return this.model.allow.apply(this.model, arguments);
    };

    deny() {
        return this.model.deny.apply(this.model, arguments);
    };

    ensureIndex() {
        return this.model._ensureIndex.apply(this.model, arguments);
    };

    dropIndex() {
        return this.model._dropIndex.apply(this.model, arguments);
    };

    tryEnsureIndex() {
        try {
            return this.ensureIndex.apply(this, arguments);
        } catch(e){
            logger.error(e);
        }
    };

    tryDropIndex() {
        try {
            return this.dropIndex.apply(this, arguments);
        } catch(e) {
            logger.error(e);
        }
    };


};
