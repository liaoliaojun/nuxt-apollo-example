import gql from "graphql-tag";
import * as VueApolloComposable from "@vue/apollo-composable";
import * as VueCompositionApi from "@vue/composition-api";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type ArticleInput = {
  /** 验证身份 */
  key: Scalars["String"];
  /** 文章id */
  article_id?: Maybe<Scalars["ID"]>;
  /** 文章标题 */
  article_title: Scalars["String"];
  /** 文章内容 */
  article_content: Scalars["String"];
  /** marked原文 */
  article_marked_content?: Maybe<Scalars["String"]>;
  /** 背景图地址(/保存至本服务器) */
  bg_path?: Maybe<Scalars["String"]>;
  /** 是否置顶（放置于首页轮播图） */
  is_top: Scalars["Boolean"];
  /** 置顶权重 */
  top_weight: Scalars["Int"];
  /** 标签 */
  tags: Array<Maybe<Scalars["String"]>>;
};

export type ArticleType = {
  __typename?: "ArticleType";
  /** 文章id */
  article_id?: Maybe<Scalars["ID"]>;
  /** 文章标题 */
  article_title: Scalars["String"];
  /** 文章内容 */
  article_content: Scalars["String"];
  /** marked原文 */
  article_marked_content?: Maybe<Scalars["String"]>;
  /** 浏览量 */
  article_views?: Maybe<Scalars["Int"]>;
  /** 创建文章时间 */
  article_date?: Maybe<Scalars["String"]>;
  /** 创建文章时间戳 */
  article_time_stamp?: Maybe<Scalars["Int"]>;
  /** 文章点赞数 */
  article_like_count?: Maybe<Scalars["Int"]>;
  /** 点赞的ip地址 */
  article_like_ips?: Maybe<Array<Scalars["String"]>>;
  /** 背景图地址(/保存至本服务器) */
  bg_path?: Maybe<Scalars["String"]>;
  /** 是否置顶（放置于首页轮播图） */
  is_top?: Maybe<Scalars["Boolean"]>;
  /** 置顶权重 */
  top_weight?: Maybe<Scalars["Int"]>;
  /** 标签 */
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE",
}

export type Comment = {
  __typename?: "Comment";
  /** 评论id */
  comment_id?: Maybe<Scalars["ID"]>;
  /** 用户信息 */
  create_user: User;
  /** 评论内容（转换后） */
  comment_content: Scalars["String"];
  /** 评论原文 */
  comment_marked_content?: Maybe<Scalars["String"]>;
  /** 评论时间 */
  create_time?: Maybe<Scalars["String"]>;
};

