export const state = () => ({
  currentUser: null
})

export const mutations = {
  setCurrentUser (state, currentUser) {
    state.currentUser = currentUser
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { app }) {
    const currentUser = await app.$cookies.get('currentUser')

    if (currentUser && currentUser != null) {
      const { uid, displayName, email, photoURL } = await currentUser
      commit('setCurrentUser', { uid, displayName, email, photoURL })
    }
  }
}
