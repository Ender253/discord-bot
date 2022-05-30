module.exports = {
    name: 'clear',
    id:'5347',
    description: "Clear messages!",
    async execute(message,args){
        const amount = parseInt(args[0], 10);

        if(!amount) return message.reply("Zi cate mesaje vrei sa stergi!");

        if(isNaN(amount)) return message.reply("Baga tati un numar!");

        if(amount>100) return message.reply("Mai mult de 100 nu mere!");

        if(amount<1) return message.reply("Macar 1 tot vrei sa stergi. Lasa ca stiu eu!");

        await message.channel.messages.fetch({limit:amount}).then(messages =>{
            message.channel.bulkDelete(messages);
        });
    }
}