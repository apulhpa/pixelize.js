const axios = require('axios')

class Pixelize {
    constructor(token) {
        this.token = token;
        this.apiBase = 'https://discord.com/api/v10';
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