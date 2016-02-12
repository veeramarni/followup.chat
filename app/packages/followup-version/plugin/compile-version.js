exec = Npm.require('child_process').exec;
os = Npm.require('os');

Plugin.registerCompiler({
    extensions: ['info']
}, function () {
    return new VersionCompiler();
});
/**
 * 1.2: Can't use ES2015 code inside of package.js #5240
 */
function VersionCompiler() {
}
VersionCompiler.prototype.processFilesForTarget = function (files) {
    files.forEach(function (file) {
        // process and add the output
        var output = JSON.parse(file.getContentsAsString());
        output.build = {
            date: new Date().toISOString(),
            nodeVersion: process.version,
            arch: process.arch,
            platform: process.platform,
            osRelease: os.release(),
            totalMemory: os.totalmem(),
            freeMemory: os.freemem(),
            cpus: os.cpus().length
        };
        exec("git log --pretty=format:'%H%n%ad%n%an%n%s' -n 1", function (err, result) {
            if (err == null) {
                result = result.split('\n');
                output.commit = {
                    hash: result.shift(),
                    date: result.shift(),
                    author: result.shift(),
                    subject: result.join('\n')
                };
            }
            exec("git describe --abbrev=0 --tags", function (err, result) {
                var ref;
                if (err == null) {
                    if ((ref = outpu.commit) != null) {
                        ref.tag = result.replace('\n', '');
                    }
                }
                exec("git rev-parse --abbrev-ref HEAD", function (err, result) {
                    var ref1;
                    if (err == null) {
                        if ((ref1 = output.commit) != null) {
                            ref1.branch = result.replace('\n', '');
                        }
                    }
                    output = "FollowupChat.Info = " + (JSON.stringify(output, null, 4));
                    file.addJavaScript({data: output, path: file.getPathInPackage() + '.js'});
                });
            });
        });
    });
};