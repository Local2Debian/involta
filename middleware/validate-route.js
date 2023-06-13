
export default async ({ redirect, route, next }) => {
  if(!/^\/(\d+|\w+)\/\d+/.test(route.fullPath) | route.params.page <= 0){
    await redirect('/all/1')
  }
}
