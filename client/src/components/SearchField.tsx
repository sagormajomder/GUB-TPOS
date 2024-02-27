import {FiSearch} from 'react-icons/fi'
import {InputGroup, InputLeftElement, Input, useColorModeValue as mode, InputProps} from '@chakra-ui/react'
import * as React from 'react'

export const SearchField: React.FC<InputProps> = (props) => {
    return (
        <InputGroup {...props} maxW={'xs'}>
            <InputLeftElement pointerEvents="none">
                <FiSearch opacity={0.80}/>
            </InputLeftElement>
            <Input
                placeholder="Search"
                bg={mode('blackAlpha.50', 'whiteAlpha.200')}
                value={props.value || ''}
                onChange={props.onChange}
                border={0}
                focusBorderColor="whiteAlpha.800"
                _placeholder={{color: 'whiteAlpha.600'}}
            />
        </InputGroup>
    )
}