export type DeleteArticleInput = {
  /** 验证身份 */
  key: Scalars["String"];
  /** 文章id */
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
  /** 添加文章 */
  addArticle: Scalars["ID"];
  /** 更新文章 */
  updateArticle: Scalars["ID"];
  /** 删除文章 */
  deleteArticle: Scalars["ID"];
  /** 点赞文章 */
  addArticleLike: Scalars["Boolean"];
  /** 设置访客 */
  setVisitor: Scalars["Boolean"];
  /** 单文件上传 */
  singleUpload: File;
  /** 多文件上传 */
  multipleUpload: Array<File>;
  /** 获取网络图片 */
  getImage: File;
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

export type MutationAddArticleLikeArgs = {
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

export type MutationGetImageArgs = {
  fileUrl: Scalars["String"];
  key: Scalars["String"];
};

export type OwnerType = {
  __typename?: "OwnerType";
  /** 作者 */
  author?: Maybe<Scalars["String"]>;
  /** 邮箱 */
  email?: Maybe<Scalars["String"]>;
  /** 网站网址 */
  website?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  /** 查询所有者 */
  owner: OwnerType;
  /** 查询置顶文章 */
  tops: Array<Maybe<ArticleType>>;
  /** 文章列表 */
  articles: Array<Maybe<ArticleType>>;
  /** 查询单个文章 */
  article: ArticleType;
};

export type QueryArticleArgs = {
  article_id: Scalars["ID"];
};

export type User = {
  __typename?: "User";
  name: Scalars["String"];
  email: Scalars["String"];
  avatar?: Maybe<Scalars["String"]>;
};

export type AddArticleMutationVariables = Exact<{
  input: ArticleInput;
}>;

export type AddArticleMutation = { __typename?: "Mutation" } & {
  result: Mutation["addArticle"];
};

export type AddArticleLikeMutationVariables = Exact<{
  article_id: Scalars["ID"];
}>;

export type AddArticleLikeMutation = { __typename?: "Mutation" } & {
  result: Mutation["addArticleLike"];
};

export type DeleteArticleMutationVariables = Exact<{
  input: DeleteArticleInput;
}>;

export type DeleteArticleMutation = { __typename?: "Mutation" } & {
  result: Mutation["deleteArticle"];
};

export type SetVisitorMutationVariables = Exact<{ [key: string]: never }>;

export type SetVisitorMutation = { __typename?: "Mutation" } & {
  result: Mutation["setVisitor"];
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

export type GetImageMutationVariables = Exact<{
  fileUrl: Scalars["String"];
  key: Scalars["String"];
}>;

export type GetImageMutation = { __typename?: "Mutation" } & {
  result: { __typename?: "File" } & Pick<
    File,
    "id" | "path" | "filename" | "mimetype" | "encoding"
  >;
};

export type QueryArticleQueryVariables = Exact<{
  article_id: Scalars["ID"];
}>;

export type QueryArticleQuery = { __typename?: "Query" } & {
  result: { __typename?: "ArticleType" } & Pick<
    ArticleType,
    | "article_id"
    | "article_title"
    | "article_content"
    | "article_marked_content"
    | "article_views"
    | "article_date"
    | "article_like_count"
    | "article_like_ips"
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
      { __typename?: "ArticleType" } & Pick<
        ArticleType,
        | "article_id"
        | "article_title"
        | "article_content"
        | "article_views"
        | "article_date"
        | "article_like_count"
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
      { __typename?: "ArticleType" } & Pick<
        ArticleType,
        "article_id" | "article_title" | "bg_path"
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
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddArticleMutation(
  options: VueApolloComposable.UseMutationOptionsWithVariables<
    AddArticleMutation,
    AddArticleMutationVariables
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
export const AddArticleLikeDocument = gql`
  mutation addArticleLike($article_id: ID!) {
    result: addArticleLike(article_id: $article_id)
  }
`;

/**
 * __useAddArticleLikeMutation__
 *
 * To run a mutation, you first call `useAddArticleLikeMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAddArticleLikeMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAddArticleLikeMutation({
 *   variables: {
 *      article_id: // value for 'article_id'
 *   },
 * });
 */
export function useAddArticleLikeMutation(
  options: VueApolloComposable.UseMutationOptionsWithVariables<
    AddArticleLikeMutation,
    AddArticleLikeMutationVariables
  >
) {
  return VueApolloComposable.useMutation<
    AddArticleLikeMutation,
    AddArticleLikeMutationVariables
  >(AddArticleLikeDocument, options);
}
export type AddArticleLikeMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  AddArticleLikeMutation,
  AddArticleLikeMutationVariables
>;
export const DeleteArticleDocument = gql`
  mutation deleteArticle($input: deleteArticleInput!) {
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
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteArticleMutation(
  options: VueApolloComposable.UseMutationOptionsWithVariables<
    DeleteArticleMutation,
    DeleteArticleMutationVariables
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
export const SetVisitorDocument = gql`
  mutation setVisitor {
    result: setVisitor
  }
`;

/**
 * __useSetVisitorMutation__
 *
 * To run a mutation, you first call `useSetVisitorMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSetVisitorMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSetVisitorMutation({
 *   variables: {
 *   },
 * });
 */
export function useSetVisitorMutation(
  options: VueApolloComposable.UseMutationOptionsNoVariables<
    SetVisitorMutation,
    SetVisitorMutationVariables
  > = {}
) {
  return VueApolloComposable.useMutation<
    SetVisitorMutation,
    SetVisitorMutationVariables
  >(SetVisitorDocument, options);
}
export type SetVisitorMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  SetVisitorMutation,
  SetVisitorMutationVariables
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
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateArticleMutation(
  options: VueApolloComposable.UseMutationOptionsWithVariables<
    UpdateArticleMutation,
    UpdateArticleMutationVariables
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
 *      file: // value for 'file'
 *      key: // value for 'key'
 *   },
 * });
 */
export function useUploadFileMutation(
  options: VueApolloComposable.UseMutationOptionsWithVariables<
    UploadFileMutation,
    UploadFileMutationVariables
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
export const GetImageDocument = gql`
  mutation getImage($fileUrl: String!, $key: String!) {
    result: getImage(fileUrl: $fileUrl, key: $key) {
      id
      path
      filename
      mimetype
      encoding
    }
  }
`;

/**
 * __useGetImageMutation__
 *
 * To run a mutation, you first call `useGetImageMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useGetImageMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useGetImageMutation({
 *   variables: {
 *      fileUrl: // value for 'fileUrl'
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetImageMutation(
  options: VueApolloComposable.UseMutationOptionsWithVariables<
    GetImageMutation,
    GetImageMutationVariables
  >
) {
  return VueApolloComposable.useMutation<
    GetImageMutation,
    GetImageMutationVariables
  >(GetImageDocument, options);
}
export type GetImageMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  GetImageMutation,
  GetImageMutationVariables
>;
export const QueryArticleDocument = gql`
  query queryArticle($article_id: ID!) {
    result: article(article_id: $article_id) {
      article_id
      article_title
      article_content
      article_marked_content
      article_views
      article_date
      article_like_count
      article_like_ips
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
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useQueryArticleQuery(
 *   {
 *      article_id: // value for 'article_id'
 *   }
 * );
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
      article_title
      article_content
      article_views
      article_date
      article_like_count
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
 * const { result, loading, error } = useQueryArticlesQuery(
 *   {
 *   }
 * );
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
  return VueApolloComposable.useQuery<QueryArticlesQuery, undefined>(
    QueryArticlesDocument,
    undefined,
    options
  );
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
 * const { result, loading, error } = useQueryOwnerQuery(
 *   {
 *   }
 * );
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
  return VueApolloComposable.useQuery<QueryOwnerQuery, undefined>(
    QueryOwnerDocument,
    undefined,
    options
  );
}
export type QueryOwnerQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  QueryOwnerQuery,
  QueryOwnerQueryVariables
>;
export const QueryTopsDocument = gql`
  query queryTops {
    result: tops {
      article_id
      article_title
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
 * const { result, loading, error } = useQueryTopsQuery(
 *   {
 *   }
 * );
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
  return VueApolloComposable.useQuery<QueryTopsQuery, undefined>(
    QueryTopsDocument,
    undefined,
    options
  );
}
export type QueryTopsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  QueryTopsQuery,
  QueryTopsQueryVariables
>;
