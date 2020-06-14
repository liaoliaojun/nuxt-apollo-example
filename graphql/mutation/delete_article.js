import gql from 'graphql-tag'

export default gql`mutation deleteArticle ($input: deleteArticleInput!) {
  result: deleteArticle (input: $input)
}`