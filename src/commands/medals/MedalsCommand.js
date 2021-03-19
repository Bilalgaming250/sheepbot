const BaseCommand = require('../../utils/structures/BaseCommand');
const db = require('../../models/medals')
const { Message, MessageEmbed } = require('discord.js')

module.exports = class MedalsCommand extends BaseCommand {
  constructor() {
    super('medals', 'medals', []);
  }

  async run(client, message, args) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.slice(1).join(" ")
        if(!user) return message.channel.send('No user found')
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(data) {
                message.channel.send(new MessageEmbed()
                    .setTitle(`${user.user.tag}'s medals`)
                    .setDescription(
                        data.content.map(
                            (w, i) => 
                            `\`${i + 1}\` | Issuer : ${message.guild.members.cache.get(w.Issuer).user.tag}\nReason : ${w.reason}`
                        )
                    )
                    .setColor("BLUE")
                )
            } else {
                message.channel.send('User has no data')
            }

        })
    }
}