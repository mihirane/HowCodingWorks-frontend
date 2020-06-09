import topicModel from './../model/TopicModel'
import userModel from './../model/UserModel'
import postModel from './../model/PostModel'

class TopicContainerViewModel {
  static async getTopicFromTopicName (topicName) {
    return await topicModel.getTopicFromTopicName(topicName)
  }

  static async checkIfTopicIsFollowedByUser (userId, topicName) {
    return await userModel.checkIfTopicIsFollowedByUser(userId, topicName)
  }

  static async getAllPostsOnTopic (topicName) {
    return await postModel.getAllPostsOnTopic(topicName)
  }

  static async followTopic (userId, topicName) {
    return await userModel.followTopic(userId, topicName)
  }

  static async unfollowTopic (userId, topicName) {
    return await userModel.unfollowTopic(userId, topicName)
  }
}

export default TopicContainerViewModel
