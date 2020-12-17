export const state = () => ({
  count: 0,
})

export const mutations = {
  setLikeCount (state, count) {
    state.count = count
  },
  addLikeCount (state) {
    state.count++
  },
}
