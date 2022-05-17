import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { getToken } from '@/utils/auth'
import {
	getSearchJavlibrary,
	getSearchJavlibraryTotal,
	getSearchDoubanlibrary,
	getSearchDoubanlibraryTotal,
} from '@/utils/app'
import { LoadingBar } from 'view-design';
Vue.use(VueRouter)
const routes = [{
	path: '/',
	name: 'Home',
	meta: {
		requireAuth: false,
		title: 'Magnetar - Search torrents and magnet from Magnetar'
	},
	component: Home
},
{
	path: '/search',
	name: 'Search',
	component: resolve => require(['@/views/search/Index.vue'], resolve),
	children: [
		{
			path: 'bt',
			name: "bt",
			meta: {
				title: 'Bt Search',
			},
			component: resolve => require(['@/views/search/Bt.vue'], resolve),
			beforeEnter: (to, from, next) => {
				if (to.query.q) {
					router.app.$options.store.commit("search/set_keyword", to.query.q);
					console.log(to.query)
					console.log(getSearchJavlibrary())
					router.app.$options.store.commit("search/set_btQuery", {
						m: to.query.m ? to.query.m : "correla",
						t: to.query.t ? to.query.t : "all",
						j: getSearchJavlibrary() == 'on' ? true : false,
						j_R: getSearchJavlibraryTotal() || 3,
						d: getSearchDoubanlibrary() == 'on' ? true : false,
						d_R: getSearchDoubanlibraryTotal() || 3,
						p: Number(to.query.p) ? Number(to.query.p) : 1,
					})
					next()
				} else {
					router.push('/')
					next()
				}

			}
		},

		{
			path: 'jav',
			name: "jav",
			meta: {
				title: '番号库',
				requireAuth: true,
			},
			component: resolve => require(['@/views/search/Jav.vue'], resolve),
			beforeEnter: (to, from, next) => {
				next()
			}
		},
		{
			path: 'javsubject',
			name: "javsubject",
			meta: {
				title: '番号详情',
				requireAuth: true,
			},
			component: resolve => require(['@/views/search/JavSubject.vue'], resolve),
			beforeEnter: (to, from, next) => {
				if (to.query.id) {
					next()
				} else {
					router.push('/')
					next()
				}
			}
		},
		{
			path: 'image',
			name: "image",
			meta: {
				title: 'Image Search',
				requireAuth: true,
			},
			component: resolve => require(['@/views/search/Image.vue'], resolve),
			beforeEnter: (to, from, next) => {
				if (to.query.id) {
					router.app.$options.store.commit("search/set_imageQuery", {
						id: to.query.id,
					})
					next()
				} else {
					router.app.$options.store.commit("search/set_uploadImageModalStatus", true)
					next()
				}

			}
		},
		// {
		// 	path: 'history',
		// 	name: "history",
		// 	meta: {
		// 		title: 'Search history',
		// 		requireAuth: true,
		// 	},
		// 	component: resolve => require(['@/views/search/History.vue'], resolve),
		// 	beforeEnter: (to, from, next) => {
		// 		next()


		// 	}
		// },
	],
},
{
	path: '/user/login',
	name: 'User_login',
	meta: {
		requireAuth: false,
		islogin: true,
		title: 'Login'
	},
	component: resolve => require(['@/views/user/Login.vue'], resolve)
},
{
	path: '/user/register',
	name: 'User_registe',
	meta: {
		requireAuth: false,
		islogin: true,
		title: 'registe'
	},
	component: resolve => require(['@/views/user/Register.vue'], resolve)
},
{
	path: '/user/resetpwd',
	name: 'User_Reset_Password',
	meta: {
		requireAuth: false,
		islogin: true,
		title: 'Reset Your Password'
	},
	component: resolve => require(['@/views/user/ResetPassword.vue'], resolve)
}
]
const router = new VueRouter({// 网页配置路由
	mode: 'history',
	routes
})
// const router = new VueRouter({// 离线路由
// 	mode: 'hash',
// 	routes
// })
router.beforeEach((to, from, next) => {
	LoadingBar.start();
	// if(to.meta.requireAuth == true){
	// 	next({
	// 		path: '/'//已经登录就跳转到首页
	// 	})
	// }
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	let token = getToken();//获取token的值
	if (to.meta.islogin == true && token) {
		next({
			path: '/'//已经登录就跳转到首页
		})
	}
	if (to.meta.requireAuth == true) {             // 需要登录权限进入的路由
		if (!token) {                               // 获取不到登录信息
			next({
				path: '/user/login',
				query: { redirect: to.fullPath } //登录后再跳回此页面时要做的配置
			})
		} else {                                   // 获取到登录信息，进行下一步
			return next();
		}
	} else {                                       // 不需要登录权限的路由直接进行下一步
		return next();
	}

})
router.afterEach(() => {
	LoadingBar.finish();
});



const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
export default router
