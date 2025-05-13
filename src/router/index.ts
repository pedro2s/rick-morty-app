import { createRouter, createWebHistory } from 'vue-router'
import CharacterList from '../views/CharacterList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CharacterList,
      meta: {
        title: 'Rick and Morty - Characters',
      },
    },
    {
      path: '/character/:id',
      name: 'character-detail',
      component: () => import('../views/CharacterDetail.vue'),
      props: true,
      meta: {
        title: 'Rick and Morty - Character Detail',
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || 'Rick and Morty App'
  next()
})

export default router
