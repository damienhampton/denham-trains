<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 py-3">
        <vue-pull-refresh :on-refresh="refresh" :config="pullConfig">
          <h1><span class="train-icon"><i class="fas fa-train"></i></span> Denham Trains</h1>
          <nav class="navbar navbar-expand navbar-light bg-light">
            <ul class="navbar-nav">
              <li class="nav-item" :class="{'active': show === 'toMarylebone'}">
                <a class="nav-link" href="#" @click="change('toMarylebone')">Marylebone<span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item" :class="{'active': show === 'toDenham'}">
                <a class="nav-link" href="#" @click="change('toDenham')">Denham</a>
              </li>
              <li class="nav-item" :class="{'active': show === 'getMeHome'}">
                <a class="nav-link" href="#" @click="change('getMeHome')">Get me home</a>
              </li>
            </ul>
          </nav>
          <StationToStation v-if="show === 'toMarylebone'" fromStation="DNM" toStation="MARYLBN" time="0750" key="toMarylebone"></StationToStation>
          <StationToStation v-if="show === 'toDenham'" fromStation="MARYLBN" toStation="DNM" time="1800" key="toDenham"></StationToStation>
          <StationToStation v-if="show === 'getMeHome'" fromStation="MARYLBN" toStation="DNM" key="getMeHomeDNH"></StationToStation>
          <StationToStation v-if="show === 'getMeHome'" fromStation="MARYLBN" toStation="DGC" key="getMeHomeDGC"></StationToStation>
          <p class="text-center mt-5">
            <button class="btn" @click="refresh">
              <span v-if="!refreshing" key="notRefreshing"><i class="fas fa-sync"></i></span>
              <span v-if="refreshing" key="refreshing"><i class="fas fa-sync fa-spin"></i></span>
            </button>
          </p>
          <p class="text-center last-refreshed">Last refreshed: {{ lastRefreshedAt }}</p>

          <p class="text-center mt-5">
            <span><a href="https://twitter.com/damien_hampton" target="_blank">Built by Damien <i class="fab fa-twitter-square"></i></a></span>
            <span><a href="https://twitter.com/realtimetrains" target="_blank">Powered by Realtime Trains <i class="fab fa-twitter-square"></i></a></span>
          </p>
        </vue-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import StationToStation from './components/StationToStation'
import VuePullRefresh from 'vue-pull-refresh'
import EventBus from './EventBus'

export default {
  data () {
    return {
      lastRefreshedAt: '',
      pullConfig: {
        errorLabel: 'Well, that didn\'t work. Blame cats.',
        startLabel: 'Keep pulling...',
        readyLabel: 'Refresh choo choos!',
        loadingLabel: 'Herding cats...',
      },
      refreshing: false,
      show: ''
    }
  },
  methods: {
    change(show){
      this.show = show
    },
    refresh(){
      this.lastRefreshedAt = ''
      this.refreshing = true
      EventBus.$emit('refresh')
    },
    refreshDone(){
      this.lastRefreshedAt = moment().format('HH:mm:ss')
      this.refreshing = false
    }
  },
  components: {
    StationToStation,
    'vue-pull-refresh': VuePullRefresh
  },
  mounted () {
    EventBus.$on('refreshDone', this.refreshDone)
    const time = moment().format('HHmm')
    if(time < '0800' ){
      this.show = 'toMarylebone'
    }else if(time > '1900'){
      this.show = 'getMeHome'
    }else{
      this.show = 'toDenham'
    }
  }
}
</script>

<style>
span.train-icon{
  font-size: 1.5rem;
}
h1{
  font-size: 1.8rem;
}
body{
  font-size: 0.8rem;
  background: url(./assets/bg.jpg);
  background-repeat: no-repeat;
  background-size: 100%;
}
.btn{
  width: 100%;
}
p.last-refreshed{
  font-size: 0.8rem;
}
a, a:hover{
  color: black;
}
</style>
