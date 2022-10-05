class MarvelInfo {
    _apiKey = "9e0a30c0c5b259f9360bba6b1f9e4410"
    _baseOffset = 110

    getInfo = async (url) => {
        let response = await fetch(url)
        if(!response.ok){
            throw new Error(`Ошибка статус: ${response.status}`)
        }
        return await response.json()
    }

    getAllCharacters =  async (offset = this._baseOffset) => {
        let response = await this.getInfo(`https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&apikey=${this._apiKey}`)
        return response.data.results.map(this._transformData)
    }

    getCharacter = async (id) => {
        let response = await this.getInfo(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=${this._apiKey}`)
        return this._transformData(response.data.results[0])
    }

    _transformData = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description && char.description.length > 50 ? char.description.slice(0,51) + "..." : "Описания нет",
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelInfo