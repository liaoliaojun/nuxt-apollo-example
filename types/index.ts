export type Article = {
  // 文章id
  article_id?: string|number
  // 文章标题
  title: string
  // 文章内容
  content: string
  // marked原文
  marked_content?: string
  // 浏览量
  views?: number
  // 发表时间
  date?: string
  // 文章点赞数
  like_count?: number
  // 点赞的ip地址
  like_ips?: Array<string>
  // 背景图地址(/保存至本服务器)
  bg_path?: string
}

export type SubmitArticle = {
  article_id?: string|number
  title: string
  content?: string
  marked_content?: string
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
