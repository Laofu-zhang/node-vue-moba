<template>
    <div >
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide>
                <img src="../assets/images/956488263ddf681ca57ba9ee6eff25b1.jpeg" class="w-100" alt="">
            </swiper-slide>
            <swiper-slide>
                <img src="../assets/images/4e86ffdee7c2f98fab0ef6c5ab062fea.jpeg" class="w-100" alt="">
            </swiper-slide>
            <swiper-slide>
                <img src="../assets/images/21ac5ce1acb7bb40bb6b97fc2f9cecc0.jpeg" class="w-100" alt="">
            </swiper-slide>
            <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
        </swiper>

        <!-- end of swiper -->

        <div class="nav-icon pt-3 mt-3 bg-white text-center text-grey mx-2">
            <div class="d-flex flex-wrap">
                <div class="nav-item mb-3"
                v-for="(item, i) in navIconList" :key="i">
                    <i class="sprite" :class="item.spriteName"></i>
                    <div class="fs-xs py-2 fs-sm">
                        {{item.navIconName}}
                    </div>
                </div>
            </div>
            <div class="bg-light py-2">
                <i class="sprite sprite-arrow mr-1"></i>收起
            </div> 
        </div>

        <!-- end of nav icons -->
        <m-list-card title="新闻资讯" icon="Menu" :categories="newCats">
            <template #items="{category}">
                <div class="py-2" v-for="(item, i) in category.items" :key="i">
                    <span>{{item.categoryName}}</span>
                    <span>|</span>
                    <span>{{item.title}}</span>
                    <span>{{item.date}}</span>
                </div>
            </template>
        </m-list-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            swiperOption: {
                pagination: {
                    el: '.pagination-home'
                }
            },
            navIconList: [
                {
                    spriteName: 'sprite-news',
                    navIconName: '爆料站'
                },
                {
                    spriteName: 'sprite-news',
                    navIconName: '故事站'
                },
                {
                    spriteName: 'sprite-news',
                    navIconName: '周边商城'
                },
                {
                    spriteName: 'sprite-news',
                    navIconName: '体验服'
                },
                {
                    spriteName: 'sprite-news',
                    navIconName: '新人专区'
                },
                {
                    spriteName: 'sprite-news',
                    navIconName: '荣耀.传承'
                },
                {
                    spriteName: 'sprite-news',
                    navIconName: '王者营地'
                },
                {
                    spriteName: 'sprite-news',
                    navIconName: '公众号'
                },
                {
                    spriteName: 'sprite-news',
                    navIconName: '版本介绍'
                },
                {
                    spriteName: 'sprite-news',
                    navIconName: '对局环境'
                }
            ],
            newCats: [
                {
                    name: '热门',
                    // eslint-disable-next-line no-unused-vars
                    items: new Array(5).fill({}).map(v => ({
                        categoryName: '公告',
                        title: '停服更新',
                        date: '06/01'
                    }))
                },
                {
                    name: '新闻',
                    // eslint-disable-next-line no-unused-vars
                    items: new Array(5).fill({}).map(v => ({
                        categoryName: '公告',
                        title: '停服更新',
                        date: '06/01'
                    }))
                },
                {
                    name: '公告',
                    // eslint-disable-next-line no-unused-vars
                    items: new Array(5).fill({}).map(v => ({
                        categoryName: '公告',
                        title: '停服更新',
                        date: '06/01'
                    }))
                },
                {
                    name: '活动',
                    // eslint-disable-next-line no-unused-vars
                    items: new Array(5).fill({}).map(v => ({
                        categoryName: '公告',
                        title: '停服更新',
                        date: '06/01'
                    }))
                },
                {
                    name: '赛事',
                    // eslint-disable-next-line no-unused-vars
                    items: new Array(5).fill({}).map(v => ({
                        categoryName: '公告',
                        title: '停服更新',
                        date: '06/01'
                    }))
                }
            ]
        }
    },
    mounted() {
    //   setInterval(() => {
    //     if (this.swiperSlides.length < 10) {
    //       this.swiperSlides.push(this.swiperSlides.length + 1)
    //     }
    //   }, 3000)
    }
}
</script>
<style lang="scss">
@import '../assets/scss/variable';
.pagination-home {
    .swiper-pagination-bullet {
        opacity: 1;
        border-radius: 2px;
        background: map-get($colors, 'white');
        &.swiper-pagination-bullet-active {
            background: map-get($colors, 'info') ;
        }
    }
    
}
.nav-icon {
    border-top: 1px solid $border-color; 
    border-bottom: 1px solid $border-color;
    .nav-item {
        width: 25%;
        border-left: 1px solid $border-color;
        &:nth-child(4n+1) {
            border-left: none
        }
    }
}
</style>