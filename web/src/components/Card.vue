<template>
    <div class="card p-3 bg-white mt-3 mx-2">
        <div class="card-header d-flex pb-3">
            <i class="iconfont" :class="`icon-${icon}`"></i>
            <div class="fs-xxl flex-grow-1 ml-2">{{title}}</div>
            <i class="iconfont icon-menu"></i>
        </div>
        <div class="card-body pt-3">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {type: String, required: true},
        icon: {type: String, required: true}
    }
}
</script>
<style lang="scss">
@import '../assets/scss/_variable.scss';
.card {
    border-bottom: 1px solid  $border-color;
    .card-header {
        border-bottom: 1px solid  $border-color;
    }
}
</style>