const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const key_scheme = require('../../../Models/key')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-key')
        .setDescription('Criar key para usuario'),
    async execute(interaction) {
        
        function generateKey() {
            const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let key = '';
          
            for (let i = 0; i < 10; i++) {
              const randomIndex = Math.floor(Math.random() * characters.length);
              key += characters.charAt(randomIndex);
            }
          
            return key;
        }

        const key = generateKey();

        const user = new key_scheme({
            username: interaction.user.id,
            key: key
        })

        await user.save()

        const embed_chat = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Key')
            .setDescription('`\`A chave foi gerada e enviada por DM`\`');

        const embed_dm = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Key Generator | Sua Key')
            .addFields(
                { name: '📑 | Nome:', value: 'Key' },
                { name: '\u000B', value: ' ' },
                { name: 'Key Gereda:', value: `\`${key}\`` },
            );

        interaction.reply({ embeds: [embed_chat], ephemeral: true});
        interaction.user.send({ embeds: [embed_dm] });

    }
};