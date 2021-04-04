const note_data = require("../db/note_data");
module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
res.json(note_data);
    });

    app.post("/api/notes", funtion(req, res) {
        note_data.push(req.body);
        res.json(true);
    })
}