const axios = require('axios');

class Pixelize {
    constructor(token) {
        this.token = token;
        this.apiBase = 'https://discord.com/api/v10';
    }

    async setCustomStatus(statusText, statusType = 'PLAYING', statusState = 'online') {
        try {
            await axios.patch(
                `${this.apiBase}/users/@me/settings`,
                {
                    custom_status: {
                        text: statusText,
                    },
                },
                {
                    headers: {
                        Authorization: `Bot ${this.token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            await this.client.user.setPresence({
                activity: {
                    name: statusText,
                    type: statusType,
                },
                status: statusState,
            });
            console.log(`Custom status set: ${statusText}`);
        } catch (error) {
            console.error('Error setting custom status:', error.response.data);
            throw error;
        }
    }

    async sendMessage(channelId, content) {
        try {
            const response = await axios.post(
                `${this.apiBase}/channels/${channelId}/messages`,
                { content },
                {
                    headers: {
                        Authorization: `Bot ${this.token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error sending message:', error.response.data);
            throw error;
        }
    }
}

module.exports = Pixelize;
