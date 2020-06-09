import topicModel from './../model/TopicModel'
import userModel from './../model/UserModel'
import postModel from './../model/PostModel'

class TopicContainerViewModel {
  static async getTopicFromTopicName (topicName) {
    try {
      return await topicModel.getTopicFromTopicName(topicName)
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  }

  static async checkIfTopicIsFollowedByUser (userId, topicName) {
    try {
      return await userModel.checkIfTopicIsFollowedByUser(userId, topicName)
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  }

  static async getAllPostsOnTopic (topicName) {
    try {
      return await postModel.getAllPostsOnTopic(topicName)
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  }

  static async followTopic (userId, topicName) {
    try {
      return await userModel.followTopic(userId, topicName)
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  }

  static async unfollowTopic (userId, topicName) {
    try {
      return await userModel.unfollowTopic(userId, topicName)
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  }
}

export default TopicContainerViewModel
