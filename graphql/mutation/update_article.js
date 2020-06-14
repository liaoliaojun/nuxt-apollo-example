import gql from 'graphql-tag'

export default gql`mutation updateArticle ($input: ArticleInput!) {
  result: updateArticle (input: $input)
}`