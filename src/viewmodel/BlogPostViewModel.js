import axios from 'axios'
const env = require('~/environment/env')

class BlogPostViewModel {
  static async getBlogPostData (userId, topicName, postId) {
    try {
      const response = await axios.post(env.graphqlEndpoint, {
        query: `
            query GetBlogPostData($userIdVar: String!, $postIdVar: String!, $topicNameVar: String!) {
                getPostFromId(postId: $postIdVar){
                    id
                    title
                    caption
                    description
                    creationTime
                    likesCount
                    savedCount
                }

                getTopicFromTopicName(topicName: $topicNameVar){
                    name
                    description
                    thumbnailLink
                    followersCount
                }

                checkIfTopicIsFollowedByUser(userId: $userIdVar, topicName: $topicNameVar)
                checkIfPostIsLikedByUser(userId: $userIdVar, postId: $postIdVar)
                checkIfPostIsSavedByUser(userId: $userIdVar, postId: $postIdVar)

                getLikesCountOnPost(postId: $postIdVar)
                getSavedCountOnPost(postId: $postIdVar)
              }
          `,
        operationName: 'GetBlogPostData',
        variables: {
          userIdVar: userId,
          topicNameVar: topicName,
          postIdVar: postId
        }
      })

      if (response && response.data) {
        return response.data
      } else {
        throw new Error('Some error occurred while fetching topic container data')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error.response.data.errors)
    }
  }

  static async getBlogPostDataWithoutUser (topicName, postId) {
    try {
      const response = await axios.post(env.graphqlEndpoint, {
        query: `
              query GetBlogPostDataWithoutUser($postIdVar: String!, $topicNameVar: String!) {
                getPostFromId(postId: $postIdVar){
                    id
                    title
                    caption
                    description
                    creationTime
                    likesCount
                    savedCount
                }

                getTopicFromTopicName(topicName: $topicNameVar){
                    name
                    description
                    thumbnailLink
                    followersCount
                }

                getLikesCountOnPost(postId: $postIdVar)
                getSavedCountOnPost(postId: $postIdVar)
              }
          `,
        operationName: 'GetBlogPostDataWithoutUser',
        variables: {
          topicNameVar: topicName,
          postIdVar: postId
        }
      })

      if (response && response.data) {
        return response.data
      } else {
        throw new Error('Some error occurred while fetching topic container data')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error.response.data.errors)
    }
  }

  static async likePost (userId, postId) {
    try {
      const response = await axios.post(env.graphqlEndpoint, {
        query: `
            mutation LikePost($userIdVar: String!, $postIdVar: String!) {
                likePost(userId: $userIdVar, postId: $postIdVar) {
                    id
                }
            }
        `,
        operationName: 'LikePost',
        variables: {
          userIdVar: userId,
          postIdVar: postId
        }
      })

      if (response && response.data) {
        return response.data
      } else {
        throw new Error('Some error occurred while following topic')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error.response.data.errors)
    }
  }

  static async dislikePost (userId, postId) {
    try {
      const response = await axios.post(env.graphqlEndpoint, {
        query: `
            mutation DislikePost($userIdVar: String!, $postIdVar: String!) {
                dislikePost(userId: $userIdVar, postId: $postIdVar) {
                    id
                }
            }
        `,
        operationName: 'DislikePost',
        variables: {
          userIdVar: userId,
          postIdVar: postId
        }
      })

      if (response && response.data) {
        return response.data
      } else {
        throw new Error('Some error occurred while following topic')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error.response.data.errors)
    }
  }

  static async savePost (userId, postId) {
    try {
      const response = await axios.post(env.graphqlEndpoint, {
        query: `
            mutation SavePost($userIdVar: String!, $postIdVar: String!) {
                savePost(userId: $userIdVar, postId: $postIdVar) {
                    id
                }
            }
        `,
        operationName: 'SavePost',
        variables: {
          userIdVar: userId,
          postIdVar: postId
        }
      })

      if (response && response.data) {
        return response.data
      } else {
        throw new Error('Some error occurred while following topic')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error.response.data.errors)
    }
  }

  static async unsavePost (userId, postId) {
    try {
      const response = await axios.post(env.graphqlEndpoint, {
        query: `
            mutation UnsavePost($userIdVar: String!, $postIdVar: String!) {
                unsavePost(userId: $userIdVar, postId: $postIdVar) {
                    id
                }
            }
        `,
        operationName: 'UnsavePost',
        variables: {
          userIdVar: userId,
          postIdVar: postId
        }
      })

      if (response && response.data) {
        return response.data
      } else {
        throw new Error('Some error occurred while following topic')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error.response.data.errors)
    }
  }
}

export default BlogPostViewModel
