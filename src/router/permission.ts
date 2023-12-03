import router from "@/router"
import { usePermissionStoreHook } from "@/store/modules/permission"
import { setRouteChange } from "@/hooks/useRouteListener"
import { useTitle } from "@/hooks/useTitle"
import { fixBlankPage } from "@/utils/fix-blank-page"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

const { setTitle } = useTitle()
NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _from, next) => {
  fixBlankPage()
  NProgress.start()
  const permissionStore = usePermissionStoreHook()
  permissionStore.setRoutes(['admin'])
  next()
})

router.afterEach((to) => {
  setRouteChange(to)
  setTitle(to.meta.title)
  NProgress.done()
})
