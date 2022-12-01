/*
 * @Author: lw
 * @Date: 2022-11-07 16:53:32
 * @LastEditTime: 2022-11-29 11:30:43
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \wly-management\src\permission.js
 */
/*
 * @Author: lw
 * @Date: 2022-10-28 16:51:35
 * @LastEditTime: 2022-11-06 16:29:46
 * @LastEditors: lw
 * @Description:
 * @FilePath: \vue-element-admin\src\permission.js
 */
import Router  from "./router/index.js"
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title.js";
import { mapActions,  mapState } from 'pinia'
import { usePerMissionStore} from '@/store/permission.js'
import {useLoginStore} from '@/store/login.js'
NProgress.configure({ showSpinner: false }); 
const whiteList = ["/login"]; // no redirect whitelist
let flag = true
Router.beforeEach(async (to, from, next) => {
console.log("🚀 ~ file: permission.js ~ line 29 ~ Router.beforeEach ~ from", from)
console.log("🚀 ~ file: permission.js ~ line 29 ~ Router.beforeEach ~ to", to)
  // start progress bar
  NProgress.start();
  // set page title
  document.title = getPageTitle(to.meta.title);
  const hasToken = getToken();

  // 测试使用 start
  // usePerMissionStore().getMainSilder()
  next();
  return;
  // 测试使用 end

  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {

      if (!flag) {
        next();
        // NProgress.done();
        return true;
      } else {
        try {
          // get user info
          const roles = await useLoginStore()._role;
          const accessRoutes = await usePerMissionStore().generateRoutes(roles);
          await  PerMissionStore().getMainSilder()
          accessRoutes.forEach(elm=>{
            Router.addRoute(elm); 
          })
          usePerMissionStore().add_404() // 添加404
          next({ ...to, replace: true });
          flag=false
          NProgress.done();
        } catch (error) {
          // remove token and go to login page to re-login
          await useLoginStore().resetToken();
          ElMessage.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          flag=false
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

Router.afterEach(() => {
  NProgress.done();
});
