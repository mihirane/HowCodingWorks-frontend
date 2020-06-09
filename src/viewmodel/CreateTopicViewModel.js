import topicModel from './../model/TopicModel'

class CreateTopicViewModel {
  static async createTopic (
    topicName,
    topicDescription,
    topicThumbnailLink
  ) {
    return await topicModel.createTopic(
      {
        name: topicName,
        description: topicDescription,
        thumbnailLink: topicThumbnailLink
      }
    )
  }
}

export default CreateTopicViewModel
