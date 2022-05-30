const {
    Client,
    Intents,
    Collection,

} = require('discord.js');
const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES]
});

const fs = require('fs');

const prefix = '-';

Client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    Client.commands.set(command.name, command);
}




bot.on('ready', () => {
    console.log(`Bot ${bot.user.tag} is logged in!`);

});
bot.on('guildMemberAdd', (member) => {
    const channelId = '911340221633806399';
    const welcomeMessage = `Hey <@${member.id}>! Sper ca iti place Tzanca!`;
    member.guild.channels.fetch(channelId).then(channel => {
        channel.send(welcomeMessage)
    });
});
bot.on('messageCreate', (message) => {
    if(message.content.toLowerCase().includes('hey') || message.content.toLowerCase().includes('hello there')){
        message.channel.send('https://tenor.com/view/hello-there-general-kenobi-star-wars-grevious-gif-17774326');
        // console.log(bot.g);

    }
});
bot.on('messageCreate', message => {
    if(!message.content.startsWith(prefix)|| message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === 'clear'){
        Client.commands.get('clear').execute(message,args);
    }
    // if(command === 'play'){
    //     Client.commands.get('play').execute(message,args);
    // }


});
const { joinVoiceChannel, getVoiceConnection} = require('@discordjs/voice');

bot.on('messageCreate', async (message) => {

    if (message.content.toLocaleLowerCase() === prefix + 'join') {

        if (!message.member.voice.channel) return message.channel.send('Intra si tu ca sa vin!')
        if(!message.member.voice.channel.joinable) return message.channel.send('Nu pot sa intru aci!')

        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.member.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        })

        console.log('Am venit');
    }

    if (message.content.toLocaleLowerCase() === prefix + 'leave') {
        const connection = getVoiceConnection(message.guild.id)

        if(!connection) return message.channel.send("Nu-s aci!")

        connection.destroy()

        console.log('Am plecat!');
    }
});

const ytdl = require('ytdl-core');
const Music = require('@discordjs/voice');

console.log("is this working");

//  PLAYER
bot.on("messageCreate", async message => {

    if(message.content.startsWith('-play')) {
        const args = message.content.split(" ");

        const url = args[1];

        if(!url) return message.channel.send('no url');


        const stream = ytdl(url, { filter: 'audioonly'});

        const channel = message.member.voice.channel;

        const player = Music.createAudioPlayer();
        const ressource = Music.createAudioResource(stream);

        const connection = Music.joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.member.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });

        player.play(ressource)
        connection.subscribe(player);

    }
});
bot.on('error', (err) => {
    console.log(err.message)
});
bot.login('OTEzODkzNTc4NTE2ODY1MDM0.YaFHuA.SPOlaXXz_2qDVfq804jfis59Z6w');
