<template>
    <div>
        <h1>{{id ? '编辑' : '新增'}}广告位</h1>
        <el-form @submit.native.prevent="save" ref="createFrom" :model="createFrom" label-width="80px">
            <el-form-item label="广告位名称">
                <el-input v-model="createFrom.title"></el-input>
            </el-form-item>
            <el-form-item label="广告">
                <el-button size="small" @click="createFrom.items.push({})">添加广告图片</el-button>
                <el-row type="flex" style="flex-wrap: wrap">
                <el-col :md="24" v-for="(item, i) in createFrom.items" :key="i">
                    <el-form-item label="跳转连接">
                        <el-input v-model="item.url"></el-input>
                    </el-form-item>
                    <el-form-item label="图片" style="margin: 0.5rem">
                        <el-upload
                            class="avatar-uploader"
                            :action="getUploadUrl"
                            :headers="getAuthHeaders()"
                            :show-file-list="false"
                            :on-success="res => $set(item, 'image', res.url)">
                            <img v-if="item.image" :src="item.image" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" type="danger" @click="createFrom.items.splice(i, 1)">删除</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            </el-form-item>
            
            <el-form-item style="margin-top: 1rem">
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    props: {
        id: { type: String}
    },
    data() {
        return {
            createFrom: {
                title: '',
                items: []
            },
            parents: []
        }
    },
    created() {
        this.id && this.fetch()
    },
    destroyed() {
        this.createFrom = {}
    },
    methods: {
        async save() {
            // eslint-disable-next-line no-unused-vars
            let res 
            if (this.id) {
                res = await this.$http.put(`/rest/ads/${this.id}`, this.createFrom)

            } else {
                res = await this.$http.post('/rest/ads', this.createFrom)
            }
            this.$message.success(res.data)
            this.$router.push('/ads/list')
        },
        async fetch() {
            const res = await this.$http.get(`/rest/ads/${this.id}`)
            this.createFrom = Object.assign({}, this.createFrom, res.data)
        },
    },

}
</script>
