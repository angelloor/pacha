import fetchWithTimeout from './fetchWithTimeout'

class Http {
    constructor() {
        this.server = "https://pachaappec.com:443"
        // this.server = "http://192.168.25.43:5000"
        this.timeOut = 20000
    }

    static instance = new Http()

    get = async (url) => {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'token': '4C79A286C3ADE40D27696F617F94D646B7A38236FF385DF962EFAA9755BB2CBD'
                },
            }
            fetchWithTimeout(this.server + url, options, this.timeOut)
                .then(async (response) => {
                    let json = await response.json()
                    resolve(json)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

    post = (url, body) => {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'token': '4C79A286C3ADE40D27696F617F94D646B7A38236FF385DF962EFAA9755BB2CBD'
                },
                body: JSON.stringify(body)
            }

            fetchWithTimeout(this.server + url, options, this.timeOut)
                .then(async (response) => {
                    let json = await response.json()
                    resolve(json)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

    postFormData = (url, formData) => {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                body: formData
            }

            fetchWithTimeout(this.server + url, options, this.timeOut)
                .then(async (response) => {
                    let json = await response.json()
                    resolve(json)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

    patch = async (url, body) => {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'PATCH',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'token': '4C79A286C3ADE40D27696F617F94D646B7A38236FF385DF962EFAA9755BB2CBD'
                },
                body: JSON.stringify(body)
            }

            fetchWithTimeout(this.server + url, options, this.timeOut)
                .then(async (response) => {
                    let json = await response.json()
                    resolve(json)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

    delete = async (url, object) => {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'DELETE',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'token': '4C79A286C3ADE40D27696F617F94D646B7A38236FF385DF962EFAA9755BB2CBD'
                },
                body: JSON.stringify(body)
            }
            fetchWithTimeout(this.server + url + "/" + object, options, this.timeOut)
                .then(async (response) => {
                    let json = await response.json()
                    resolve(json)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }
}

export default Http