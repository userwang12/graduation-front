<template>
  <div class="main-layout">
    <!-- 左侧导航栏 -->
    <div class="sidebar">
      <div class="logo-container">
        <div class="logo">
          <img 
            src="../assets/logo.png" 
            alt="研究团队" 
            onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiMwMDc2ZmYiIHJ4PSI2Ii8+PGcgZmlsbD0id2hpdGUiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMTIiIHI9IjUiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjI1IiByPSI0Ii8+PGNpcmNsZSBjeD0iMjgiIGN5PSIyNSIgcj0iNCIvPjxsaW5lIHgxPSIyMCIgeTE9IjE3IiB4Mj0iMTQiIHkyPSIyMiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PGxpbmUgeDE9IjIwIiB5MT0iMTciIHgyPSIyNiIgeTI9IjIyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+'"
          >
        </div>
        <div class="team-name">研究团队</div>
      </div>
      
      <!-- 导航菜单 -->
      <nav class="nav-menu">
        <div 
          class="nav-item" 
          :class="{ 'active': activeMenu === 'profile' }"
          @click="setActiveMenu('profile')"
        >
          <i class="nav-icon">👤</i>
          <span>个人信息</span>
        </div>
        
        <div 
          class="nav-item" 
          :class="{ 'active': activeMenu === 'team' }"
          @click="setActiveMenu('team')"
        >
          <i class="nav-icon">👥</i>
          <span>团队信息</span>
        </div>
        
        <div 
          class="nav-item" 
          :class="{ 'active': activeMenu === 'direction' }"
          @click="setActiveMenu('direction')"
        >
          <i class="nav-icon">🧭</i>
          <span>方向管理</span>
        </div>
        
        <div 
          class="nav-item" 
          :class="{ 'active': activeMenu === 'device' }"
          @click="setActiveMenu('device')"
        >
          <i class="nav-icon">🖥️</i>
          <span>设备管理</span>
        </div>
        
        <div 
          class="nav-item" 
          :class="{ 'active': activeMenu === 'consumption' }"
          @click="setActiveMenu('consumption')"
        >
          <i class="nav-icon">📊</i>
          <span>消息列表</span>
        </div>
        
        <div 
          class="nav-item" 
          :class="{ 'active': activeMenu === 'results' }"
          @click="setActiveMenu('results')"
        >
          <i class="nav-icon">📈</i>
          <span>成果展示</span>
        </div>
      </nav>
    </div>
    
    <!-- 右侧内容区域 -->
    <div class="content-area">
      <!-- 头部导航 -->
      <div class="header">
        <div class="breadcrumb">
          主页 / {{ menuTitle }}
        </div>
        
        <div class="header-right">
          <div class="search-box">
            <input type="text" placeholder="搜索">
            <button>Alt S</button>
          </div>
          
          <div class="user-info" @click="showUserDropdown = !showUserDropdown">
            <img :src="userAvatar" alt="用户头像">
            <span>{{ userData.name || userData.username }}</span>
            <div class="user-dropdown" v-if="showUserDropdown">
              <div class="dropdown-item" @click="logout">退出登录</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 内容区域 -->
      <div class="content">
        <!-- 使用 v-if/v-else-if 链确保只有一个内容区域显示 -->
        <div v-if="activeMenu === 'profile'" class="profile-panel">
          <div class="profile-header">
            <h2>个人信息</h2>
            <button @click="showEditModal = true" class="edit-button">
              编辑资料
            </button>
          </div>
          
          <div class="profile-grid">
            <div class="profile-item">
              <label>姓名</label>
              <div>{{ userData.name || userData.username }}</div>
            </div>
            
            <div class="profile-item">
              <label>邮件</label>
              <div>{{ userData.email || "未绑定" }}</div>
            </div>
            
            <div class="profile-item">
              <label>年龄</label>
              <div>{{ userData.age || "0" }}</div>
            </div>
            
            <div class="profile-item">
              <label>性别</label>
              <div>{{ userData.sex === 'man' ? '男' : '女' }}</div>
            </div>
            
            <div class="profile-item">
              <label>电话号码</label>
              <div>{{ userData.phone || "未绑定" }}</div>
            </div>
            
            <div class="profile-item">
              <label>地址</label>
              <div>{{ userData.address || "未绑定" }}</div>
            </div>
            
            <div class="profile-item">
              <label>QQ</label>
              <div>{{ userData.qq || "未绑定" }}</div>
            </div>
            
            <div class="profile-item">
              <label>微信</label>
              <div>{{ userData.wechat || "未绑定" }}</div>
            </div>
          </div>
          
          <!-- 编辑模态框 -->
          <div v-if="showEditModal" class="modal-overlay" @click.self="showEditModal = false">
            <div class="modal-content">
              <div class="modal-header">
                <h3>编辑个人信息</h3>
                <button @click="showEditModal = false" class="close-button">&times;</button>
              </div>
              
              <div class="modal-body">
                <div class="form-group">
                  <label>姓名</label>
                  <input v-model="editedUserData.name" type="text" class="form-input" />
                </div>
                
                <div class="form-group">
                  <label>邮件</label>
                  <input v-model="editedUserData.email" type="email" class="form-input" />
                </div>
                
                <div class="form-group">
                  <label>年龄</label>
                  <input v-model="editedUserData.age" type="number" class="form-input" />
                </div>
                
                <div class="form-group">
                  <label>性别</label>
                  <select v-model="editedUserData.sex" class="form-input">
                    <option value="man">男</option>
                    <option value="woman">女</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label>电话号码</label>
                  <input v-model="editedUserData.phone" type="tel" class="form-input" />
                </div>
                
                <div class="form-group">
                  <label>地址</label>
                  <input v-model="editedUserData.address" type="text" class="form-input" />
                </div>
                
                <div class="form-group">
                  <label>QQ</label>
                  <input v-model="editedUserData.qq" type="text" class="form-input" />
                </div>
                
                <div class="form-group">
                  <label>微信</label>
                  <input v-model="editedUserData.wechat" type="text" class="form-input" />
                </div>
              </div>
              
              <div class="modal-footer">
                <button @click="saveChanges" class="save-button" :disabled="isUpdating">
                  {{ isUpdating ? '保存中...' : '保存修改' }}
                </button>
                <button @click="showEditModal = false" class="cancel-button">取消</button>
              </div>
              
              <div v-if="updateMessage" :class="['update-message', updateSuccess ? 'success' : 'error']">
                {{ updateMessage }}
              </div>
            </div>
          </div>
        </div>
        
        <div v-else-if="activeMenu === 'team'" class="team-panel">
          <div class="profile-header">
            <h2>团队信息</h2>
          </div>
          
          <!-- 学生用户未获得权限时的提示 -->
          <div v-if="isStudent && userData.permitted !== 'yes'" class="permission-notice">
            <div class="notice-icon">⚠️</div>
            <p>您还未被同意加入到团队，请耐心等待</p>
          </div>
          
          <!-- 有权限查看团队信息时的表格展示 -->
          <div v-else>
            <!-- 添加标签页导航，学生端只有一个团队成员标签 -->
            <div class="tabs-nav">
              <div
                class="tab-item active"
              >
                团队成员
              </div>
            </div>
            
            <div class="tab-content">
              <div v-if="isLoading" class="loading-indicator">
                <p>加载团队信息中...</p>
              </div>
              
              <div v-else-if="teamLoadError" class="error-message">
                <p>{{ teamLoadError }}</p>
              </div>
              
              <div v-else class="tab-panel">
                <!-- 教师信息表格 -->
                <div class="team-section">
                  <h3>指导教师</h3>
                  <div class="table-wrapper">
                    <table class="team-table">
                      <thead>
                        <tr>
                          <th>姓名</th>
                          <th>邮箱</th>
                          <th>性别</th>
                          <th>年龄</th>
                          <th>电话</th>
                          <th>地址</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="teacher in teamInfo.teachers" :key="'teacher-'+teacher.id">
                          <td>{{ teacher.name }}</td>
                          <td>{{ teacher.email || '未设置' }}</td>
                          <td>{{ teacher.sex === 'man' ? '男' : '女' }}</td>
                          <td>{{ teacher.age }}</td>
                          <td>{{ teacher.phone }}</td>
                          <td>{{ teacher.address || '未设置' }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <!-- 学生信息表格 -->
                <div class="team-section">
                  <h3>团队成员</h3>
                  <div class="table-wrapper">
                    <table class="team-table">
                      <thead>
                        <tr>
                          <th>姓名</th>
                          <th>邮箱</th>
                          <th>性别</th>
                          <th>年龄</th>
                          <th>电话</th>
                          <th>地址</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="student in teamInfo.students" :key="'student-'+student.id">
                          <td>{{ student.name }}</td>
                          <td>{{ student.email || '未设置' }}</td>
                          <td>{{ student.sex === 'man' ? '男' : '女' }}</td>
                          <td>{{ student.age }}</td>
                          <td>{{ student.phone }}</td>
                          <td>{{ student.address || '未设置' }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 方向管理页面 -->
        <div v-else-if="activeMenu === 'direction'" class="empty-content">
          <p>方向管理功能正在开发中，敬请期待...</p>
        </div>
        
        <!-- 设备管理页面 -->
        <div v-else-if="activeMenu === 'device'" class="device-panel">
          <div class="panel-header">
            <h2>设备管理页面</h2>
          </div>
          
          <div class="device-content">
            <!-- 设备标签页导航 -->
            <div class="device-tabs">
              <div 
                :class="['device-tab', activeDeviceTab === 'available' ? 'active' : '']" 
                @click="setActiveDeviceTab('available')"
              >
                空闲设备
              </div>
              <div 
                :class="['device-tab', activeDeviceTab === 'borrowed' ? 'active' : '']" 
                @click="setActiveDeviceTab('borrowed')"
              >
                未归还设备
              </div>
              <div 
                :class="['device-tab', activeDeviceTab === 'my-borrowed' ? 'active' : '']" 
                @click="setActiveDeviceTab('my-borrowed')"
              >
                我借的设备
              </div>
            </div>
            
            <!-- 设备列表内容 -->
            <div class="device-list-container">
              <!-- 加载状态 -->
              <div v-if="isLoadingDevices" class="loading-container">
                <div class="loading-spinner"></div>
                <div>加载中...</div>
              </div>
              
              <!-- 错误信息 -->
              <div v-else-if="deviceError" class="error-message">
                {{ deviceError }}
              </div>
              
              <!-- 空列表提示 -->
              <div v-else-if="currentDevices.length === 0" class="empty-message">
                暂无{{ activeDeviceTab === 'available' ? '空闲' : activeDeviceTab === 'borrowed' ? '未归还' : '借用' }}设备
              </div>
              
              <!-- 设备表格 -->
              <div v-else class="device-table-wrapper">
                <table class="device-table">
                  <thead>
                    <tr>
                      <th>设备名称</th>
                      <th>设备位置</th>
                      <th>入库时间</th>
                      <th v-if="activeDeviceTab === 'borrowed'">借用者</th>
                      <th v-if="activeDeviceTab === 'borrowed'">借用时间</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="device in currentDevices" :key="'device-'+device.id">
                      <td>{{ device.name }}</td>
                      <td>{{ device.address }}</td>
                      <td>{{ formatDate(device.time) }}</td>
                      <td v-if="activeDeviceTab === 'borrowed'">{{ device.borrower_name || '未知' }}</td>
                      <td v-if="activeDeviceTab === 'borrowed'">{{ formatDate(device.borrow_time) }}</td>
                      <td class="device-actions">
                        <!-- 空闲设备操作：只有借阅按钮 -->
                        <template v-if="activeDeviceTab === 'available'">
                          <button class="borrow-btn" @click="borrowDevice(device.id)">借阅</button>
                        </template>
                        
                        <!-- 已借出设备：无操作按钮 -->
                        <template v-else-if="activeDeviceTab === 'borrowed'">
                          <span class="status-badge">已借出</span>
                        </template>
                        
                        <!-- 我借的设备：归还按钮 -->
                        <template v-else>
                          <button class="return-btn" @click="returnDevice(device.borrow_id)">归还</button>
                        </template>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 消息列表页面 -->
        <div v-else-if="activeMenu === 'consumption'" class="message-panel">
          <div class="panel-header">
            <h2>消息管理</h2>
            <button class="publish-btn" @click="showPublishForm = true">发布新消息</button>
          </div>
          
          <!-- 学生用户未获得权限时的提示，与团队信息页面相同 -->
          <div v-if="isStudent && userData.permitted !== 'yes'" class="permission-notice">
            <div class="notice-icon">⚠️</div>
            <p>您还未被同意加入到团队，请耐心等待</p>
          </div>
          
          <!-- 有权限查看时显示消息列表功能 -->
          <div v-else class="message-content-wrapper">
            <div class="message-tabs">
              <div 
                :class="['message-tab', activeMessageTab === 'active' ? 'active' : '']" 
                @click="setActiveMessageTab('active')"
              >
                有效消息
              </div>
              <div 
                :class="['message-tab', activeMessageTab === 'expired' ? 'active' : '']" 
                @click="setActiveMessageTab('expired')"
              >
                历史消息
              </div>
              <div 
                :class="['message-tab', activeMessageTab === 'my-messages' ? 'active' : '']" 
                @click="setActiveMessageTab('my-messages')"
              >
                我的消息
              </div>
            </div>
            
            <!-- 消息列表 -->
            <div class="message-list-container">
              <div v-if="isLoadingMessages" class="loading-container">
                <div class="loading-spinner"></div>
                <div>加载中...</div>
              </div>
              
              <div v-else-if="messageError" class="error-message">
                {{ messageError }}
              </div>
              
              <div v-else-if="activeMessageTab === 'active' && activeMessages.length === 0" class="empty-message">
                暂无有效消息
              </div>
              
              <div v-else-if="activeMessageTab === 'expired' && expiredMessages.length === 0" class="empty-message">
                暂无历史消息
              </div>
              
              <div v-else-if="activeMessageTab === 'my-messages' && myMessages.length === 0" class="empty-message">
                您尚未发布任何消息
              </div>
              
              <div v-else-if="activeMessageTab === 'my-messages'" class="message-list">
                <div v-for="(message, index) in myMessages" :key="'my-msg-'+message.id || index" class="message-item">
                  <div class="message-header">
                    <span class="message-title">{{ message.title }}</span>
                    <div class="message-meta">
                      <span 
                        :class="['priority-tag', getPriorityClass(message.priority)]" 
                        :title="getPriorityText(message.priority)"
                      >
                        {{ getPriorityText(message.priority) }}
                      </span>
                      <span class="message-status" v-if="message.is_expired">已过期</span>
                      <span class="message-date">{{ formatDate(message.releasedTime) }}</span>
                    </div>
                  </div>
                  <div class="message-content">{{ message.content }}</div>
                  <div class="message-footer">
                    <span class="message-expiry">有效期至: {{ formatDate(message.expiredTime) }}</span>
                    <div class="message-actions">
                      <button class="edit-message-btn" @click="editMessage(message)">编辑</button>
                      <button class="delete-message-btn" @click="confirmDeleteMessage(message.id)">删除</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-else class="message-list">
                <div v-for="(message, index) in currentMessages" :key="'msg-'+message.id || index" class="message-item">
                  <div class="message-header">
                    <span class="message-title">{{ message.title }}</span>
                    <div class="message-meta">
                      <span 
                        :class="['priority-tag', getPriorityClass(message.priority)]" 
                        :title="getPriorityText(message.priority)"
                      >
                        {{ getPriorityText(message.priority) }}
                        <small v-if="message.priority" class="debug-info">({{ message.priority }})</small>
                      </span>
                      <span class="message-date">{{ formatDate(message.publishDate || message.releasedTime) }}</span>
                    </div>
                  </div>
                  <div class="message-content">{{ message.content }}</div>
                  <div class="message-footer">
                    <span class="message-publisher">发布者: {{ message.publisher || message.userName }}</span>
                    <span class="message-expiry">有效期至: {{ formatDate(message.expiryDate || message.expiredTime) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 发布消息表单 -->
          <div v-if="showPublishForm" class="publish-form-overlay" @click.self="showPublishForm = false">
            <div class="publish-form">
              <div class="form-header">
                <h3>发布新消息</h3>
                <button @click="showPublishForm = false" class="close-button">&times;</button>
              </div>
              
              <div class="form-body">
                <div class="form-group">
                  <label for="messageTitle">标题</label>
                  <input id="messageTitle" v-model="newMessage.title" type="text" class="form-control">
                </div>
                
                <div class="form-group">
                  <label for="messageContent">内容</label>
                  <textarea 
                    id="messageContent" 
                    v-model="newMessage.content" 
                    rows="5" 
                    class="form-control"
                  ></textarea>
                </div>
                
                <div class="form-group">
                  <label for="messagePriority">优先级</label>
                  <select id="messagePriority" v-model="newMessage.priority" class="form-control">
                    <option value="normal">普通</option>
                    <option value="important">重要</option>
                    <option value="urgent">紧急</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label for="messageExpiry">有效期至</label>
                  <input 
                    id="messageExpiry" 
                    v-model="newMessage.expiredTime" 
                    type="date" 
                    class="form-control"
                  >
                  <small class="form-text">默认时间为所选日期的00:00:00</small>
                </div>
              </div>
              
              <div class="form-footer">
                <button 
                  @click="publishNewMessage" 
                  class="publish-button" 
                  :disabled="isPublishing"
                >
                  {{ isPublishing ? '发布中...' : '发布消息' }}
                </button>
                <button @click="showPublishForm = false" class="cancel-button">取消</button>
              </div>
              
              <div v-if="publishError" class="error-message">
                {{ publishError }}
              </div>
            </div>
          </div>
        </div>
        
        <div v-else-if="activeMenu === 'results'" class="empty-content">
          <p>成果展示功能正在开发中，敬请期待...</p>
        </div>
        
        <div v-else class="empty-content">
          <p>未知页面</p>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 编辑消息模态框 -->
  <div v-if="showEditMessageModal" class="modal-overlay" @click.self="showEditMessageModal = false">
    <div class="edit-modal">
      <h3 class="edit-modal-title">编辑消息</h3>
      <button class="close-btn" @click="showEditMessageModal = false">&times;</button>
      
      <div class="edit-form">
        <div class="form-group">
          <label for="editMessageTitle">标题</label>
          <input 
            id="editMessageTitle" 
            v-model="editedMessage.title" 
            type="text" 
            class="form-control"
          />
        </div>
        
        <div class="form-group">
          <label for="editMessageContent">内容</label>
          <textarea 
            id="editMessageContent" 
            v-model="editedMessage.content" 
            rows="5" 
            class="form-control"
          ></textarea>
        </div>
        
        <div class="form-group">
          <label for="editMessagePriority">优先级</label>
          <select 
            id="editMessagePriority" 
            v-model="editedMessage.priority" 
            class="form-control"
          >
            <option value="normal">普通</option>
            <option value="important">重要</option>
            <option value="urgent">紧急</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="editMessageExpiry">有效期至</label>
          <input 
            id="editMessageExpiry" 
            v-model="editedMessage.expiredTime" 
            type="date" 
            class="form-control"
          />
          <small class="form-text">默认时间为所选日期的00:00:00</small>
        </div>
      </div>
      
      <div class="edit-actions">
        <button @click="showEditMessageModal = false" class="cancel-btn">取消</button>
        <button @click="saveMessageChanges" class="save-btn" :disabled="isUpdatingMessage">
          {{ isUpdatingMessage ? '保存中...' : '保存修改' }}
        </button>
      </div>
      
      <div v-if="updateMessageError" class="update-message error">
        {{ updateMessageError }}
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '../services/api.js';

export default {
  name: "HomePage",
  props: {
    initialUserData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeMenu: 'profile', // 默认选中个人信息
      userData: {},
      showUserDropdown: false,
      userAvatar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iIzRDQUY1MCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+VTwvdGV4dD48L3N2Zz4=',
      showEditModal: false,
      editedUserData: {},
      isUpdating: false,
      updateMessage: '',
      updateSuccess: false,
      teamInfo: {
        teachers: [],
        students: []
      },
      isLoading: false,
      teamLoadError: '',
      
      // 消息管理相关数据
      activeMessageTab: 'active',  // 默认显示有效消息
      activeMessages: [],          // 存储有效消息
      expiredMessages: [],         // 存储过期消息
      myMessages: [],              // 存储用户发布的消息
      isLoadingMessages: false,    // 加载中状态
      messageError: null,          // 消息加载错误
      
      // 消息发布相关
      showPublishForm: false,      // 控制发布表单显示
      newMessage: {                // 新消息对象
        title: '',
        content: '',
        userId: '',
        userType: 'student',
        userName: '',
        expiredTime: '',
        priority: 'normal'
      },
      isPublishing: false,         // 发布中状态
      publishError: null,          // 发布错误信息
      
      // 消息编辑相关
      showEditMessageModal: false, // 控制编辑模态框显示
      editedMessage: {             // 要编辑的消息
        id: '',
        title: '',
        content: '',
        priority: 'normal',
        expiredTime: ''
      },
      isUpdatingMessage: false,    // 更新消息中状态
      updateMessageError: null,    // 更新消息错误信息
      
      // 设备管理相关数据
      activeDeviceTab: 'available',       // 当前激活的设备标签页
      availableDevices: [],               // 可用设备列表
      borrowedDevices: [],                // 已借出设备列表
      myBorrowedDevices: [],              // 我借用的设备列表
      isLoadingDevices: false,            // 加载设备列表状态
      deviceError: null,                  // 设备列表加载错误信息
    };
  },
  computed: {
    menuTitle() {
      switch(this.activeMenu) {
        case 'profile': return '个人信息';
        case 'team': return '团队信息';
        case 'direction': return '方向管理';
        case 'device': return '设备管理';
        case 'consumption': return '消息列表';
        case 'results': return '成果展示';
        default: return '';
      }
    },
    isStudent() {
      console.log('当前用户类型:', localStorage.getItem('userType'));
      return localStorage.getItem('userType') === 'student';
    },
    isPermitted() {
      return String(this.userData.permitted) === 'yes';
    },
    // 当前显示的消息列表
    currentMessages() {
      const messages = this.activeMessageTab === 'active' 
        ? this.activeMessages 
        : this.expiredMessages;
      
      // 根据优先级和发布时间排序
      return [...messages].sort((a, b) => {
        // 优先级排序权重
        const priorityWeight = {
          'urgent': 3,
          'important': 2,
          'normal': 1
        };
        
        // 首先按优先级排序
        const priorityDiff = (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
        if (priorityDiff !== 0) {
          return priorityDiff;
        }
        
        // 优先级相同时，按发布时间从新到旧排序
        const dateA = new Date(a.publishDate || a.releasedTime || 0);
        const dateB = new Date(b.publishDate || b.releasedTime || 0);
        return dateB - dateA;
      });
    },
    // 当前显示的设备列表
    currentDevices() {
      if (this.activeDeviceTab === 'available') {
        return this.availableDevices;
      } else if (this.activeDeviceTab === 'borrowed') {
        return this.borrowedDevices;
      } else {
        return this.myBorrowedDevices;
      }
    }
  },
  methods: {
    logout() {
      // 移除token和相关数据
      apiService.setAuthToken(null);
      localStorage.removeItem('savedUsername');
      localStorage.removeItem('userData');
      
      // 通知父组件退出登录
      this.$emit('logout');
    },
    setActiveMenu(menu) {
      this.activeMenu = menu;
      
      if (menu === 'team') {
        this.loadTeamInfo();
      } else if (menu === 'consumption') {
        // 切换到消息列表页面时直接加载消息数据
        // 如果用户已获得许可，加载消息数据
        if (this.isPermitted) {
          this.activeMessageTab = 'active'; // 默认显示有效消息标签页
          this.loadMessages();
        }
      } else if (menu === 'device') {
        // 切换到设备管理页面时加载设备数据
        console.log('进入设备管理页面，准备加载空闲设备数据');
        
        // 设置默认标签页为空闲设备
        this.activeDeviceTab = 'available';
        this.deviceError = null;
        
        // 加载设备数据
        this.loadDevices();
      }
    },
    async saveChanges() {
      this.isUpdating = true;
      this.updateMessage = '';
      
      try {
        // 准备提交的数据
        const updateData = {
          ...this.editedUserData,
          user_id: this.userData.id,
          user_type: localStorage.getItem('userType') || 'student'
        };
        
        // 调用API
        const response = await apiService.updateProfile(updateData);
        
        if (response.data.success) {
          // 更新成功
          this.userData = {...this.userData, ...this.editedUserData};
          this.updateMessage = '个人信息更新成功！';
          this.updateSuccess = true;
          
          // 更新localStorage中的用户数据
          localStorage.setItem('userData', JSON.stringify(this.userData));
          
          // 3秒后关闭模态框
          setTimeout(() => {
            this.showEditModal = false;
            this.updateMessage = '';
          }, 1000);
        } else {
          // 更新失败
          this.updateMessage = response.data.message || '更新失败，请重试';
          this.updateSuccess = false;
        }
      } catch (error) {
        // 处理错误
        this.updateMessage = '更新个人信息时发生错误';
        this.updateSuccess = false;
        console.error('更新个人信息错误:', error);
      } finally {
        this.isUpdating = false;
      }
    },
    async loadTeamInfo() {
      // 更准确的权限判断 
      if (this.isStudent && String(this.userData.permitted) !== 'yes') {
        console.log('学生用户无权查看团队信息:', this.userData);
        return;
      }
      
      this.isLoading = true;
      this.teamLoadError = '';
      
      try {
        const response = await apiService.getTeamInfo();
        if (response.data.success) {
          this.teamInfo = response.data.data;
        } else {
          this.teamLoadError = response.data.message || '加载团队信息失败';
        }
      } catch (error) {
        console.error('获取团队信息错误:', error);
        this.teamLoadError = '加载团队信息时发生错误，请稍后再试';
      } finally {
        this.isLoading = false;
      }
    },
    setActiveMessageTab(tab) {
      this.activeMessageTab = tab;
      this.loadMessages();
    },
    loadMessages() {
      this.isLoadingMessages = true;
      this.messageError = null;
      
      let apiPromise;
      
      if (this.activeMessageTab === 'my-messages') {
        // 加载用户自己发布的消息
        const userData = {
          userId: this.userData.id || '1',
          userType: 'student'
        };
        apiPromise = apiService.getUserMessages(userData);
      } else {
        // 加载有效或过期消息
        const apiMethod = this.activeMessageTab === 'active' 
          ? apiService.getActiveMessages 
          : apiService.getExpiredMessages;
        apiPromise = apiMethod();
      }
      
      apiPromise
        .then(response => {
          console.log('获取消息响应:', response.data);
          
          if (response.data && response.data.success) {
            // 修正: API返回的消息数组在data字段中
            const messagesData = response.data.data || [];
            
            if (this.activeMessageTab === 'my-messages') {
              // 我的消息直接使用返回的数据
              this.myMessages = messagesData;
              console.log('已加载我的消息:', this.myMessages.length);
            } else {
              // 有效/历史消息的处理逻辑保持不变
              const formattedMessages = messagesData.map(msg => ({
                id: msg.id,
                title: msg.title,
                content: msg.content,
                publishDate: msg.releasedTime, // 发布时间映射
                expiryDate: msg.expiredTime,   // 过期时间映射
                publisher: msg.userName,        // 发布者映射
                userId: msg.userId,
                userType: msg.userType,
                priority: msg.priority || 'normal' // 添加优先级映射，默认为normal
              }));
              
              console.log('格式化后的消息数据:', formattedMessages);
              
              if (this.activeMessageTab === 'active') {
                this.activeMessages = formattedMessages;
                console.log('已加载有效消息:', this.activeMessages.length);
              } else {
                this.expiredMessages = formattedMessages;
                console.log('已加载历史消息:', this.expiredMessages.length);
              }
            }
          } else {
            this.messageError = response.data?.message || '加载消息列表失败';
            console.error('加载消息列表失败:', response.data);
          }
        })
        .catch(error => {
          console.error('加载消息列表错误:', error);
          this.messageError = '加载消息列表失败，请稍后重试';
        })
        .finally(() => {
          this.isLoadingMessages = false;
        });
    },
    publishNewMessage() {
      if (!this.validateMessageForm()) {
        return;
      }
      
      this.isPublishing = true;
      this.publishError = null;
      
      // 准备发送的消息数据
      const messageData = {
        userId: this.userData.id || '1',
        title: this.newMessage.title,
        content: this.newMessage.content,
        userType: 'student',
        userName: this.userData.name || this.userData.username || '学生',
        expiredTime: this.newMessage.expiredTime + ' 00:00:00',
        priority: this.newMessage.priority
      };
      
      console.log('发送消息数据:', messageData);
      
      apiService.publishMessage(messageData)
        .then(response => {
          console.log('消息发布成功:', response);
          this.showPublishForm = false;
          this.resetMessageForm();
          this.loadMessages(); // 重新加载消息列表
          
          // 显示成功提示
          alert('消息发布成功!');
        })
        .catch(error => {
          console.error('发布消息错误:', error);
          this.publishError = '发布消息失败，请稍后重试';
          
          // 显示更详细的错误信息，帮助调试
          if (error.response) {
            console.error('错误响应数据:', error.response.data);
            this.publishError = error.response.data.message || '发布消息失败，请稍后重试';
          }
        })
        .finally(() => {
          this.isPublishing = false;
        });
    },
    cancelPublish() {
      this.showPublishForm = false;
      this.resetMessageForm();
    },
    resetMessageForm() {
      // 直接内联创建新消息对象，而不是调用resetNewMessage
      const date = new Date();
      date.setDate(date.getDate() + 30);
      const defaultExpiry = date.toISOString().split('T')[0]; // 格式化为YYYY-MM-DD
      
      this.newMessage = {
        title: '',
        content: '',
        userId: this.userData.id || '1',
        userType: 'student',
        userName: this.userData.name || this.userData.username || '学生',
        expiredTime: defaultExpiry,
        priority: 'normal'
      };
      
      this.publishError = null;
    },
    validateMessageForm() {
      if (!this.newMessage.title.trim()) {
        this.publishError = '请输入消息标题';
        return false;
      }
      
      if (!this.newMessage.content.trim()) {
        this.publishError = '请输入消息内容';
        return false;
      }
      
      if (!this.newMessage.expiredTime) {
        this.publishError = '请选择有效期';
        return false;
      }
      
      // 验证用户ID
      if (!this.newMessage.userId) {
        this.newMessage.userId = this.userData.id || '1';
      }
      
      // 验证用户姓名
      if (!this.newMessage.userName) {
        this.newMessage.userName = this.userData.name || this.userData.username || '学生';
      }
      
      return true;
    },
    getDefaultExpiryDate() {
      const date = new Date();
      date.setDate(date.getDate() + 30);
      return date.toISOString().split('T')[0]; // 格式化为YYYY-MM-DD
    },
    formatDate(dateStr) {
      if (!dateStr) return '-';
      
      try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('zh-CN', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (e) {
        return dateStr;
      }
    },
    getPriorityClass(priority) {
      const priorityClasses = {
        'urgent': 'urgent-tag',
        'important': 'important-tag',
        'normal': 'normal-tag'
      };
      
      // 增加调试日志
      if (!priority) {
        console.warn('收到空的priority值:', priority);
      } else if (!priorityClasses[priority]) {
        console.warn('收到未知的priority值:', priority);
      }
      
      return priorityClasses[priority] || 'normal-tag';
    },
    getPriorityText(priority) {
      const priorityTexts = {
        'urgent': '紧急',
        'important': '重要',
        'normal': '普通'
      };
      
      // 增加调试日志
      if (!priority && priority !== '') {
        console.warn('收到空的priority值:', priority);
      } else if (!priorityTexts[priority]) {
        console.warn('收到未知的priority值:', priority);
      }
      
      return priorityTexts[priority] || '普通';
    },
    editMessage(message) {
      // 提取日期部分，去掉时间
      let expiredDate = message.expiredTime;
      if (expiredDate && expiredDate.includes(' ')) {
        expiredDate = expiredDate.split(' ')[0];
      }
      
      this.editedMessage = {
        id: message.id,
        title: message.title,
        content: message.content,
        priority: message.priority || 'normal',
        expiredTime: expiredDate
      };
      
      this.updateMessageError = null;
      this.showEditMessageModal = true;
    },
    async saveMessageChanges() {
      this.isUpdatingMessage = true;
      this.updateMessageError = null;
      
      try {
        // 调用API更新消息
        const response = await apiService.updateMessage(this.editedMessage.id, this.editedMessage);
        
        if (response.data.success) {
          // 更新成功
          this.showEditMessageModal = false;
          this.updateMessageError = null;
          this.loadMessages(); // 重新加载消息列表
          
          // 显示成功提示
          alert('消息更新成功!');
        } else {
          // 更新失败
          this.updateMessageError = response.data.message || '更新消息失败，请稍后重试';
        }
      } catch (error) {
        console.error('更新消息错误:', error);
        this.updateMessageError = '更新消息时发生错误，请稍后重试';
      } finally {
        this.isUpdatingMessage = false;
      }
    },
    confirmDeleteMessage(id) {
      if (confirm('确定要删除这条消息吗？')) {
        this.deleteMessage(id);
      }
    },
    async deleteMessage(id) {
      try {
        // 调用API删除消息
        const response = await apiService.deleteMessage(id);
        
        if (response.data.success) {
          // 删除成功
          this.loadMessages(); // 重新加载消息列表
          
          // 显示成功提示
          alert('消息删除成功!');
        } else {
          // 删除失败
          alert(response.data.message || '删除消息失败，请稍后重试');
        }
      } catch (error) {
        console.error('删除消息错误:', error);
        alert('删除消息时发生错误，请稍后重试');
      }
    },
    // 设置当前设备标签页
    setActiveDeviceTab(tab) {
      // 如果切换到相同的标签页，不做任何操作
      if (this.activeDeviceTab === tab) {
        return;
      }
      
      // 切换标签页
      this.activeDeviceTab = tab;
      
      // 立即设置加载状态，给用户视觉反馈
      this.isLoadingDevices = true;
      
      // 确保DOM更新后加载数据
      this.$nextTick(() => {
        this.loadDevices();
        console.log(`已切换到${tab}标签页并加载相应数据`);
      });
    },
    // 加载设备列表
    loadDevices() {
      console.log(`开始加载设备数据，当前标签页: ${this.activeDeviceTab}`);
      
      this.isLoadingDevices = true;
      this.deviceError = null;
      
      let apiPromise;
      
      if (this.activeDeviceTab === 'available') {
        // 加载可用设备列表
        console.log('准备获取空闲设备列表');
        apiPromise = apiService.getAvailableEquipments();
      } else if (this.activeDeviceTab === 'borrowed') {
        // 加载已借出设备列表
        console.log('准备获取已借出设备列表');
        apiPromise = apiService.getBorrowedEquipments();
      } else {
        // 加载我借用的设备列表
        console.log('准备获取我借用的设备列表');
        const userData = {
          borrowerType: 'student',
          borrowerId: this.userData.id || '1'
        };
        apiPromise = apiService.getUserBorrowedEquipments(userData);
      }
      
      apiPromise
        .then(response => {
          console.log(`设备数据响应(${this.activeDeviceTab}):`, response.data);
          
          if (response.data && response.data.success) {
            const devicesData = response.data.data || [];
            
            if (this.activeDeviceTab === 'available') {
              this.availableDevices = devicesData;
              console.log(`已加载空闲设备: ${this.availableDevices.length}个`);
            } else if (this.activeDeviceTab === 'borrowed') {
              this.borrowedDevices = devicesData;
              console.log(`已加载已借出设备: ${this.borrowedDevices.length}个`);
            } else {
              this.myBorrowedDevices = devicesData;
              console.log(`已加载我借用的设备: ${this.myBorrowedDevices.length}个`);
            }
            
            // 检查是否有设备数据
            if (
              (this.activeDeviceTab === 'available' && this.availableDevices.length === 0) ||
              (this.activeDeviceTab === 'borrowed' && this.borrowedDevices.length === 0) ||
              (this.activeDeviceTab === 'my-borrowed' && this.myBorrowedDevices.length === 0)
            ) {
              console.log(`${this.activeDeviceTab}设备列表为空`);
            }
          } else {
            this.deviceError = response.data?.message || '加载设备列表失败';
            console.error(`加载${this.activeDeviceTab}设备列表失败:`, response.data);
          }
        })
        .catch(error => {
          console.error(`加载${this.activeDeviceTab}设备列表错误:`, error);
          this.deviceError = '加载设备列表失败，请稍后重试';
        })
        .finally(() => {
          this.isLoadingDevices = false;
          console.log(`${this.activeDeviceTab}设备加载完成，加载状态已重置`);
        });
    },
    // 借阅设备
    borrowDevice(deviceId) {
      // 准备借阅数据
      const borrowData = {
        equipmentId: deviceId,
        borrowerType: 'student'
      };
      
      apiService.borrowEquipment(borrowData)
        .then(response => {
          console.log('设备借阅成功:', response);
          this.loadDevices(); // 重新加载设备列表
          
          // 显示成功提示
          alert('设备借阅成功!');
        })
        .catch(error => {
          console.error('借阅设备错误:', error);
          alert('借阅设备失败，请稍后重试');
        });
    },
    // 归还设备
    returnDevice(borrowId) {
      // 获取借阅ID
      if (!borrowId) {
        alert('借阅记录ID无效，无法归还设备');
        return;
      }
      
      // 显示确认对话框
      if (confirm('确定要归还这个设备吗？')) {
        // 调用API归还设备
        apiService.returnEquipment(borrowId)
          .then(response => {
            if (response.data && response.data.success) {
              console.log('设备归还成功:', response.data);
              // 显示成功消息
              alert('设备归还成功!');
              // 重新加载设备列表
              this.loadDevices();
            } else {
              // API返回失败信息
              const errorMsg = response.data?.message || '归还设备失败，请稍后重试';
              console.error('归还设备失败:', errorMsg);
              alert(errorMsg);
            }
          })
          .catch(error => {
            // 处理网络错误等异常情况
            console.error('归还设备错误:', error);
            let errorMessage = '归还设备时发生错误，请稍后重试';
            
            // 如果有详细的错误响应数据，提取并显示
            if (error.response && error.response.data) {
              errorMessage = error.response.data.message || errorMessage;
            }
            
            alert(errorMessage);
          });
      }
    },
  },
  created() {
    // 初始化用户数据
    this.userData = this.initialUserData || {};
    
    console.log('初始化用户数据:', this.userData);
    
    // 初始化新消息表单 - 直接内联替代方法调用
    const date = new Date();
    date.setDate(date.getDate() + 30);
    const defaultExpiry = date.toISOString().split('T')[0]; // 格式化为YYYY-MM-DD
    
    this.newMessage = {
      title: '',
      content: '',
      userId: this.userData.id || '1',
      userType: 'student',
      userName: this.userData.name || this.userData.username || '学生',
      expiredTime: defaultExpiry,
      priority: 'normal'
    };
  },
  watch: {
    // 监听模态框显示状态，当显示时初始化编辑数据
    showEditModal(newVal) {
      if (newVal) {
        this.editedUserData = JSON.parse(JSON.stringify(this.userData));
        this.updateMessage = '';
      }
    }
  }
};
</script>

<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: #f5f5f5;
}

/* 左侧导航栏样式 */
.sidebar {
  width: 180px;
  min-width: 180px; /* 保证不会被压缩 */
  background-color: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  position: relative; /* 确保z-index生效 */
  z-index: 10; /* 确保侧边栏位于顶层 */
}

.logo-container {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #333;
}

.logo {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo img {
  max-width: 100%;
  max-height: 100%;
}

.team-name {
  font-size: 18px;
  font-weight: 500;
}

.nav-menu {
  flex: 1;
  padding: 20px 0;
}

.nav-item {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
}

.nav-item:hover {
  background-color: #333;
}

.nav-item.active {
  background-color: #444;
  border-left: 3px solid #1890ff;
}

.nav-icon {
  margin-right: 12px;
  font-size: 18px;
}

/* 右侧内容区域样式 */
.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 防止内容溢出 */
}

.header {
  background-color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

.breadcrumb {
  font-size: 14px;
  color: #666;
  padding: 5px 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-box {
  display: flex;
  align-items: center;
}

.search-box input {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  outline: none;
  width: 200px;
}

.search-box button {
  padding: 6px 12px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-left: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  position: relative;
}

.user-info img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  min-width: 120px;
  z-index: 100;
  margin-top: 5px;
}

.dropdown-item {
  padding: 10px 15px;
  cursor: pointer;
  transition: all 0.2s;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

/* 内容区域样式 */
.content {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

/* 个人信息面板样式 */
.profile-panel {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.profile-panel h2 {
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 18px;
  color: #333;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
}

.profile-item {
  display: flex;
  padding: 15px 10px;
  border-bottom: 1px solid #f0f0f0;
}

.profile-item:nth-child(odd) {
  background-color: #f9f9f9;
}

.profile-item:nth-child(even) {
  background-color: #fff;
}

.profile-item label {
  width: 80px;
  font-size: 14px;
  color: #666;
}

.profile-item div {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.empty-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  background-color: #fff;
  border-radius: 8px;
  color: #888;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.edit-button {
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  background-color: #1890ff;
  color: white;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #999;
}

.modal-body {
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #666;
}

.form-input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.save-button, .cancel-button {
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.save-button {
  background-color: #52c41a;
  color: white;
  margin-right: 10px;
}

.cancel-button {
  background-color: #f5f5f5;
  color: #666;
  border: 1px solid #d9d9d9;
}

.update-message {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
}

.update-message.success {
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
  color: #52c41a;
}

.update-message.error {
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  color: #f5222d;
}

.team-panel {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  overflow: hidden;
}

.permission-notice {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-color: #fff7e6;
  border-radius: 8px;
  text-align: center;
}

.notice-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.permission-notice p {
  font-size: 16px;
  color: #fa8c16;
}

.tabs-nav {
  display: flex;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  flex-shrink: 0;
}

.tab-item {
  padding: 10px 20px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  font-weight: 500;
  margin-right: 10px;
}

.tab-item.active {
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
}

.tab-item:hover {
  color: #1890ff;
}

.tab-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tab-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.team-section {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.team-section:first-child {
  flex: 0 0 auto;
  margin-bottom: 20px;
}

.team-section:first-child .table-wrapper {
  height: 150px;
  overflow-y: auto;
  overflow-x: auto;
}

.team-section:nth-child(2) {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 150px;
}

.tab-panel .team-section:nth-child(2) .table-wrapper {
  height: 250px !important;
  min-height: 150px;
  max-height: 50vh;
  overflow-y: auto !important;
  overflow-x: auto;
  display: block !important;
  position: relative;
  z-index: 1;
}

.table-wrapper {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  background-color: #fff;
  position: relative;
}

.team-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.team-table th,
.team-table td {
  padding: 12px 8px;
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid #e8e8e8;
}

.team-table th {
  background-color: #f5f5f5;
  position: sticky;
  top: 0;
  z-index: 5;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.team-table th:nth-child(1),
.team-table td:nth-child(1) {
  width: 15%;
}

.team-table th:nth-child(2),
.team-table td:nth-child(2) {
  width: 20%;
}

.team-table th:nth-child(3),
.team-table td:nth-child(3) {
  width: 10%;
}

.team-table th:nth-child(4),
.team-table td:nth-child(4) {
  width: 10%;
}

.team-table th:nth-child(5),
.team-table td:nth-child(5) {
  width: 15%;
}

.team-table th:nth-child(6),
.team-table td:nth-child(6) {
  width: 30%;
}

.table-wrapper .team-table tbody tr:hover {
  background-color: #f5f5f5;
}

.table-wrapper .team-table tbody tr:nth-child(odd) {
  background-color: #fafafa;
}

.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #1890ff;
}

.error-message {
  padding: 16px;
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 4px;
  color: #f5222d;
  margin-bottom: 20px;
}

/* 消息管理样式 */
.message-panel {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  overflow: hidden;
  margin: 10px; /* 添加外边距，让白色背景更加明显 */
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-shrink: 0; /* 防止标题被压缩 */
}

.panel-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

/* 新增的消息内容包装器 */
.message-content-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  height: calc(100% - 60px); /* 减去标题高度和边距 */
}

.message-tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
  flex-shrink: 0; /* 防止标签被压缩 */
}

.message-tab {
  padding: 10px 20px;
  cursor: pointer;
  color: #666;
  font-weight: 500;
  position: relative;
}

.message-tab.active {
  color: #3f51b5;
  border-bottom: 2px solid #3f51b5;
}

.message-tab:hover {
  color: #3f51b5;
}

.badge {
  position: absolute;
  top: 0;
  right: 5px;
  background-color: #f5222d;
  color: white;
  font-size: 12px;
  border-radius: 10px;
  padding: 2px 6px;
  transform: translateY(-50%);
}

.message-list-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  padding-right: 6px; /* 为滚动条预留空间 */
  height: calc(100% - 50px); /* 减去tab栏高度 */
  min-height: 200px;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 16px; /* 列表底部添加间距 */
}

.message-item {
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: box-shadow 0.3s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  margin-bottom: 12px; /* 增加消息间距 */
}

.message-item:last-child {
  margin-bottom: 0; /* 最后一条消息不需要底部边距 */
}

.message-item:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  flex-wrap: wrap; /* 允许在小屏幕上换行 */
}

.message-title {
  font-weight: bold;
  color: #333;
  font-size: 16px;
  flex: 1;
  min-width: 200px; /* 防止标题过窄 */
}

.message-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap; /* 允许在小屏幕上换行 */
}

.priority-tag {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: white;
  white-space: nowrap;
}

.urgent-tag {
  background-color: #f5222d;
}

.important-tag {
  background-color: #faad14;
}

.normal-tag {
  background-color: #52c41a;
}

.message-date {
  color: #666;
  font-size: 14px;
}

.message-content {
  color: #444;
  margin-bottom: 15px;
  white-space: pre-line;
  line-height: 1.5;
  word-break: break-word; /* 长文本自动换行 */
  max-height: 300px; /* 限制过长内容导致单条消息过高 */
  overflow-y: auto; /* 超长内容可滚动 */
}

.message-footer {
  display: flex;
  justify-content: space-between;
  color: #777;
  font-size: 13px;
  flex-wrap: wrap; /* 允许在小屏幕上换行 */
  gap: 8px; /* 添加换行时的间距 */
}

.message-status {
  display: inline-block;
  padding: 2px 6px;
  background-color: #d9d9d9;
  color: rgba(0, 0, 0, 0.65);
  border-radius: 4px;
  font-size: 12px;
  margin-left: 6px;
}

.empty-message {
  text-align: center;
  padding: 40px;
  color: #777;
  background-color: #fafafa;
  border-radius: 8px;
  margin: 20px 0;
  border: 1px dashed #ddd;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #666;
  height: 200px; /* 固定高度使得加载指示器居中 */
}

/* 针对Webkit浏览器的自定义滚动条样式 */
.message-list-container::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.message-list-container::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 6px;
}

.message-list-container::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 6px;
}

.message-list-container::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}

/* 针对Firefox的滚动条样式 */
.message-list-container {
  scrollbar-width: thin;
  scrollbar-color: #c1c1c1 #f1f1f1;
}

@supports not selector(::-webkit-scrollbar) {
  /* 对不支持自定义滚动条的浏览器的备用方案 */
  .message-list-container {
    overflow-y: auto;
  }
}

/* 恢复被删除的关键样式 */
.publish-btn {
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(24, 144, 255, 0.2);
  transition: all 0.3s;
}

.publish-btn:hover {
  background-color: #40a9ff;
  box-shadow: 0 4px 8px rgba(24, 144, 255, 0.3);
}

.publish-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.publish-form {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.form-header {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-header h3 {
  margin: 0;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.45);
  cursor: pointer;
}

.form-body {
  padding: 24px;
  overflow-y: auto;
  max-height: calc(90vh - 120px);
}

.form-group {
  margin-bottom: 16px;
}

.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
}

.form-text {
  color: #888;
  font-size: 12px;
  margin-top: 4px;
}

.form-footer {
  padding: 12px 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.publish-button {
  padding: 8px 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.publish-button:disabled {
  background-color: #bae7ff;
  cursor: not-allowed;
}

.cancel-button {
  padding: 8px 16px;
  background-color: #f5f5f5;
  color: rgba(0, 0, 0, 0.65);
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3f51b5;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.message-actions {
  display: flex;
  gap: 8px;
}

.edit-message-btn,
.delete-message-btn {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  border: none;
  color: white;
}

.edit-message-btn {
  background-color: #1890ff;
}

.edit-message-btn:hover {
  background-color: #40a9ff;
}

.delete-message-btn {
  background-color: #ff4d4f;
}

.delete-message-btn:hover {
  background-color: #ff7875;
}

.debug-info {
  font-size: 9px;
  opacity: 0.6;
  margin-left: 2px;
}

/* 编辑消息模态框样式 */
.edit-modal {
  width: 600px;
  max-width: 90%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  padding: 0;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.edit-modal-title {
  font-size: 18px;
  font-weight: 500;
  padding: 16px 24px;
  margin: 0;
  border-bottom: 1px solid #eee;
  color: #333;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 16px;
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.edit-form {
  padding: 16px 24px;
  overflow-y: auto;
  max-height: calc(90vh - 120px);
}

.edit-actions {
  display: flex;
  justify-content: flex-end;
  padding: 16px 24px;
  border-top: 1px solid #eee;
  gap: 12px;
}

.cancel-btn {
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #666;
  cursor: pointer;
}

.save-btn {
  padding: 8px 16px;
  background-color: #52c41a;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.save-btn:disabled {
  background-color: #b7eb8f;
  cursor: not-allowed;
}

.update-message {
  text-align: center;
  padding: 8px;
  margin: 0 24px 16px;
  border-radius: 4px;
}

.update-message.success {
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
  color: #52c41a;
}

.update-message.error {
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  color: #ff4d4f;
}

/* 设备管理页面样式 */
.device-panel {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  overflow: hidden;
}

.device-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.device-tabs {
  display: flex;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  flex-shrink: 0;
}

.device-tab {
  padding: 10px 20px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  font-weight: 500;
  margin-right: 10px;
}

.device-tab.active {
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
}

.device-tab:hover {
  color: #1890ff;
}

.device-list-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  padding-right: 6px; /* 为滚动条预留空间 */
  height: calc(100% - 50px); /* 减去tab栏高度 */
  min-height: 200px;
}

.device-table-wrapper {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  background-color: #fff;
  position: relative;
}

.device-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.device-table th,
.device-table td {
  padding: 12px 8px;
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid #e8e8e8;
}

.device-table th {
  background-color: #f5f5f5;
  position: sticky;
  top: 0;
  z-index: 5;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.device-table th:nth-child(1),
.device-table td:nth-child(1) {
  width: 15%;
}

.device-table th:nth-child(2),
.device-table td:nth-child(2) {
  width: 20%;
}

.device-table th:nth-child(3),
.device-table td:nth-child(3) {
  width: 10%;
}

.device-table th:nth-child(4),
.device-table td:nth-child(4) {
  width: 10%;
}

.device-table th:nth-child(5),
.device-table td:nth-child(5) {
  width: 15%;
}

.device-table th:nth-child(6),
.device-table td:nth-child(6) {
  width: 30%;
}

.device-table tbody tr:hover {
  background-color: #f5f5f5;
}

.device-table tbody tr:nth-child(odd) {
  background-color: #fafafa;
}

.device-actions {
  display: flex;
  gap: 8px;
}

.borrow-btn,
.return-btn {
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.borrow-btn {
  background-color: #1890ff;
  color: white;
}

.borrow-btn:hover {
  background-color: #40a9ff;
}

.return-btn {
  background-color: #ff4d4f;
  color: white;
}

.return-btn:hover {
  background-color: #ff7875;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: white;
  background-color: #d9d9d9;
}

 /* 加载状态和空数据样式 */
 .loading-container {
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   height: 150px;
   color: #666;
 }

 .loading-spinner {
   border: 4px solid #f3f3f3;
   border-top: 4px solid #1890ff;
   border-radius: 50%;
   width: 30px;
   height: 30px;
   animation: spin 1s linear infinite;
   margin-bottom: 10px;
 }

 @keyframes spin {
   0% { transform: rotate(0deg); }
   100% { transform: rotate(360deg); }
 }

 .empty-message, .error-message {
   text-align: center;
   padding: 30px;
   color: #999;
   background-color: #fafafa;
   border-radius: 4px;
   border: 1px dashed #e8e8e8;
 }

 .error-message {
   color: #ff4d4f;
   background-color: #fff2f0;
   border-color: #ffccc7;
 }
</style>
