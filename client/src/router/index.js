import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import activityModal from '../components/activityModal.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        meta: {
          showModal: true,
        },
        path: ':id',
        component: activityModal,
        props: true,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
