
export default ({ redirect, route }) => {
  if(!/^\/(mos|lenta|all)\/\d+/.test(route.fullPath) | route.params.page <= 0){
    redirect('/all/1')
  }
}
