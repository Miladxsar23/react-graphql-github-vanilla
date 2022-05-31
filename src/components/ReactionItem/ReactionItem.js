import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {generateFontAwesomeName} from '../../helpers'
const ReactionItem = ({content}) => { 
    const {name, color} = generateFontAwesomeName(content)
    return (
        <FontAwesomeIcon style={{color}} icon={name} />
    )
}

export default ReactionItem