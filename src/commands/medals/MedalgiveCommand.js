const BaseCommand = require('../../utils/structures/BaseCommand');
const db = require('../../models/medals')
const { Message, MessageEmbed } = require('discord.js')

module.exports = class MedalgiveCommand extends BaseCommand {
  constructor() {
    super('medalgive', 'medals', []);
  }

  async run(client, message, args) {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permissions to use this command.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('User not found.')
        const reason = args.slice(1).join(" ")
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new db({
                    guildid: message.guild.id,
                    user : user.user.id,
                    content : [
                        {
                            Issuer : message.author.id,
                            reason : reason
                        }
                    ]
                })
            } else {
                const obj = {
                    Issuer: message.author.id,
                    reason : reason
                }
                data.content.push(obj)
            }
            data.save()
        });
        user.send(new MessageEmbed()
            .setDescription(`You have been given a medal for ${reason}`)
            .setColor("RED")
        )
        message.channel.send(new MessageEmbed()
            .setDescription(`Given a medal to ${user} for ${reason}`).setColor('BLUE')
        )
    }
}