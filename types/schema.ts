import gql from "graphql-tag";
import * as VueApolloComposable from "@vue/apollo-composable";
import * as VueCompositionApi from "@vue/composition-api";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type Article = {
  __typename?: "Article";
  article_id?: Maybe<Scalars["ID"]>;
  title: Scalars["String"];
  content: Scalars["String"];
  marked_content?: Maybe<Scalars["String"]>;
  views?: Maybe<Scalars["Int"]>;
  date?: Maybe<Scalars["String"]>;
  time_stamp?: Maybe<Scalars["Int"]>;
  like_count?: Maybe<Scalars["Int"]>;
  like_ips?: Maybe<Array<Scalars["String"]>>;
  bg_path?: Maybe<Scalars["String"]>;
  is_top?: Maybe<Scalars["Boolean"]>;
  top_weight?: Maybe<Scalars["Int"]>;
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type ArticleInput = {
  key: Scalars["String"];
  article_id?: Maybe<Scalars["ID"]>;
  title: Scalars["String"];
  content: Scalars["String"];
  marked_content?: Maybe<Scalars["String"]>;
  bg_path?: Maybe<Scalars["String"]>;
  is_top?: Maybe<Scalars["Boolean"]>;
  top_weight?: Maybe<Scalars["Int"]>;
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type DeleteArticleInput = {
  key: Scalars["String"];
  article_id: Scalars["ID"];
};

export type File = {
  __typename?: "File";
  id: Scalars["ID"];
  path: Scalars["String"];
  filename: Scalars["String"];
  mimetype: Scalars["String"];
  encoding: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  addArticle: Scalars["ID"];
  updateArticle: Scalars["ID"];
  deleteArticle: Scalars["ID"];
  likeArticle: Scalars["Boolean"];
  saveVisitor: Scalars["Boolean"];
  singleUpload: File;
  multipleUpload: Array<File>;
  downImage: File;
};

export type MutationAddArticleArgs = {
  input: ArticleInput;
};

export type MutationUpdateArticleArgs = {
  input: ArticleInput;
};

export type MutationDeleteArticleArgs = {
  input: DeleteArticleInput;
};

export type MutationLikeArticleArgs = {
  article_id: Scalars["ID"];
};

export type MutationSingleUploadArgs = {
  file: Scalars["Upload"];
  key: Scalars["String"];
};

export type MutationMultipleUploadArgs = {
  files: Array<Scalars["Upload"]>;
  key: Scalars["String"];
};

export type MutationDownImageArgs = {
  fileUrl: Scalars["String"];
  key: Scalars["String"];
};

export type OwnerType = {
  __typename?: "OwnerType";
  author?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  website?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  article: Article;
  articles: Array<Maybe<Article>>;
  tops: Array<Maybe<Article>>;
  owner: OwnerType;
};

export type QueryArticleArgs = {
  article_id: Scalars["ID"];
};

export type AddArticleMutationVariables = Exact<{
  input: ArticleInput;
}>;

export type AddArticleMutation = { __typename?: "Mutation" } & {
  result: Mutation["addArticle"];
};

export type DeleteArticleMutationVariables = Exact<{
  input: DeleteArticleInput;
}>;

export type DeleteArticleMutation = { __typename?: "Mutation" } & {
  result: Mutation["deleteArticle"];
};

export type LikeArticleMutationVariables = Exact<{
  article_id: Scalars["ID"];
}>;

export type LikeArticleMutation = { __typename?: "Mutation" } & {
  result: Mutation["likeArticle"];
};

export type SaveVisitorMutationVariables = Exact<{ [key: string]: never }>;

export type SaveVisitorMutation = { __typename?: "Mutation" } & {
  result: Mutation["saveVisitor"];
};

export type UpdateArticleMutationVariables = Exact<{
  input: ArticleInput;
}>;

export type UpdateArticleMutation = { __typename?: "Mutation" } & {
  result: Mutation["updateArticle"];
};

export type UploadFileMutationVariables = Exact<{
  file: Scalars["Upload"];
  key: Scalars["String"];
}>;

export type UploadFileMutation = { __typename?: "Mutation" } & {
  result: { __typename?: "File" } & Pick<
    File,
    "id" | "path" | "filename" | "mimetype" | "encoding"
  >;
};

export type DownImageMutationVariables = Exact<{
  fileUrl: Scalars["String"];
  key: Scalars["String"];
}>;

export type DownImageMutation = { __typename?: "Mutation" } & {
  result: { __typename?: "File" } & Pick<
    File,
    "id" | "path" | "filename" | "mimetype" | "encoding"
  >;
};

export type QueryArticleQueryVariables = Exact<{
  article_id: Scalars["ID"];
}>;

export type QueryArticleQuery = { __typename?: "Query" } & {
  result: { __typename?: "Article" } & Pick<
    Article,
    | "article_id"
    | "title"
    | "content"
    | "marked_content"
    | "views"
    | "date"
    | "like_count"
    | "like_ips"
    | "bg_path"
    | "is_top"
    | "top_weight"
    | "tags"
  >;
};

export type QueryArticlesQueryVariables = Exact<{ [key: string]: never }>;

export type QueryArticlesQuery = { __typename?: "Query" } & {
  result: Array<
    Maybe<
      { __typename?: "Article" } & Pick<
        Article,
        | "article_id"
        | "title"
        | "content"
        | "views"
        | "date"
        | "like_count"
        | "bg_path"
      >
    >
  >;
};

export type QueryOwnerQueryVariables = Exact<{ [key: string]: never }>;

export type QueryOwnerQuery = { __typename?: "Query" } & {
  result: { __typename?: "OwnerType" } & Pick<
    OwnerType,
    "author" | "email" | "website"
  >;
};

export type QueryTopsQueryVariables = Exact<{ [key: string]: never }>;

export type QueryTopsQuery = { __typename?: "Query" } & {
  result: Array<
    Maybe<
      { __typename?: "Article" } & Pick<
        Article,
        "article_id" | "title" | "bg_path"
      >
    >
  >;
};

export const AddArticleDocument = gql`
  mutation addArticle($input: ArticleInput!) {
    result: addArticle(input: $input)
  }
`;

/**
 * __useAddArticleMutation__
 *
 * To run a mutation, you first call `useAddArticleMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAddArticleMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAddArticleMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useAddArticleMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        AddArticleMutation,
        AddArticleMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          AddArticleMutation,
          AddArticleMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    AddArticleMutation,
    AddArticleMutationVariables
  >(AddArticleDocument, options);
}
export type AddArticleMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  AddArticleMutation,
  AddArticleMutationVariables
>;
export const DeleteArticleDocument = gql`
  mutation deleteArticle($input: DeleteArticleInput!) {
    result: deleteArticle(input: $input)
  }
`;

/**
 * __useDeleteArticleMutation__
 *
 * To run a mutation, you first call `useDeleteArticleMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteArticleMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useDeleteArticleMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DeleteArticleMutation,
        DeleteArticleMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DeleteArticleMutation,
          DeleteArticleMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    DeleteArticleMutation,
    DeleteArticleMutationVariables
  >(DeleteArticleDocument, options);
}
export type DeleteArticleMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  DeleteArticleMutation,
  DeleteArticleMutationVariables
>;
export const LikeArticleDocument = gql`
  mutation likeArticle($article_id: ID!) {
    result: likeArticle(article_id: $article_id)
  }
`;

/**
 * __useLikeArticleMutation__
 *
 * To run a mutation, you first call `useLikeArticleMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLikeArticleMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLikeArticleMutation({
 *   variables: {
 *     article_id: // value for 'article_id'
 *   },
 * });
 */
export function useLikeArticleMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        LikeArticleMutation,
        LikeArticleMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          LikeArticleMutation,
          LikeArticleMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    LikeArticleMutation,
    LikeArticleMutationVariables
  >(LikeArticleDocument, options);
}
export type LikeArticleMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  LikeArticleMutation,
  LikeArticleMutationVariables
>;
export const SaveVisitorDocument = gql`
  mutation saveVisitor {
    result: saveVisitor
  }
`;

/**
 * __useSaveVisitorMutation__
 *
 * To run a mutation, you first call `useSaveVisitorMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSaveVisitorMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSaveVisitorMutation();
 */
export function useSaveVisitorMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SaveVisitorMutation,
        SaveVisitorMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SaveVisitorMutation,
          SaveVisitorMutationVariables
        >
      > = {}
) {
  return VueApolloComposable.useMutation<
    SaveVisitorMutation,
    SaveVisitorMutationVariables
  >(SaveVisitorDocument, options);
}
export type SaveVisitorMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  SaveVisitorMutation,
  SaveVisitorMutationVariables
