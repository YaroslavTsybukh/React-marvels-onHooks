import {useHTTP} from "../hooks/http.hook"
import charList from "../components/charList/CharList";

const useMarvelInfo = () => {
    const _apiKey = "9e0a30c0c5b259f9360bba6b1f9e4410"
    const _baseOffset = 110

    const { request , error , loading , clearError} = useHTTP()

    const getAllCharacters =  async (offset = _baseOffset) => {
        let response = await request(`https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&apikey=${_apiKey}`)
        return response.data.results.map(_transformDataCharacters)
    }

    const getCharacter = async (id) => {
        let response = await request(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=${_apiKey}`)
        return _transformDataCharacters(response.data.results[0])
    }

    const getAllComics = async (offset = _baseOffset) => {
        const response = await request(`https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=${offset}&apikey=${_apiKey}`)
        return response.data.results.map(_transformDataComics)
    }

    const getComic = async(id) => {
        const response = await request(`https://gateway.marvel.com:443/v1/public/comics/${id}?apikey=${_apiKey}`)
        return _transformDataComics(response.data.results[0])
    }

    const _transformDataCharacters = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description && char.description.length > 50 ? char.description.slice(0,51) + "..." : "Описания нет",
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics : char.comics.items
        }
    }

    const _transformDataComics = (comic) => {
        return {
            id: comic.id,
            name: comic.title,
            description: comic.description || 'There is no description',
            price: comic.prices[0].price + "$",
            pageCount: `${comic.pageCount} pages`,
            language: comic.textObjects.language || "en-us",
            thumbnail : `${comic.thumbnail.path}.${comic.thumbnail.extension}`
        }
    }

    return {getAllCharacters , getCharacter , loading , error , clearError , getAllComics , getComic}
}

export default useMarvelInfo