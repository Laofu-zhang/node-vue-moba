<template>
    <div>
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column prop="_id" label="ID" width="250"></el-table-column>
            <!-- <el-table-column prop="categories.title" label="上级分类" width="150"></el-table-column> -->
            <el-table-column prop="title" label="文章标题"></el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
                    <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: []
        }
    },
    methods: {
        async fetch() {
            const res = await this.$http.get('/rest/articles')
            this.tableData = res.data
        },
        remove(row) {
            this.$confirm(`是否确定删除分类 "${row.title}"`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await this.$http.delete(`/rest/articles/${row._id}`)
                this.$message.success(res.data.message)
                this.fetch()
            })  
        }
    },
    created() {
        this.fetch()
    }
}
</script>