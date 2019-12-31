import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'


import CategoryCreate from '../views/Categories/Create.vue'
import CategoryList from '../views/Categories/List.vue'

import ItemCreate from '../views/Items/Create.vue'
import ItemList from '../views/Items/List.vue'

import HeroCreate from '../views/Heroes/Create.vue'
import HeroList from '../views/Heroes/List.vue'

import ArticleCreate from '../views/Articles/Create.vue'
import ArticleList from '../views/Articles/List.vue'

import AdCreate from '../views/Ads/Create.vue'
import AdList from '../views/Ads/List.vue'

import AdminUserCreate from '../views/AdminUsers/Create.vue'
import AdminUserList from '../views/AdminUsers/List.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {isPublic: true}
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryCreate },
      { path: '/categories/edit/:id', component: CategoryCreate , props: true},
      { path: '/categories/list', component: CategoryList },

      { path: '/items/create', component: ItemCreate },
      { path: '/items/edit/:id', component: ItemCreate , props: true},
      { path: '/items/list', component: ItemList },

      { path: '/heroes/create', component: HeroCreate },
      { path: '/heroes/edit/:id', component: HeroCreate , props: true},
      { path: '/heroes/list', component: HeroList },

      { path: '/articles/create', component: ArticleCreate },
      { path: '/articles/edit/:id', component: ArticleCreate , props: true},
      { path: '/articles/list', component: ArticleList },

      { path: '/ads/create', component: AdCreate },
      { path: '/ads/edit/:id', component: AdCreate , props: true},
      { path: '/ads/list', component: AdList },

      { path: '/admin_users/create', component: AdminUserCreate },
      { path: '/admin_users/edit/:id', component: AdminUserCreate , props: true},
      { path: '/admin_users/list', component: AdminUserList },

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    next('/login')
  }
  next()
})

export default router
