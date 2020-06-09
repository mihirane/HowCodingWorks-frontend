import userModel from './../model/UserModel'
import postModel from './../model/PostModel'
import topicModel from './../model/TopicModel'

class BlogPostViewModel {
  static async getPostFromId (postId) {
    try {
      return await postModel.getPostFromId(postId)
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  }

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

  static async checkIfPostIsLikedByUser (userId, postId) {
    try {
      return await userModel.checkIfPostIsLikedByUser(userId, postId)
    } catch (error) {
    // eslint-disable-next-line
    console.log(error)
    }
  }

  static async checkIfPostIsSavedByUser (userId, postId) {
    try {
      return await userModel.checkIfPostIsSavedbyUser(userId, postId)
    } catch (error) {
    // eslint-disable-next-line
    console.log(error)
    }
  }

  static async likePost (userId, postId) {
    try {
      return await userModel.likePost(userId, postId)
    } catch (error) {
    // eslint-disable-next-line
    console.log(error)
    }
  }

  static async dislikePost (userId, postId) {
    try {
      return await userModel.dislikePost(userId, postId)
    } catch (error) {
    // eslint-disable-next-line
    console.log(error)
    }
  }

  static async savePost (userId, postId) {
    try {
      return await userModel.savePost(userId, postId)
    } catch (error) {
    // eslint-disable-next-line
    console.log(error)
    }
  }

  static async unsavePost (userId, postId) {
    try {
      return await userModel.unsavePost(userId, postId)
    } catch (error) {
    // eslint-disable-next-line
    console.log(error)
    }
  }
}

export default BlogPostViewModel
