
export default async ({ redirect, route }) => {
  if(!/^\/(mos|lenta|all)\/\d+/.test(route.fullPath) | route.params.page <= 0){
    await redirect('/all/1')
  }
}
