import {Article} from '~/types/index'
import useApolloClient from '~/apollo/'

// @ts-ignore
import mutateArticleLike from '~/graphql/mutation/like_article'

export default function useLike (): UseReturn {
  const setLike = async (article: Article) => {
    const {like_count} = article
    article.like_count = (like_count || 0) + 1
    const isSuccess: boolean = await useApolloClient().defaultClient.mutate({
      mutation: mutateArticleLike,
      variables: {
        article_id: article.article_id,
      },
    }).then((x: any) => x.data?.result)
    if (!isSuccess) {
      article.like_count = like_count || 0
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
