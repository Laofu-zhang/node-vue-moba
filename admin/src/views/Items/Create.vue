<template>
    <div>
        <h1>{{id ? '编辑' : '新增'}}物品</h1>
        <el-form @submit.native.prevent="save" ref="createFrom" :model="createFrom" label-width="80px">
            <!-- <el-form-item label="上级分类">
                <el-select v-model="createFrom.parent">
                    <template v-for="(option, index) in parents">
                        <el-option :key="index" :value="option._id" :label="option.title"></el-option>
                    </template>
                </el-select>
            </el-form-item> -->
            <el-form-item label="分类名称">
                <el-input v-model="createFrom.title"></el-input>
            </el-form-item>
            <el-form-item label="图标">
                <el-upload
                    class="avatar-uploader"
                    :action="getUploadUrl"
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="afterUpload">
                    <img v-if="createFrom.icon" :src="createFrom.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
        // this.fetchParents()
    },
    destroyed() {
        this.createFrom = {}
    },
    methods: {
        afterUpload(res) {
            // eslint-disable-next-line no-console
            this.$set(this.createFrom, 'icon', res.url)
        },
        async save() {
            // eslint-disable-next-line no-unused-vars
            let res 
            if (this.id) {
                res = await this.$http.put(`/rest/items/${this.id}`, this.createFrom)

            } else {
                res = await this.$http.post('/rest/items', this.createFrom)
            }
            this.$message.success(res.data)
            this.$router.push('/items/list')
        },
        async fetch() {
            const res = await this.$http.get(`/rest/items/${this.id}`)
            this.createFrom = res.data
        },
        // async fetchParents() {
        //     const res = await this.$http.get(`/rest/items`)
        //     this.parents = res.data
        // }
    },

}
</script>

<style>
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>