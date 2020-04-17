import React from 'react'
import Head from 'next/head'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Spinner } from '@chakra-ui/core'
import { withApollo } from '../lib/withApollo'

const query = gql`
  {
    poll {
      id
      question
      answers {
        id
        value
        votes
      }
    }
  }
`

const Home = () => {
  const { loading, data } = useQuery(query)
  if (loading) {
    return <Spinner />
  }
  console.log(data)
  const poll = data.poll[0]
  return (
    <React.Fragment>
      <Head>
        <title>Polls</title>
      </Head>
      <div>{poll.question}</div>
      <ul>
        {poll.answers.map(answer => (
          <li key={answer.id}>
            {answer.value} ({answer.votes})
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}
export default withApollo({ ssr: true })(Home)
