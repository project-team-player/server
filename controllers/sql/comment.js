
// create a comment 
const createComment = async(comment) => {
    [
        id,
        owner,
        gravatar,
        text,
        createdAt,
        isRootComment,
        slug,
        gameThreadReference
    ] = [...comment]
    const query = `INSERT INTO COMMENTS(
        id,
        owner,
        gravatar,
        text,
        createdAt,
        isRootComment,
        slug,
        gameThreadReference
    ) VALUES (
        ${id},
        ${owner},
        ${gravatar}.
        ${text},
        ${createdAt},
        ${isRootComment},
        ${slug},
        ${gameThreadReference}
    )
    RETURNING *`
}

// get comment
const readComment = async(comment) => {
    const query = `SELECT * FROM COMMENTS
    WHERE id = ${comment.id}
    RETURNING *`
}

// edit comment
const updateComment = async(comment) => {
    const query = `UPDATE COMMENTS
    SET text = ${comment.text}
    WHERE id = ${comment.id}
    RETURNING *`
}

// delete comment 
const deleteComment = async(comment, options) => {
    const query = `DELETE FROM COMMENTS
    WHERE id = ${comment.id}
    RETURNING *`
}


module.exports = {
    createComment,
    readComment,
    deleteComment,
    updateComment
};