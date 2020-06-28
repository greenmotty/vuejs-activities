<template>
  <span>
    <span class="activity">
      <div class="activity-type">
          <div class="activity-image">
            <img src="../assets/topics/dna.png" alt="No" width="50" height="50"/>
          </div>
          <div class="activity-description">
            <div class="activity-name">
              {{value.topic_data.name | capitalize}}
            </div>
            <div class="activity-date">
              {{value.d_created | formatDate}}&middot;{{value.d_created | formatTime}}
            </div>
          </div>
        </div>
      <div class="activity-score">
          <span class="score" v-if="settings[value.resource_type].score">Score&nbsp;&nbsp;
            <span class="score-data">{{value.score}}/10</span>
          </span>
      </div>
      <div class="activity-zoom">
        <span class="zoom-data" v-if="settings[value.resource_type].zoom"
              @click="openModal(value)">👁 View work</span>
      </div>
    </span>
  </span>
</template>
<script>
export default {
  name: 'activity',
  props: ['value'],
  methods: {
    openModal(activity) {
      this.$emit('openModal', activity);
    },
  },
  data() {
    return {
      settings: [],
    };
  },
  created() {
    // Get settings from store
    this.settings = this.$store.getters.getSettings;
  },
};
</script>

<style scoped lang="scss">
  @import "../styles/common";
  .activity {
    display: flex;
    flex-direction: row;
    height: $height;
    margin: 16px 10px 16px 2px;
    border-radius: 5px;
    border: 1px solid gray;
    padding: 2px;
    z-index: 2;
    background: white;
    position: relative;

  .activity-type {
    padding: 25px;
    width: calc(100% - #{$scoreWidth} - #{$zoomWidth});
    display: flex;
    align-items: center;

  .activity-image{
    width: 50px;
    height: 50px;
    border: 1px solid black;
  }

  .activity-description{
  @include display-flex(column, flex-start, flex-start);
    margin: 0 10px;
    height: 60px;
    text-align: left;
  .activity-name{
    font-size: 18px;
    font-weight: bold;
  }
  .activity-date{
    font-size: 12px;
  }
  }
  }

  .activity-score {
    width: 120px;
    display: flex;
    align-items: center;
    color: $linkColor;
    font-size: $fontSize;

  .score{
    line-height: $fontSize;
    padding-right: 10px;
  }
  .score-data{
    font-weight: bold;
  }
  }

  .activity-zoom {
    width: 150px;
    display: flex;
    align-items: center;
    color: $linkColor;
    font-size: $fontSize;

  .zoom-data{
    font-weight: bold;
    cursor: pointer;
  }
  }
  }
</style>
