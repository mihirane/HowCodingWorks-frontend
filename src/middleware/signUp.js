export default async function ({ req, app, redirect }) {
  let currentUser

  if (process.server) {
    currentUser = await req.cookies.currentUser
  }

  if (process.client) {
    currentUser = await app.$cookies.get('currentUser')
  }

  if (currentUser && currentUser != null) {
    redirect('/')
  }
}
