exports.run = (client,user,args) =>  {
    if(!msg.member.permissions.has("MANAGE_CHANNELS")) return msg.channel.sendMessage("Gerekli Yetkiye Sahip Değilsin!");
    if (msg.channel.type !== "text") return;
    const limit = args[1] ? args[1] : 0;
    if(limit === "kaldır" || limit === "0"){
      
  request({
    url: `https://discordapp.com/api/v7/channels/${msg.channel.id}`,
    method: "PATCH",
        json: {
          rate_limit_per_user: 0
        },
        headers: {
          "Authorization": `Bot ${client.token}`
        }
      });        
      
      
      
      return msg.channel.sendEmbed(new Discord.RichEmbed().setDescription(`Yazma süre limiti kaldırılmıştır!`).setColor('RANDOM')).then(msg =>{
        msg.delete(5000);
      });


    
    }
    if(isNaN(limit) || limit < 0) {
            var embed = new Discord.RichEmbed()
              .setDescription(`Doğru kullanım: \`${prefix}yavaşmod [0/120]\``)
              .setColor('RANDOM')
              .setTimestamp()
          msg.channel.send({embed})
          return
        }
  if (limit > 120) {
    return msg.channel.sendEmbed(new Discord.RichEmbed().setDescription("Süre limiti maksimum **120** saniye olabilir.").setColor('RANDOM'));
  }
  msg.channel.sendEmbed(new Discord.RichEmbed().setDescription(`Yazma süre limiti **${limit}** saniye olarak ayarlanmıştır.`).setColor('RANDOM')).then(msg => {
    msg.delete(5000);
  });
  msg.delete();
  request({
    url: `https://discordapp.com/api/v7/channels/${msg.channel.id}`,
    method: "PATCH",
    json: {
      rate_limit_per_user: limit
    },
    headers: {
      "Authorization": `Bot ${client.token}`
    }
  });


  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };




  exports.help = {
    name: 'yavaşmod',
    description: 'Chati Tavaş Moda Alır.',
    usage: 'yavaşmod [süre]'
  };
  
  
  }