import {File} from '~/types/index'

// @ts-ignore
import UPLOAD_FILE from '~/graphql/mutation/upload_file'
// @ts-ignore
import UPLOAD_FILE_NETWORK from '~/graphql/mutation/upload_file_network'

export default function useUpload (ctx: any): UseReturn {

  const urlUpload = async (fileUrl: String) => {
    if (!fileUrl) return null

    const file:File = await ctx.root.$apollo.mutate({
      mutation: UPLOAD_FILE_NETWORK,
      variables: {
        fileUrl,
        key: localStorage.getItem('app-key'),
      },
    }).then((x: any) => x.data.result)
    return file
  }

  const localUpload = async ({target}: any) => {
    if (!target.validity.valid) return null
    const file:File = await ctx.root.$apollo.mutate({
      mutation: UPLOAD_FILE,
      variables: {
        file: target.files[0],
        key: localStorage.getItem('app-key'),
      },
    }).then((x: any) => x.data.result)
    return file
  }

  return {
    localUpload,
    urlUpload,
  }
}

interface UseReturn {
  urlUpload (fileUrl: String): Promise<File|null>
  localUpload ({target}: any): Promise<File|null>
}
