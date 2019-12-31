<template>
    <div class="login-container" >
        <el-card header="请先登录" class="login-card" >
            <el-form :model="loginForm" @submit.native.prevent="login">
              <el-form-item label="用户名">
                  <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                  <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" native-type="submit">登录</el-button>
              </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loginForm: {}
        }
    },
    methods: {
        async login() {
            const res = await this.$http.post('/login', this.loginForm)
            this.$message.success('登录成功')
            localStorage.token = res.data.token

            this.$router.push('/')
        }
    }
}
</script>
<style scoped>
.login-card {
    width: 25rem;
    margin: 15rem auto;
}
</style>