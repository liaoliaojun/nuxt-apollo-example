import gql from 'graphql-tag'

export default gql`mutation addArticle ($input: ArticleInput!) {
  result: addArticle (input: $input)
}`
