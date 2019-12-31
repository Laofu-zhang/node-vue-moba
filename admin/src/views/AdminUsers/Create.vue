<template>
    <div>
        <h1>{{id ? '编辑' : '新增'}}管理员</h1>
        <el-form @submit.native.prevent="save" ref="createFrom" :model="createFrom" label-width="80px">
            <el-form-item label="管理员名称">
                <el-input v-model="createFrom.username"></el-input>
            </el-form-item>
            <el-form-item label="管理员密码">
                <el-input v-model="createFrom.password" type="password"></el-input>
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
            categories: []
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
                res = await this.$http.put(`/rest/admin_users/${this.id}`, this.createFrom)

            } else {
                res = await this.$http.post('/rest/admin_users', this.createFrom)
            }
            this.$message.success(res.data)
            this.$router.push('/admin_users/list')
        },
        async fetch() {
            const res = await this.$http.get(`/rest/admin_users/${this.id}`)
            this.createFrom = res.data
        }
    },

}
</script>