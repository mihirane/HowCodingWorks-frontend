import firebase from 'firebase/app'
import 'firebase/firestore'
const db = firebase.firestore()
const FieldValue = firebase.firestore.FieldValue

class TopicService {
  static async getAllTopics () {
    try {
      const arrayOfTopics = await db.collection('topics').get()

      if (!arrayOfTopics.empty) {
        await arrayOfTopics.docs.forEach(async (doc, index) => {
          arrayOfTopics.docs[index] = await {
            name: doc.id,
            description: doc.data().description,
            thumbnailLink: doc.data().thumbnailLink,
            creationTime: doc.data().creationTime._seconds * 1000
          }
        })

        return arrayOfTopics.docs
      } else {
        return []
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred')
    }
  }

  static async getTopicFromTopicName (topicName) {
    try {
      const doc = await db.collection('topics').doc(topicName).get()

      if (doc.exists) {
        return {
          name: doc.id,
          description: doc.data().description,
          thumbnailLink: doc.data().thumbnailLink,
          creationTime: doc.data().creationTime._seconds * 1000
        }
      } else {
        return new Error(`Topic does not exist with name : ${topicName}`, 'INVALID_TOPIC_NAME')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'QUERY_FAILED')
    }
  }

  static async checkIfTopicExists (topicName) {
    try {
      const doc = await db.collection('topics').doc(topicName).get()

      if (doc.exists) {
        return true
      } else {
        return false
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'QUERY_FAILED')
    }
  }

  static async createTopic (topicInput) {
    try {
      const topicRef = await db.collection('topics').doc(topicInput.name).set({
        description: topicInput.description,
        thumbnailLink: topicInput.thumbnailLink,
        creationTime: FieldValue.serverTimestamp()
      })
      if (topicRef) {
        return {
          name: topicInput.name,
          description: topicInput.description,
          thumbnailLink: topicInput.thumbnailLink,
          creationTime: FieldValue.serverTimestamp()._seconds * 1000
        }
      } else {
        return Error('Some error occurred while creating post', 'TOPIC_MUTATION_FAILED')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'TOPIC_MUTATION_FAILED')
    }
  }

  static async getTopicOfPost (postId) {
    try {
      const postDoc = await db.collection('posts').doc(postId).get()

      if (postDoc.exists) {
        const topic = await this.getTopicFromTopicName(postDoc.data().topicName)
        return topic
      } else {
        return new Error(`Post does not exist with id : ${postId}`, 'INVALID_POST_ID')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'QUERY_FAILED')
    }
  }

  static async getFollowersCountOnTopic (topicName) {
    try {
      const usersRef = await db.collection('users').where('followedTopics', 'array-contains', topicName).get()
      const followersCount = await usersRef.docs.length

      return followersCount
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'QUERY_FAILED')
    }
  }
}

module.exports = TopicService
