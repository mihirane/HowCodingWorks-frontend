import userModel from './../model/UserModel'
import postModel from './../model/PostModel'
import topicModel from './../model/TopicModel'

class BlogPostViewModel {
  static async getPostFromId (postId) {
    return await postModel.getPostFromId(postId)
  }

  static async getTopicFromTopicName (topicName) {
    return await topicModel.getTopicFromTopicName(topicName)
  }

  static async checkIfTopicIsFollowedByUser (userId, topicName) {
    return await userModel.checkIfTopicIsFollowedByUser(userId, topicName)
  }

  static async checkIfPostIsLikedByUser (userId, postId) {
    return await userModel.checkIfPostIsLikedByUser(userId, postId)
  }

  static async checkIfPostIsSavedByUser (userId, postId) {
    return await userModel.checkIfPostIsSavedbyUser(userId, postId)
  }

  static async likePost (userId, postId) {
    return await userModel.likePost(userId, postId)
  }

  static async dislikePost (userId, postId) {
    return await userModel.dislikePost(userId, postId)
  }

  static async savePost (userId, postId) {
    return await userModel.savePost(userId, postId)
  }

  static async unsavePost (userId, postId) {
    return await userModel.unsavePost(userId, postId)
  }
}

export default BlogPostViewModel
