export default function ({ app, redirect }) {
  if (app.$cookies.get('currentUser') !== null) {
    redirect('/')
  }
}
