const path = require("path");
module.exports = function(app) {

    app.get("/notes", function(req, res) {
        res.sedFile(path.join(_dirname, ))
    })
}