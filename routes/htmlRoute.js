const path = require("path");
module.exports = function(app) {

    app.get("/notes", function(req, res) {
        res.sedFile(path.join(_dirname, "../public/notes.html"));
    });

    app.get("*", function(req, res) {
        res.sedFile(path.join(_dirname, "../public/index.html"));
    });

};