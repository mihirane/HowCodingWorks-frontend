import axios from 'axios'
const env = require('~/environment/env')

class CreateTopicViewModel {
  static async createTopic (
    topicName,
    topicDescription,
    topicThumbnailLink
  ) {
    try {
      const response = await axios.post(env.graphqlEndpoint, {
        query: `
            mutation CreateTopic($topicInputVar: TopicInput!) {
                createTopic(topicInput: $topicInputVar) {
                    name
                }
            }
        `,
        operationName: 'CreateTopic',
        variables: {
          topicInputVar: {
            name: topicName,
            description: topicDescription,
            thumbnailLink: topicThumbnailLink
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

export default CreateTopicViewModel
