<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
  @import '../node_modules/bootstrap-vue/dist/bootstrap-vue.min.css';
  $inputWidth: 300px;
  $borderColor: gray;

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  /* Autosuggest styling */
  #autosuggest__input {
    position: relative;
    display: block;
    border: 1px solid $borderColor;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    width: $inputWidth;
    margin: 10px 0;
    padding-left: 5px;
    font-size: 14px;
    height: 30px;
    outline: gray;
  }

  #autosuggest__input.autosuggest__input-open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .autosuggest__results-container {
    position: relative;
    width: $inputWidth;
  }

  .autosuggest__results {
    font-weight: 300;
    margin: 0;
    position: absolute;
    z-index: 10000001;
    width: 100%;
    border: 1px solid $borderColor;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background: white;
    padding: 0px;
    overflow: scroll;
    max-height: 200px;
  }

  .autosuggest__results ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }

  .autosuggest__results .autosuggest__results_item {
    cursor: pointer;
    padding: 15px;
  }

  #autosuggest ul:nth-child(1) > .autosuggest__results_title {
    border-top: none;
  }

  .autosuggest__results .autosuggest__results_title {
    color: gray;
    font-size: 11px;
    margin-left: 0;
    padding: 15px 13px 5px;
    border-top: 1px solid lightgray;
  }

  .autosuggest__results .autosuggest__results_item:active,
  .autosuggest__results .autosuggest__results_item:hover,
  .autosuggest__results .autosuggest__results_item:focus,
  .autosuggest__results .autosuggest__results_item.autosuggest__results_item-highlighted {
    background-color: #ddd;
  }
</style>
