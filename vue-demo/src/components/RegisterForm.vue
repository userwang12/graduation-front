<template>
  <div class="register-form">
    <h2 class="welcome">创建账号 👋</h2>
    
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
        <div class="input-with-icon" :class="{ 'has-error': errors.username }">
          <i class="icon">👤</i>
          <input 
            type="text" 
            v-model="username" 
            placeholder="用户名" 
            required
            @blur="validateUsername"
          />
        </div>
        <div v-if="errors.username" class="error-hint">{{ errors.username }}</div>
      </div>
      
      <!-- 密码输入框 -->
      <div class="form-group">
        <div class="input-with-icon" :class="{ 'has-error': errors.password }">
          <i class="icon">🔒</i>
          <input 
            :type="showPassword ? 'text' : 'password'" 
            v-model="password" 
            placeholder="密码" 
            required
            @blur="validatePassword"
          />
          <button 
            type="button"
            class="toggle-password"
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? '👁️' : '👁️‍🗨️' }}
          </button>
        </div>
        <div v-if="errors.password" class="error-hint">{{ errors.password }}</div>
      </div>
      
      <!-- 年龄输入框 -->
      <div class="form-group">
        <div class="input-with-icon" :class="{ 'has-error': errors.age }">
          <i class="icon">🎂</i>
          <input 
            type="number" 
            v-model="age" 
            placeholder="年龄" 
            required
            @blur="validateAge"
          />
        </div>
        <div v-if="errors.age" class="error-hint">{{ errors.age }}</div>
      </div>
      
      <!-- 电话输入框 -->
      <div class="form-group">
        <div class="input-with-icon" :class="{ 'has-error': errors.phone }">
          <i class="icon">📱</i>
          <input 
            type="tel" 
            v-model="phone" 
            placeholder="电话" 
            required
            @blur="validatePhone"
          />
        </div>
        <div v-if="errors.phone" class="error-hint">{{ errors.phone }}</div>
      </div>
      
      <!-- 性别选择 -->
      <div class="form-group">
        <div class="gender-selection">
          <label class="gender-label">性别:</label>
          <div class="gender-options">
            <label class="gender-option">
              <input type="radio" v-model="sex" value="man" />
              <span>男</span>
            </label>
            <label class="gender-option">
              <input type="radio" v-model="sex" value="woman" />
              <span>女</span>
            </label>
          </div>
        </div>
      </div>
      
      <!-- 服务条款同意 -->
      <div class="form-group">
        <label class="agreement-checkbox">
          <input type="checkbox" v-model="agreement" />
          <span>我已阅读并同意 <a href="#">服务条款</a> 和 <a href="#">隐私政策</a></span>
        </label>
        <div v-if="errors.agreement" class="error-hint">{{ errors.agreement }}</div>
      </div>
      
      <!-- 注册按钮 -->
      <button 
        type="submit" 
        class="register-button"
        :disabled="isLoading"
      >
        <span v-if="isLoading">注册中...</span>
        <span v-else>注册</span>
      </button>
      
      <!-- 错误信息显示 -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <!-- 登录提示 -->
      <div class="login-prompt">
        已有账号？ <a href="#" @click.prevent="$emit('switch-to-login')">登录</a>
      </div>
    </form>
  </div>
</template>

<script>
import apiService from '../services/api.js';

export default {
  name: 'RegisterForm',
  data() {
    return {
      username: '',
      password: '',
      age: '',
      phone: '',
      sex: 'man', // 默认性别为男
      userType: 'student', // 默认为学生账号
      agreement: false,
      showPassword: false,
      isLoading: false,
      errorMessage: '',
      errors: {
        username: '',
        password: '',
        age: '',
        phone: '',
        agreement: ''
      }
    };
  },
  methods: {
    // 验证用户名
    validateUsername() {
      this.errors.username = '';
      if (this.username.length < 3) {
        this.errors.username = '用户名至少需要3个字符';
      }
    },
    
    // 验证密码
    validatePassword() {
      this.errors.password = '';
      if (this.password.length < 6) {
        this.errors.password = '密码至少需要6个字符';
      }
    },
    
    // 验证年龄
    validateAge() {
      this.errors.age = '';
      if (!this.age) {
        this.errors.age = '请输入年龄';
      } else if (isNaN(this.age) || this.age <= 0) {
        this.errors.age = '请输入有效的年龄';
      }
    },
    
    // 验证电话
    validatePhone() {
      this.errors.phone = '';
      if (!this.phone) {
        this.errors.phone = '请输入电话号码';
      }
    },
    
    // 验证表单
    validateForm() {
      let isValid = true;
      
      // 验证用户名
      this.validateUsername();
      if (this.errors.username) isValid = false;
      
      // 验证密码
      this.validatePassword();
      if (this.errors.password) isValid = false;
      
      // 验证年龄
      this.validateAge();
      if (this.errors.age) isValid = false;
      
      // 验证电话
      this.validatePhone();
      if (this.errors.phone) isValid = false;
      
      // 验证服务条款
      this.errors.agreement = '';
      if (!this.agreement) {
        this.errors.agreement = '请阅读并同意服务条款和隐私政策';
        isValid = false;
      }
      
      return isValid;
    },
    
    async handleSubmit() {
      // 重置错误信息
      this.errorMessage = '';
      
      // 验证表单
      if (!this.validateForm()) {
        return;
      }
      
      // 准备注册数据
      const registerData = {
        username: this.username,
        password: this.password,
        user_type: this.userType,
        age: String(this.age),
        phone: String(this.phone),
        sex: this.sex
      };
      
      // 设置加载状态
      this.isLoading = true;
      
      try {
        // 调用API发起注册请求
        const response = await apiService.register(registerData);
        const data = response.data;
        
        if (data.success) {
          // 注册成功
          // 触发注册成功事件，传递用户数据
          this.$emit('register-success', {
            username: this.username,
            userType: this.userType
          });
          
          // 清空表单
          this.username = '';
          this.password = '';
          this.age = '';
          this.phone = '';
          this.sex = 'man';
          this.agreement = false;
        } else {
          // 注册失败
          this.errorMessage = data.message || '注册失败，请稍后再试';
        }
      } catch (error) {
        // 网络错误或服务器错误
        this.errorMessage = '注册时发生错误，请稍后再试';
        console.error('注册错误:', error);
      } finally {
        // 无论成功还是失败，都结束加载状态
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.register-form {
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

.input-with-icon.has-error {
  border-color: #ff4d4f;
}

.input-with-icon.has-error:focus-within {
  box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2);
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

.error-hint {
  margin-top: 5px;
  color: #ff4d4f;
  font-size: 12px;
}

.gender-selection {
  display: flex;
  align-items: center;
}

.gender-label {
  margin-right: 15px;
  font-size: 14px;
  color: #666;
}

.gender-options {
  display: flex;
  gap: 20px;
}

.gender-option {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: 14px;
}

.agreement-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 5px;
  font-size: 14px;
  cursor: pointer;
}

.agreement-checkbox input {
  margin-top: 2px;
}

.agreement-checkbox a {
  color: #1890ff;
  text-decoration: none;
}

.agreement-checkbox a:hover {
  text-decoration: underline;
}

.register-button {
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

.register-button:hover {
  background-color: #40a9ff;
}

.register-button:disabled {
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

.login-prompt {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
}

.login-prompt a {
  color: #1890ff;
  text-decoration: none;
}

.login-prompt a:hover {
  text-decoration: underline;
}
</style> 