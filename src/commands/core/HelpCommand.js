const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'core', []);
  }

  async run(client, message, args) {
    
    const embed = new Discord.MessageEmbed()
      .setTitle('Help Panel')
      .addField('Medals', '`medalgive`, `rmvmedal`, `medals`')
      .setTimestamp();

      message.channel.send(embed);

  }
}