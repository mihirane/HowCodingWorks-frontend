export default function ({ store, redirect }) {
  if (store.state.currentUser == null) {
    redirect('/signUp')
  }
}
