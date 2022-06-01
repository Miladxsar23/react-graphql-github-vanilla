import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {generateFontAwesomeName} from '../../helpers'
const ReactionItem = ({content}) => { 
    const {name, color} = generateFontAwesomeName(content)
    return (
        <FontAwesomeIcon style={{color, fontSize : 22}} icon={name} />
    )
}

export default ReactionItem