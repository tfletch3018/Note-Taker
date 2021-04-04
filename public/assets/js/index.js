const $noteTitle = $('.note-title');
const $noteText = $('.note-textarea');
const $saveNoteBtn = $('.save-note');
const $newNoteBtn = $('.new-note');
const $noteList = $('.list-container .list-group');

//activeNote refers to the note currently in the text area
let activeNote = {};

//get notes from db
const getNotes = function() {
  return $.ajax({
    url: '/api/notes',
    method: 'GET',
  });
};

//Save a note
const saveNote = function(note) {
  return $.ajax({
    url: '/api/notes',
    data: note,
    method: 'POST',
  });
};

//Delete a note
const deleteNote = function(id) {
  return $.ajax({
  url: `api/notes/${id}`,
  method: 'DELETE',
});
};

//If activeNote then display activeNote
const renderActiveNote = function() {
  $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteTitle.attr('readonly', true);
    $noteText.attr('readonly', true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr('readonly', false);
    $noteText.attr('readonly', false);
    $noteTitle.val('');
    $noteText.val('');
  }
};

//Get note data
const handleNoteSave = function() {
  const newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
    };

    saveNote(newNote).then(function(data) {
      getAndRenderNotes();
      renderActiveNote();
    });
  };

  //delete a note
  const handleNoteDelete = function(event) {

event.stopPropagation();

const note = $(this)
.parent('.list-group-item')
.data();

if (activeNote.id === note.id) {
  activeNote = {};
}

deleteNote(note.id).then(function() {
  getAndRenderNotes()
  renderActiveNote();
});
  };


  const handleNoteView = function() {
    activeNote = $(this).data();
    renderActiveNote();
  };


  const handleNewNoteView = function() {
    activeNote = {};
    renderActiveNote();
  };



  const handleRenderSaveBtn = function() {
    if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
      $saveNoteBtn.hide();
    } else {
      $saveNoteBtn.show();
    }
  };


  const renderNoteList = function(notes) {
    $noteList.empty();

    const noteListItems = [];

    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];

      const $li = $("<li class='list-group-item'>").data(note);
      const $span = $('<span>').text(note.title);
      const $delBtn = $(
        "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
      );

      $li.append($span, $delBtn);
      noteListItems.push($li);
    }

    $noteList.append(noteListItems);
  };


const getAndRenderNotes = function() {
  return getNotes().then(function(data) {
    renderNoteList(data);
  });
};

$saveNoteBtn.on('click', handleNoteSave);
$noteList.on('click', '.list-group-item', handleNoteView);
$newNoteBtn.on('click', handleNewNoteView);
$noteList.on('click', '.delete-note', handleNoteDelete);
$noteTitle.on('keyup', handleRenderSaveBtn);
$noteText.on('keyup', handleRenderSaveBtn);


getAndRenderNotes()

