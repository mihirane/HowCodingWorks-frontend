import firebase from '~/plugins/firebase'
import 'firebase/storage'

export default async function (file, fileName) {
  try {
    if (file && file !== null && fileName && fileName !== null && fileName !== '') {
      const storageRef = await firebase.storage().ref('images/')
      const snapshot = await storageRef.child(fileName).put(file)
      const downloadUrl = await snapshot.ref.getDownloadURL()
      return {
        success: 1,
        file: {
          url: downloadUrl
        }
      }
    } else {
      return {
        success: 0,
        file: {
          url: ''
        }
      }
    }
  } catch (error) {
    // eslint-disable-next-line
    console.log(error)
    return {
      success: 0,
      file: {
        url: ''
      }
    }
  }
}
