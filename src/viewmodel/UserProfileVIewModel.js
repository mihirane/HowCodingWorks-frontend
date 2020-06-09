import userModel from './../model/UserModel'

class UserProfileViewModel {
  static async getAllSavedPostsByUser (userId) {
    try {
      return await userModel.getAllSavedPostsByUser(userId)
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  }

  static async getAllFollowedTopicsByUser (userId) {
    try {
      return await userModel.getAllFollowedTopicsByUser(userId)
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  }
}

export default UserProfileViewModel
