export default function({ store, route }) {
  if (store.state.core.backButtonClicked) {
    store.commit('core/setData', {
      name: 'backButtonClicked',
      data: false
    })
    if (route.path === '/') {
      store.commit('core/setData', {
        name: 'history',
        data: ['/']
      })
    }
  } else {
    store.commit('core/addData', {
      name: 'history',
      data: route.fullPath
    })
  }
}
