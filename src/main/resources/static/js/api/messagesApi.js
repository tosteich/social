
export async function add(message) {
    const url = '/message';
    const method = 'POST';
    return await sendData(message, url, method)
}

export async function update(message) {
    const url = '/message/' + message.id;
    const method = 'PUT';
    return await sendData(message, url, method)
}

async function sendData(message, url, method) {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    });
    return await response.json();
}

export async function remove(message) {
    return await fetch('/message/' + message.id, {
        method: 'DELETE'
    });
}

export async function getPage (page) {
    const response = await fetch('/message?' + new URLSearchParams({ page: page }), {
        method: 'GET',
    });
    return await response.json();
}

