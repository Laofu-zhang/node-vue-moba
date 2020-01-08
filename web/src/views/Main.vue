<template>
  <div class="main">
    <div class="topbar bg-black py-1 px-2 d-flex ai-center">
      <img src="../assets/logo.png" alt="" height="30">
      <div class="px-2 flex-grow-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">默认成就更多</div>
      </div>
      <button class="btn bg-primary p-1">立即下载</button>
    </div>
    <div class="pt-3 pb-2 bg-primary">
      <div class="nav nav-inverse jc-around pb-1">
        <div class="nav-item active">
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'main',
}
</script>
