<template>
    <div>
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column prop="_id" label="ID" width="250"></el-table-column>
            <!-- <el-table-column prop="parent.title" label="上级分类" width="150"></el-table-column> -->
            <el-table-column prop="title" label="物品名称"></el-table-column>
            <el-table-column prop="icon" label="图标">
                <template slot-scope="scope">
                    <img :src="scope.row.icon" alt="" style="height: 3rem">
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="$router.push(`/items/edit/${scope.row._id}`)">编辑</el-button>
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
            const res = await this.$http.get('/rest/items')
            this.tableData = res.data
        },
        remove(row) {
            this.$confirm(`是否确定删除物品 "${row.title}"`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await this.$http.delete(`/rest/items/${row._id}`)
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