export type Article = {
  // 文章id
  article_id?: string|number
  // 文章标题
  article_title: string
  // 文章内容
  article_content: string
  // marked原文
  article_marked_content?: string
  // 浏览量
  article_views?: number
  // 发表时间
  article_date?: string
  // 文章点赞数
  article_like_count?: number
  // 点赞的ip地址
  article_like_ips?: Array<string>
  // 背景图地址(/保存至本服务器)
  bg_path?: string
}

export type SubmitArticle = {
  article_id?: string|number
  article_title: string
  article_content?: string
  article_marked_content?: string
  bg_path?: string
  key: string
  is_top: boolean
  top_weight: number
  tags: Array<string>
}

export type File = {
  id: string|number
  path: string
  filename: string
  mimetype: string
  encoding: string
}
