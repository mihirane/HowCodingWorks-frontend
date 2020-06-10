export default function ({ app, redirect }) {
  const currentUser = app.$cookies.get('__session')

  if (!currentUser || currentUser == null) {
    redirect('/signUp')
  }
}
