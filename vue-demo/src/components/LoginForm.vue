<template>
  <div class="login-form">
    <h2 class="welcome">欢迎来到！👋</h2>
    
    <!-- 用户类型选择 -->
    <div class="user-type-tabs">
      <button 
        :class="{ active: userType === 'teacher' }" 
        @click="userType = 'teacher'"
      >老师账号</button>
      <button 
        :class="{ active: userType === 'student' }" 
        @click="userType = 'student'"
      >学生账号</button>
    </div>
    
    <form @submit.prevent="handleSubmit">
      <!-- 用户名输入框 -->
      <div class="form-group">
        <div class="input-with-icon">
          <i class="icon">👤</i>
          <input 
            type="text" 
            v-model="username" 
            placeholder="用户名" 
            required
          />
        </div>
      </div>
      
      <!-- 密码输入框 -->
      <div class="form-group">
        <div class="input-with-icon">
          <i class="icon">🔒</i>
          <input 
            :type="showPassword ? 'text' : 'password'" 
            v-model="password" 
            placeholder="密码" 
            required
          />
          <button 
            type="button"
            class="toggle-password"
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? '👁️' : '👁️‍🗨️' }}
          </button>
        </div>
      </div>
      
      <!-- 记住我和忘记密码 -->
      <div class="form-options">
        <label class="remember-me">
          <input type="checkbox" v-model="rememberMe" />
          <span>记住我</span>
        </label>
        <a href="#" class="forgot-password">忘记密码？</a>
      </div>
      
      <!-- 登录按钮 -->
      <button 
        type="submit" 
        class="login-button"
        :disabled="isLoading"
      >
        <span v-if="isLoading">登录中...</span>
        <span v-else>登录</span>
      </button>
      
      <!-- 错误信息显示 -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <!-- 注册提示 -->
      <div class="register-prompt">
        还没有账号？ <a href="#" @click.prevent="$emit('switch-to-register')">创建账号</a>
      </div>
    </form>
  </div>
</template>

<script>
import apiService from '../services/api.js';

export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      userType: 'student', // 默认为学生账号
      rememberMe: false,
      showPassword: false,
      isLoading: false,
      errorMessage: ''
    };
  },
  methods: {
    async handleSubmit() {
      // 重置错误信息
      this.errorMessage = '';
      
      // 如果用户名或密码为空，显示错误信息
      if (!this.username || !this.password) {
        this.errorMessage = '请输入用户名和密码';
        return;
      }
      
      // 准备登录数据
      const loginData = {
        username: this.username,
        password: this.password,
        user_type: this.userType
      };
      
      // 设置加载状态
      this.isLoading = true;
      
      try {
        // 调用API发起登录请求
        const response = await apiService.login(loginData);
        const data = response.data;
        
        if (data.success) {
          // 登录成功
          // 保存token和用户数据
          apiService.setAuthToken(data.data.token);
          
          // 如果"记住我"被勾选，保存用户名到本地存储
          if (this.rememberMe) {
            localStorage.setItem('savedUsername', this.username);
          } else {
            localStorage.removeItem('savedUsername');
          }
          
          // 触发登录成功事件
          this.$emit('login-success', data.data);
        } else {
          // 登录失败
          this.errorMessage = data.message || '登录失败，请检查您的凭证';
        }
      } catch (error) {
        // 网络错误或服务器错误
        this.errorMessage = '登录时发生错误，请稍后再试';
        console.error('登录错误:', error);
      } finally {
        // 无论成功还是失败，都结束加载状态
        this.isLoading = false;
      }
    }
  },
  mounted() {
    // 检查是否有保存的用户名（记住我功能）
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
      this.username = savedUsername;
      this.rememberMe = true;
    }
  }
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.welcome {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  font-weight: 500;
}

.user-type-tabs {
  display: flex;
  margin-bottom: 20px;
  border-radius: 4px;
  overflow: hidden;
}

.user-type-tabs button {
  flex: 1;
  background-color: #f0f0f0;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  color: #666;
}

.user-type-tabs button.active {
  background-color: #1890ff;
  color: white;
}

.form-group {
  margin-bottom: 20px;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.input-with-icon:focus-within {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  color: #999;
  font-style: normal;
}

.input-with-icon input {
  flex: 1;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 14px;
}

.toggle-password {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 10px;
  font-size: 16px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.forgot-password {
  color: #1890ff;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

.login-button:hover {
  background-color: #40a9ff;
}

.login-button:disabled {
  background-color: #bfbfbf;
  cursor: not-allowed;
}

.error-message {
  margin-top: 15px;
  padding: 10px;
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 4px;
  color: #f5222d;
  font-size: 14px;
}

.register-prompt {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
}

.register-prompt a {
  color: #1890ff;
  text-decoration: none;
}

.register-prompt a:hover {
  text-decoration: underline;
}

.main-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
  width: 100%;
  overflow: hidden;
}

.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: calc(100% - 180px);
  min-width: 0;
}

.content {
  flex: 1;
  padding: 20px;
  overflow: auto;
  width: 100%;
}

.profile-panel {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  width: 100%;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  width: 100%;
}

.profile-item {
  display: flex;
  padding: 15px 10px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #f9f9f9;
  width: 100%;
}

.profile-item div {
  flex: 1;
  font-size: 14px;
  color: #333;
  padding-right: 10px;
  word-break: break-word;
}
</style> 