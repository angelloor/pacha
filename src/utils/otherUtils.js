getLevel = (experiencia) => {
    let experienceInicial = experiencia
    let level = 1
    while ((Math.sign(experienceInicial - (level * 100)) == 1) || Math.sign(experienceInicial - (level * 100)) == 0) {
        experienceInicial -= (level * 100)
        level += 1
    }
    return { level, actual: experienceInicial, meta: (level * 100) }
}

getDayMonth = () => {
    const date = new Date()
    let dia = date.getDate()
    let mes = date.getMonth() + 1

    if (dia <= 9) {
        dia = `0${dia}`
    }
    if (mes <= 9) {
        mes = `0${mes}`
    }

    const dateActuallity = `${dia}/${mes}`
    return dateActuallity
}

getYear = () => {
    const date = new Date()
    let year = date.getFullYear()
    return year
}

getFullDate = () => {
    const date = new Date()
    let anio = date.getFullYear()
    let mes = date.getMonth() + 1
    let dia = date.getDate()
    let horas = date.getHours()
    let minutos = date.getMinutes()
    let segundos = date.getSeconds()

    if (dia <= 9) {
        dia = `0${dia}`
    }
    if (mes <= 9) {
        mes = `0${mes}`
    }
    if (horas <= 9) {
        horas = `0${horas}`
    }
    if (minutos <= 9) {
        minutos = `0${minutos}`
    }
    if (segundos <= 9) {
        segundos = `0${segundos}`
    }

    return `${anio}-${mes}-${26}T${horas}:${minutos}:${segundos}`
}

timeConversion = (millisec) => {
    var seconds = (millisec / 1000).toFixed(0)
    var minutes = (millisec / (1000 * 60)).toFixed(0)
    var hours = (millisec / (1000 * 60 * 60)).toFixed(0)
    var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(0)

    if (seconds < 60) {
        return seconds + " Segundos"
    } else if (minutes < 60) {
        return minutes + " Minutos"
    } else if (hours < 24) {
        return hours + " Horas " + (minutes - (hours * 60)) + " Minutos"
    } else {
        return days + " Día"
    }
}

getTimeChallenge = (fechaStart, fechaActual) => {
    let timeToWaiting = 86400000
    // let timeToWaiting = 10000

    let resta = fechaActual.getTime() - fechaStart.getTime()
    let isFinished = false
    let tiempoFaltante = timeToWaiting - resta

    if (resta >= timeToWaiting) {
        isFinished = true
        return { isFinished }
    } else {
        let timeRemaining = timeConversion(tiempoFaltante)
        isFinished = false
        return { isFinished, timeRemaining }
    }
}

module.exports = {
    getDayMonth,
    getLevel,
    getYear,
    timeConversion,
    getTimeChallenge,
    getFullDate
}