const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection} = require('@discordjs/voice');

module.exports = {
    name: 'play',
    description: 'Joins and plays a video from youtube',


    async execute(message, args){
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send('You need to be in a voice channel to execute this command!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissions');
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissions');
        if (!args.length) return message.channel.send('You need to send the second argument');

        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });

        const stream = ytdl(video.url, {
            filter: 'audioonly'
        });

        const player = createAudioPlayer();
        const resource = createAudioResource(stream);

        async function play() {
            await player.play(resource);
            connection.subscribe(player);

        }


        const videoFinder = async (query) => {

            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;

        }

        const video = await videoFinder(args.join(' '));

        if(video){

            //Help needed here

        }
//Outdated in Discordjs v13
         if(video){
             const stream = ytdl(video.url, {filter: 'audioonly'});
             connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () => {
                connection.destroy
            });

         await message.reply(`:thumbsup: Now Playing ***${video.title}***`)
         } else {
        message.channel.send('No video results found')
         }

    }
}