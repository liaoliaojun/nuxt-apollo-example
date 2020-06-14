import {Article} from '~/types/index'

// @ts-ignore
import mutateArticleLike from '~/graphql/mutation/add_article_like.js'

export default function useLike (ctx: any): UseReturn {
  const setLike = async (article: Article) => {
    const {article_like_count} = article
    article.article_like_count = (article_like_count || 0) + 1
    const isSuccess: boolean = await ctx.root.$apollo.mutate({
      mutation: mutateArticleLike,
      variables: {
        article_id: article.article_id,
      },
    }).then((x: any) => x.data?.result)
    if (!isSuccess) {
      article.article_like_count = article_like_count || 0
      alert('您已经点赞过了哦~')
    }
  }

  return {
    setLike,
  }
}

interface UseReturn {
  setLike (article: Article): void
}
