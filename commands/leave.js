module.exports = {
    name: 'leave',
    id: '4256',
    description: 'stop the bot and leave the channel',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.channel.send("Daca nu intri cine dracu asculta!");
        await voiceChannel.leave();
        await message.channel.send('Am plecat :smiling_face_with_tear:')

    }
}
