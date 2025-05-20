import axios from 'axios';

const API_URL = 'http://8.134.251.13:8080/api';

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 添加请求拦截器
apiClient.interceptors.request.use(
  config => {
    // 从localStorage获取token
    const token = localStorage.getItem('token');
    if (token) {
      // 为每个请求添加Authorization头
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器处理错误
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API请求错误:', error);
    return Promise.reject(error);
  }
);

// API服务对象
const apiService = {
  // 登录方法
  login(credentials) {
    return apiClient.post('/login', credentials);
  },
  
  // 注册方法
  register(userData) {
    return apiClient.post('/register', userData);
  },
  
  // 设置认证令牌
  setAuthToken(token) {
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // 保存token到localStorage
      localStorage.setItem('token', token);
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
      // 移除localStorage中的token
      localStorage.removeItem('token');
    }
  },
  
  // 从localStorage获取token
  getAuthToken() {
    return localStorage.getItem('token');
  },
  
  // 检查用户是否已登录
  isAuthenticated() {
    return !!this.getAuthToken();
  },
  
  // 更新个人信息
  updateProfile(userData) {
    return apiClient.post('/update-profile', userData);
  },
  
  // 获取团队信息
  getTeamInfo() {
    return apiClient.get('/team/info');
  },
  
  // 获取待审批学生列表
  getPendingStudents() {
    return apiClient.get('/students/pending');
  },
  
  // 批准学生加入团队
  approveStudent(studentId) {
    return apiClient.post('/students/approve', { student_id: studentId });
  },

  // 获取所有团队方向列表
  getAllOrientations() {
    return apiClient.get('/orientations');
  },
  
  // 获取指定教师创建的方向列表
  getTeacherOrientations(teacherId) {
    return apiClient.get(`/orientations/teacher/${teacherId}`);
  },

  // 获取我创建的方向列表
  getMyOrientations() {
    // 从localStorage获取用户ID
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const teacherId = userData.id || '';
    
    // 调用获取指定教师创建的方向接口
    return this.getTeacherOrientations(teacherId);
  },

  // 创建新方向
  addOrientation(orientationData) {
    return apiClient.post('/orientations/create', orientationData);
  },
  
  // 获取方向详情
  getOrientationDetail(orientationId) {
    return apiClient.get(`/orientations/detail/${orientationId}`);
  },
  
  // 获取方向申请列表
  getOrientationApplications(teacherId) {
    return apiClient.get(`/orientations/applications/${teacherId}`);
  },
  
  // 审批方向申请
  approveOrientationApplication(applicationData) {
    return apiClient.post('/orientations/approve', applicationData);
  },
  
  // 删除方向
  deleteOrientation(orientationId) {
    return apiClient.delete(`/orientations/${orientationId}`);
  },

  // 获取有效消息列表
  getActiveMessages() {
    return apiClient.get('/messages/active');
  },
  
  // 获取过期消息列表
  getExpiredMessages() {
    return apiClient.get('/messages/expired');
  },
  
  // 发布新消息
  publishMessage(messageData) {
    return apiClient.post('/messages/publish', messageData);
  },

  // 获取用户发布的消息列表
  getUserMessages(userData) {
    return apiClient.post('/messages/user', userData);
  },

  // 更新消息
  updateMessage(messageId, messageData) {
    const updateData = {
      message_id: messageId,
      title: messageData.title,
      content: messageData.content,
      priority: messageData.priority,
      expiredTime: messageData.expiredTime + ' 00:00:00' // 添加时间部分
    };
    return apiClient.put('/messages/update', updateData);
  },

  // 删除消息
  deleteMessage(messageId) {
    return apiClient.delete(`/messages/delete?id=${messageId}`);
  },
  
  // 获取可用设备列表（未借出的设备）
  getAvailableEquipments() {
    return apiClient.get('/equipments/available');
  },
  
  // 获取已借出设备列表
  getBorrowedEquipments() {
    return apiClient.get('/equipments/borrowed');
  },
  
  // 获取特定用户借用的设备
  getUserBorrowedEquipments(userData) {
    return apiClient.post('/equipments/user-borrowed', userData);
  },
  
  // 添加新设备（教师功能）
  addEquipment(deviceData) {
    return apiClient.post('/equipments/add', deviceData);
  },
  
  // 借阅设备
  borrowEquipment(borrowData) {
    return apiClient.post('/equipments/borrow', borrowData);
  },
  
  // 删除设备
  deleteEquipment(deviceId) {
    return apiClient.delete(`/equipments/delete/${deviceId}`);
  },
  
  // 更新设备信息
  updateEquipment(deviceId, deviceData) {
    return apiClient.put(`/equipments/update/${deviceId}`, deviceData);
  },
  
  // 归还设备
  returnEquipment(deviceId) {
    return apiClient.post(`/equipments/return/${deviceId}`);
  },
  
  // 获取特定方向的任务列表
  getOrientationTasks(orientationId) {
    return apiClient.get(`/tasks/orientation/${orientationId}`);
  },
  
  // 创建新任务
  createTask(taskData) {
    return apiClient.post('/tasks/create', taskData);
  },
  
  // 删除任务
  deleteTask(taskId) {
    return apiClient.delete(`/tasks/${taskId}`);
  },
  
  // 获取任务详情
  getTaskDetail(taskId) {
    return apiClient.get(`/tasks/${taskId}`);
  },
  
  // 更新任务信息
  updateTask(taskId, taskData) {
    return apiClient.put(`/tasks/${taskId}`, taskData);
  },
  
  // 获取任务进度记录
  getTaskProgress(taskId) {
    return apiClient.get(`/tasks/${taskId}/progress`);
  },
  
  // 创建任务进展记录
  createTaskProgress(progressData) {
    return apiClient.post('/tasks/progress/create', progressData);
  },
  
  // 删除任务进展记录
  deleteTaskProgress(progressId) {
    return apiClient.delete(`/tasks/progress/${progressId}`);
  },
  
  // 上传进度文件
  uploadProgressFile(progressId, formData) {
    return apiClient.post(`/files/progress/${progressId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  // 下载进度文件
  downloadProgressFile(progressId) {
    return apiClient.get(`/files/progress/${progressId}/download`, {
      responseType: 'blob' // 指定响应类型为blob
    });
  },
  
  // 删除进度文件
  deleteProgressFile(progressId) {
    return apiClient.delete(`/files/progress/${progressId}`);
  },
  
  // 获取方向任务完成情况统计
  getOrientationTaskStats(orientationId) {
    return apiClient.get(`/tasks/orientation/${orientationId}/stats`);
  },

  getAllTasksWithStatus() {
    // 获取用户数据和token
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const userId = userData.id;
    
    if (!userId) {
      return Promise.reject(new Error('No user ID available'));
    }

    // 构造正确格式的token
    const token = `token_${userId}`;
    
    return apiClient.get('/tasks/all-with-status', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },
  getPersonalTaskStats({ ownerId, ownerType }) {
    return apiClient.get(`/tasks/personal-stats?ownerId=${ownerId}&ownerType=${ownerType}`);
  },
  // 学生申请加入方向
  applyToOrientation({ orientationId, studentId, studentName, teacherId }) {
    return apiClient.post('/orientations/apply', {
      orientationId,
      studentId,
      studentName,
      teacherId
    });
  },
  // 获取带申请状态的所有方向列表
  getOrientationsWithStatus(studentId) {
    return apiClient.post('/orientations/with-status', { studentId });
  },
  getStudentOrientations(studentId) {
    return apiClient.get(`/orientations/student/${studentId}`);
  }
};

export default apiService; 