import axios from 'axios'
const env = require('~/environment/env')

class PostEditorViewModel {
  static async getAllTopics () {
    try {
      const response = await axios.post(env.graphqlEndpoint, {
        query: `
            query GetAllTopics {
                getAllTopics {
                    name
                }
            }
        `,
        operationName: 'GetAllTopics',
        variables: {}
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

  static async publishPost (
    postTopicName,
    postTitle,
    postCaption,
    postDescription
  ) {
    try {
      const response = await axios.post(env.graphqlEndpoint, {
        query: `
            mutation CreatePost($postInputVar: PostInput!) {
                createPost(postInput: $postInputVar) {
                    id
                }
            }
        `,
        operationName: 'CreatePost',
        variables: {
          postInputVar: {
            title: postTitle,
            caption: postCaption,
            description: postDescription,
            topicName: postTopicName,
            published: true
          }
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

export default PostEditorViewModel
