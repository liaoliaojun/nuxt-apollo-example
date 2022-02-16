import {gql} from 'graphql-tag'

export default gql`mutation deleteArticle ($input: DeleteArticleInput!) {
  result: deleteArticle (input: $input)
}`
