import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/components/layouts.vue";
import Home from '../views/Home.vue'
import { getToken } from '@/utils/auth'
import {
	getSafeMode,
} from '@/utils/app'
import { LoadingBar } from 'view-design';
Vue.use(VueRouter)

var initRoutes = [{
	path: '/',
	name: 'Home',
	meta: {
		requireAuth: true,
		title: 'Magnetar - Search torrents and magnet from Magnetar'
	},
	component: Home
},
{
	path: '/bt',
	component: Layout,
	redirect: '/bt/list',
	children: [
		{
			path: 'search',
			name: "btSearch",
			meta: {
				title: '磁力搜索 - Magnetar Search',
				parentPath: 'bt',
				requireAuth: true,
			},
			component: () => import('@/views/bt/search'),
			beforeEnter: (to, from, next) => {
				if (!to.query.q) {
					router.push('/')
					next()
				}
				next()

			}
		},
		{
			path: 'list',
			name: "btList",
			meta: {
				title: '最新收录 - Magnetar Search',
				parentPath: 'bt',
				requireAuth: true,
			},
			component: () => import('@/views/bt/list'),
			beforeEnter: (to, from, next) => {
				next()
			}
		},
	],
},
{
	path: '/netdisc',
	component: Layout,
	redirect: '/netdisc/search',
	children: [
		{
			path: 'search',
			name: "netdiscSearch",
			meta: {
				title: '网盘搜索 - Magnetar Search',
				parentPath: 'netdisc',
				requireAuth: true,
			},
			component: () => import('@/views/netdisc/search'),
			beforeEnter: (to, from, next) => {
				if (!to.query.q) {
					router.push('/')
					next()
				}
				next()

			}
		},
		// {
		// 	path: 'list',
		// 	name: "btList",
		// 	meta: {
		// 		title: '磁力管理 - Magnetar Search',
		// 		parentPath: 'bt',
		// 		requireAuth: true,
		// 	},
		// 	component: () => import('@/views/bt/list'),
		// 	beforeEnter: (to, from, next) => {
		// 		next()

		// 	}
		// },
	],
},

{
	path: '/user',
	component: Layout,
	redirect: '/user/favorites',
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
	path: '/activateAccount',
	name: 'ActivateAccount',
	meta: {
		requireAuth: false,
		islogin: true,
		title: '激活账号 - Magnetar Search'
	},
	component: resolve => require(['@/views/activateAccount.vue'], resolve)
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

var sensitiveRoutes = [{
	path: '/jav',
	component: Layout,
	redirect: '/jav/list',
	children: [
		{
			path: 'search',
			name: "javSearch",
			meta: {
				title: '番号搜索 - Magnetar Search',
				parentPath: 'jav',
				requireAuth: true,
			},
			component: () => import('@/views/jav/search'),
			beforeEnter: (to, from, next) => {
				next()
			}
		},
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

	],
},
{
	path: '/javActress',
	component: Layout,
	redirect: '/javActress/list',
	children: [
		{
			path: 'search',
			name: "actressSearch",
			meta: {
				title: '女优搜索 - Magnetar Search',
				parentPath: 'javActress',
				requireAuth: true,
			},
			component: () => import('@/views/javActress/search'),
			beforeEnter: (to, from, next) => {
				next()
			}
		},
		{
			path: 'list',
			name: "actressList",
			meta: {
				title: '女优列表 - Magnetar Search',
				parentPath: 'javActress',
				requireAuth: true,
			},
			component: () => import('@/views/javActress/list'),
			beforeEnter: (to, from, next) => {
				next()
			}
		},
		{
			path: 'works',
			name: "actressWorks",
			meta: {
				title: '女优作品 - Magnetar Search',
				parentPath: 'javActress',
				requireAuth: true,
			},
			component: () => import('@/views/javActress/works'),
			beforeEnter: (to, from, next) => {
				if (to.query.id) {
					next()
				} else {
					router.push('/')
					next()
				}
			}
		},
	]
},
// {
// 	path: '/movie',
// 	component: Layout,
// 	redirect: '/movie/list',
// 	children: [
// 		{
// 			path: 'search',
// 			name: "movieSearch",
// 			meta: {
// 				title: '影视搜索 - Magnetar Search',
// 				parentPath: 'movie',
// 				requireAuth: true,
// 			},
// 			component: () => import('@/views/movie/search'),
// 			beforeEnter: (to, from, next) => {
// 				next()
// 			}
// 		},
// 		{
// 			path: 'list',
// 			name: "movieList",
// 			meta: {
// 				title: '影视库 - Magnetar Search',
// 				parentPath: 'movie',
// 				requireAuth: true,
// 			},
// 			component: () => import('@/views/movie/list'),
// 			beforeEnter: (to, from, next) => {
// 				next()
// 			}
// 		},
// 		{
// 			path: 'subject',
// 			name: "javSubject",
// 			meta: {
// 				title: '影视详情 - Magnetar Search',
// 				parentPath: 'movie',
// 				requireAuth: true,
// 			},
// 			component: () => import('@/views/movie/subject'),
// 			beforeEnter: (to, from, next) => {
// 				if (to.query.id) {
// 					next()
// 				} else {
// 					router.push('/')
// 					next()
// 				}
// 			}
// 		},
// 	],
// },
// {
// 	path: '/pornhub',
// 	component: Layout,
// 	redirect: '/pornhub/list',
// 	children: [
// 		{
// 			path: 'list',
// 			name: "pornhubList",
// 			meta: {
// 				title: 'Pornhub - Magnetar Search',
// 				parentPath: 'pornhub',
// 				requireAuth: true,
// 			},
// 			component: () => import('@/views/pornhub/list'),
// 			beforeEnter: (to, from, next) => {
// 				next()
// 			}
// 		},
// 		{
// 			path: 'subject',
// 			name: "pornhubSubject",
// 			meta: {
// 				title: '视频详情 - Magnetar Search',
// 				parentPath: 'pornhub',
// 				requireAuth: true,
// 			},
// 			component: () => import('@/views/pornhub/subject'),
// 			beforeEnter: (to, from, next) => {
// 				if (to.query.id) {
// 					next()
// 				} else {
// 					router.push('/')
// 					next()
// 				}
// 			}
// 		},
// 	],
// },
{
	path: '/image',
	component: Layout,
	redirect: '/image/upload',
	children: [
		{
			path: 'search',
			name: "imageSearch",
			meta: {
				title: '图像搜索 - Magnetar Search',
				parentPath: 'image',
				requireAuth: true,
			},
			component: () => import('@/views/image/search'),
			beforeEnter: (to, from, next) => {
				if (to.query.id) {
					// router.app.$options.store.commit("search/set_imageQuery", {
					// 	id: to.query.id,
					// })
					next()
				} else {
					router.push('/image/upload')
					next()
				}

			}
		},
		{
			path: 'upload',
			name: "imageUpload",
			meta: {
				title: '图像上传 - Magnetar Search',
				parentPath: 'image',
				requireAuth: true,
			},
			component: () => import('@/views/image/upload'),
		},
	],
},];
var routes = initRoutes
if (getSafeMode() === "off") {
	routes.push(...sensitiveRoutes)
}
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
	//更新搜索参数到store-start
	if (to.query.q) {
		router.app.$options.store.commit("search/set_keyword", to.query.q);
	}
	//更新图像搜索参数到store-start
	if (to.query.imageId) {
		router.app.$options.store.commit("search/set_imageId", to.query.imageId);
	}
	//更新搜索参数到store-end
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
