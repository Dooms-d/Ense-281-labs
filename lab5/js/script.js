
let currentUser = "User A";
let notes = [
    { id: 0, author: "User A", text: "I like apples", upvotes: ["User B"], downvotes: [] },
    { id: 1, author: "User C", text: "User C made this note!", upvotes: [], downvotes: [] }
];

$(document).ready(() => {
    buildList();

    // Switch User
    $(".user-select").click(function() {
        currentUser = $(this).data("user");
        $("#current-user-display").text(currentUser);
        buildList(); // Rebuild view on model change
    });

    // Add Note
    $("#add-note-btn").click(() => {
        const text = $("#new-note-text").val();
        if (text) {
            notes.push({
                id: notes.length,
                author: currentUser,
                text: text,
                upvotes: [],
                downvotes: []
            });
            $("#new-note-text").val("");
            buildList();
        }
    });
});

// Controller Logic
function buildList() {
    const container = $("#insertion-point");
    container.empty();

    notes.forEach(note => {
        const isAuthor = note.author === currentUser;
        const hasUpvoted = note.upvotes.includes(currentUser);
        const hasDownvoted = note.downvotes.includes(currentUser);
        const score = note.upvotes.length - note.downvotes.length;

        // Show score if author OR if they voted
        const canSeeScore = isAuthor || hasUpvoted || hasDownvoted;

        let noteHtml = `
            <div class="input-group mb-3">
                <span class="form-control bg-secondary-subtle">${note.text} (by ${note.author})</span>
        `;

        if (!isAuthor) {
            noteHtml += `
                <button class="btn ${hasUpvoted ? 'btn-success' : 'btn-outline-secondary'} vote-up" data-id="${note.id}">↑</button>
                <button class="btn ${hasDownvoted ? 'btn-danger' : 'btn-outline-secondary'} vote-down" data-id="${note.id}">↓</button>
            `;
        }

        if (canSeeScore) {
            noteHtml += `<span class="input-group-text vote-count">${score}</span>`;
        }

        noteHtml += `</div>`;
        container.append(noteHtml);
    });

    attachVoteListeners();
}

function attachVoteListeners() {
    $(".vote-up").off().click(function() {
        const noteId = $(this).data("id");
        handleVote(noteId, "up");
    });
    $(".vote-down").off().click(function() {
        const noteId = $(this).data("id");
        handleVote(noteId, "down");
    });
}

// VOTING LOGIC RULES
function handleVote(noteId, type) {
    const note = notes.find(n => n.id === noteId);
    
    if (type === "up") {
        if (note.upvotes.includes(currentUser)) {
            note.upvotes = note.upvotes.filter(u => u !== currentUser); // Toggle off
        } else {
            note.upvotes.push(currentUser); // Add upvote
            note.downvotes = note.downvotes.filter(u => u !== currentUser); // Remove downvote if exists
        }
    } else {
        if (note.downvotes.includes(currentUser)) {
            note.downvotes = note.downvotes.filter(u => u !== currentUser); // Toggle off
        } else {
            note.downvotes.push(currentUser); // Add downvote
            note.upvotes = note.upvotes.filter(u => u !== currentUser); // Remove upvote if exists
        }
    }
    buildList(); // Re-render everything from the updated model
}