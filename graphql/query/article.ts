import gql from 'graphql-tag'

export default gql`query queryArticle ($article_id: ID!) {
  result: article (article_id: $article_id) {
    # 文章id
    article_id
    # 文章标题
    article_title
    # 文章内容
    article_content
    # marked原文
    article_marked_content
    # 浏览量
    article_views
    # 发表时间
    article_date
    # 文章点赞数
    article_like_count
    # 点赞的ip地址
    article_like_ips
    # 背景图地址(/保存至本服务器)
    bg_path
    # 是否置顶（放置于首页轮播图）
    is_top
    # 置顶权重
    top_weight
    # 标签
    tags
  }
}`