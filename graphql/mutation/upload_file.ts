import {gql} from 'graphql-tag'

export default gql`mutation singleUpload ($file: Upload!, $key: String!) {
  result: singleUpload (file: $file, key: $key) {
    id
    path
    filename
    mimetype
    encoding
  }
}`
