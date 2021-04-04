const fs = require("fs");
const { parse } = require("path");

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        fs.readFile("./db/db.json", (err, data) => {
            if (err) throw err;
            noteData = JSON.parse(data);
            res.send(noteData);
        });
    });


    app.post("/api/notes", function(req, res) {
        const userNotes = req.body;

        fs.readFile("./db/db.json", (err, data) => {
            if (err) throw err;
            noteData = JSON.parse(data);
            noteData.push(userNotes);
            let number = 1;
            noteData.forEach((note, index) => {
                note.id = number;
                number++;
                return noteData;
            });
            console.log(noteData);

            stringData = JSON.stringify(noteData);

            fs.writeFile("./db/db.json", stringData, (err, data) => {
                if (err) throw err;
            });
        });
        res.send("Thank you for using note-taker!");
    });

    app.delete("/api/notes/:id", function(req, res) {

        const deleteNote = req.params.id;
        console.log(deleteNote);

        fs.readFile("./db/db.json", (err, data) => {
            if (err) throw err;

            noteData = JSON.parse(data);
            for (let i = 0; i < noteData.length; i++) {
                if (noteData[i].id === Number(deleteNote)) {
                    noteData.splice([i], 1);
                }
            }
            console.log(noteData);
            stringData = JSON.stringify(noteData);

            fs.writeFile("./db/db.json", stringData, (err, data) => {
                if (err) throw err;
            });
        });
        res.status(204).send();
    });
};
