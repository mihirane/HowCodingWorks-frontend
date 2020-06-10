export default async function ({ app, redirect }) {
  const currentUser = await app.$cookies.get('__session')

  if (currentUser && currentUser != null) {
    redirect('/')
  }
}