>;
export const UpdateArticleDocument = gql`
  mutation updateArticle($input: ArticleInput!) {
    result: updateArticle(input: $input)
  }
`;

/**
 * __useUpdateArticleMutation__
 *
 * To run a mutation, you first call `useUpdateArticleMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateArticleMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateArticleMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        UpdateArticleMutation,
        UpdateArticleMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          UpdateArticleMutation,
          UpdateArticleMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    UpdateArticleMutation,
    UpdateArticleMutationVariables
  >(UpdateArticleDocument, options);
}
export type UpdateArticleMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  UpdateArticleMutation,
  UpdateArticleMutationVariables
>;
export const UploadFileDocument = gql`
  mutation uploadFile($file: Upload!, $key: String!) {
    result: singleUpload(file: $file, key: $key) {
      id
      path
      filename
      mimetype
      encoding
    }
  }
`;

/**
 * __useUploadFileMutation__
 *
 * To run a mutation, you first call `useUploadFileMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUploadFileMutation({
 *   variables: {
 *     file: // value for 'file'
 *     key: // value for 'key'
 *   },
 * });
 */
export function useUploadFileMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        UploadFileMutation,
        UploadFileMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          UploadFileMutation,
          UploadFileMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    UploadFileMutation,
    UploadFileMutationVariables
  >(UploadFileDocument, options);
}
export type UploadFileMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  UploadFileMutation,
  UploadFileMutationVariables
