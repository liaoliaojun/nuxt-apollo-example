import gql from 'graphql-tag'

export default gql`mutation downImage ($fileUrl: String!, $key: String!) {
  result: downImage (fileUrl: $fileUrl, key: $key) {
    id
    path
    filename
    mimetype
    encoding
  }
}`
