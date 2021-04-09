const Discord = require('discord.js');
const got = require('got');

module.exports = {
    name: "aww",
    description: "Send a random r/aww image",
    execute(message, args , got, Discord){
        const memeEmbed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/aww/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeURL = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeNumComments = content[0].data.children[0].data.num_comments;

            memeEmbed.setTitle(`${memeTitle}`)
            memeEmbed.setURL(`${memeURL}`)
            memeEmbed.setImage(memeImage)
            memeEmbed.setColor('RANDOM')
            memeEmbed.setFooter(` 👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)

            message.channel.send(memeEmbed)
        })
    }
}