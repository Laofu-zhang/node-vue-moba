<template>
    <div>
        <h1>{{id ? '编辑' : '新增'}}文章</h1>
        <el-form @submit.native.prevent="save" ref="createFrom" :model="createFrom" label-width="80px">
            <el-form-item label="所属分类">
                <el-select v-model="createFrom.categories" multiple>
                    <template v-for="(item, index) in categories">
                        <el-option :key="index" :value="item._id" :label="item.title"></el-option>
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="createFrom.title"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <vue-editor v-model="createFrom.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
export default {
    components: {
        VueEditor
    },
    props: {
        id: { type: String}
    },
    data() {
        return {
            createFrom: {},
            categories: []
        }
    },
    created() {
        this.id && this.fetch()
        this.fetchCategories()
    },
    destroyed() {
        this.createFrom = {}
    },
    methods: {
        async save() {
            // eslint-disable-next-line no-unused-vars
            let res 
            if (this.id) {
                res = await this.$http.put(`/rest/articles/${this.id}`, this.createFrom)

            } else {
                res = await this.$http.post('/rest/articles', this.createFrom)
            }
            this.$message.success(res.data)
            this.$router.push('/articles/list')
        },
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            // 文本编辑器 图片上传
            
            const formData = new FormData();
            formData.append("file", file);
            const res = await this.$http.post('/upload', formData);
            Editor.insertEmbed(cursorLocation, "image", res.data.url);
            resetUploader();
        },
        async fetch() {
            const res = await this.$http.get(`/rest/articles/${this.id}`)
            this.createFrom = res.data
        },
        async fetchCategories() {
            const res = await this.$http.get(`/rest/categories`)
            this.categories = res.data
        }
    },

}
</script>