>;
export const DownImageDocument = gql`
  mutation downImage($fileUrl: String!, $key: String!) {
    result: downImage(fileUrl: $fileUrl, key: $key) {
      id
      path
      filename
      mimetype
      encoding
    }
  }
`;

/**
 * __useDownImageMutation__
 *
 * To run a mutation, you first call `useDownImageMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDownImageMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDownImageMutation({
 *   variables: {
 *     fileUrl: // value for 'fileUrl'
 *     key: // value for 'key'
 *   },
 * });
 */
export function useDownImageMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        DownImageMutation,
        DownImageMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          DownImageMutation,
          DownImageMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    DownImageMutation,
    DownImageMutationVariables
  >(DownImageDocument, options);
}
export type DownImageMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  DownImageMutation,
  DownImageMutationVariables
>;
export const QueryArticleDocument = gql`
  query queryArticle($article_id: ID!) {
    result: article(article_id: $article_id) {
      article_id
      title
      content
      marked_content
      views
      date
      like_count
      like_ips
      bg_path
      is_top
      top_weight
      tags
    }
  }
`;

/**
 * __useQueryArticleQuery__
 *
 * To run a query within a Vue component, call `useQueryArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryArticleQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useQueryArticleQuery({
 *   article_id: // value for 'article_id'
 * });
 */
export function useQueryArticleQuery(
  variables:
    | QueryArticleQueryVariables
    | VueCompositionApi.Ref<QueryArticleQueryVariables>
    | ReactiveFunction<QueryArticleQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        QueryArticleQuery,
        QueryArticleQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          QueryArticleQuery,
          QueryArticleQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          QueryArticleQuery,
          QueryArticleQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<
    QueryArticleQuery,
    QueryArticleQueryVariables
  >(QueryArticleDocument, variables, options);
}
export type QueryArticleQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  QueryArticleQuery,
  QueryArticleQueryVariables
>;
export const QueryArticlesDocument = gql`
  query queryArticles {
    result: articles {
      article_id
      title
      content
      views
      date
      like_count
      bg_path
    }
  }
`;

/**
 * __useQueryArticlesQuery__
 *
 * To run a query within a Vue component, call `useQueryArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryArticlesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useQueryArticlesQuery();
 */
export function useQueryArticlesQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        QueryArticlesQuery,
        QueryArticlesQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          QueryArticlesQuery,
          QueryArticlesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          QueryArticlesQuery,
          QueryArticlesQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<
    QueryArticlesQuery,
    QueryArticlesQueryVariables
  >(QueryArticlesDocument, {}, options);
}
export type QueryArticlesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  QueryArticlesQuery,
  QueryArticlesQueryVariables
>;
export const QueryOwnerDocument = gql`
  query queryOwner {
    result: owner {
      author
      email
      website
    }
  }
`;

/**
 * __useQueryOwnerQuery__
 *
 * To run a query within a Vue component, call `useQueryOwnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryOwnerQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useQueryOwnerQuery();
 */
export function useQueryOwnerQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        QueryOwnerQuery,
        QueryOwnerQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          QueryOwnerQuery,
          QueryOwnerQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          QueryOwnerQuery,
          QueryOwnerQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<
    QueryOwnerQuery,
    QueryOwnerQueryVariables
  >(QueryOwnerDocument, {}, options);
}
export type QueryOwnerQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  QueryOwnerQuery,
  QueryOwnerQueryVariables
>;
export const QueryTopsDocument = gql`
  query queryTops {
    result: tops {
      article_id
      title
      bg_path
    }
  }
`;

/**
 * __useQueryTopsQuery__
 *
 * To run a query within a Vue component, call `useQueryTopsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryTopsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useQueryTopsQuery();
 */
export function useQueryTopsQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        QueryTopsQuery,
        QueryTopsQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          QueryTopsQuery,
          QueryTopsQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          QueryTopsQuery,
          QueryTopsQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<QueryTopsQuery, QueryTopsQueryVariables>(
    QueryTopsDocument,
    {},
    options
  );
}
export type QueryTopsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  QueryTopsQuery,
  QueryTopsQueryVariables
>;
