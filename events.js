const Discord = require("discord.js")

class Events {

    constructor(){
        this.selectFreezed = Boolean
    }

    defineFunction = (element , type = "onClick", param = String) => {
        // This remove an attribut which don't take parametters like 'readonly' for <input>
        // or 'control' for <video>

        if (param == false) {
            element.removeAttribute(type)
            return 0

            // This one is juste adding a parametters to a balise with his value like the next schema:
            // <balise attribut="value">...</balise>
        } else {
            element.setAttribute(type, param)
            return 0

        }
    }

    verifPerms = (client = new Discord.Client(), guild = new Discord.Guild(), permission = String) => {
        return !!guild.members.get(client.user.id).hasPermission(permission)
    }

    initSelectors = (client = new Discord.Client()) => {
        const selects = document.getElementsByTagName("select")
        Object.values(selects).forEach((select) => {

            if (select.id == "last-judgement-server-select") {
                let foundedGuild = false

                client.guilds.forEach((guild) => {
                    if (this.verifPerms(client, guild, 4)) {
                        foundedGuild = true
                        const option = document.createElement("option")
                        option.value = guild.id
                        option.innerHTML = guild.name
                        select.appendChild(option)
                    }
                })

                if (!foundedGuild) {
                    const option = document.createElement("option")
                    option.value = "0"
                    option.innerHTML = "NO GUILD FOUNDED"
                    select.disabled = true
                    select.appendChild(option)
                }

            } else if (select.id == "spammer-server-select") {
                let foundedGuild = false

                client.guilds.forEach((guild) => {
                    foundedGuild = true
                    const option = document.createElement("option")
                    option.value = guild.id
                    option.innerHTML = guild.name
                    select.appendChild(option)
                })

                if (!foundedGuild) {
                    const option = document.createElement("option")
                    option.value = "0"
                    option.innerHTML = "NO GUILD FOUNDED"
                    select.disabled = true
                    select.appendChild(option)
                }

            } else if (select.id == "spring-cleaning-server-select" || select.id == "channels-maker-server-select") {
                let foundedGuild = false

                client.guilds.forEach((guild) => {
                    if (this.verifPerms(client, guild, 16)) {
                        foundedGuild = true
                        const option = document.createElement("option")
                        option.value = guild.id
                        option.innerHTML = guild.name
                        select.appendChild(option)
                    }
                })

                if (!foundedGuild) {
                    const option = document.createElement("option")
                    option.value = "0"
                    option.innerHTML = "NO GUILD FOUNDED"
                    select.disabled = true
                    select.appendChild(option)
                }
            } else if (select.id == "channels-spammer-server-select") {
                let foundedGuild = false

                client.guilds.forEach((guild) => {
                    if (this.verifPerms(client, guild, 2048) && this.verifPerms(client, guild, 1024)) {
                        foundedGuild = true
                        const option = document.createElement("option")
                        option.value = guild.id
                        option.innerHTML = guild.name
                        select.appendChild(option)
                    }
                })

                if (!foundedGuild) {
                    const option = document.createElement("option")
                    option.value = "0"
                    option.innerHTML = "NO GUILD FOUNDED"
                    select.disabled = true
                    select.appendChild(option)
                }
            }
        })
    }

    // This makes readonly the cards to not have probleme if the user doesn't put any token
    freezeCards = () => {
        Object.values(document.getElementsByTagName("select")).forEach((select) => {
            this.defineFunction(select, "disabled", true)
        })

        Object.values(document.getElementsByTagName("button")).forEach((button) => {
            if (button.id != "login-bot-btn") this.defineFunction(button, "disabled", true)
        })

        Object.values(document.getElementsByTagName("body")).forEach((select) => {
            this.defineFunction(select, "onselectstart", "return false")
        })

        this.selectFreezed = true
    }

    // This makes enalbe the cards
    unfreezeCards = () => {
        Object.values(document.getElementsByTagName("select")).forEach((select) => {
            this.defineFunction(select, "disabled", false)
        })

        Object.values(document.getElementsByTagName("button")).forEach((button) => {
            if (button.id != "login-bot-btn") this.defineFunction(button, "disabled", false)
        })
        this.selectFreezed = false
    }
}

module.exports = new Events