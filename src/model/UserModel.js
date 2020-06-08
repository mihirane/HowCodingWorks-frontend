import firebase from 'firebase/app'
import 'firebase/firestore'
const db = firebase.firestore()
const topicModel = require('./TopicModel.js')
const postModel = require('./PostModel.js')
const FieldValue = firebase.firestore.FieldValue

class UserService {
  static async checkIfPostIsLikedByUser (userId, postId) {
    try {
      const userRef = await db.collection('users').doc(userId).get()

      if (userRef.exists) {
        const postRef = await db.collection('posts').doc(postId).get()

        if (postRef.exists) {
          if (postRef.data().likes.includes(userId)) {
            return true
          } else {
            return false
          }
        } else {
          return new Error(`Post does not exist with id : ${postId}`, 'INVALID_POST_ID')
        }
      } else {
        return new Error(`User does not exist with id : ${userId}`, 'INVALID_USER_ID')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'POST_MUTATION_FAILED')
    }
  }

  static async likePost (userId, postId) {
    try {
      const userRef = await db.collection('users').doc(userId).get()

      if (userRef.exists) {
        const checkIfPostExists = await this.checkIfPostExists(postId)

        if (checkIfPostExists) {
          const checkIfPostIsLikedByUser = await this.checkIfPostIsLikedByUser(userId, postId)

          if (!checkIfPostIsLikedByUser) {
            const likeRef = await db.collection('posts').doc(postId).update({
              likes: FieldValue.arrayUnion(userId)
            })

            if (likeRef) {
              return this.getPostFromId(postId)
            } else {
              return new Error('Some error occurred while liking the post', 'POST_MUTATION_FAILED')
            }
          } else {
            return new Error(`User with id : ${userId} has already liked post with id : ${postId}`, 'INVALID_OPERTION')
          }
        } else {
          return new Error(`Post does not exist with id : ${postId}`, 'INVALID_POST_ID')
        }
      } else {
        return new Error(`User does not exist with id : ${userId}`, 'INVALID_USER_ID')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'POST_MUTATION_FAILED')
    }
  }

  static async dislikePost (userId, postId) {
    try {
      const userRef = await db.collection('users').doc(userId).get()

      if (userRef.exists) {
        const checkIfPostExists = await this.checkIfPostExists(postId)

        if (checkIfPostExists) {
          const checkIfPostIsLikedByUser = await this.checkIfPostIsLikedByUser(userId, postId)

          if (checkIfPostIsLikedByUser) {
            const dislikeRef = await db.collection('posts').doc(postId).update({
              likes: FieldValue.arrayRemove(userId)
            })

            if (dislikeRef) {
              return this.getPostFromId(postId)
            } else {
              return new Error('Some error occurred while liking the post', 'POST_MUTATION_FAILED')
            }
          } else {
            return new Error(`User with id : ${userId} has already liked post with id : ${postId}`, 'INVALID_OPERTION')
          }
        } else {
          return new Error(`Post does not exist with id : ${postId}`, 'INVALID_POST_ID')
        }
      } else {
        return new Error(`User does not exist with id : ${userId}`, 'INVALID_USER_ID')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'POST_MUTATION_FAILED')
    }
  }

