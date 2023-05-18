const { executeQuery } = require('./postgres');
// create a comment 
const createComment = async (comment) => {
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
    const query = `INSERT INTO comments (
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
    ) RETURNING *`
    const result = await executeQuery(query);
    return result;
}

// get comment
const readComment = async(comment) => {
    const query = `SELECT * FROM comments
    WHERE id = ${comment.id}
    RETURNING *`
    const result = await executeQuery(query);
    return result;
}

// edit comment
const updateComment = async (comment) => {
    const query = `UPDATE comments
    SET text = ${comment.text}
    WHERE id = ${comment.id}
    RETURNING *`
    const result = await executeQuery(query);
    return result;
}

// delete comment 
const deleteComment = async (comment) => {
    const query = `DELETE FROM comments
    WHERE id = ${comment.id}`
    const result = await executeQuery(query);
    return result;
}

const createCommentTable = async () => {
    const query = `CREATE TABLE comment (
        id varchar PRIMARY KEY.
        owner varchar,
        gravatar varchar,
        text varchar,
        createdAt date,
        isRootComment boolean
        slug varchar,
        gameThreadReference varchar
    )`
    const result = await executeQuery(query);
    return result;
}


module.exports = {
    createComment,
    readComment,
    deleteComment,
    updateComment,
    createCommentTable
};