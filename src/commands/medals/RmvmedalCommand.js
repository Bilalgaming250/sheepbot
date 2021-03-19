const BaseCommand = require('../../utils/structures/BaseCommand');
const db = require('../../models/medals')

module.exports = class RmvmedalCommand extends BaseCommand {
  constructor() {
    super('rmvmedal', 'medals', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permission to use this command.')
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send('User not found.')
    db.findOne({ guildid: message.guild.id, user: user.user.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        let number = parseInt(args[1]) - 1
        data.content.splice(number, 1)
        message.channel.send('deleted the medal')
        data.save()
      } else {
        message.channel.send('This user does not have any medals in this server!')
      }
    })
  }
}