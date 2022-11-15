const CONFIG_API = {
    url: 'https://sb-cats.herokuapp.com/api/2/37Evgeny',
    headers: {
        'Content-type': 'application/json'
    }
}

class Api {
    constructor(config){
        this._url = config.url;
        this._headers = config.headers;
    }

     // Метод  
    _onRes(res){
        return res.ok ? res.json() : Promise.reject({...res, message: "Server side error!!!"})
    }

    // Получаем всех котиков с сервера
    getAllCats(){
        // return вернуть цепочку промисов
       return fetch(`${this._url}/show`, {
            method: 'GET'
        }).then(this._onRes)
    }



// Добавить котика на сервер
    addNewCat(data){
        return fetch(`${this._url}/add`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: this._headers
        }).then(this._onRes)
    }
}

const api = new Api(CONFIG_API);