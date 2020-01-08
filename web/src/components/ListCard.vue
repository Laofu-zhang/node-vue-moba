<template>
    <m-card :title="title" :icon="icon">
        <div class="nav jc-between">
            <div class="nav-item" :class="{'active': acitve === i}" 
            v-for="(category, i) in categories" :key="i"
            @click="activeLink(i)">
                <div class="nav-link">{{category.name}}</div>
            </div>
        </div>
        <div class="by-3">
            <swiper>
                <swiper-slide class="" v-for="(category, i) in categories" :key="i">
                    <slot name="items" :category="category"></slot>
                </swiper-slide>
            </swiper>
        </div>
    </m-card>
</template>
<script>
export default {
    props: {
        title: {type: String, required: true},
        icon: {type: String, required: true},
        categories: {type: Array, required: true}
    },
    data() {
        return {
            acitve: 0
        }
    },
    methods: {
        activeLink(i) {
            this.acitve = i
        }
    },
}
</script>