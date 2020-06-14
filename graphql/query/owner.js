import gql from 'graphql-tag'

export default gql`query queryOwner {
  result: owner {
    # 作者
    author
    # 邮箱
    email
    # 网站网址
    website
  }
}`