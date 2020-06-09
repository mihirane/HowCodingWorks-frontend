import topicModel from './../model/TopicModel'

class CreateTopicViewModel {
  static async createTopic (
    topicName,
    topicDescription,
    topicThumbnailLink
  ) {
    try {
      return await topicModel.createTopic(
        {
          name: topicName,
          description: topicDescription,
          thumbnailLink: topicThumbnailLink
        }
      )
    } catch (error) {
    // eslint-disable-next-line
    console.log(error)
    }
  }
}

export default CreateTopicViewModel
