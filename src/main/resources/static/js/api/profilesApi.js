export async function getProfile(id) {
    const response = await fetch('/profile/' + id, {
        method: 'GET',
    });
    return await response.json();
}

export async function changeSubscription(channelId) {
    const response = await fetch('/profile/change-subscription/' + channelId, {
        method: 'POST',
    });
    return await response.json();
}

export async function getSubscriberList(channelId) {
    const response = await fetch('/profile/get-subscribers/' + channelId, {
        method: 'GET',
    });
    return await response.json();
}

export async function changeSubscriptionStatus(subscriberId) {
    const response = await fetch('/profile/change-status/' + subscriberId, {
        method: 'POST',
    });
    return await response.json();
}
