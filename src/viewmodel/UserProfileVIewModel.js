import userModel from './../model/UserModel'

class UserProfileViewModel {
  static async getAllSavedPostsByUser (userId) {
    return await userModel.getAllSavedPostsByUser(userId)
  }

  static async getAllFollowedTopicsByUser (userId) {
    return await userModel.getAllFollowedTopicsByUser(userId)
  }
}

export default UserProfileViewModel
