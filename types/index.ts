export type Article = {
  // 文章id
  article_id?: string|number,
  // 文章标题
  article_title: string,
  // 文章内容
  article_content: string,
  // 浏览量
  article_views?: number,
  // 发表时间
  article_date?: string,
  // 文章点赞数
  article_like_count?: number,
  // 点赞的ip地址
  article_like_ips?: Array<string>,
}

export type SubmitArticle = {
  article_id?: string|number,
  title: string,
  content: string,
  key: string,
}
