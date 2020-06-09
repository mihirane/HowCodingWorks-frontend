import topicModel from './../model/TopicModel'
import postModel from './../model/PostModel'

class PostEditorViewModel {
  static async getAllTopics () {
    return await topicModel.getAllTopics()
  }

  static async createPost (
    postTopicName,
    postTitle,
    postCaption,
    postDescription
  ) {
    return await postModel.createPost(
      {
        topicName: postTopicName,
        title: postTitle,
        caption: postCaption,
        description: postDescription
      }
    )
  }
}

export default PostEditorViewModel
