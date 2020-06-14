import gql from 'graphql-tag'

export default gql`mutation getImage ($fileUrl: String!, $key: String!) {
  result: getImage (fileUrl: $fileUrl, key: $key) {
    id
    path
    filename
    mimetype
    encoding
  }
}`
