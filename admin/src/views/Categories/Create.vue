<template>
    <div>
        <h1>{{id ? '编辑' : '新增'}}分类</h1>
        <el-form @submit.native.prevent="save" ref="createFrom" :model="createFrom" label-width="80px">
            <el-form-item label="上级分类">
                <el-select v-model="createFrom.parent">
                    <template v-for="(option, index) in parents">
                        <el-option :key="index" :value="option._id" :label="option.title"></el-option>
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item label="分类名称">
                <el-input v-model="createFrom.title"></el-input>
            </el-form-item>
            <el-form-item>
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
            createFrom: {},
            parents: []
        }
    },
    created() {
        this.id && this.fetch()
        this.fetchParents()
    },
    destroyed() {
        this.createFrom = {}
    },
    methods: {
        async save() {
            // eslint-disable-next-line no-unused-vars
            let res 
            if (this.id) {
                res = await this.$http.put(`/rest/categories/${this.id}`, this.createFrom)

            } else {
                res = await this.$http.post('/rest/categories', this.createFrom)
            }
            this.$message.success(res.data)
            this.$router.push('/categories/list')
        },
        async fetch() {
            const res = await this.$http.get(`/rest/categories/${this.id}`)
            this.createFrom = res.data
        },
        async fetchParents() {
            const res = await this.$http.get(`/rest/categories`)
            this.parents = res.data
        }
    },

}
</script>