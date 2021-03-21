export async function addComment(comment) {
    const url = '/comment';
    const method = 'POST';
    return await sendData(comment, url, method)
}

// export async function updateComment(comment) {
//     const url = '/comment/' + comment.id;
//     const method = 'PUT';
//     return await sendData(comment, url, method)
// }

async function sendData(comment, url, method) {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });
    return await response.json();
}
