import {gql} from 'graphql-tag'

export default gql`query queryArticles {
  result: articles {
    # 文章id
    article_id
    # 文章标题
    title
    # # 文章内容
    content
    # # 浏览量
    views
    # 发表时间
    date
    # 文章点赞数
    like_count
    # 点赞的ip地址
    # like_ips
    # 背景图地址(/保存至本服务器)
    bg_path
  }
}`
