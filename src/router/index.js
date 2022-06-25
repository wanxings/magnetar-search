import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/components/layouts.vue";
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
	component: Layout,
	children: [
		{
			path: '',
			name: "searchIndex",
			meta: {
				title: '磁力搜索 - Magnetar Search',
				parentPath: 'search',
				requireAuth: false,
			},
			component: () => import('@/views/search/index'),
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
	],
},
{
	path: '/jav',
	component: Layout,
	redirect: '/jav/list',
	children: [
		{
			path: 'list',
			name: "javList",
			meta: {
				title: '番号库 - Magnetar Search',
				parentPath: 'jav',
				requireAuth: true,
			},
			component: () => import('@/views/jav/list'),
			beforeEnter: (to, from, next) => {
				next()
			}
		},
		{
			path: 'subject',
			name: "javSubject",
			meta: {
				title: '作品详情 - Magnetar Search',
				parentPath: 'jav',
				requireAuth: true,
			},
			component: () => import('@/views/jav/subject'),
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
			path: 'favorites',
			name: "javFavorites",
			meta: {
				title: '番号收藏夹 - Magnetar Search',
				parentPath: 'jav',
				requireAuth: true,
			},
			component: () => import('@/views/jav/favorites'),
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
			path: 'actress',
			name: "javActress",
			meta: {
				title: '女优作品 - Magnetar Search',
				parentPath: 'jav',
				requireAuth: true,
			},
			component: () => import('@/views/jav/actress'),
			beforeEnter: (to, from, next) => {
				if (to.query.id) {
					next()
				} else {
					router.push('/')
					next()
				}
			}
		},
	],
},
{
	path: '/image',
	component: Layout,
	children: [
		{
			path: 'search',
			name: "imageIndex",
			meta: {
				title: '图像搜索 - Magnetar Search',
				parentPath: 'image',
				requireAuth: true,
			},
			component: () => import('@/views/image/index'),
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
	],
},
{
	path: '/user',
	component: Layout,
	redirect: '/user/search',
	children: [
		{
			path: 'search',
			name: "Search",
			meta: {
				title: '搜索历史 - Magnetar Search',
				parentPath: 'user',
				requireAuth: true,
			},
			component: () => import('@/views/user/search'),
			beforeEnter: (to, from, next) => {
				next()
			}
		},
		{
			path: 'favorites',
			name: "Favorites",
			meta: {
				title: '我的收藏 - Magnetar Search',
				parentPath: 'user',
				requireAuth: true,
			},
			component: () => import('@/views/user/favorites'),
			beforeEnter: (to, from, next) => {
				next()
			}
		},
		{
			path: 'material',
			name: "Material",
			meta: {
				title: '个人资料 - Magnetar Search',
				parentPath: 'user',
				requireAuth: true,
			},
			component: () => import('@/views/user/search'),
			beforeEnter: (to, from, next) => {
				next()
			}
		},
	],
},
{
	path: '/login',
	name: 'Login',
	meta: {
		requireAuth: false,
		islogin: true,
		title: '登录 - Magnetar Search'
	},
	component: resolve => require(['@/views/login.vue'], resolve)
},
{
	path: '/register',
	name: 'Registe',
	meta: {
		requireAuth: false,
		islogin: true,
		title: '注册 - Magnetar Search'
	},
	component: resolve => require(['@/views/register.vue'], resolve)
},
{
	path: '/resetpwd',
	name: 'ResetPassword',
	meta: {
		requireAuth: false,
		islogin: true,
		title: '重置密码 - Magnetar Search'
	},
	component: resolve => require(['@/views/resetPassword.vue'], resolve)
},
{
	path: '/404',
	name: '404',
	component: () => import('@/views/404'),
	meta: {
		requireAuth: false,
		title: '找不到页面 - Magnetar Search'
	},
},
{
	path: '*',
	redirect: '/404',
	meta: {
		requireAuth: false,
	},
},
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
	if (to.meta.requireAuth === false) {             // 不需要登录权限直接下一步
		return next();
	} else {                                       // 需要登录权限的路由
		if (!token) {                               // 获取不到登录信息
			next({
				path: '/login',
				query: { redirect: to.fullPath } //登录后再跳回此页面时要做的配置
			})
		} else {                                   // 获取到登录信息，进行下一步
			return next();
		}
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
