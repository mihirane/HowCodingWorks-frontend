import axios from 'axios'
const env = require('~/environment/env')

class UserProfileViewModel {
  static async getUserProfileData (userId) {
    try {
      const response = await axios.post(env.graphqlEndpoint, {
        query: `
            query GetUserProfileData($userIdVar: String!) {
                getAllSavedPostsByUser(userId: $userIdVar) {
                    id
                    title
                    caption
                    topic {
                        name
                    }
                }

                getAllFollowedTopicsByUser(userId: $userIdVar) {
                    name
                    thumbnailLink
                    followersCount
                }
              }
          `,
        operationName: 'GetUserProfileData',
        variables: {
          userIdVar: userId
        }
      })

      if (response && response.data) {
        return response.data
      } else {
        throw new Error('Some error occurred while fetching user profile data')
      }
    } catch (error) {
      // eslint-disable-next-line
        console.log(error.response.data.errors)
    }
  }
}

export default UserProfileViewModel
