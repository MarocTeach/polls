import React from 'react'
import { Flex } from '@chakra-ui/core'

const Container = props => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={'gray.50'}
      color={'black'}
      h={'100vh'}
      w={'100vw'}
      {...props}
    />
  )
}

export default Container
