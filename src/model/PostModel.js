const firebase = require('firebase/app')
const db = firebase.firestore()
const topicModel = require('./TopicModel')
const FieldValue = firebase.firestore.FieldValue

class PostService {
  static async getAllPosts () {
    try {
      const allPosts = await db.collection('posts').orderBy('creationTime', 'desc').get()

      if (!allPosts.empty) {
        await allPosts.docs.forEach(async (doc, index) => {
          allPosts.docs[index] = await {
            id: doc.id,
            title: doc.data().title,
            caption: doc.data().caption,
            description: doc.data().description,
            creationTime: doc.data().creationTime._seconds * 1000
          }
        })

        return allPosts.docs
      } else {
        return []
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'QUERY_FAILED')
    }
  }

  static async getAllPostsOnTopic (topicName) {
    try {
      const postsRef = await db.collection('posts')
        .where('topicName', '==', topicName)
        .orderBy('creationTime', 'desc')
        .get()

      const posts = []

      if (!postsRef.empty) {
        await Promise.all(postsRef.docs.map(async (doc) => {
          if (doc.exists) {
            const post = await {
              id: doc.id,
              title: doc.data().title,
              caption: doc.data().caption,
              description: doc.data().description,
              creationTime: doc.data().creationTime._seconds * 1000
            }

            posts.push(post)
          } else {
            return new Error(`Some error occurred while fetching posts of topic with name : ${topicName}`, 'QUERY_FAILED')
          }

          return undefined
        })).catch((error) => {
          // eslint-disable-next-line
          console.log(error)
        })

        return posts
      } else {
        const checkIfTopicExists = await topicModel.checkIfTopicExists(topicName)

        if (!checkIfTopicExists) {
          return new Error(`Topic does not exist with name : ${topicName}`, 'INVALID_TOPIC_NAME')
        }

        return []
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'QUERY_FAILED')
    }
  }

  static async checkIfPostExists (postId) {
    try {
      const postRef = await db.collection('posts').doc(postId).get()

      if (postRef.exists) {
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

  static async getPostFromId (postId) {
    try {
      const doc = await db.collection('posts').doc(postId).get()

      if (doc.exists) {
        return {
          id: doc.id,
          title: doc.data().title,
          caption: doc.data().caption,
          description: doc.data().description,
          creationTime: doc.data().creationTime._seconds * 1000
        }
      } else {
        return new Error(`Post does not exist with id : ${postId}`, 'INVALID_POST_ID')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'QUERY_FAILED')
    }
  }

  static async createPost (postInput) {
    try {
      const postRef = await db.collection('posts').add({
        title: postInput.title,
        caption: postInput.caption,
        description: postInput.description,
        topicName: postInput.topicName,
        creationTime: FieldValue.serverTimestamp(),
        likes: []
      })
      if (postRef.id) {
        return {
          id: postRef.id,
          title: postInput.title,
          caption: postInput.caption,
          description: postInput.description,
          creationTime: FieldValue.serverTimestamp()._seconds * 1000
        }
      } else {
        return new Error('Some error occurred while creating post', 'POST_MUTATION_FAILED')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'POST_MUTATION_FAILED')
    }
  }

  static async editPost (postId, postInput) {
    try {
      const doc = await db.collection('posts').doc(postId).update({
        title: postInput.title,
        caption: postInput.caption,
        description: postInput.description,
        topicName: postInput.topicName
      })
      if (doc) {
        return {
          id: postId,
          title: postInput.title,
          caption: postInput.caption,
          description: postInput.description
        }
      } else {
        const checkIfPostExists = await this.checkIfPostExists(postId)

        if (checkIfPostExists) {
          return new Error(`Post does not exist with id : ${postId}`, 'INVALID_POST_ID')
        }

        return new Error('Some error occurred while editing post', 'POST_MUTATION_FAILED')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'POST_MUTATION_FAILED')
    }
  }

  static async deletePost (postId) {
    try {
      const value = await db.collection('posts').doc(postId).delete()

      if (value) {
        return true
      } else {
        const checkIfPostExists = await this.checkIfPostExists(postId)

        if (checkIfPostExists) {
          return new Error(`Post does not exist with id : ${postId}`, 'INVALID_POST_ID')
        }

        return new Error('Some error occurred while deleting post', 'POST_MUTATION_FAILED')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'POST_MUTATION_FAILED')
    }
  }

  static async getLikesCountOnPost (postId) {
    try {
      const postRef = await db.collection('posts').doc(postId).get()

      if (postRef.exists) {
        const likesCount = await postRef.data().likes.length
        return likesCount
      } else {
        return new Error(`Post does not exist with id : ${postId}`, 'INVALID_POST_ID')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'QUERY_FAILED')
    }
  }

  static async getSavedCountOnPost (postId) {
    try {
      const usersRef = await db.collection('users').where('savedPosts', 'array-contains', postId).get()

      return usersRef.docs.length
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'QUERY_FAILED')
    }
  }
}

module.exports = PostService
