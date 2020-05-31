export type Article = {
  // 文章id
  article_id?: String|Number,
  // 文章标题
  article_title: String,
  // 文章内容
  article_content: String,
  // marked原文
  article_marked_content?: String,
  // 浏览量
  article_views?: Number,
  // 发表时间
  article_date?: String,
  // 文章点赞数
  article_like_count?: Number,
  // 点赞的ip地址
  article_like_ips?: Array<String>,
  // 背景图地址(/保存至本服务器)
  bg_path?: String,
}

export type SubmitArticle = {
  article_id?: String|Number,
  article_title: String,
  article_content?: String,
  article_marked_content?: String,
  bg_path?: String,
  key: String,
}

export type File = {
  id: String|Number,
  path: String,
  filename: String,
  mimetype: String,
  encoding: String,
}
