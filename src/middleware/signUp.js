export default function ({ req, app, redirect }) {
  let currentUser

  if (process.server) {
    currentUser = req.cookies.currentUser
  }

  if (process.client) {
    currentUser = app.$cookies.get('currentUser')
  }

  if (currentUser && currentUser != null) {
    redirect('/')
  }
}
