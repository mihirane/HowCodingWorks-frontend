import axios from 'axios'
const env = require('~/environment/env')

class TopicContainerViewModel {
  static async getTopicContainerData (userId, topicName) {
    try {
      const response = await axios.post(env.graphqlEndpoint, {
        query: `
            query GetTopicContainerData($userIdVar: String!, $topicNameVar: String!) {
                getTopicFromTopicName(topicName: $topicNameVar){
                    name
                    description
                    thumbnailLink
                    followersCount
                    posts {
                        id
                        title
                        caption
                    }
                }
                checkIfTopicIsFollowedByUser(userId: $userIdVar, topicName: $topicNameVar)
            }
        `,
        operationName: 'GetTopicContainerData',
        variables: {
          userIdVar: userId,
          topicNameVar: topicName
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

  static async getTopicContainerDataWithoutUser (topicName) {
    try {
      const response = await axios.post(env.graphqlEndpoint, {
        query: `
            query GetTopicContainerDataWithoutUser($topicNameVar: String!) {
                getTopicFromTopicName(topicName: $topicNameVar) {
                    name
                    description
                    thumbnailLink
                    followersCount
                    posts {
                        id
                        title
                        caption
                    }
                }
            }
        `,
        operationName: 'GetTopicContainerDataWithoutUser',
        variables: {
          topicNameVar: topicName
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

  static async checkIfTopicIsFollowedByUser (userId, topicName) {
    try {
      const response = await axios.post(env.graphqlEndpoint, {
        query: `
            query CheckIfTopicIsFollowedByUser($userIdVar: String!, $topicNameVar: String!) {      
                checkIfTopicIsFollowedByUser(userId: $userIdVar, topicName: $topicNameVar)
            }
        `,
        operationName: 'CheckIfTopicIsFollowedByUser',
        variables: {
          userIdVar: userId,
          topicNameVar: topicName
        }
      })

      if (response && response.data) {
        return response.data
      } else {
        throw new Error('Some error occurred while checking if topic is followed by user')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error.response.data.errors)
    }
  }

  static async followTopic (userId, topicName) {
    try {
      const response = await axios.post(env.graphqlEndpoint, {
        query: `
            mutation FollowTopic($userIdVar: String!, $topicNameVar: String!) {
                followTopic(userId: $userIdVar, topicName: $topicNameVar) {
                    name
                }
            }
        `,
        operationName: 'FollowTopic',
        variables: {
          userIdVar: userId,
          topicNameVar: topicName
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

  static async unfollowTopic (userId, topicName) {
    try {
      const response = await axios.post(env.graphqlEndpoint, {
        query: `
            mutation UnfollowTopic($userIdVar: String!, $topicNameVar: String!) {
                unfollowTopic(userId: $userIdVar, topicName: $topicNameVar) {
                    name
                }
            }
        `,
        operationName: 'UnfollowTopic',
        variables: {
          userIdVar: userId,
          topicNameVar: topicName
        }
      })

      if (response && response.data) {
        return response.data
      } else {
        throw new Error('Some error occurred while following topic')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  }
}

export default TopicContainerViewModel
