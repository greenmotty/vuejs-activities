<template>
  <span>
    <div class="main-wrapper">
      <span class="title">Timeline</span>
      <vue-autosuggest
        :suggestions="[{data: options}]"
        :input-props="this.inputProps"
        :on-selected="search"
        @selected="search"
        @click="search"
      >
        <template slot-scope="{suggestion}">
          <span class="my-suggestion-item">{{suggestion.item}}</span>
        </template>
      </vue-autosuggest>
      <span class="filter-input-icon" @click="search">
        <img src="../assets/search.svg" width="16" height="16" border="0"/>
      </span>
      <span class="sub-title">Filter by:</span>
      <div class="filter-by-wrapper">
        <div class="single-filter"
             @click="setFilter(key)"
             v-for="(val, key) in filters" :key="key">
          <img v-if="key === currentFilter" class="selected" src="../assets/v.svg"/>
          <span>{{val | startCase}}</span>
        </div>
      </div>
      <div class="activity-wrapper" v-for="(activities, month) in cloneActivity" :key="month">
        <span class="month">{{month}}</span>
        <span class="vertical-line"></span>
        <div v-for="activity in activities" :key="activity.id">
          <activity :value="activity"
                    @openModal="openModal($event)"></activity>
        </div>
      </div>
      <span class="load-more" title="Load more activities" @click="loadMore()">
        <img src="../assets/arrow-down.svg" width="24" height="24" class="close-img"/>
        &nbsp;Load more
      </span>
    </div>
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
              <img src="../assets/topics/adalovelace.png" width="80" height="80"/>
            </div>
            <div class="name">
              <span>{{currentActivity.topic_data.name | capitalize}}</span>
            </div>
            <div class="time">
                <span>{{currentActivity.d_created | formatDate}}&middot;
              {{currentActivity.d_created | formatTime}}</span>
            </div>
          </div>
          <div class="custom-body-left">
            <div class="comment">
              <span>{{currentActivity.comment}}</span>
            </div>
            <div class="score" v-if="settings[currentActivity.resource_type].score">
              <span>Score {{currentActivity.score}}/10</span>
            </div>
          </div>
        </div>
      </template>
    </b-modal>
  </span>
</template>
<script>
import lodash from 'lodash';
import axios from 'axios';
import Activity from './Activity.vue';

export default {
  name: 'Activities',
  components: { Activity },
  data() {
    return {
      options: [],
      inputProps: {
        id: 'autosuggest__input',
        onInputChange: this.onInputChange,
        placeholder: 'Search Timeline',
      },
      allData: [],
      cloneActivity: [],
      settings: [],
      showModal: false,
      currentActivity: null,
      currentFilter: 'All',
      filters: {},
      inputFilter: null,
      page: 0,
      size: 10,
    };
  },
  created() {
    axios
      .get('http://localhost:3000/activities/v1')
      .then((response) => {
        const array = lodash.get(response, 'data', []);
        this.allData = array;
        this.buildActivities(this.allData);
      });

    // Get settings from store
    this.settings = this.$store.getters.getSettings;
  },
  methods: {
    openModal(event) {
      this.currentActivity = event;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    loadMore() {
      this.page += 1;
      this.buildActivities(this.allData);
    },
    buildActivities(array) {
      let result = this.getCurrentPage(array);
      result = this.orderBy(result);
      this.filters = this.filterBy(result);
      this.options = this.buildOptions(result);
      this.activities = this.groupBy(result);
      this.cloneActivity = Object.assign({}, this.activities);
    },
    getPagination() {
      const start = 0;
      const end = this.page * this.size + this.size;
      return { start, end };
    },
    getCurrentPage(activities) {
      let array = [];
      if (activities) {
        const { start, end } = this.getPagination();
        array = lodash.slice(activities, start, end);
      }
      return array;
    },
    search(option) {
      const item = lodash.get(option, 'item', null);
      let result = {};
      if (item) {
        lodash.forEach(this.activities, (val, key) => {
          result[key] = lodash.filter(val, (activity) => {
            const name = lodash.get(activity, 'topic_data.name', '');
            return name.toLowerCase().indexOf(item.toLowerCase()) > -1;
          });
        });
      } else {
        result = Object.assign({}, this.activities);
      }
      this.cloneActivity = result;
    },
    orderBy(array) {
      return array.sort((a, b) => b.d_created.valueOf() - a.d_created.valueOf());
    },
    groupBy(array) {
      const ordered = {};
      lodash.forEach(array, (item) => {
        const date = new Date(item.d_created * 1000);
        const month = date.toLocaleString('default', { month: 'long' });
        if (!ordered[month]) {
          ordered[month] = [item];
        } else {
          ordered[month].push(item);
        }
      });
      return ordered;
    },
    setFilter(filter) {
      this.currentFilter = filter;
      let result = {};
      if (filter === 'All') {
        result = Object.assign({}, this.activities);
      } else {
        lodash.forEach(this.activities, (val, key) => {
          result[key] = lodash.filter(val, activity => activity.resource_type === filter);
        });
      }
      this.cloneActivity = result;
    },
    filterBy(array) {
      // Default filter
      const filters = {
        All: 'All work',
      };
      lodash.forEach(array, (activity) => {
        filters[activity.resource_type] = activity.resource_type;
      });
      return filters;
    },
    buildOptions(array) {
      // Default filter
      const result = lodash.map(array, activity => lodash.startCase(activity.topic_data.name));
      return lodash.uniq(result);
    },
  },
};
</script>
<style scoped lang="scss">
  @import "../styles/common";
  .main-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;

    .filter-by-wrapper{
      @include display-flex(row, flex-start, flex-start);
      .single-filter{
        margin: 5px 5px 10px 0;
        padding: 5px 10px;
        color: $filterColor;
        width: auto;
        height: 40px;
        font-weight: bold;
        border-radius: 5px;
        border: 1px solid $filterColor;

        &:hover{
          cursor: pointer;
          color: white;
          background: $filterColor;
        }

        .selected{
          margin: 2px;
          width: 20px;
          height: 20px;
        }
      }
    }
    .filter-input-icon{
      background: $filterColor;
      width: 31px;
      height: 30px;
      left: 269px;
      top: -40px;
      position: relative;
      text-align: center;
      cursor: pointer;
    }
    .title{
      font-size: 28px;
      font-weight: bold;
    }
    .sub-title{
      font-size: 14px;
    }
    .activity-wrapper{
      position: relative;
      &::before{
        content: "";
        width: 1px;
        background: gray;
        height: 100%;
        position: absolute;
        left: 5%;
        top: 0;
        z-index: 1;
      }
      .month {
        border-radius: 20px;
        border: 1px solid antiquewhite;
        color: black;
        margin: 20px 0 20px 0;
        padding: 3px 15px;
        background: antiquewhite;
        z-index: 2;
        position: relative;
      }
    }
    .load-more{
      color: $filterColor;
      font-size: 16px;
      cursor: pointer;
      text-align: center;
      margin: 10px;
    }
  }

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
