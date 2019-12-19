class Error {

    constructor() {
        this.type = {
            "TOKEN_ERROR": "The bot's token has expired or it's invalid. Please, connect to <a href=\"https://discordapp.com/developers/applications/\" target=\"_BLANK\">https://www.discordapp.com/developers/applications/</a> and regenerate a new token.",
            "INTERNAL_ERROR": "An internal error occured. Please, restart the app and try again.",
            "EMPTY_MESSAGE": "Can't send an empty message."
        }
    }

    displayError = (err=String) => {
        document.getElementById("error-layer").style.display = "block"
        document.getElementById("error").innerHTML = err
        return 0
    }

    hideError = () => {
        document.getElementById("error-layer").style.display = "none"
        return 0
    }
}

module.exports = new Error