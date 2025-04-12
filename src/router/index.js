import { createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: "/login"
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/login/Login.vue')
        },
        {
            path: '/info',
            name: 'info',
            redirect: '/info/basicInfo',
            component: () => import('@/pages/info/Info.vue'),
            children: [
                {
                    path: 'basicInfo',
                    name: 'basicInfo',
                    redirect: '/info/basicInfo/avatar',
                    component: () => import('@/pages/info/BasicInfo.vue'),
                    children: [
                        {
                            path: 'avatar',
                            name: 'avatar',
                            component: () => import('@/pages/info/baseInfo/Avatar.vue')
                        },
                        {
                            path: 'needInfo',
                            name: 'needInfo',
                            component: () => import('@/pages/info/baseInfo/NeedInfo.vue')
                        },
                        {
                            path: 'otherInfo',
                            name: 'otherInfo',
                            component: () => import('@/pages/info/baseInfo/OtherInfo.vue')
                        }
                    ]
                },
                {
                    path: 'security',
                    name: 'security',
                    redirect: '/info/security/phone',
                    component: () => import('@/pages/info/Security.vue'),
                    children: [
                        {
                            path: 'phone',
                            name: 'phone',
                            component: () => import('@/pages/info/security/Phone.vue')
                        },
                        {
                            path: 'password',
                            name: 'password',
                            component: () => import('@/pages/info/security/Password.vue')
                        }
                    ]
                },
            ]
        },
        {
            path: '/home',
            name: 'home',
            redirect: '/home/user',
            component: () => import('@/pages/index/Home.vue'),
            children: [
                {
                    path: 'user',
                    name: 'user',
                    component: () => import('@/pages/user/User.vue')
                },
                {
                    path: 'admin',
                    name: 'admin',
                    component: () => import('@/pages/user/Admin.vue')
                },
                {
                    path: 'article',
                    name: 'article',
                    component: () => import('@/pages/publish/Article.vue')
                },
                {
                    path: 'goods',
                    name: 'goods',
                    component: () => import('@/pages/publish/Goods.vue')
                },
                {
                    path: 'service',
                    name: 'service',
                    component: () => import('@/pages/publish/Express.vue')
                },
                {
                    path: 'lost',
                    name: 'lost',
                    component: () => import('@/pages/publish/Lost.vue')
                }
            ]
        }
    ]
})

export default router;
