Meteor.startup(function () {
    Meteor.setTimeout(()=>{
        let msg;
        msg = ["    Version: " + FollowupChat.Info.version,
                "                    Porcess Port: " + process.env.PORT].join("\n");
        logger.info("SERVER RUNNING", msg);
    }, 100);
});
