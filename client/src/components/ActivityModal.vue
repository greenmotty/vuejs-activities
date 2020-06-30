<template>
  <b-modal v-model="showModal" hide-footer hide-header>
    <template v-slot:default="{ hide }">
      <div class="modal-wrapper">
        <div class="custom-header">
          <button @click="closeModal()" class="close-btn">
            <img src="../assets/x.svg" class="close-img"/>
          </button>
        </div>
        <div class="custom-body-center">
          <div class="icon">
            <img :src="getImage(activity)" alt="No" width="80" height="80"/>
          </div>
          <div class="name">
            <span>{{activity.topic_data.name | capitalize}}</span>
          </div>
          <div class="time">
                <span>{{activity.d_created | formatDate}}&middot;
                      {{activity.d_created | formatTime}}
                </span>
          </div>
        </div>
        <div class="custom-body-left">
          <div class="comment">
            <span>{{activity.comment}}</span>
          </div>
          <div class="score" v-if="settings[activity.resource_type].score">
            <span>Score {{activity.score}}/10</span>
          </div>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<script>
import axios from 'axios';
import lodash from 'lodash';
import shared from '../shared/shared';

export default {
  name: 'activityModal',
  props: ['id'],
  methods: {
    closeModal() {
      this.showModal = false;
      const path = '/home/';
      if (this.$route.path !== path) {
        this.$router.push({ path });
      }
    },
    getImage(activity) {
      return shared.getImage(activity);
    },
  },
  data() {
    return {
      settings: [],
      activity: null,
      showModal: false,
    };
  },
  created() {
    axios
      .get('http://localhost:3000/activities/v1')
      .then((response) => {
        const activities = lodash.get(response, 'data', []);
        this.activity = lodash.find(activities, activity => this.id === activity.id);
        this.showModal = true;
      });

    // Get settings from store
    this.settings = this.$store.getters.getSettings;
  },
};
</script>

<style scoped lang="scss">
  @import "../styles/common";
  .modal-wrapper {
    padding: 10px;

  .custom-header {
    position: relative;
    min-height: 50px;

  .close-btn {
    border: none;
    background: none;
    position: absolute;
    right: 0px;

  .close-img {
    width: 30px;
    height: 30px;
  }
  }
  }

  .custom-body-center {
    $height: 40px;
  @include display-flex(column, center, center);

  .name {
    font-size: 20px;
    font-weight: bold;
    height: $height;
  }

  .time {
    height: $height;
  }
  }

  .custom-body-left {
  @include display-flex(column, space-between, flex-start);
    height: 150px;

  .comment {
    text-align: left;
    font-size: 26px;
  }

  .score {
    color: $linkColor;
    font-size: 20px;
    font-weight: bold;
  }
  }
  }
</style>
