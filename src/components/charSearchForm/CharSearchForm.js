import {useState , useEffect} from "react";
import {Formik , Form , Field} from "formik"
import {Link} from "react-router-dom"

import useMarvelInfo from "../../services/request"

import './charSearchForm.scss'

const CharSearch = () => {
    const [charInfo , setCharInfo] = useState(null)

    const {getAllCharactersBySearch} = useMarvelInfo()

    const findChar = (name) => {
        getAllCharactersBySearch(name).then(res => setCharInfo(res))
    }

    const buttonToPage = !charInfo ? null : charInfo.length > 0 ?
           <div className="char__search-wrapper">
                <div className="char__search-success">There is! Visit {charInfo[0].name} page?</div>
                <Link to={`/character/${charInfo[0].id}`} className="button button__secondary">
                    <div className="inner">To page</div>
                </Link>
            </div>
        :   <div className="char__search-error">The character was not found. Check the name and try again</div>

    const validate = (values) => {
        const errors = {}
        if(!values.charName){
            errors.charName = "This field is required"
        }

        return errors
    }

    return(
        <div className="char__search-form">
            <Formik
                initialValues={{
                    charName: ""
                }}
                validate={validate}
                validateOnChange={false}
                onSubmit={({charName}) => findChar(charName)}>

                {({errors}) => {
                    console.log(errors)
                    return (
                        <Form>
                            <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                            <div className="char__search-wrapper">
                                <Field
                                    id="charName"
                                    name='charName'
                                    type='text'
                                    placeholder="Enter name"/>
                                <button
                                    type='submit'
                                    className="button button__main">
                                    <div className="inner">find</div>
                                </button>
                            </div>
                            <div className="char__search-error">{errors.charName}</div>
                            {buttonToPage}
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
export default CharSearch