  static async checkIfPostIsSavedbyUser (userId, postId) {
    try {
      const doc = await db.collection('users').doc(userId).get()

      if (doc.exists) {
        if (await doc.data().savedPosts.includes(postId)) {
          return true
        } else {
          return false
        }
      } else {
        const checkIfUserExists = await this.checkIfUserExists(userId)

        if (checkIfUserExists) {
          const checkIfPostExists = await postModel.checkIfPostExists(postId)

          if (!checkIfPostExists) {
            return new Error(`Post does not exist with id : ${postId}`, 'INVALID_POST_ID')
          }
        } else {
          return new Error(`User does not exist with id : ${userId}`, 'INVALID_USER_ID')
        }

        return false
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred')
    }
  }

  static async savePost (userId, postId) {
    try {
      const checkIfUserExists = await this.checkIfUserExists(userId)

      if (checkIfUserExists) {
        const checkIfPostExists = await postModel.getPostFromId(postId)

        if (checkIfPostExists) {
          const checkIfPostIsSavedbyUser = await this.checkIfPostIsSavedbyUser(userId, postId)

          if (!checkIfPostIsSavedbyUser) {
            const doc = await db.collection('users').doc(userId).update({
              savedPosts: FieldValue.arrayUnion(postId)
            })

            if (doc && doc !== null) {
              return await postModel.getPostFromId(postId)
            } else {
              return new Error('Some error occurred while saving post', 'USER_MUTATION_FAILED')
            }
          } else {
            return new Error(`Post with id : ${postId} is already saved by user with id : ${userId}`, 'INVALID_OPERATION')
          }
        } else {
          return new Error(`Post does not exist with id : ${postId}`, 'INVALID_POST_ID')
        }
      } else {
        return new Error(`User does not exist with id : ${userId}`, 'INVALID_USER_ID')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'USER_MUTATION_FAILED')
    }
  }

  static async unsavePost (userId, postId) {
    try {
      const checkIfUserExists = await this.checkIfUserExists(userId)

      if (checkIfUserExists) {
        const checkIfPostExists = await postModel.getPostFromId(postId)

        if (checkIfPostExists) {
          const checkIfPostIsSavedbyUser = await this.checkIfPostIsSavedbyUser(userId, postId)

          if (checkIfPostIsSavedbyUser) {
            const doc = await db.collection('users').doc(userId).update({
              savedPosts: FieldValue.arrayRemove(postId)
            })

            if (doc && doc !== null) {
              return await postModel.getPostFromId(postId)
            } else {
              return new Error('Some error occurred while saving post', 'USER_MUTATION_FAILED')
            }
          } else {
            return new Error(`Post with id : ${postId} is not saved by user with id : ${userId}`, 'INVALID_OPERATION')
          }
        } else {
          return new Error(`Post does not exist with id : ${postId}`, 'INVALID_POST_ID')
        }
      } else {
        return new Error(`User does not exist with id : ${userId}`, 'INVALID_USER_ID')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'USER_MUTATION_FAILED')
    }
  }

  static async checkIfTopicIsFollowedByUser (userId, topicName) {
    try {
      const userRef = await db.collection('users').doc(userId).get()

      if (userRef.exists) {
        if (await userRef.data().followedTopics.includes(topicName)) {
          return true
        } else {
          return false
        }
      } else {
        const checkIfUserExists = await this.checkIfUserExists(userId)

        if (checkIfUserExists) {
          const checkIfTopicExists = await topicModel.checkIfTopicExists(topicName)

          if (!checkIfTopicExists) {
            return new Error(`Topic does not exist with name : ${topicName}`, 'INVALID_TOPIC_NAME')
          }
        } else {
          return new Error(`User does not exist with id : ${userId}`, 'INVALID_USER_ID')
        }

        return false
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'QUERY_FAILED')
    }
  }

  static async followTopic (userId, topicName) {
    try {
      const checkIfUserExists = await this.checkIfUserExists(userId)

      if (checkIfUserExists) {
        const checkIfTopicExists = await topicModel.getTopicFromTopicName(topicName)

        if (checkIfTopicExists) {
          const checkIfTopicIsFollowedByUser = await this.checkIfTopicIsFollowedByUser(userId, topicName)

          if (!checkIfTopicIsFollowedByUser) {
            const topicNameRef = await db.collection('users').doc(userId).update({
              followedTopics: FieldValue.arrayUnion(topicName)
            })

            if (topicNameRef) {
              return await topicModel.getTopicFromTopicName(topicName)
            } else {
              return new Error('Some error occurred while following topic', 'USER_MUTATION_FAILED')
            }
          } else {
            return new Error(`User with id : ${userId} is already following topic with name : ${topicName}`, 'INVALID_OPERATION')
          }
        } else {
          return new Error(`Topic does not exist with name : ${topicName}`, 'INVALID_TOPIC_NAME')
        }
      } else {
        return new Error(`User does not exist with id : ${userId}`, 'INVALID_USER_ID')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'USER_MUTATION_FAILED')
    }
  }

  static async unfollowTopic (userId, topicName) {
    try {
      const checkIfUserExists = await this.checkIfUserExists(userId)

      if (checkIfUserExists) {
        const checkIfTopicExists = await topicModel.getTopicFromTopicName(topicName)

        if (checkIfTopicExists) {
          const checkIfTopicIsFollowedByUser = await this.checkIfTopicIsFollowedByUser(userId, topicName)

          if (checkIfTopicIsFollowedByUser) {
            const topicNameRef = await db.collection('users').doc(userId).update({
              followedTopics: FieldValue.arrayRemove(topicName)
            })

            if (topicNameRef) {
              return await topicModel.getTopicFromTopicName(topicName)
            } else {
              return new Error('Some error occurred while unfollowing topic', 'USER_MUTATION_FAILED')
            }
          } else {
            return new Error(`User with id : ${userId} is not following topic with name : ${topicName}`, 'INVALID_OPERATION')
          }
        } else {
          return new Error(`Topic does not exist with name : ${topicName}`, 'INVALID_TOPIC_NAME')
        }
      } else {
        return new Error(`User does not exist with id : ${userId}`, 'INVALID_USER_ID')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'USER_MUTATION_FAILED')
    }
  }

  static async getAllSavedPostsByUser (userId) {
    try {
      const userRef = await db.collection('users').doc(userId).get()
      const allPosts = []

      if (userRef.exists) {
        await Promise.all(userRef.data().savedPosts.map(async (postId) => {
          if (postId !== null) {
            const post = await postModel.getPostFromId(postId)
            allPosts.push(post)
          } else {
            return new Error('Some error occurred by fetching saved posts by user', 'QUERY_FAILED')
          }

          return undefined
        })).catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          return new Error('An unknown error occurred', 'QUERY_FAILED')
        })
      } else {
        return new Error(`User does not exist with id : ${userId}`, 'INVALID_USER_ID')
      }

      return allPosts
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'QUERY_FAILED')
    }
  }

  static async getAllFollowedTopicsByUser (userId) {
    try {
      const userRef = await db.collection('users').doc(userId).get()
      const allTopics = []

      if (userRef.exists) {
        await Promise.all(userRef.data().followedTopics.map(async (topicName) => {
          if (topicName) {
            const topic = await topicModel.getTopicFromTopicName(topicName)
            allTopics.push(topic)
          } else {
            return new Error('Some error occurred by fetching followed topics of user', 'QUERY_FAILED')
          }

          return undefined
        })).catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          return new Error('An unknown error occurred', 'QUERY_FAILED')
        })

        return allTopics
      } else {
        return new Error(`User does not exist with id : ${userId}`, 'INVALID_USER_ID')
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return new Error('An unknown error occurred', 'QUERY_FAILED')
    }
  }
}

module.exports = UserService
