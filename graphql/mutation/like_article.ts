import gql from 'graphql-tag'

export default gql`mutation likeArticle ($article_id: ID!) {
  result: likeArticle (article_id: $article_id)
}`