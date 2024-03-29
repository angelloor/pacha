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

    return `${anio}-${mes}-${dia}T${horas}:${minutos}:${segundos}`
}

timeConversion = (millisec) => {
    var seconds = Math.trunc((millisec / 1000))
    var minutes = Math.trunc((seconds / 60))
    var hours = Math.trunc((minutes / 60))
    var days = Math.trunc((hours / 24))

    let horas = hours - (days * 24)
    let minutos = minutes - (hours * 60)
    let segundos = seconds - (minutes * 60)

    return (horas) ? `${horas}${(horas == 1 ? ` hora` : ` horas`)} ${minutos}${(minutos == 1 ? ` minuto` : ` minutos`)} ${segundos}${(segundos == 1 ? ` segundo` : ` segundos`)}` :
        (minutos) ? `${minutos}${(minutos == 1 ? ` minuto` : ` minutos`)} ${segundos}${(segundos == 1 ? ` segundo` : ` segundos`)}` : `${segundos}${(segundos == 1 ? ` segundo` : ` segundos`)}`
}

getTimeChallenge = (fechaStart, fechaActual) => {
    let timeToWaiting = 86400000
    // let timeToWaiting = 10000

    let milfechaStart = fechaStart.getTime()
    let milfechaActual = fechaActual.getTime()
    let timeGoal = milfechaStart + timeToWaiting
    let resta = timeGoal - milfechaActual

    let isFinished = false

    if (resta <= 0) {
        isFinished = true
        return { isFinished }
    } else {
        let timeRemaining = timeConversion(resta)
        isFinished = false
        return { isFinished, timeRemaining }
    }
}

getDataParentGate = () => {
    let data = [
        {
            question: '¿Cuál es el río más caudaloso del mundo?',
            correctAnswer: 'El Amazonas',
            answers: ['El Amazonas', 'Congo', 'Orinoco']
        },
        {
            question: '¿Cuántos segundos tiene un día? ',
            correctAnswer: '86400',
            answers: ['8640', '36000', '86400']
        },
        {
            question: '¿Cada cuántos años tenemos un año bisiesto?',
            correctAnswer: '4',
            answers: ['2', '4', '3']
        },
        {
            question: '¿Cuántos meses tienen 28 días?',
            correctAnswer: '1',
            answers: ['2', '1', '4']
        },
        {
            question: '¿Qué planeta es el más cercano al Sol?',
            correctAnswer: 'Mercurio',
            answers: ['Mercurio', 'Venus', 'Tierra']
        },
        {
            question: '¿Cuál es la montaña más alta en la actualidad?',
            correctAnswer: 'El Everest',
            answers: ['K2', 'El Everest', 'Kanchenjunga']
        },
    ]
    return data[Math.floor(Math.random() * 6)]
}

module.exports = {
    getDayMonth,
    getLevel,
    getYear,
    timeConversion,
    getTimeChallenge,
    getFullDate,
    getDataParentGate
}