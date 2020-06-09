export default function ({ req, app, redirect }) {
  let currentUser

  if (process.server) {
    currentUser = req.cookies.__session
  }

  if (process.client) {
    currentUser = app.$cookies.get('__session')
  }

  if (!currentUser || currentUser == null) {
    redirect('/signUp')
  }
}
