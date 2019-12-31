const errors = require("./errors.js")
const events = require("./events.js")
const Discord = require("discord.js")
class LoginButton {

    loginButtonChange = (value = String) => {
        if (value == "disconnect") {
            document.getElementById("login-bot-btn").innerHTML = "Disconnect"
            document.getElementById("login-bot-btn").setAttribute("onClick", "logoutBot()")
            events.defineFunction(document.getElementById("token-field"), "readOnly", true)
            this.displayBotInformations()
            return 0

        } else if (value == "connect") {
            document.getElementById("login-bot-btn").innerHTML = "Connect"
            document.getElementById("login-bot-btn").setAttribute("onClick", "logButton.loginBot()")
            this.hideBotInformations()
            events.defineFunction(document.getElementById("token-field"), "readOnly", false)
            return 0

        } else {
            errors.displayError(errors.type.INTERNAL_ERROR)
            return 1

        }
    }

    globalButtonFunctionChanger = (buttonID, type = "onClick", func = String) => {
        document.getElementById(buttonID).setAttribute(type, func)
        return 0

    }

    loginBot = (client = new Discord.Client()) => {
        const token = document.getElementById("token-field").value
        client.login(token).then((_) => {
            this.client = client
            this.loginButtonChange("disconnect")
            this.displayBotInformations()
        }).catch((err) => {
            errors.displayError(errors.type.TOKEN_ERROR)
            this.client.destroy().then((_) => {
                return 1
            })
        })
    }

    logoutBot = () => {
        if (this.client) {
            this.client.destroy().then((_) => {
                this.loginButtonChange("connect")
                window.location = window.location
                return 0

            }).catch((_) => {
                errors.displayError(errors.type.INTERNAL_ERROR)
                return 1

            })
        } else {
            errors.displayError(errors.type.INTERNAL_ERROR)
            return 1
        }
    }

    badgePresence = (category) => {
        if (category == "dnd") {
            const spanDND = document.createElement("span")
            spanDND.className = "badge badge-pill badge-danger"
            spanDND.innerHTML = "Do not disturb"
            spanDND.id = "status-bot"
            return spanDND

        } else if (category == "idle") {
            const spanIDLE = document.createElement("span")
            spanIDLE.className = "badge badge-pill badge-warning"
            spanIDLE.innerHTML = "IDLE"
            spanIDLE.id = "status-bot"
            return spanIDLE

        } else if (category == "online") {
            const spanONLINE = document.createElement("span")
            spanONLINE.className = "badge badge-pill badge-success"
            spanONLINE.innerHTML = "Online"
            return spanONLINE

        } else if (category == "offline") {
            const spanONLINE = document.createElement("span")
            spanONLINE.className = "badge badge-pill badge-secondary"
            spanONLINE.innerHTML = "Offline"
            spanONLINE.id = "status-bot"
            return spanONLINE

        }

    }

    displayBotInformations = () => {
        const avatarURL = this.client.user.avatarURL
        const tag = this.client.user.tag
        const serverCount = this.client.guilds.array().length
        const status = this.client.user.presence.status

        let serverWithPermsIndex = 0
        this.client.guilds.forEach((guild) => {
            if (guild.members.get(this.client.user.id).hasPermission("ADMINISTRATOR")) serverWithPermsIndex += 1
        })

        const iconField = document.getElementById("icon-field")
        const linkBotIconRedirect = document.getElementById("redirect-bot-icon")
        const tagField = document.getElementById("tag-field")
        const serverCountField = document.getElementById("server-count-field")
        const serverPermsField = document.getElementById("server-perms-field")
        const statusField = document.getElementById("status-field")

        iconField.src = avatarURL
        iconField.width = "150"
        iconField.height = "150"
        linkBotIconRedirect.href = avatarURL
        tagField.innerHTML = `Username: ${tag}`
        serverCountField.innerHTML = `Servers count: ${serverCount}`
        serverPermsField.innerHTML = `Servers with perms: ${serverWithPermsIndex}`
        statusField.innerHTML = `Status: `
        statusField.append(this.badgePresence(status))

        document.getElementById("bot-infos").style.display = "block"
    }

    hideBotInformations = () => {
        document.getElementById("bot-infos").style.display = "none"
    }

    changeTextButton = (elementID = String, newText = String) => {
        document.getElementById(elementID).innerHTML = newText
        return 0
    }


}

module.exports = new LoginButton
