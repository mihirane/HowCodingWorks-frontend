import firebase from 'firebase/app'
import 'firebase/storage'

export default async function uploadImageToFirebaseStorage (file, fileName) {
  try {
    const storageRef = firebase.storage().ref('images/')
    const snapshot = await storageRef.child(fileName).put(file)
    const downloadUrl = await snapshot.ref.getDownloadURL()
    return {
      success: 1,
      file: {
        url: downloadUrl
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
