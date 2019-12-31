// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }
})

const Discord = require("discord.js")
const client = new Discord.Client()
const buttons = require("./buttons.js")
const events = require("./events.js")
const errors = require("./errors.js")
const attacks = require("./attacks.js")
attacks.defineClient(client)

window.onload = () => {
    events.freezeCards()
}

loginBot = () => {
    buttons.loginBot(client)
}

logoutBot = () => {
    buttons.logoutBot()
}

springCleaning = async() => {
    const guildID = document.getElementById("spring-cleaning-server-select").value
    attacks.springCleaningAttack = true
    await stopChannelsMaker()
    return await attacks.springCleaning(guildID)
}

stopSpringCleaning = async() => {
    attacks.springCleaningAttack = false
    return 0
}

channelsMaker = async () => {
    const guildID = document.getElementById("channels-maker-server-select").value
    const channelsName = document.getElementById("channels-maker-name").value

    attacks.channelsMakerAttack = true
    await stopSpringCleaning()
    return await attacks.channelsMaker(guildID, channelsName)
}

stopChannelsMaker = async () => {
    attacks.channelsMakerAttack = false
    return 0
}

lastJudgement = async () => {
    const guildID = document.getElementById("last-judgement-server-select").value
    attacks.lastJudgementAttack = true
    return await attacks.lastJudgement(guildID)
}

reviewJudgement = async() => {
    attacks.lastJudgementAttack = false
    return 0
}

spammer = async() => {
    const guildID = document.getElementById("spammer-server-select").value
    const messageContent = document.getElementById("spammer-message-content").value

    attacks.spammerAttack = true
    return await attacks.spammer(guildID, messageContent)
}

stopChannelSpammer = async() => {
    attacks.spammerAttack = false
    return 0
}

channelsSpammer = async() => {
    const guildID = document.getElementById("channels-spammer-server-select").value
    const messageContent = document.getElementById("channels-spammer-message-content").value

    attacks.channelsSpammerAttack = true
    return await attacks.channelsSpammer(guildID, messageContent)

}

stopChannelsSpammer = async() => {
    attacks.channelsSpammerAttack = false
    return 0
}

client.once("ready", () => {
    if (document.getElementById("error-layer").style.display == "block") errors.hideError() 
    events.initSelectors(client)
    if (events.selectFreezed) events.unfreezeCards()
    return 0
})
