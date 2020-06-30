import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Timeline.vue';
import activityModal from '../components/ActivityModal.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/activities',
  },
  {
    path: '/activities',
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
