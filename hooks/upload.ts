import {File} from '~/types/index'
import useApolloClient from '~/apollo/'

// @ts-ignore
import UPLOAD_FILE from '~/graphql/mutation/upload_file'
// @ts-ignore
import UPLOAD_FILE_NETWORK from '~/graphql/mutation/upload_file_network'

interface UseReturn {
  urlUpload (fileUrl: String): Promise<File|null>
  localUpload ({target}: any): Promise<File|null>
}

export default function useUpload (): UseReturn {
  const urlUpload = async (fileUrl: String) => {
    if (!fileUrl) return null

    const file:File = await useApolloClient().defaultClient.mutate({
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

    const file:File = await useApolloClient().uploadClient.mutate({
      mutation: UPLOAD_FILE,
      variables: {
        file: target.files[0],
        key: localStorage.getItem('app-key'),
      },
      context: {
        hasUpload: true,
      },
    }).then((x: any) => x.data.result)
    return file
  }

  return {
    localUpload,
    urlUpload,
  }
}
