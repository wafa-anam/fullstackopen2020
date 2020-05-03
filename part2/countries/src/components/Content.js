import React from 'react'
import Country from './Country'

const Content = ({ content }) => {

    if (content.length === 1)
        return (
            <Country country={content[0]} />
        )
    if (content.length <= 10 && content.length > 0)
        return (
            content.map(country =>
                <div key={country.numericCode}>{country.name}
                    <button type="button">show</button>
                </div>)
        )
    if (content.length > 10)
        return (<p>Too many matches, please narrow your search.</p>)
    return (
        <p>No results.</p>
    )

}

export default Content
