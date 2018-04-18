<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col">
        <button class="btn btn-primary" @click="change('toMarylebone')">To Marylebone</button>
        <button class="btn btn-primary" @click="change('toDenham')">To Denham</button>
        <button class="btn btn-primary" @click="change('getMeHome')">Get me home</button>
        <StationToStation v-if="show === 'toMarylebone'" fromStation="DNM" toStation="MARYLBN" time="0750" key="toMarylebone"></StationToStation>
        <StationToStation v-if="show === 'toDenham'" fromStation="MARYLBN" toStation="DNM" time="1800" key="toDenham"></StationToStation>
        <StationToStation v-if="show === 'getMeHome'" fromStation="MARYLBN" toStation="DNM" key="getMeHomeDNH"></StationToStation>
        <StationToStation v-if="show === 'getMeHome'" fromStation="MARYLBN" toStation="DGC" key="getMeHomeDGC"></StationToStation>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import StationToStation from './components/StationToStation'

export default {
  data () {
    return {
      show: 'toMarylebone'
    }
  },
  methods: {
    change(show){
      this.show = show
    }
  },
  components: {
    StationToStation
  },
  mounted () {
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

</style>
