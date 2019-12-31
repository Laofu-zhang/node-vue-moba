<template>
    <div>
        <h1>{{id ? '编辑' : '新增'}}英雄</h1>
        <el-form @submit.native.prevent="save" ref="createFrom" :model="createFrom" label-width="80px">
            <el-tabs type="border-card" value="beasic">
                <el-tab-pane label="基础信息" name="beasic">
                    <el-form-item label="英雄名称">
                        <el-input v-model="createFrom.title"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-upload
                            class="avatar-uploader"
                            :action="getUploadUrl"
                            :headers="getAuthHeaders()"
                            :show-file-list="false"
                            :on-success="afterUpload">
                            <img v-if="createFrom.avatar" :src="createFrom.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="称号">
                        <el-input v-model="createFrom.designation"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="createFrom.categories" multiple>
                            <template v-for="item in categories">
                                <el-option :key="item._id" :value="item._id" :label="item.title"></el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="难度">
                        <el-rate :max="5" show-score v-model="createFrom.scores.difficult" style="margin-top: 10px"></el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate :max="5" show-score v-model="createFrom.scores.skills" style="margin-top: 10px"></el-rate>
                    </el-form-item>
                    <el-form-item label="攻击">
                        <el-rate :max="5" show-score v-model="createFrom.scores.attack" style="margin-top: 10px"></el-rate>
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate :max="5" show-score v-model="createFrom.scores.survive" style="margin-top: 10px"></el-rate>
                    </el-form-item>
                    <el-form-item label="顺风出装">
                        <el-select v-model="createFrom.items1" multiple>
                            <template v-for="item in items">
                                <el-option :key="item._id" :value="item._id" :label="item.title"></el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="逆风出装">
                        <el-select v-model="createFrom.items2" multiple>
                            <template v-for="item in items">
                                <el-option :key="item._id" :value="item._id" :label="item.title"></el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input v-model="createFrom.usageTips" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="对抗技巧">
                        <el-input v-model="createFrom.battleTips" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="团战思路">
                        <el-input v-model="createFrom.teamTips" type="textarea"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="技能信息" name="skills">
                    <el-button type="text" @click="createFrom.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
                    <el-row type="flex" style="flex-wrap: wrap">
                        <el-col :md="12" v-for="(item, i) in createFrom.skills" :key="i" class="skills-item">
                            <el-form-item label="技能名称">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label="图标">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="getUploadUrl"
                                    :show-file-list="false"
                                    :headers="getAuthHeaders()"
                                    :on-success="res => $set(item, 'icon', res.url)">
                                    <img v-if="item.icon" :src="item.icon" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input type="textarea" v-model="item.description"></el-input>
                            </el-form-item>
                            <el-form-item label="小提示">
                                <el-input type="textarea" v-model="item.tips"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small" type="danger" 
                                @click="createFrom.skills.splice(i, 1)">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
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
                avatar: '',
                designation: '',
                categories: '',
                scores: {
                    difficult: 0
                },
                skills: []
            },
            parents: [],
            categories: [],
            items: []
        }
    },
    created() {
        this.id && this.fetch()
        this.fetchCategories()
        this.fetchItems()
    },
    destroyed() {
        this.createFrom = {}
    },
    methods: {
        afterUpload(res) {
            this.createFrom.avatar = res.url
        },
        async save() {
            // eslint-disable-next-line no-unused-vars
            let res 
            if (this.id) {
                res = await this.$http.put(`/rest/heroes/${this.id}`, this.createFrom)

            } else {
                res = await this.$http.post('/rest/heroes', this.createFrom)
            }
            this.$message.success(res.data)
            this.$router.push('/heroes/list')
        },
        async fetch() {
            const res = await this.$http.get(`/rest/heroes/${this.id}`)
            this.createFrom = Object.assign({}, this.createFrom, res.data)
        },
        async fetchCategories() {
            const res = await this.$http.get(`/rest/categories`)
            this.categories = res.data
        },
        async fetchItems() {
            const res = await this.$http.get(`/rest/items`)
            this.items = res.data
        }
        // async fetchParents() {
        //     const res = await this.$http.get(`/rest/heroes`)
        //     this.parents = res.data
        // }
    },

}
</script>