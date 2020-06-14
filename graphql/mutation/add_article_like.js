import gql from 'graphql-tag'

export default gql`mutation addArticleLike ($article_id: ID!) {
  result: addArticleLike (article_id: $article_id)
}`