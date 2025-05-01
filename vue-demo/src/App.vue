<template>
  <div id="app">
    <!-- 登录/注册页面 -->
    <div class="container" v-if="!isLoggedIn">
      <div class="auth-card">
        <!-- 表单切换动画 -->
        <transition name="fade" mode="out-in">
          <login-form 
            v-if="isLoginView"
            @login-success="handleLoginSuccess"
            @switch-to-register="isLoginView = false"
            key="login"
          />
          <register-form 
            v-else
            @register-success="handleRegisterSuccess"
            @switch-to-login="isLoginView = true"
            key="register"
          />
        </transition>
      </div>
    </div>
    
    <!-- 主页 -->
    <home-page 
      v-if="isLoggedIn && userType === 'student'" 
      :initial-user-data="userData"
      @logout="handleLogout"
    />
    <teacher-home-page 
      v-if="isLoggedIn && userType === 'teacher'" 
      :initial-user-data="userData"
      @logout="handleLogout"
    />
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import HomePage from './components/HomePage.vue'
import TeacherHomePage from './components/TeacherHomePage.vue'
import apiService from './services/api.js'

export default {
  name: 'App',
  components: {
    LoginForm,
    RegisterForm,
    HomePage,
    TeacherHomePage
  },
  data() {
    return {
      isLoginView: true,
      isLoggedIn: false,
      userData: {},
      userType: ''
    }
  },
  methods: {
    handleLoginSuccess(userData) {
      // 保存用户数据
      this.userData = userData.user_data;
      this.userType = userData.user_type;
      
      // 尝试保存到localStorage (有错误处理)
      try {
        localStorage.setItem('userData', JSON.stringify(userData.user_data));
        localStorage.setItem('userType', userData.user_type);
      } catch (error) {
        console.error('无法写入localStorage:', error);
      }
      
      // 设置登录状态为true
      this.isLoggedIn = true;
    },
    handleRegisterSuccess(userData) {
      // 注册成功后的处理
      alert(`注册成功！欢迎加入，${userData.username}`);
      
      // 注册成功后切换到登录页面
      this.isLoginView = true;
    },
    handleLogout() {
      // 退出登录
      this.isLoggedIn = false;
      this.userData = {};
      
      // 清除本地存储中的用户数据
      localStorage.removeItem('userData');
      
      // 重置视图到登录页
      this.isLoginView = true;
    }
  },
  mounted() {
    // 页面加载时检查是否已登录
    const token = apiService.getAuthToken();
    
    try {
      const savedUserData = localStorage.getItem('userData');
      const savedUserType = localStorage.getItem('userType');
      
      if (token && savedUserData) {
        this.userData = JSON.parse(savedUserData);
        this.userType = savedUserType || '';
        this.isLoggedIn = true;
      }
    } catch (e) {
      console.error('解析用户数据失败', e);
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  overflow-x: hidden; /* 防止水平滚动条 */
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f0f2f5;
  color: rgba(0, 0, 0, 0.85);
  position: relative; /* 确保绝对定位的子元素基于body */
}

#app {
  min-height: 100vh;
  width: 100%; /* 确保宽度占满 */
  position: relative; /* 创建定位上下文 */
  display: flex; /* 使用flex布局使容器居中 */
  flex-direction: column; /* 垂直排列子元素 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

/* 登录/注册页面样式 */
#app > .container {
  min-height: 100vh;
  width: 100%; /* 确保宽度占满 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin: 0 auto; /* 自动边距确保水平居中 */
}

.auth-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  width: 100%;
  max-width: 450px;
  margin: 0 auto; /* 确保卡片本身居中 */
}

/* 切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
