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
        
        <!-- 方向管理父菜单 -->
        <div 
          class="nav-item" 
          :class="{ 'active': activeMenu === 'direction' }"
          @click="toggleDirectionMenu"
        >
          <i class="nav-icon">🧭</i>
          <span>方向管理</span>
          <span style="margin-left:auto;">{{ directionMenuOpen ? '▲' : '▼' }}</span>
        </div>
        <!-- 方向管理子菜单 -->
        <div v-if="directionMenuOpen" class="sub-menu">
          <div
            class="sub-nav-item"
            :class="{ 'active': activeMenu === 'direction' && activeDirectionSubMenu === 'team' }"
            @click.stop="setDirectionSubMenu('team')"
          >
            团队方向
          </div>
          <div
            class="sub-nav-item"
            :class="{ 'active': activeMenu === 'direction' && activeDirectionSubMenu === 'my' }"
            @click.stop="setDirectionSubMenu('my')"
          >
            我的方向
          </div>
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
        <div v-else-if="activeMenu === 'direction'">
          <div v-if="activeDirectionSubMenu === 'team'" class="direction-panel">
            <div class="panel-header">
              <h2>团队方向</h2>
            </div>
            <div class="direction-list-container">
              <div v-if="isLoadingDirections" class="loading-container">
                <div class="loading-spinner"></div>
                <div>加载中...</div>
              </div>
              <div v-else-if="directionError" class="error-message">
                {{ directionError }}
              </div>
              <div v-else class="direction-list">
                <h3 class="list-title">团队所有方向列表</h3>
                <div v-if="availableOrientations.length === 0 && appliedOrientations.length === 0" class="empty-message">
                  暂无团队方向
                </div>
                <div v-else class="direction-table-wrapper">
                  <table class="team-table">
                    <thead>
                      <tr>
                        <th>方向名称</th>
                        <th>指导老师名称</th>
                        <th>方向人数</th>
                        <th>查看详情</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <!-- 可申请方向 -->
                      <tr v-for="direction in availableOrientations" :key="'available-'+direction.id">
                        <td>{{ direction.name }}</td>
                        <td>{{ direction.teacherName }}</td>
                        <td>{{ direction.amount }}</td>
                        <td>
                          <button class="view-btn" @click="viewDirectionDetail(direction.id)">查看详情</button>
                        </td>
                        <td>
                          <button
                            class="apply-btn"
                            :disabled="isApplying"
                            @click="applyToOrientation(direction)"
                          >
                            申请加入
                          </button>
                        </td>
                      </tr>
                      <!-- 已申请方向 -->
                      <tr v-for="direction in appliedOrientations" :key="'applied-'+direction.id">
                        <td>{{ direction.name }}</td>
                        <td>{{ direction.teacherName }}</td>
                        <td>{{ direction.amount }}</td>
                        <td>
                          <button class="view-btn" @click="viewDirectionDetail(direction.id)">查看详情</button>
                        </td>
                        <td>
                          <button class="apply-btn" disabled>已申请</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="activeDirectionSubMenu === 'my'" class="direction-panel">
            <div class="panel-header">
              <h2>我的方向</h2>
            </div>
            <div class="direction-content">
              <!-- 标签页导航 -->
              <div class="direction-tabs">
                <div
                  :class="['tab-item', myDirectionTab === 'approved' ? 'active' : '']"
                  @click="setMyDirectionTab('approved')"
                >已加入方向</div>
                <div
                  :class="['tab-item', myDirectionTab === 'reviewing' ? 'active' : '']"
                  @click="setMyDirectionTab('reviewing')"
                >待审批方向</div>
                <div
                  :class="['tab-item', myDirectionTab === 'rejected' ? 'active' : '']"
                  @click="setMyDirectionTab('rejected')"
                >审批未通过方向</div>
              </div>
              <div class="direction-list-container">
                <div v-if="isLoadingMyDirections" class="loading-container">
                  <div class="loading-spinner"></div>
                  <div>加载中...</div>
                </div>
                <div v-else-if="myDirectionsError" class="error-message">
                  {{ myDirectionsError }}
                </div>
                <div v-else>
                  <h3 class="list-title">方向列表</h3>
                  <div v-if="getCurrentTabList.length === 0" class="empty-message">
                    暂无数据
                  </div>
                  <div v-else class="direction-table-wrapper">
                    <table class="team-table">
                      <thead>
                        <tr>
                          <th>方向名称</th>
                          <th>指导老师名称</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="direction in getCurrentTabList" :key="direction.id">
                          <td>{{ direction.orientationName || direction.name }}</td>
                          <td>{{ direction.teacherName }}</td>
                          <td>
                            <button class="view-btn" @click="viewDirectionDetail(direction.orientationId || direction.id)">查看详情</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
  
  <!-- 方向详情模态框 -->
  <div v-if="showDirectionDetail" class="modal-overlay" @click.self="closeDirectionDetail">
    <div class="modal-content direction-detail-modal">
      <div class="modal-header">
        <h3>方向详情</h3>
        <button @click="closeDirectionDetail" class="close-button">&times;</button>
      </div>
      <!-- 标签页导航移到这里 -->
      <div v-if="currentDirectionDetail" class="detail-tabs">
        <div
          :class="['detail-tab', activeDetailTab === 'intro' ? 'active' : '']"
          @click="setDetailTab('intro')"
        >
          方向简介
        </div>
        <div
          :class="['detail-tab', activeDetailTab === 'tasks' ? 'active' : '']"
          @click="setDetailTab('tasks')"
        >
          任务列表
        </div>
        <div
          :class="['detail-tab', activeDetailTab === 'achievements' ? 'active' : '']"
          @click="setDetailTab('achievements')"
        >
          方向成果
        </div>
      </div>
      <!-- 新增一个可滚动的内容容器 -->
      <div class="detail-content-scrollable">
        <div v-if="isLoadingDirectionDetail" class="loading-container">
          <div class="loading-spinner"></div>
          <div>加载详情中...</div>
        </div>
        <div v-else-if="taskDetailError" class="error-message">
          {{ taskDetailError }}
        </div>
        <div v-else-if="currentDirectionDetail" class="direction-detail-container">
          <!-- 方向简介内容 -->
          <div v-if="activeDetailTab === 'intro'" class="detail-panel">
            <div class="card">
              <div class="card-title">方向描述</div>
              <div class="card-content">{{ currentDirectionDetail.description || '暂无描述' }}</div>
            </div>
            <div class="card">
              <div class="card-title">基本信息</div>
              <div class="card-content">
                <div class="info-row">
                  <span>方向名称：</span>
                  <span>{{ currentDirectionDetail.name }}</span>
                  <span>指导老师：</span>
                  <span>{{ currentDirectionDetail.teacherName }}</span>
                  
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-title">成员列表</div>
              <div class="card-content">
                <table class="member-table">
                  <thead>
                    <tr>
                      <th>姓名</th>
                      <th>联系方式(电话)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="member in currentDirectionDetail.members || []" :key="member.id">
                      <td>{{ member.name }}</td>
                      <td>{{ member.phone }}</td>
                    </tr>
                    <tr v-if="!currentDirectionDetail.members || currentDirectionDetail.members.length === 0">
                      <td colspan="2">暂无成员</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- 任务列表内容 -->
          <div v-else-if="activeDetailTab === 'tasks'" class="detail-panel">
            <div class="task-container">
              <!-- 标题 -->
              <div class="task-header">
                <h4 class="section-title">该方向任务列表</h4>
                <button class="new-task-btn" @click="showTaskForm">新建任务</button>
              </div>
              <!-- 加载状态 -->
              <div v-if="isLoadingTasks" class="loading-container">
                <div class="loading-spinner"></div>
                <div>加载任务中...</div>
              </div>
              <!-- 错误信息 -->
              <div v-else-if="taskLoadError" class="error-message">
                {{ taskLoadError }}
              </div>
              <!-- 空列表提示 -->
              <div v-else-if="directionTasks.length === 0" class="empty-message">
                该方向暂无任务
              </div>
              <!-- 任务表格 -->
              <div v-else class="task-table-wrapper">
                <table class="task-table">
                  <thead>
                    <tr>
                      <th>任务名称</th>
                      <th>任务类型</th>
                      <th>责任人</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="task in directionTasks" :key="task.id">
                      <td>{{ task.taskName }}</td>
                      <td>{{ formatTaskType ? formatTaskType(task.taskType) : task.taskType }}</td>
                      <td>{{ task.ownerName }}</td>
                      <td>
                        <button class="view-btn" @click="viewTaskDetail(task.id)">查看详情</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- 方向成果内容 -->
          <div v-else-if="activeDetailTab === 'achievements'" class="detail-panel">
            <!-- 加载状态 -->
            <div v-if="isLoadingTaskStats" class="loading-container">
              <div class="loading-spinner"></div>
              <div>加载方向成果统计中...</div>
            </div>

            <!-- 错误信息 -->
            <div v-else-if="taskStatsError" class="error-message">
              {{ taskStatsError }}
            </div>

            <!-- 空列表提示 -->
            <div v-else-if="!taskStats" class="empty-message">
              暂无方向成果数据
            </div>

            <!-- 成果内容容器 -->
            <div v-else class="achievements-container">
              <!-- 任务类型标签页导航 -->
              <div class="achievements-tabs">
                <div class="tabs-container">
                  <div
                    :class="['achievement-tab', achievementView === 'thesis' ? 'active' : '']"
                    @click="achievementView = 'thesis'"
                  >
                    论文
                  </div>
                  <div
                    :class="['achievement-tab', achievementView === 'project' ? 'active' : '']"
                    @click="achievementView = 'project'"
                  >
                    项目
                  </div>
                  <div
                    :class="['achievement-tab', achievementView === 'competition' ? 'active' : '']"
                    @click="achievementView = 'competition'"
                  >
                    比赛
                  </div>
                </div>
              </div>

              <!-- 论文列表/图表 -->
              <div v-if="achievementView === 'thesis'" class="achievement-list-container">
                <h3 class="section-title">论文成果</h3>

                <!-- 柱形图容器 -->
                <div class="chart-container">
                  <h3 class="chart-title">论文任务完成情况</h3>
                  <div class="chart-description">
                    柱形图展示A、B、C、D级别的论文任务数量，区分已完成和未完成
                  </div>

                  <!-- canvas 元素用于渲染图表 -->
                  <canvas ref="thesisChartRef" width="400" height="200"></canvas>
                </div>

                <!-- 论文任务列表 -->
                <div v-if="thesisTasks.length === 0" class="empty-message">
                  暂无论文类型的任务
                </div>
                <div v-else class="task-list">
                  <div v-for="task in thesisTasks" :key="task.id" class="task-item">
                    <div class="task-header">
                      <h4 class="task-name">{{ task.name }}</h4>
                      <div class="task-badges">
                        <!-- 使用 formatTaskLevel 方法 -->
                        <span class="level-badge">{{ formatTaskLevel(task.level) }}</span>
                        <!-- 使用 getProgressStatusText 方法 -->
                        <span :class="['status-badge', task.status === 'completed' ? 'completed' : 'in-progress']">
                          {{ getProgressStatusText(task.status) }}
                        </span>
                      </div>
                    </div>
                    <div class="task-progress">
                      <div class="progress-info">
                        <!-- 显示进度数 -->
                        <span>提交了{{ task.total_progress_count || 0 }}个进度</span>
                      </div>
                      <!-- 进度条 (可选，根据后端数据是否有完成进度比例) -->
                      <!-- 如果后端没有提供完成进度比例，可以先不实现进度条 -->
                      <!-- 这里假设后端提供了 total_progress_count 和 completed_count -->
                      <div class="progress-bar-container">
                        <div
                          class="progress-bar"
                           :style="{width: `${(task.completed_count / Math.max(task.total_progress_count, 1)) * 100}%`}"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 项目列表/图表 -->
              <div v-else-if="achievementView === 'project'" class="achievement-list-container">
                <h3 class="section-title">项目成果</h3>

                <!-- 柱形图容器 -->
                <div class="chart-container">
                  <h3 class="chart-title">项目任务完成情况</h3>
                  <div class="chart-description">
                    柱形图展示A、B、C、D级别的项目任务数量，区分已完成和未完成
                  </div>

                  <!-- canvas 元素用于渲染图表 -->
                  <canvas ref="projectChartRef" width="400" height="200"></canvas>
                </div>

                 <!-- 项目任务列表 -->
                <div v-if="projectTasks.length === 0" class="empty-message">
                  暂无项目类型的任务
                </div>
                <div v-else class="task-list">
                  <div v-for="task in projectTasks" :key="task.id" class="task-item">
                    <div class="task-header">
                      <h4 class="task-name">{{ task.name }}</h4>
                      <div class="task-badges">
                        <span class="level-badge">{{ formatTaskLevel(task.level) }}</span>
                        <span :class="['status-badge', task.status === 'completed' ? 'completed' : 'in-progress']">
                          {{ getProgressStatusText(task.status) }}
                        </span>
                      </div>
                    </div>
                    <div class="task-progress">
                      <div class="progress-info">
                        <span>提交了{{ task.total_progress_count || 0 }}个进度</span>
                      </div>
                       <div class="progress-bar-container">
                        <div
                          class="progress-bar"
                           :style="{width: `${(task.completed_count / Math.max(task.total_progress_count, 1)) * 100}%`}"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 比赛列表/图表 -->
              <div v-else-if="achievementView === 'competition'" class="achievement-list-container">
                <h3 class="section-title">比赛成果</h3>

                 <!-- 柱形图容器 -->
                <div class="chart-container">
                  <h3 class="chart-title">比赛任务完成情况</h3>
                  <div class="chart-description">
                    柱形图展示A、B、C、D级别的比赛任务数量，区分已完成和未完成
                  </div>

                  <!-- canvas 元素用于渲染图表 -->
                  <canvas ref="competitionChartRef" width="400" height="200"></canvas>
                </div>

                 <!-- 比赛任务列表 -->
                <div v-if="competitionTasks.length === 0" class="empty-message">
                  暂无比赛类型的任务
                </div>
                <div v-else class="task-list">
                  <div v-for="task in competitionTasks" :key="task.id" class="task-item">
                    <div class="task-header">
                      <h4 class="task-name">{{ task.name }}</h4>
                      <div class="task-badges">
                        <span class="level-badge">{{ formatTaskLevel(task.level) }}</span>
                        <span :class="['status-badge', task.status === 'completed' ? 'completed' : 'in-progress']">
                          {{ getProgressStatusText(task.status) }}
                        </span>
                      </div>
                    </div>
                     <div class="task-progress">
                      <div class="progress-info">
                        <span>提交了{{ task.total_progress_count || 0 }}个进度</span>
                      </div>
                       <div class="progress-bar-container">
                        <div
                          class="progress-bar"
                           :style="{width: `${(task.completed_count / Math.max(task.total_progress_count, 1)) * 100}%`}"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showCreateTaskForm" class="modal-overlay" @click.self="closeTaskForm">
    <div class="modal-content task-form-modal">
      <div class="modal-header">
        <h3>创建新任务</h3>
        <button @click="closeTaskForm" class="close-button">&times;</button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="createNewTask">
          <div class="form-group">
            <label>任务名称</label>
            <input v-model="newTask.taskName" type="text" class="form-control" placeholder="请输入任务名称" />
          </div>
          <div class="form-group">
            <label>任务目标</label>
            <input v-model="newTask.target" type="text" class="form-control" placeholder="请输入任务目标" />
          </div>
          <div class="form-row">
            <div class="form-group half-width">
              <label>任务类型</label>
              <select v-model="newTask.taskType" class="form-control">
                <option v-for="option in taskTypeOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
              </select>
            </div>
            <div class="form-group half-width">
              <label>任务级别</label>
              <select v-model="newTask.level" class="form-control">
                <option v-for="option in taskLevelOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>任务描述</label>
            <textarea v-model="newTask.description" class="form-control" placeholder="请输入任务描述（可选）" rows="4"></textarea>
          </div>
          <div v-if="taskFormError" class="form-error">{{ taskFormError }}</div>
          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="closeTaskForm">取消</button>
            <button type="submit" class="submit-btn" :disabled="isCreatingTask">{{ isCreatingTask ? '创建中...' : '创建任务' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div v-if="showTaskDetail" class="modal-overlay" @click.self="closeTaskDetail">
    <div class="modal-content task-detail-modal">
      <div class="modal-header">
        <h3>任务详情</h3>
        <button @click="closeTaskDetail" class="close-button">&times;</button>
      </div>
      <!-- 标签页 -->
      <div v-if="currentTask" class="task-tabs">
        <div :class="['task-tab', activeTaskTab === 'detail' ? 'active' : '']" @click="setActiveTaskTab('detail')">任务详情</div>
        <div :class="['task-tab', activeTaskTab === 'progress' ? 'active' : '']" @click="setActiveTaskTab('progress')">任务进展</div>
      </div>

      <!-- 新增：可滚动的内容区域 -->
      <div class="modal-content-scrollable">
        <div v-if="isLoadingTaskDetail" class="loading-container">
          <div class="loading-spinner"></div>
          <div>加载详情中...</div>
        </div>
        <div v-else-if="taskDetailError" class="error-message">
          {{ taskDetailError }}
        </div>
        <div v-else-if="currentTask" class="task-detail-container">
          <!-- 任务详情内容 -->
          <div v-if="activeTaskTab === 'detail'" class="task-detail-panel">
            <div class="info-card">
              <h4 class="card-title">基本信息</h4>
              <div class="info-grid">
                <div class="info-item"><div class="info-label">任务名称</div><div class="info-value">{{ currentTask.taskName }}</div></div>
                <div class="info-item"><div class="info-label">任务类型</div><div class="info-value">{{ formatTaskType(currentTask.taskType) }}</div></div>
                <div class="info-item"><div class="info-label">任务级别</div><div class="info-value">{{ currentTask.level }}</div></div>
                <div class="info-item"><div class="info-label">创建人</div><div class="info-value">{{ currentTask.ownerName || '未知' }}</div></div>
              </div>
            </div>
            <div class="info-card">
              <h4 class="card-title">任务描述</h4>
              <div class="description">{{ currentTask.description || '暂无描述' }}</div>
            </div>
            <div class="info-card">
              <h4 class="card-title">任务目标</h4>
              <div class="description">{{ currentTask.target }}</div>
            </div>
          </div>
          <!-- 任务进展内容 -->
          <div v-else-if="activeTaskTab === 'progress'" class="task-progress-panel">
            <!-- 操作按钮 - 学生端默认显示提交进展按钮 -->
            <div class="progress-actions">
              <button class="add-progress-btn" @click="showProgressForm">
                <i class="btn-icon">+</i> 提交任务进展
              </button>
            </div>

            <!-- 加载状态 -->
            <div v-if="isLoadingProgress" class="loading-container">
              <div class="loading-spinner"></div>
              <div>加载任务进展中...</div>
            </div>

            <!-- 错误信息 -->
            <div v-else-if="progressError" class="error-message">
              {{ progressError }}
            </div>

            <!-- 空列表提示 -->
            <div v-else-if="taskProgressList.length === 0" class="empty-message">
                暂无任务进展记录，点击"提交任务进展"按钮添加新的进展
            </div>

            <!-- 进展记录列表 -->
            <div v-else class="progress-timeline">
              <div v-for="progress in taskProgressList" :key="progress.id" class="progress-item">
                <div class="progress-header">
                  <h4 class="progress-title">{{ progress.title }}</h4>
                  <div class="progress-meta">
                    <!-- 使用 formatDate 方法格式化时间，如果 HomePage.vue 没有此方法，需要添加或调整 -->
                    <!-- 这里暂时使用原始的 progress.time -->
                    <div class="progress-time">{{ progress.time }}</div>
                    <span :class="['status-badge', progress.status === 'completed' ? 'completed' : 'in-progress']">
                      {{ getProgressStatusText(progress.status) }}
                    </span>
                  </div>
                </div>

                <div class="progress-content">
                  <p>{{ progress.content }}</p>
                  <!-- 项目成果 -->
                  <div v-if="progress.projectResult" class="progress-result">
                    <strong>项目成果：</strong> {{ progress.projectResult }}
                  </div>
                </div>

                <!-- 附件信息和操作 -->
                <!-- 学生端默认显示文件操作按钮 -->
                <div v-if="progress.hasFile || progress.filePath" class="progress-footer">
                   <div class="file-info">
                       <span class="file-attachment">
                           <!-- 这里需要一个图标，例如引入一个图标库或使用 SVG -->
                           <!-- <i class="file-icon">📎</i> -->
                           {{ getFileNameFromPath(progress.filePath) || '附件' }}
                       </span>
                       <div class="file-actions">
                           <!-- 下载按钮 -->
                           <button class="download-btn" @click="downloadFile(progress.id)">下载</button>
                           <!-- 删除文件按钮 -->
                           <button class="delete-file-btn" @click="deleteFile(progress.id)">删除文件</button>
                       </div>
                   </div>

                   <!-- 删除记录按钮 -->
                   <div class="action-buttons">
                       <button class="delete-progress-btn" @click="deleteProgress(progress.id)">删除记录</button>
                   </div>
               </div>
                <!-- 如果没有文件，但需要显示删除记录按钮，可以添加一个 v-else 块 -->
                <div v-else class="progress-footer">
                     <div class="action-buttons" style="width: 100%; justify-content: flex-end;">
                         <button class="delete-progress-btn" @click="deleteProgress(progress.id)">删除记录</button>
                     </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <!-- 结束：可滚动的内容区域 -->
      </div>
    </div>
  </div>
  <!-- 创建进展记录表单模态框 -->
  <div v-if="showCreateProgressForm" class="modal-overlay" @click.self="showCreateProgressForm = false">
    <div class="modal-content progress-form-modal">
      <div class="modal-header">
        <h3>提交任务进展</h3>
        <button @click="showCreateProgressForm = false" class="close-button">&times;</button>
      </div>

      <div class="modal-body">
        <form @submit.prevent="createProgress">
          <!-- 进展名称 -->
          <div class="form-group">
            <label for="progressTitle">进展名称</label>
            <input
              id="progressTitle"
              v-model="newProgress.title"
              type="text"
              class="form-control"
              placeholder="请输入进展名称"
              required
            />
          </div>

          <!-- 进展内容 -->
          <div class="form-group">
            <label for="progressContent">进展内容</label>
            <textarea
              id="progressContent"
              v-model="newProgress.content"
              class="form-control"
              placeholder="请输入进展内容"
              rows="4"
              required
            ></textarea>
          </div>

          <!-- 进展状态 -->
          <div class="form-group">
            <label for="progressStatus">进展状态</label>
            <select
              id="progressStatus"
              v-model="newProgress.status"
              class="form-control"
            >
              <option value="not_completed">进行中</option>
              <option value="completed">已完成</option>
            </select>
          </div>

          <!-- 项目成果 -->
          <div class="form-group">
            <label for="projectResult">项目成果</label>
            <input
              id="projectResult"
              v-model="newProgress.projectResult"
              type="text"
              class="form-control"
              placeholder="请输入项目成果（选填）"
            />
          </div>

          <!-- 上传文件 -->
          <div class="form-group">
            <label for="progressFile">提交进度相关材料</label>
            <input
              id="progressFile"
              type="file"
              class="form-control-file"
              @change="handleFileSelect"
            />
            <small class="form-text">支持的文件类型：文档(pdf, doc, docx等)、图片、压缩包，最大10MB</small>

            <div v-if="selectedFile" class="selected-file-info">
              已选择: {{ selectedFile.name }} ({{ (selectedFile.size / 1024).toFixed(2) }}KB)
            </div>
          </div>

          <!-- 上传错误信息 -->
          <div v-if="uploadError" class="form-error">
            {{ uploadError }}
          </div>

          <!-- 表单错误信息 -->
          <div v-if="progressFormError" class="form-error">
            {{ progressFormError }}
          </div>
        </form>
      </div>

      <!-- 将按钮区域移到模态框底部，脱离表单结构 -->
      <div class="modal-footer">
        <div class="form-actions">
          <button
            type="button"
            class="cancel-btn"
            @click="showCreateProgressForm = false"
            :disabled="isCreatingProgress || isUploadingFile"
          >
            取消
          </button>
          <button
            type="button"
            class="submit-btn"
            :disabled="isCreatingProgress || isUploadingFile"
            @click="createProgress"
          >
            {{ (isCreatingProgress || isUploadingFile) ? '提交中...' : '提交进展' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '@/services/api.js'
import Chart from 'chart.js/auto'; // 引入 Chart.js

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
      
      // 方向管理相关数据
      activeDirectionTab: 'team', // 当前激活的方向标签页
      isLoadingDirections: false, // 方向数据加载状态
      directionError: '',         // 方向加载错误信息
      teamOrientations: [],       // 团队所有方向列表
      myOrientations: [],         // 学生已加入的方向列表
      directionMenuOpen: false, // 方向管理菜单是否展开
      activeDirectionSubMenu: 'team', // 'team' 或 'my'
      appliedOrientationIds: [], // 已申请的方向ID列表
      isApplying: false, // 申请中状态
      appliedOrientations: [],
      availableOrientations: [],
      
      showDirectionDetail: false, // 控制模态框显示
      currentDirectionId: null, // 当前查看的方向ID
      currentDirectionDetail: null, // 当前方向详情数据
      isLoadingDirectionDetail: false, // 加载状态
      directionDetailError: null, // 错误信息
      activeDetailTab: 'intro', // 当前激活的标签页
      myDirectionTab: 'approved', // 当前标签页，'approved' | 'reviewing' | 'rejected'
      myApprovedOrientations: [],
      myReviewingOrientations: [],
      myRejectedOrientations: [],
      isLoadingMyDirections: false,
      myDirectionsError: null,
      directionTasks: [],
      isLoadingTasks: false,
      taskLoadError: null,
      taskStats: null,
      isLoadingTaskStats: false,
      taskStatsError: null,
      showCreateTaskForm: false,
      newTask: {
        taskName: '',
        target: '',
        taskType: '',
        level: '',
        description: ''
      },
      isCreatingTask: false,
      taskFormError: '',
      taskTypeOptions: [
        { value: 'thesis', label: '论文' },
        { value: 'project', label: '项目' },
        { value: 'competition', label: '比赛' }
      ],
      taskLevelOptions: [
        { value: 'A', label: 'A类' },
        { value: 'B', label: 'B类' },
        { value: 'C', label: 'C类' },
        { value: 'D', label: 'D类' }
      ],
      showTaskDetail: false,
      currentTaskId: null,
      currentTask: null,
      isLoadingTaskDetail: false,
      taskDetailError: null,
      activeTaskTab: 'detail',
      // 进展相关
      isLoadingProgress: false,
      progressError: null,
      taskProgressList: [], // 存储任务进展列表

      // 任务进展提交表单相关数据
      showCreateProgressForm: false, // 控制提交进展模态框显示
      newProgress: { // 新进展数据
        title: '',
        content: '',
        status: 'not_completed', // 默认进行中
        projectResult: '',
        taskId: null, // 当前任务ID
        filePath: '' // 预留字段，实际文件数据存在 selectedFile
      },
      selectedFile: null, // 存储用户选择的文件
      isCreatingProgress: false, // 提交进展中状态
      isUploadingFile: false, // 文件上传中状态
      progressFormError: null, // 进展表单错误信息
      uploadError: null, // 文件上传错误信息
      fileUploadSuccess: false, // 文件上传成功标志

      // 注意：学生端可能不需要编辑任务功能，但为了完全模仿教师端，可以先添加，
      // 或者根据实际需求决定是否保留。这里我们先根据你的需求，只侧重进展部分。
      // showEditTaskForm: false,
      // editedTask: {},
      // isUpdatingTask: false,
      // editTaskFormError: null,

      // 学生端没有"我的方向"概念，可以移除 currentDirectionSource
      // 或者保留，但在显示按钮时根据用户类型（student）判断。
      // currentDirectionSource: 'my', // 学生端默认为 my 来显示操作按钮

      // 方向成果相关数据
      achievementView: 'thesis', // 当前激活的成果子标签页 ('thesis', 'project', 'competition')
      thesisTasks: [], // 论文任务列表
      projectTasks: [], // 项目任务列表
      competitionTasks: [], // 比赛任务列表
      thesisChart: null, // 论文图表实例
      projectChart: null, // 项目图表实例
      competitionChart: null, // 比赛图表实例
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
    },
    getCurrentTabList() {
      if (this.myDirectionTab === 'approved') return this.myApprovedOrientations;
      if (this.myDirectionTab === 'reviewing') return this.myReviewingOrientations;
      if (this.myDirectionTab === 'rejected') return this.myRejectedOrientations;
      return [];
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
      } else if (menu === 'direction') {
        this.directionMenuOpen = true;
        this.activeDirectionSubMenu = this.activeDirectionSubMenu || 'team';
        if (this.activeDirectionSubMenu === 'team') {
          this.loadTeamOrientations();
        } else {
          this.loadMyDirections();
        }
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
    // 设置当前方向标签页
    setActiveDirectionTab(tab) {
      if (this.activeDirectionTab === tab) return;
      this.activeDirectionTab = tab;
      if (tab === 'team') {
        this.loadTeamOrientations();
      } else {
        this.loadMyOrientations();
      }
    },
    // 加载团队所有方向
    async loadTeamOrientations() {
      this.isLoadingDirections = true;
      this.directionError = '';
      try {
        const studentId = Number(this.userData.id);
        const res = await apiService.getOrientationsWithStatus(studentId);
        if (res.data.success) {
          this.appliedOrientations = res.data.data.applied || [];
          this.availableOrientations = res.data.data.available || [];
          this.appliedOrientationIds = this.appliedOrientations.map(item => item.id);
        } else {
          this.directionError = res.data.message || '加载团队方向失败';
        }
      } catch (e) {
        this.directionError = '加载团队方向时发生错误';
      } finally {
        this.isLoadingDirections = false;
      }
    },
    // 加载我加入的方向
    async loadMyOrientations() {
      this.isLoadingDirections = true;
      this.directionError = '';
      try {
        const res = await apiService.getMyOrientations();
        if (res.data.success) {
          this.myOrientations = res.data.data || [];
        } else {
          this.directionError = res.data.message || '加载我的方向失败';
        }
      } catch (e) {
        this.directionError = '加载我的方向时发生错误';
      } finally {
        this.isLoadingDirections = false;
      }
    },
    // 查看方向详情（可扩展为弹窗或跳转页面）
    async viewDirectionDetail(directionId) {
      this.showDirectionDetail = true;
      this.activeDetailTab = 'intro';
      this.isLoadingDirectionDetail = true;
      this.directionDetailError = null;
      try {
        const res = await apiService.getOrientationDetail(directionId);
        if (res.data && res.data.success) {
          this.currentDirectionDetail = res.data.data;
        } else {
          this.directionDetailError = res.data?.message || '加载方向详情失败';
        }
      } catch (e) {
        this.directionDetailError = '加载方向详情时发生错误';
      } finally {
        this.isLoadingDirectionDetail = false;
      }
      // 预加载任务列表
      this.loadDirectionTasks(directionId);
    },
    closeDirectionDetail() {
      this.showDirectionDetail = false;
      this.currentDirectionId = null;
      this.currentDirectionDetail = null;
    },
    setDetailTab(tab) {
      this.activeDetailTab = tab;
      // 其他标签页的加载逻辑...
      if (tab === 'tasks') {
        this.loadDirectionTasks(this.currentDirectionDetail.id);
      } else if (tab === 'achievements') {
        // 如果切换到成果标签页，设置默认子标签页为论文，并加载成果统计数据
        this.achievementView = 'thesis';
        // 如果尚未加载任务统计数据，则加载
        if (!this.taskStats && !this.isLoadingTaskStats) { // 避免重复加载
          this.loadOrientationTaskStats();
        } else if (this.taskStats) {
           // 如果已加载数据，确保在下一个 DOM 更新周期渲染当前成果视图的图表
           this.$nextTick(() => {
             this.renderTaskStatsChart();
           });
        }
      }
      // 关闭任务详情模态框如果开着
      this.closeTaskDetail();
    },
    toggleDirectionMenu() {
      this.directionMenuOpen = !this.directionMenuOpen;
      this.activeMenu = 'direction';
      if (!this.activeDirectionSubMenu) {
        this.activeDirectionSubMenu = 'team';
      }
    },
    setDirectionSubMenu(subMenu) {
      this.activeDirectionSubMenu = subMenu;
      if (subMenu === 'team') {
        this.loadTeamOrientations();
      } else if (subMenu === 'my') {
        this.loadMyDirections();
      }
    },
    async applyToOrientation(direction) {
      if (this.appliedOrientationIds.includes(direction.id)) return;
      this.isApplying = true;
      // 立即前端变更按钮状态
      // 1. 从availableOrientations中移除该方向
      this.availableOrientations = this.availableOrientations.filter(item => item.id !== direction.id);
      // 2. 添加到appliedOrientations，permitted设为'reviewing'（或可根据后端返回调整）
      const appliedDirection = { ...direction, permitted: 'reviewing' };
      this.appliedOrientations.push(appliedDirection);
      // 3. 更新appliedOrientationIds
      this.appliedOrientationIds.push(direction.id);
      try {
        // 获取当前学生信息
        const studentId = Number(this.userData.id);
        const studentName = this.userData.name || this.userData.username;
        const teacherId = Number(direction.teacherId || direction.teacherID || direction.teacher_id);
        const orientationId = Number(direction.id);
        // 调用apiService
        const res = await apiService.applyToOrientation({
          orientationId,
          studentId,
          studentName,
          teacherId
        });
        if (res.data && res.data.success) {
          alert('申请已提交，等待导师审批！');
        } else {
          alert((res.data && res.data.message) || '申请失败，请稍后重试');
        }
      } catch (e) {
        alert('申请时发生错误，请稍后重试');
      } finally {
        this.isApplying = false;
      }
    },
    setMyDirectionTab(tab) {
      this.myDirectionTab = tab;
      // 可选：切换标签时刷新数据
      // this.loadMyDirections();
    },
    async loadMyDirections() {
      this.isLoadingMyDirections = true;
      this.myDirectionsError = null;
      try {
        const studentId = this.userData.id;
        if (!studentId) {
          this.myDirectionsError = '未获取到用户ID';
          return;
        }
        const res = await apiService.getStudentOrientations(studentId);
        if (res.data && res.data.success && res.data.data) {
          this.myApprovedOrientations = res.data.data.approved || [];
          this.myReviewingOrientations = res.data.data.reviewing || [];
          this.myRejectedOrientations = res.data.data.rejected || [];
        } else {
          this.myApprovedOrientations = [];
          this.myReviewingOrientations = [];
          this.myRejectedOrientations = [];
          this.myDirectionsError = '未获取到方向数据';
        }
      } catch (e) {
        this.myDirectionsError = '加载我的方向失败';
        this.myApprovedOrientations = [];
        this.myReviewingOrientations = [];
        this.myRejectedOrientations = [];
      } finally {
        this.isLoadingMyDirections = false;
      }
    },
    async loadDirectionTasks(orientationId) {
      this.isLoadingTasks = true;
      this.taskLoadError = null;
      try {
        const res = await apiService.getOrientationTasks(orientationId);
        if (res.data && res.data.success) {
          this.directionTasks = res.data.data || [];
        } else {
          this.taskLoadError = res.data?.message || '加载任务列表失败';
        }
      } catch (e) {
        this.taskLoadError = '加载任务列表时发生错误';
      } finally {
        this.isLoadingTasks = false;
      }
    },
    async loadDirectionTaskStats(orientationId) {
      this.isLoadingTaskStats = true;
      this.taskStatsError = null;
      try {
        const res = await apiService.getOrientationTaskStats(orientationId);
        if (res.data && res.data.success) {
          this.taskStats = res.data.data;
        } else {
          this.taskStatsError = res.data?.message || '加载成果统计失败';
        }
      } catch (e) {
        this.taskStatsError = '加载成果统计时发生错误';
      } finally {
        this.isLoadingTaskStats = false;
      }
    },
    showTaskForm() {
      this.showCreateTaskForm = true;
      this.taskFormError = '';
      this.newTask = {
        taskName: '',
        target: '',
        taskType: '',
        level: '',
        description: ''
      };
    },
    closeTaskForm() {
      this.showCreateTaskForm = false;
    },
    async createNewTask() {
      if (!this.newTask.taskName || !this.newTask.target || !this.newTask.taskType || !this.newTask.level) {
        this.taskFormError = '请填写所有必填项';
        return;
      }
      this.isCreatingTask = true;
      this.taskFormError = '';
      try {
        const orientationId = Number(this.currentDirectionDetail.id);
        const ownerId = Number(this.userData.id);
        const taskData = {
          taskName: this.newTask.taskName,
          target: this.newTask.target,
          taskType: this.newTask.taskType,
          level: this.newTask.level,
          description: this.newTask.description,
          orientationId,
          ownerId,
          ownerType: 'student'
        };
        const res = await apiService.createTask(taskData);
        this.isCreatingTask = false;
        if (res.data && res.data.success) {
          this.showCreateTaskForm = false;
          this.$message && this.$message.success('任务创建成功');
          this.loadDirectionTasks(orientationId);
        } else {
          this.taskFormError = res.data?.message || '创建任务失败，请稍后重试';
        }
      } catch (e) {
        this.taskFormError = '创建任务失败，请重试';
        this.isCreatingTask = false;
      }
    },
    viewTaskDetail(taskId) {
      this.currentTaskId = taskId;
      this.showTaskDetail = true;
      this.activeTaskTab = 'detail';
      this.loadTaskDetail();
    },
    async loadTaskDetail() {
      this.isLoadingTaskDetail = true;
      this.taskDetailError = null;
      try {
        const res = await apiService.getTaskDetail(this.currentTaskId);
        if (res.data && res.data.success && res.data.data) {
          console.log('任务详情数据:', res.data.data);
          this.currentTask = res.data.data;
          await this.loadTaskProgress();
        } else {
          this.taskDetailError = res.data?.message || '加载任务详情失败';
          this.currentTask = null;
        }
      } catch (e) {
        this.taskDetailError = '加载任务详情时发生错误';
        this.currentTask = null;
      } finally {
        console.log('finally执行，isLoadingTaskDetail 置为 false');
        this.isLoadingTaskDetail = false;
        console.log('isLoadingTaskDetail:', this.isLoadingTaskDetail);
      }
    },
    setActiveTaskTab(tab) {
      this.activeTaskTab = tab;
      if (tab === 'progress') {
        this.loadTaskProgress();
      }
    },
    async loadTaskProgress() {
      if (!this.currentTaskId) {
        this.progressError = '任务ID未获取，无法加载进展';
        return;
      }
      this.isLoadingProgress = true;
      this.progressError = null;
      try {
        const res = await apiService.getTaskProgress(this.currentTaskId);
        if (res.data && res.data.success) {
          this.taskProgressList = res.data.data || [];
          console.log('加载任务进展成功:', this.taskProgressList);
        } else {
          this.progressError = res.data?.message || '加载任务进展失败';
          console.error('加载任务进展失败:', res.data);
        }
      } catch (e) {
        console.error('加载任务进展错误:', e);
        this.progressError = '加载任务进展时发生错误';
      } finally {
        this.isLoadingProgress = false;
      }
    },
    closeTaskDetail() {
      this.showTaskDetail = false;
      this.currentTask = null;
      this.currentTaskId = null;
      this.activeTaskTab = 'detail';
      this.taskProgressList = []; // 清空进展列表
      // 关闭提交进展模态框（如果开着）
      this.showCreateProgressForm = false;
      // 重置提交进展表单数据
      this.newProgress = {
        title: '', content: '', status: 'not_completed', projectResult: '', taskId: null, filePath: ''
      };
      this.selectedFile = null;
      this.isCreatingProgress = false;
      this.isUploadingFile = false;
      this.progressFormError = null;
      this.uploadError = null;
      this.fileUploadSuccess = false;
    },
    formatTaskType(type) {
      // 你可以根据实际类型映射
      const map = {
        thesis: '论文',
        project: '项目',
        competition: '比赛'
      };
      return map[type] || type || '未知';
    },
    // ********************* 任务进展提交相关方法 *********************

    // 显示添加进展表单
    showProgressForm() {
      // 重置表单状态
      this.newProgress = {
        title: '',
        content: '',
        status: 'not_completed',
        projectResult: '',
        taskId: this.currentTaskId, // 将当前任务ID赋值给新进展
        filePath: ''
      };
      this.selectedFile = null;
      this.progressFormError = null;
      this.uploadError = null;
      this.fileUploadSuccess = false;

      // 显示表单
      this.showCreateProgressForm = true;
    },

    // 处理文件选择
    handleFileSelect(event) {
      const file = event.target.files[0];
      if (file) {
        // 检查文件大小 (限制为10MB)
        if (file.size > 10 * 1024 * 1024) {
          this.uploadError = '文件大小不能超过10MB';
          this.selectedFile = null;
          return;
        }

        this.selectedFile = file;
        this.uploadError = null;
      } else {
         this.selectedFile = null; // 清空选择
         this.uploadError = null;
      }
    },

    // 验证进展表单
    validateProgressForm() {
      if (!this.newProgress.title.trim()) {
        this.progressFormError = '请输入进展名称';
        return false;
      }

      if (!this.newProgress.content.trim()) {
        this.progressFormError = '请输入进展内容';
        return false;
      }

      return true;
    },

    // 创建新进展记录 (与教师端相同，但taskId从 this.currentTaskId 获取)
    async createProgress() {
      if (!this.validateProgressForm()) {
        return;
      }

      this.isCreatingProgress = true;
      this.progressFormError = null;

      try {
        // 准备提交的数据
        const progressData = {
          title: this.newProgress.title,
          content: this.newProgress.content,
          status: this.newProgress.status,
          projectResult: this.newProgress.projectResult || '',
          taskId: this.currentTaskId // 使用当前任务的ID
        };

        console.log('提交进展数据:', progressData);

        // 提交进展记录
        const response = await apiService.createTaskProgress(progressData);

        if (response.data && response.data.success) {
          const progressId = response.data.data.progress_id;
          console.log('进展创建成功，ID:', progressId);

          // 如果有选择文件，上传文件
          if (this.selectedFile) {
            await this.uploadFile(progressId);
          } else {
            // 没有文件，直接完成
            this.showCreateProgressForm = false;
            this.loadTaskProgress(); // 重新加载任务进展列表
            alert('进展记录创建成功!');
          }
        } else {
          this.progressFormError = response.data?.message || '创建进展记录失败';
          console.error('创建进展记录失败:', response.data);
          // 如果创建记录失败，但之前上传了文件（理论上不会发生，但预防一下）
          this.isUploadingFile = false;
        }
      } catch (error) {
        console.error('创建进展记录错误:', error);
        this.progressFormError = '创建进展记录时发生错误，请稍后再试';
         this.isUploadingFile = false; // 确保上传状态也重置
      } finally {
        this.isCreatingProgress = false;
      }
    },

    // 上传文件 (与教师端相同)
    async uploadFile(progressId) {
      if (!this.selectedFile) {
        // 没有文件需要上传
        this.isUploadingFile = false; // 确保状态为 false
        // 文件上传成功 (逻辑上讲是没有文件需要上传，所以算成功处理了文件部分)
        this.fileUploadSuccess = true;
        // 关闭模态框并刷新列表
        this.showCreateProgressForm = false;
        this.loadTaskProgress();
        alert('进展记录创建成功!'); // 因为没有文件，创建记录成功时已经弹过框了，这里不再弹
        return;
      }

      this.isUploadingFile = true;
      this.uploadError = null;

      try {
        // 创建FormData对象
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        formData.append('progressId', progressId); // 确保 progressId 也作为表单数据发送

        // 上传文件
        const response = await apiService.uploadProgressFile(progressId, formData); // 使用 progressId 作为URL参数

        if (response.data && response.data.success) {
          console.log('文件上传成功:', response.data);
          this.fileUploadSuccess = true;
          // 文件上传成功后关闭模态框并刷新列表
          this.showCreateProgressForm = false;
          this.loadTaskProgress(); // 重新加载任务进展列表
          alert('进展记录创建成功，文件已上传!');
        } else {
          this.uploadError = response.data?.message || '上传文件失败';
          console.error('上传文件失败:', response.data);
          // 文件上传失败时，提示用户，可能需要处理已创建的进展记录
          // 为了简化，这里只提示失败
          alert('进展记录已创建，但文件上传失败，请稍后再试。');
        }
      } catch (error) {
        console.error('上传文件错误:', error);
        this.uploadError = '上传文件时发生错误，请稍后再试';
         // 文件上传失败时，提示用户
        alert('进展记录已创建，但文件上传失败，请稍后再试。');
      } finally {
        this.isUploadingFile = false;
      }
    },

    // 下载文件 (与教师端相同)
    downloadFile(progressId) {
      if (!progressId) {
        alert('进度记录ID无效，无法下载文件');
        return;
      }

      // 暂时禁用下载按钮，防止重复点击
      // event.target.disabled = true; // 如果需要，可以在这里添加禁用逻辑

      apiService.downloadProgressFile(progressId)
        .then(response => {
          console.log('文件下载响应:', response);

          // 从响应头中获取文件名
          const contentDisposition = response.headers['content-disposition'];
          let filename = '';

          // 尝试从Content-Disposition提取文件名
          if (contentDisposition) {
            const filenameRegex = /filename\*?=UTF-8''([\w%-.]*)/i; // 匹配 UTF-8 编码的文件名
            const matches = filenameRegex.exec(contentDisposition);
            if (matches != null && matches[1]) {
               // 解码文件名
               filename = decodeURIComponent(matches[1]);
            } else {
               // 尝试匹配非 UTF-8 编码的文件名
               const basicFilenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
               const basicMatches = basicFilenameRegex.exec(contentDisposition);
                if (basicMatches != null && basicMatches[1]) {
                  filename = basicMatches[1].replace(/['"]/g, '');
                }
            }
          }

          // 如果未能从响应头获取文件名，尝试从内容类型推断
          if (!filename) {
            const contentType = response.headers['content-type'];
            // 从内容类型生成适当的文件扩展名
            const extension = this.getFileExtensionFromContentType(contentType);
            // 使用时间戳生成唯一文件名
            filename = `download_${new Date().getTime()}${extension}`;
          }

          // 创建Blob对象，确保设置正确的类型
          const blob = new Blob([response.data], {
            type: response.headers['content-type'] || 'application/octet-stream'
          });

          // 创建下载链接
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename); // 设置下载文件名
          // link.target = '_blank'; // 可选：在新标签页打开下载
          document.body.appendChild(link); // 需要将链接添加到DOM才能触发点击
          link.click();

          // 清理
          setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
          }, 100);
        })
        .catch(error => {
          console.error('下载文件错误:', error);
          alert('下载文件时发生错误，请稍后再试');
        })
        .finally(() => {
           // 恢复下载按钮状态 (如果之前禁用了)
           // if (event.target) event.target.disabled = false;
        });
    },

    // 根据内容类型获取文件扩展名的辅助方法 (与教师端相同)
    getFileExtensionFromContentType(contentType) {
      const typeMap = {
        'application/pdf': '.pdf',
        'application/zip': '.zip',
        'application/x-rar-compressed': '.rar',
        'application/msword': '.doc',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
        'application/vnd.ms-excel': '.xls',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
        'application/vnd.ms-powerpoint': '.ppt',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
        'text/plain': '.txt',
        'text/csv': '.csv',
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/gif': '.gif',
        // 添加其他常见类型
      };

      // 考虑带编码的信息，如 "application/pdf;charset=UTF-8"
      const mime = contentType ? contentType.split(';')[0].trim() : '';
      return typeMap[mime] || '.bin'; // 默认为 .bin
    },

    // 删除进展记录 (与教师端相同，但移除 currentDirectionSource 判断)
    deleteProgress(progressId) {
      if (!progressId) {
        alert('进度记录ID无效，无法删除记录');
        return;
      }

      if (!confirm('确定要删除这条进展记录吗？此操作不可撤销。')) {
        return;
      }

      apiService.deleteTaskProgress(progressId)
        .then(response => {
          console.log('删除进展记录响应:', response.data);

          if (response.data && response.data.success) {
            this.loadTaskProgress(); // 重新加载任务进展列表
            alert('进展记录删除成功!');
          } else {
            alert(response.data?.message || '删除进展记录失败');
          }
        })
        .catch(error => {
          console.error('删除进展记录错误:', error);
          alert('删除进展记录时发生错误，请稍后再试');
        });
    },

    // 获取进展状态文本 (与教师端相同)
    getProgressStatusText(status) {
      return status === 'completed' ? '已完成' : '进行中';
    },

    // 从文件路径中提取文件名 (与教师端相同)
    getFileNameFromPath(filePath) {
      if (!filePath) return '';
      // 获取路径中最后一个斜杠后的内容作为文件名
      const parts = filePath.split('/');
      return parts[parts.length - 1];
    },

    // 删除进度文件 (与教师端相同，但移除 currentDirectionSource 判断)
    deleteFile(progressId) {
      if (!progressId) {
        alert('进度记录ID无效，无法删除文件');
        return;
      }

      if (!confirm('确定要删除这个文件吗？此操作不可撤销。')) {
        return;
      }

      apiService.deleteProgressFile(progressId)
        .then(response => {
          console.log('删除文件响应:', response.data);

          if (response.data && response.data.success) {
            this.loadTaskProgress(); // 重新加载任务进展列表
            alert('文件删除成功!');
          } else {
            alert(response.data?.message || '删除文件失败');
          }
        })
        .catch(error => {
          console.error('删除文件错误:', error);
          alert('删除文件时发生错误，请稍后再试');
        });
    },

    // 注意：学生端是否需要编辑任务功能？根据你的需求判断是否需要复制以下方法：
    // showEditTask() { ... },
    // cancelEditTask() { ... },
    // validateEditTaskForm() { ... },
    // updateTask() { ... },


    // 你可能已经有的其他方法...
    // formatTaskType(type) { ... },
    // ...

    // ********************* 方向成果相关方法 *********************

    // 加载方向任务统计数据 (从教师端复制，检查 apiService 调用)
    async loadOrientationTaskStats() {
      if (!this.currentDirectionDetail || !this.currentDirectionDetail.id) {
        console.error('当前方向详情未设置，无法加载任务统计');
        this.taskStatsError = '方向信息未加载，无法获取成果统计';
        return;
      }

      this.isLoadingTaskStats = true;
      this.taskStatsError = null;
      const orientationId = this.currentDirectionDetail.id;
      console.log('开始加载方向任务统计数据，方向ID:', orientationId);

      try {
        const response = await apiService.getOrientationTaskStats(orientationId); // 使用apiService调用接口
        console.log('获取方向任务统计响应:', response.data);

        if (response.data && response.data.success) {
          this.taskStats = response.data.data;

          // 处理任务详情数据，按类型分类
          this.thesisTasks = (this.taskStats.task_details || []).filter(task => task.type === 'thesis');
          this.projectTasks = (this.taskStats.task_details || []).filter(task => task.type === 'project');
          this.competitionTasks = (this.taskStats.task_details || []).filter(task => task.type === 'competition');

          console.log('方向任务统计数据加载完成，准备渲染图表');

          // 在下一个DOM更新周期后渲染当前成果视图的图表
          this.$nextTick(() => {
            // 确保当前是在成果标签页
            if (this.activeDetailTab === 'achievements') {
                this.renderTaskStatsChart();
            }
          });
        } else {
          this.taskStatsError = response.data?.message || '加载任务统计数据失败';
          console.error('加载任务统计数据失败:', response.data);
          this.taskStats = null; // 加载失败清空数据
        }
      } catch (error) {
        console.error('获取任务统计数据错误:', error);

        // 提供更具体的错误信息
        if (error.response) {
          console.error('错误响应:', error.response);
          if (error.response.status === 404) {
            this.taskStatsError = '找不到该方向的任务统计数据';
          } else if (error.response.status === 401) {
            this.taskStatsError = '您没有权限查看该方向的任务统计数据';
          } else {
            this.taskStatsError = `加载失败 (${error.response.status}): ${error.response.data?.message || '未知错误'}`;
          }
        } else if (error.request) {
          this.taskStatsError = '网络请求失败，请检查网络连接';
        } else {
          this.taskStatsError = '加载任务统计数据时发生错误，请稍后再试';
        }
         this.taskStats = null; // 加载失败清空数据
      } finally {
        this.isLoadingTaskStats = false;
      }
    },

    // 渲染任务统计图表 (从教师端复制)
    renderTaskStatsChart() {
      console.log('执行renderTaskStatsChart方法');

      // 在渲染之前，先销毁所有可能存在的图表实例，防止重复渲染和内存泄露
      this.destroyCharts();

      // 调用对应类型的图表渲染方法
      if (this.achievementView === 'thesis') {
        this.renderThesisChart();
      } else if (this.achievementView === 'project') {
        this.renderProjectChart();
      } else if (this.achievementView === 'competition') {
        this.renderCompetitionChart();
      }
    },

    // 渲染论文任务图表 (从教师端复制，使用 $refs 获取 canvas)
    renderThesisChart() {
      if (!this.taskStats || !this.$refs.thesisChartRef) {
        console.log('无法渲染论文图表：', !this.taskStats ? '任务统计数据不存在' : '图表容器不存在');
        return;
      }

      try {
        // 获取任务统计数据
        const thesisStats = this.getTaskStatsByType('thesis');

        if (!thesisStats) {
          console.log('论文任务统计数据不存在或格式不正确');
          return;
        }

        // 获取canvas上下文
        const ctx = this.$refs.thesisChartRef.getContext('2d');
        if (!ctx) {
          console.error('无法获取canvas上下文 (thesis)');
          return;
        }

        // 创建图表
        this.thesisChart = this.createTaskChart(ctx, thesisStats, '论文任务完成情况');

        console.log('论文图表创建成功');
      } catch (error) {
        console.error('渲染论文图表时发生错误:', error);
      }
    },

    // 渲染项目任务图表 (从教师端复制，使用 $refs 获取 canvas)
    renderProjectChart() {
      if (!this.taskStats || !this.$refs.projectChartRef) {
        console.log('无法渲染项目图表：', !this.taskStats ? '任务统计数据不存在' : '图表容器不存在');
        return;
      }

      try {
        // 获取任务统计数据
        const projectStats = this.getTaskStatsByType('project');

        if (!projectStats) {
          console.log('项目任务统计数据不存在或格式不正确');
          return;
        }

        // 获取canvas上下文
        const ctx = this.$refs.projectChartRef.getContext('2d');
        if (!ctx) {
          console.error('无法获取canvas上下文 (project)');
          return;
        }

        // 创建图表
        this.projectChart = this.createTaskChart(ctx, projectStats, '项目任务完成情况');

        console.log('项目图表创建成功');
      } catch (error) {
        console.error('渲染项目图表时发生错误:', error);
      }
    },

    // 渲染比赛任务图表 (从教师端复制，使用 $refs 获取 canvas)
    renderCompetitionChart() {
      if (!this.taskStats || !this.$refs.competitionChartRef) {
        console.log('无法渲染比赛图表：', !this.taskStats ? '任务统计数据不存在' : '图表容器不存在');
        return;
      }

      try {
        // 获取任务统计数据
        const competitionStats = this.getTaskStatsByType('competition');

        if (!competitionStats) {
          console.log('比赛任务统计数据不存在或格式不正确');
          return;
        }

        // 获取canvas上下文
        const ctx = this.$refs.competitionChartRef.getContext('2d');
        if (!ctx) {
          console.error('无法获取canvas上下文 (competition)');
          return;
        }

        // 创建图表
        this.competitionChart = this.createTaskChart(ctx, competitionStats, '比赛任务完成情况');

        console.log('比赛图表创建成功');
      } catch (error) {
        console.error('渲染比赛图表时发生错误:', error);
      }
    },

    // 根据任务类型获取统计数据 (从教师端复制)
    getTaskStatsByType(type) {
      if (!this.taskStats || !this.taskStats.task_details) {
        return null;
      }

      // 按类型筛选任务
      const filteredTasks = this.taskStats.task_details.filter(task => task.type === type);

      // 初始化统计对象
      const stats = {
        'A': { completed: 0, not_completed: 0, total: 0 },
        'B': { completed: 0, not_completed: 0, total: 0 },
        'C': { completed: 0, not_completed: 0, total: 0 },
        'D': { completed: 0, not_completed: 0, total: 0 }
      };

      // 统计各级别任务
      filteredTasks.forEach(task => {
        if (!stats[task.level]) {
          stats[task.level] = { completed: 0, not_completed: 0, total: 0 };
        }

        if (task.status === 'completed') {
          stats[task.level].completed += 1;
        } else {
          stats[task.level].not_completed += 1;
        }

        stats[task.level].total += 1;
      });

      return stats;
    },

    // 创建任务统计图表的通用方法 (从教师端复制，Chart 对象已在顶部导入)
    createTaskChart(ctx, taskStats, title) {
      // 准备图表数据
      const completedData = [];
      const notCompletedData = [];
      const labels = [];

      // 按级别顺序排序
      const levels = ['A', 'B', 'C', 'D'];

      // 确保所有级别都显示，即使数据为0
      levels.forEach(level => {
        labels.push(level + '类');
        completedData.push(taskStats[level] ? taskStats[level].completed : 0);
        notCompletedData.push(taskStats[level] ? taskStats[level].not_completed : 0);
      });

      // 创建图表
      return new Chart(ctx, {
        type: 'bar', // 柱状图
        data: {
          labels: labels,
          datasets: [
            {
              label: '已完成',
              data: completedData,
              backgroundColor: '#4CAF50', // 绿色
              borderColor: '#388E3C',
              borderWidth: 1,
              borderRadius: 4,
              barPercentage: 0.6,
              categoryPercentage: 0.7,
            },
            {
              label: '未完成',
              data: notCompletedData,
              backgroundColor: '#FFC107', // 黄色
              borderColor: '#FFA000',
              borderWidth: 1,
              borderRadius: 4,
              barPercentage: 0.6,
              categoryPercentage: 0.7,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // 不维持宽高比，允许容器控制尺寸
          layout: {
            padding: {
              top: 10, // 调整顶部内边距
              right: 10, // 调整右侧内边距
              bottom: 10, // 调整底部内边距
              left: 10 // 调整左侧内边距
            }
          },
          scales: {
            x: {
              stacked: false, // 不堆叠
              grid: {
                display: false, // 不显示网格线
                drawBorder: false // 不绘制轴边框
              },
              title: {
                display: true, // 显示轴标题
                text: '任务级别',
                font: {
                  size: 14,
                  weight: 'bold'
                },
                padding: {top: 10, bottom: 0}
              },
              ticks: {
                font: {
                  size: 12
                }
              }
            },
            y: {
              beginAtZero: true, // Y轴从0开始
              grid: {
                color: 'rgba(0, 0, 0, 0.05)', // 网格线颜色
                lineWidth: 1 // 网格线宽度
              },
              title: {
                display: true, // 显示轴标题
                text: '任务数量',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              },
              ticks: {
                precision: 0, // 不显示小数
                stepSize: 1, // 步长为1
                font: {
                  size: 12
                }
              }
            }
          },
          plugins: {
            title: {
              display: true, // 显示图表标题
               // 动态设置标题，包含方向名称
              text: this.currentDirectionDetail && this.currentDirectionDetail.name
                    ? `${this.currentDirectionDetail.name} - ${title}`
                    : title,
              font: {
                size: 16,
                weight: 'bold'
              },
              padding: {
                top: 10,
                bottom: 20
              }
            },
            legend: {
              position: 'top', // 图例位置
              labels: {
                padding: 15,
                usePointStyle: true, // 使用点样式
                pointStyle: 'rectRounded', // 圆角矩形点
                font: {
                  size: 12
                }
              }
            },
            tooltip: { // 工具提示样式
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              titleColor: '#333',
              bodyColor: '#333',
              borderColor: '#ddd',
              borderWidth: 1,
              padding: 10,
              displayColors: true,
              callbacks: {
                footer: (tooltipItems) => {
                  // 在工具提示底部显示总任务数
                  const level = tooltipItems[0].label.replace('类', '');
                  const stats = taskStats[level];
                  if (stats) {
                    return `总计: ${stats.total || 0} 任务`;
                  }
                  return '总计: 0 任务';
                }
              }
            }
          }
        }
      });
    },

     // 格式化任务级别（从教师端复制）
    formatTaskLevel(level) {
      if (!level) return '未知';
      return `${level}级`;
    },

    // 获取进展状态文本 (从教师端复制)
    getProgressStatusText(status) {
      return status === 'completed' ? '已完成' : '进行中';
    },

    // 格式化日期方法 (从教师端复制或自己实现)
    formatDate(dateString) {
      if (!dateString) return '';
      // 假设后端返回的是 ISO 8601 格式或其他 Date 可解析的格式
      try {
        const date = new Date(dateString);
        // 检查日期是否有效
        if (isNaN(date.getTime())) {
            return dateString; // 如果无效，返回原始字符串
        }
         // 格式化为 'YYYY-MM-DD HH:mm'
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      } catch (e) {
        console.error('日期格式化错误:', e);
        return dateString; // 发生错误也返回原始字符串
      }
    },

    // 销毁图表实例，防止内存泄露
    destroyCharts() {
        if (this.thesisChart instanceof Chart) {
            this.thesisChart.destroy();
            this.thesisChart = null;
        }
        if (this.projectChart instanceof Chart) {
            this.projectChart.destroy();
            this.projectChart = null;
        }
        if (this.competitionChart instanceof Chart) {
            this.competitionChart.destroy();
            this.competitionChart = null;
        }
    },

    // 注意：教师端有 watchAchievementView 和 handleResize 方法，
    // 这些用于在视图切换和窗口大小时重新渲染图表。
    // 我们将在 watch 和 mounted/beforeDestroy 中添加相应的逻辑。

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
    },
    // 监听 directionDetailTab 的变化，当切换到成果页时加载数据和渲染图表
    activeDetailTab(newTab, oldTab) {
        if (newTab === 'achievements') {
            // setDetailTab 方法中已经处理了加载逻辑
            // 这里主要是确保在切换回来时，如果数据已存在，能重新渲染图表
             if (this.taskStats) {
                this.$nextTick(() => {
                   this.renderTaskStatsChart();
                });
             } else if (!this.isLoadingTaskStats) {
                 // 如果数据还未加载且当前不在加载中，则加载数据
                 this.loadOrientationTaskStats();
             }
        } else {
            // 切换到其他标签页时，销毁图表实例
            this.destroyCharts();
        }
    },
    // 监听 achievementView 的变化，切换成果子标签页时渲染对应图表
    achievementView(newView, oldView) {
        if (newView !== oldView && this.activeDetailTab === 'achievements' && this.taskStats) {
            this.$nextTick(() => {
                this.renderTaskStatsChart(); // 渲染当前选中的成果图表
            });
        }
    },
     // 监听 taskStats 的变化，当数据加载完成后渲染图表
     taskStats(newStats, oldStats) {
        if (newStats && this.activeDetailTab === 'achievements') {
            console.log('taskStats 数据更新，渲染图表');
             this.$nextTick(() => {
                this.renderTaskStatsChart();
             });
        } else if (!newStats) {
             // 数据被清空时，销毁图表
             this.destroyCharts();
        }
     },
     // 监听 showDirectionDetail 的变化，在模态框显示时加载成果数据（如果需要）并在隐藏时销毁图表
     showDirectionDetail(newVal) {
         if (newVal) {
             // 模态框显示时，如果当前在成果标签页且数据未加载，加载数据
             if (this.activeDetailTab === 'achievements' && !this.taskStats && !this.isLoadingTaskStats) {
                 this.loadOrientationTaskStats();
             }
         } else {
             // 模态框隐藏时，销毁图表
             this.destroyCharts();
             // 清空成果相关数据，避免下次打开显示旧数据
             this.taskStats = null;
             this.thesisTasks = [];
             this.projectTasks = [];
             this.competitionTasks = [];
             this.taskStatsError = null;
         }
     }

    // ... 其他已有 watch ...
},
mounted() {
    // ... 已有 mounted 逻辑 ...
    // 可以在这里绑定 resize 事件，以便窗口大小变化时重新渲染图表
    // window.addEventListener('resize', this.handleResize); // 如果需要窗口自适应图表
    // 但通常情况下，Chart.js 默认是响应式的，依赖父容器尺寸，可能不需要手动监听 resize
},
beforeDestroy() {
    // 在组件销毁前销毁图表实例，防止内存泄露
    this.destroyCharts();
    // window.removeEventListener('resize', this.handleResize); // 如果绑定了 resize 事件
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
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.direction-detail-modal {
  max-width: 800px;
  width: 95%; /* 宽度调整 */
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
  margin: 0 auto;
  padding: 0;
  display: flex; /* 使用flex布局 */
  flex-direction: column; /* 垂直排列子元素 */
  /* overflow: hidden; /* 整体模态框隐藏溢出，内部容器负责滚动 */
}

/* 新增样式：模态框内容区域 */
.detail-content-scrollable {
  flex-grow: 1; /* 填充剩余空间 */
  overflow-y: auto; /* 垂直滚动 */
  max-height: calc(80vh - 120px); /* 根据屏幕高度和标签页等高度计算最大高度 */
  padding: 0 24px 24px; /* 添加内边距，底部留白 */
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px 12px 32px;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
  position: relative; /* 新增这一行 */
}
.close-btn {
  position: absolute;
  top: 18px;
  right: 24px;
  background: none;
  border: none;
  font-size: 32px;
  color: #888;
  cursor: pointer;
  z-index: 10;
}
.modal-body {
  padding: 0; /* 移除 padding */
  /* height: auto; */
  /* overflow: visible; */
}
.detail-tabs {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  padding: 0 24px; /* 标签栏内边距 */
  height: 56px;
  flex-shrink: 0; /* 防止标签栏被压缩 */
}
.detail-tab {
  font-size: 17px;
  color: #888;
  padding: 0 8px;
  height: 56px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}
.detail-tab.active {
  color: #1890ff;
  border-bottom: 2.5px solid #1890ff;
  font-weight: 500;
  background: #fff;
}
.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  margin-bottom: 18px;
  padding: 18px 24px;
}
.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #1890ff;
  margin-bottom: 10px;
  border-left: 3px solid #1890ff;
  padding-left: 8px;
}
.card-content {
  font-size: 15px;
  color: #333;
}
.info-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px 48px;
}
.info-label {
  color: #888;
  font-size: 14px;
  margin-bottom: 2px;
  min-width: 80px;
}
.info-value {
  color: #222;
  font-size: 15px;
  font-weight: 500;
  margin-right: 32px;
}
.member-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
  background: #fafbfc;
  border-radius: 6px;
  overflow: hidden;
}
.member-table th, .member-table td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  font-size: 15px;
}
.member-table th {
  background: #f5f7fa;
  color: #888;
  font-weight: 500;
}
.member-table tr:last-child td {
  border-bottom: none;
}
.member-table td {
  color: #333;
}
.member-table tr:nth-child(odd) {
  background: #fff;
}
.member-table tr:nth-child(even) {
  background: #fafbfc;
}
.member-table td[colspan] {
  text-align: center;
  color: #aaa;
  font-style: italic;
  background: #f8f8f8;
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

 /* 方向管理页面样式 */
 .direction-panel {
   padding: 20px;
   background-color: #fff;
   border-radius: 4px;
   box-shadow: 0 1px 4px rgba(0,0,0,0.05);
   display: flex;
   flex-direction: column;
   height: calc(100vh - 120px);
   overflow: hidden;
 }

 .direction-content {
   flex: 1;
   display: flex;
   flex-direction: column;
   overflow: hidden;
 }

 .direction-tabs {
   display: flex;
   margin-bottom: 15px;
   border-bottom: 1px solid #ddd;
   flex-shrink: 0;
 }

 .direction-tab {
   padding: 10px 20px;
   cursor: pointer;
   position: relative;
   transition: all 0.3s;
   font-weight: 500;
   margin-right: 10px;
 }

 .direction-tab.active {
   color: #1890ff;
   border-bottom: 2px solid #1890ff;
 }

 .direction-tab:hover {
   color: #1890ff;
 }

 .direction-list-container {
   flex: 1;
   overflow-y: auto;
   overflow-x: hidden;
   position: relative;
   padding-right: 6px; /* 为滚动条预留空间 */
   height: calc(100% - 50px); /* 减去tab栏高度 */
   min-height: 200px;
 }

 .direction-list {
   display: flex;
   flex-direction: column;
   gap: 16px;
   padding-bottom: 16px; /* 列表底部添加间距 */
 }

 .list-title {
   font-size: 18px;
   font-weight: 500;
   margin-bottom: 10px;
 }

 .direction-table-wrapper {
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

 .team-table tbody tr:hover {
   background-color: #f5f5f5;
 }

 .team-table tbody tr:nth-child(odd) {
   background-color: #fafafa;
 }

 .view-btn {
   padding: 6px 12px;
   border-radius: 4px;
   border: none;
   cursor: pointer;
   font-size: 14px;
   transition: all 0.3s;
   background-color: #1890ff;
   color: white;
 }

 .view-btn:hover {
   background-color: #40a9ff;
 }

 .sub-menu {
   display: flex;
   flex-direction: column;
   gap: 10px;
   padding-left: 20px;
 }

 .sub-nav-item {
   padding: 6px 0;
   cursor: pointer;
   transition: all 0.3s;
   color: #ccc;
   text-align: center;
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
 }

 .sub-nav-item.active {
   color: #1890ff;
   border-left: 3px solid #1890ff;
 }

 .sub-nav-item:hover {
   color: #1890ff;
 }

 .apply-btn {
   padding: 6px 12px;
   border-radius: 4px;
   border: none;
   cursor: pointer;
   font-size: 14px;
   background-color: #52c41a;
   color: white;
   margin-left: 6px;
   transition: all 0.3s;
 }

 .apply-btn:disabled {
   background-color: #b7eb8f;
   color: #fff;
   cursor: not-allowed;
 }

 .detail-tabs {
   display: flex;
   margin-bottom: 15px;
   border-bottom: 1px solid #ddd;
   flex-shrink: 0;
 }

 .detail-tab {
   padding: 10px 20px;
   cursor: pointer;
   position: relative;
   transition: all 0.3s;
   font-weight: 500;
   margin-right: 10px;
 }

 .detail-tab.active {
   color: #1890ff;
   border-bottom: 2px solid #1890ff;
 }

 .detail-tab:hover {
   color: #1890ff;
 }

 .tab-content {
   flex: 1;
   display: flex;
   flex-direction: column;
   overflow: hidden;
 }

 .intro-tab {
   flex: 1;
   display: flex;
   flex-direction: column;
   overflow: hidden;
 }

 .info-row {
   display: flex;
   gap: 10px;
   margin-bottom: 10px;
 }

 .card {
   background-color: #fff;
   border-radius: 8px;
   box-shadow: 0 1px 3px rgba(0,0,0,0.05);
   padding: 15px;
   margin-bottom: 15px;
 }

 .card-title {
   font-size: 16px;
   font-weight: 500;
   margin-bottom: 10px;
 }

 .card-content {
   font-size: 14px;
   color: #333;
 }

 .member-table {
   width: 100%;
   border-collapse: collapse;
   margin-top: 10px;
 }

 .member-table th, .member-table td {
   padding: 8px 12px;
   text-align: left;
   border-bottom: 1px solid #f0f0f0;
 }

 .member-table th {
   background-color: #f9f9f9;
 }

 .task-container {
   padding: 20px;
   background-color: #fff;
   border-radius: 8px;
   box-shadow: 0 1px 3px rgba(0,0,0,0.05);
 }

 .task-header {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 20px;
 }

 .section-title {
   font-size: 18px;
   font-weight: 500;
   color: #333;
 }

 .task-table-wrapper {
   border: 1px solid #e8e8e8;
   border-radius: 4px;
   background-color: #fff;
   position: relative;
 }

 .task-table {
   width: 100%;
   border-collapse: separate;
   border-spacing: 0;
 }

 .task-table th,
 .task-table td {
   padding: 12px 8px;
   text-align: left;
   white-space: nowrap;
   border-bottom: 1px solid #e8e8e8;
 }

 .task-table th {
   background-color: #f5f5f5;
   position: sticky;
   top: 0;
   z-index: 5;
   box-shadow: 0 1px 2px rgba(0,0,0,0.1);
 }

 .task-table th:nth-child(1),
 .task-table td:nth-child(1) {
   width: 15%;
 }

 .task-table th:nth-child(2),
 .task-table td:nth-child(2) {
   width: 20%;
 }

 .task-table th:nth-child(3),
 .task-table td:nth-child(3) {
   width: 10%;
 }

 .task-table th:nth-child(4),
 .task-table td:nth-child(4) {
   width: 10%;
 }

 .task-table th:nth-child(5),
 .task-table td:nth-child(5) {
   width: 15%;
 }

 .task-table th:nth-child(6),
 .task-table td:nth-child(6) {
   width: 30%;
 }

 .task-table tbody tr:hover {
   background-color: #f5f5f5;
 }

 .task-table tbody tr:nth-child(odd) {
   background-color: #fafafa;
 }

 .view-btn {
   padding: 6px 12px;
   border-radius: 4px;
   border: none;
   cursor: pointer;
   font-size: 14px;
   transition: all 0.3s;
   background-color: #1890ff;
   color: white;
 }

 .view-btn:hover {
   background-color: #40a9ff;
 }

 .new-task-btn {
   background: #1890ff;
   color: #fff;
   border: none;
   border-radius: 4px;
   padding: 6px 18px;
   font-size: 15px;
   cursor: pointer;
   margin-left: 16px;
   transition: background 0.2s;
 }
 .new-task-btn:hover {
   background: #40a9ff;
 }
 .modal-overlay {
   position: fixed;
   top: 0; left: 0; right: 0; bottom: 0;
   background: rgba(0,0,0,0.18);
   z-index: 1000;
   display: flex;
   align-items: center;
   justify-content: center;
 }
 .modal-content.task-form-modal {
   background: #fff;
   border-radius: 10px;
   width: 420px;
   max-width: 95vw;
   box-shadow: 0 4px 24px rgba(0,0,0,0.13);
   padding: 0;
   overflow: hidden;
 }
 .modal-header {
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 18px 24px 0 24px;
 }
 .close-button {
   background: none;
   border: none;
   font-size: 24px;
   color: #888;
   cursor: pointer;
 }
 .modal-body {
   padding: 18px 24px 24px 24px;
 }
 .form-group {
   margin-bottom: 16px;
 }
 .form-row {
   display: flex;
   gap: 16px;
 }
 .half-width {
   flex: 1;
 }
 .form-control {
   width: 100%;
   padding: 7px 10px;
   border: 1px solid #d9d9d9;
   border-radius: 4px;
   font-size: 15px;
 }
 .form-error {
   color: #ff4d4f;
   margin-bottom: 10px;
 }
 .form-actions {
   display: flex;
   justify-content: flex-end;
   gap: 12px;
 }
 .cancel-btn {
   background: #f5f5f5;
   color: #333;
   border: none;
   border-radius: 4px;
   padding: 6px 18px;
   font-size: 15px;
   cursor: pointer;
 }
 .submit-btn {
   background: #1890ff;
   color: #fff;
   border: none;
   border-radius: 4px;
   padding: 6px 18px;
   font-size: 15px;
   cursor: pointer;
 }
 .submit-btn:disabled {
   background: #b5d6fb;
   cursor: not-allowed;
 }
 .task-detail-modal {
   max-width: 800px;
   width: 95%;
   background: #fff;
   border-radius: 12px;
   box-shadow: 0 4px 24px rgba(0,0,0,0.12);
   margin: 0 auto;
   padding: 0;
   overflow: hidden;
   /* 修改：将整体 modal 设置为 flex 容器 */
   display: flex;
   flex-direction: column;
 }
 .task-tabs {
   display: flex;
   align-items: center;
   border-bottom: 1px solid #eee;
   background: #fff;
   position: sticky; /* 固定标签栏 */
   top: 0;
   z-index: 10;
   box-shadow: 0 2px 8px rgba(0,0,0,0.03);
   padding: 0 24px;
   height: 56px;
   flex-shrink: 0; /* 确保标签栏不收缩 */
 }
 .tabs-container {
   display: flex;
   gap: 32px;
   height: 100%;
 }
 .task-tab {
   font-size: 17px;
   color: #888;
   padding: 0 8px;
   height: 56px;
   display: flex;
   align-items: center;
   cursor: pointer;
   border-bottom: 2px solid transparent;
   transition: color 0.2s, border-color 0.2s;
 }
 .task-tab.active {
   color: #1890ff;
   border-bottom: 2.5px solid #1890ff;
   font-weight: 500;
 }
 .task-detail-panel {
   padding: 24px 32px 32px 32px;
 }
 .info-card {
   background: #fff;
   border-radius: 8px;
   box-shadow: 0 2px 8px rgba(0,0,0,0.04);
   margin-bottom: 24px;
   padding: 18px 24px 18px 24px;
 }
 .card-title {
   font-size: 16px;
   font-weight: 600;
   color: #1890ff;
   margin-bottom: 16px;
   border-left: 3px solid #1890ff;
   padding-left: 8px;
 }
 .info-grid {
   display: flex;
   flex-wrap: wrap;
   gap: 24px 48px;
 }
 .info-item {
   min-width: 180px;
   margin-bottom: 8px;
 }
 .info-label {
   color: #888;
   font-size: 14px;
   margin-bottom: 2px;
 }
 .info-value {
   color: #222;
   font-size: 15px;
   font-weight: 500;
 }
 .description {
   color: #444;
   font-size: 15px;
   line-height: 1.7;
   word-break: break-all;
 }
 /* 进展部分可复用教师端样式 */
 .task-progress-panel {
   padding: 24px 32px 32px 32px;
 }
 .progress-timeline {
   display: flex;
   flex-direction: column;
   gap: 18px;
 }
 .progress-item {
   background: #fafbfc;
   border-radius: 6px;
   box-shadow: 0 1px 4px rgba(0,0,0,0.04);
   padding: 16px 20px;
 }
 .progress-header {
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-bottom: 8px;
 }
 .progress-title {
   font-size: 15px;
   font-weight: 600;
   color: #1890ff;
 }
 .progress-meta {
   display: flex;
   align-items: center;
   gap: 16px;
 }
 .progress-time {
   color: #888;
   font-size: 13px;
 }
 .status-badge {
   display: inline-block;
   padding: 2px 10px;
   border-radius: 12px;
   font-size: 13px;
   font-weight: 500;
   background: #e6f7ff;
   color: #1890ff;
 }
 .status-badge.completed {
   background: #e6fffb;
   color: #52c41a;
 }
 .status-badge.in-progress {
   background: #fffbe6;
   color: #faad14;
 }
 .progress-content {
   color: #444;
   font-size: 15px;
   margin-top: 6px;
 }
 .progress-result {
   margin-top: 8px;
   color: #1890ff;
   font-size: 14px;
 }
 .empty-message {
   color: #888;
   text-align: center;
   margin: 32px 0;
   font-size: 16px;
 }
 .loading-container {
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   min-height: 180px;
   font-size: 16px;
   color: #888;
 }

 .detail-content-scrollable {
   flex-grow: 1; /* 填充剩余空间 */
   overflow-y: auto; /* 垂直滚动条 */
   padding: 24px 32px 32px 32px; /* 将原 modal-body 的 padding 移到这里 */
 }

 /* 原有的 .detail-panel 样式可以保留，用于内部内容的 padding */
 .detail-panel {
   padding: 0; /* 移除原 detail-panel 的 padding，因为它移到了 detail-content-scrollable */
 }

 /* 如果 task-detail-container 有额外的 padding 或 margin，可能需要调整 */
 .direction-detail-container {
     /* padding: 0; */ /* 如果有 padding，考虑移除 */
     /* margin: 0; */ /* 如果有 margin，考虑移除 */
 }

 /* 修改这个样式定义 */
 /* .direction-detail-modal { */
 .modal-content.direction-detail-modal { /* <-- 增加 .modal-content */
   max-width: 800px;
   width: 95%;
   background: #fff;
   border-radius: 12px;
   box-shadow: 0 4px 24px rgba(0,0,0,0.12);
   margin: 0 auto;
   padding: 0;
   overflow: hidden;
   display: flex; /* 使用 flex 布局 */
   flex-direction: column; /* 垂直排列子元素 */
 }

 /* 同时，确保你之前添加的可滚动容器的 padding 还在 */
 .detail-content-scrollable {
   flex-grow: 1;
   overflow-y: auto;
   padding: 24px 32px 32px 32px; /* 确保这个 padding 在 */
 }

 /* 原有的通用 .modal-content 样式可以保留，它会影响其他模态框 */
 .modal-content {
   background-color: white;
   border-radius: 8px;
   width: 90%;
   max-width: 500px; /* <-- 这个样式会被上面的组合选择器覆盖 */
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
   position: relative;
 }

 .modal-content.task-detail-modal { /* <--- 修改这里 */
   max-width: 800px; /* 保留最大宽度 */
   /* width: 95%;  <-- 如果之前删除了 width: 95%; 这一行，可以不加回来 */
   background: #fff;
   border-radius: 12px;
   box-shadow: 0 4px 24px rgba(0,0,0,0.12);
   margin: 0 auto; /* 保留居中 */
   padding: 0;
   overflow: hidden;
   display: flex;
   flex-direction: column;
   /* 可能需要添加 min-width 以确保在小屏幕下不会过窄，例如 */
   min-width: 300px; /* 示例值，你可以根据需要调整 */
 }

 /* 任务详情模态框样式 */
 /* 修改这个样式定义 */
 .modal-content.task-detail-modal { /* <--- 确保使用这个更具体的选择器 */
   max-width: 800px; /* 保留最大宽度 */
   /* width: 95%;  <-- 如果之前删除了 width: 95%; 这一行，可以不加回来 */
   background: #fff;
   border-radius: 12px;
   box-shadow: 0 4px 24px rgba(0,0,0,0.12);
   margin: 0 auto; /* 保留居中 */
   padding: 0;
   overflow: hidden; /* 模态框整体隐藏溢出，滚动由内部容器控制 */
   display: flex;
   flex-direction: column;
   /* 添加最大高度，确保模态框不会超出屏幕 */
   max-height: 80vh; /* 示例值，你可以根据需要调整 */
   /* 可能需要添加 min-width 以确保在小屏幕下不会过窄，例如 */
   min-width: 300px; /* 示例值，你可以根据需要调整 */
 }

 .modal-header {
   padding: 16px 24px;
   border-bottom: 1px solid #eee;
   display: flex;
   justify-content: space-between;
   align-items: center;
   flex-shrink: 0; /* 确保头部不收缩 */
 }

 .modal-header h3 {
   font-size: 18px;
   color: #333;
 }

 .close-button {
   background: none;
   border: none;
   font-size: 24px;
   color: #999;
   cursor: pointer;
   transition: color 0.2s;
 }

 .close-button:hover {
   color: #666;
 }

 .task-tabs {
   display: flex;
   align-items: center;
   border-bottom: 1px solid #eee;
   background: #fff;
   position: sticky; /* 固定标签栏 */
   top: 0;
   z-index: 10;
   box-shadow: 0 2px 8px rgba(0,0,0,0.03);
   padding: 0 24px;
   height: 56px;
   flex-shrink: 0; /* 确保标签栏不收缩 */
 }

 .tabs-container {
   display: flex;
   gap: 32px;
   height: 100%;
 }

 .task-tab {
   font-size: 17px;
   color: #888;
   padding: 0 8px;
   height: 56px;
   display: flex;
   align-items: center;
   cursor: pointer;
   border-bottom: 2px solid transparent;
   transition: color 0.2s, border-color 0.2s;
 }

 .task-tab.active {
   color: #1890ff;
   border-bottom: 2.5px solid #1890ff;
   font-weight: 500;
 }

 /* 新增：可滚动内容区域的样式 */
 .modal-content-scrollable {
   flex: 1; /* 占据剩余空间 */
   overflow-y: auto; /* <--- 确保这个样式存在并生效，负责垂直滚动 */
   padding: 24px; /* 为内容区域添加内边距 */
   /* 如果需要，可以设置一个最小高度，防止内容过少时区域塌陷 */
   min-height: 0; /* flex 项目需要设置 min-height: 0; 才能正确收缩 */
 }


 /* 以下是任务详情和任务进展的具体内容样式，确保它们在 .modal-content-scrollable 内部 */

 .task-detail-container {
   /* 可能需要调整内部布局，确保内容正确填充 */
 }

 .task-detail-panel,
 .task-progress-panel {
     /* 确保这两个面板内部没有阻止滚动的样式 */
     /* 例如，不要设置 height: 100%; 或 overflow: hidden; */
     padding: 0; /* 移除面板自身的 padding，让 padding 在 .modal-content-scrollable 上统一设置 */
 }


 .info-card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    margin-bottom: 24px;
    padding: 18px 24px 18px 24px; /* 调整内边距，更接近教师端风格 */
 }

 .card-title {
    font-size: 16px;
    font-weight: 600;
    color: #1890ff;
    margin-bottom: 16px;
    border-left: 3px solid #1890ff;
    padding-left: 8px;
 }

 .info-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 24px 48px; /* 调整间距 */
 }

 .info-item {
    min-width: 180px; /* 确保每个信息项有最小宽度 */
    margin-bottom: 8px; /* 增加底部间距 */
 }

 .info-label {
    color: #888;
    font-size: 14px;
    margin-bottom: 2px;
 }

 .info-value {
    color: #222;
    font-size: 15px;
    font-weight: 500;
    word-break: break-all; /* 确保长文本换行 */
 }

 .description {
    color: #444;
    font-size: 15px;
    line-height: 1.7;
    word-break: break-all;
    white-space: pre-wrap; /* 保留换行符 */
 }


 /* 进展部分样式 */
 .progress-timeline {
    display: flex;
    flex-direction: column;
    gap: 18px;
 }

 .progress-item {
    background: #fafbfc; /* 调整背景色 */
    border-radius: 6px; /* 调整圆角 */
    box-shadow: 0 1px 4px rgba(0,0,0,0.04); /* 调整阴影 */
    padding: 16px 20px; /* 调整内边距 */
 }

 .progress-header {
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-bottom: 8px;
 }

 .progress-title {
    font-size: 15px;
    font-weight: 600;
    color: #1890ff; /* 调整标题颜色 */
    margin: 0;
 }

 .progress-meta {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 13px; /* 调整字体大小 */
    color: #888; /* 调整颜色 */
 }

 .progress-time {
   white-space: nowrap;
 }

 .status-badge {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 12px; /* 调整圆角 */
    font-size: 13px;
    font-weight: 500;
    /* 调整状态颜色 */
    background: #e6f7ff;
    color: #1890ff;
  }
  .status-badge.completed {
    background: #e6fffb;
    color: #52c41a;
  }
  .status-badge.in-progress {
    background: #fffbe6;
    color: #faad14;
  }

 .progress-content {
    color: #444;
    font-size: 15px;
    margin-top: 6px;
    line-height: 1.6; /* 调整行高 */
    white-space: pre-wrap; /* 保留换行符和空格 */
    word-break: break-all;
 }

 .progress-result {
   margin-top: 8px;
   color: #1890ff;
   font-size: 14px;
   /* 调整样式 */
 }

 .progress-footer {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-top: 12px;
   padding-top: 12px;
   border-top: 1px solid #eee; /* 添加顶部分割线 */
 }

 .file-info {
   display: flex;
   align-items: center;
   gap: 10px;
 }

 .file-attachment {
   font-size: 14px;
   color: #555;
   display: flex;
   align-items: center;
 }

 .file-icon {
   margin-right: 4px;
   font-size: 16px;
   color: #1890ff; /* 调整图标颜色 */
 }

 .file-actions {
   display: flex;
   gap: 10px;
 }

 .download-btn,
 .delete-file-btn,
 .delete-progress-btn { /* 删除记录按钮样式 */
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  font-size: 13px;
  padding: 0;
  transition: color 0.2s;
}

.download-btn:hover,
.delete-file-btn:hover {
  color: #40a9ff;
  text-decoration: underline;
}

.delete-progress-btn {
   color: #ff4d4f; /* 删除记录按钮颜色 */
}

.delete-progress-btn:hover {
    color: #ff7875;
    text-decoration: underline;
}


.action-buttons {
    display: flex;
    gap: 10px;
}


/* 提交任务进展模态框样式 */
.modal-content.progress-form-modal {
  background: #fff;
  border-radius: 10px;
  width: 420px; /* 调整宽度 */
  max-width: 95vw;
  box-shadow: 0 4px 24px rgba(0,0,0,0.13);
  padding: 0;
  overflow: hidden;
}

/* 表单通用样式 (可能已存在，确保一致) */
.modal-body {
   padding: 18px 24px 24px 24px;
}
.form-group {
   margin-bottom: 16px;
}
.form-control {
   width: 100%;
   padding: 7px 10px;
   border: 1px solid #d9d9d9;
   border-radius: 4px;
   font-size: 15px;
}
.form-control-file { /* 文件输入框样式可能需要单独调整 */
    display: block;
    width: 100%;
}
.form-text {
    font-size: 12px;
    color: #888;
    margin-top: 4px;
    display: block; /* 确保占一行 */
}
.selected-file-info {
    font-size: 13px;
    color: #555;
    margin-top: 8px;
    word-break: break-all;
}


.form-error {
   color: #ff4d4f;
   margin-bottom: 10px;
   font-size: 14px;
}

.modal-footer { /* 表单底部按钮区域 */
  padding: 12px 24px;
  border-top: 1px solid #eee;
  background: #f9f9f9;
  display: flex;
  justify-content: flex-end;
}

.form-actions { /* 按钮容器 */
   display: flex;
   gap: 12px;
}

.cancel-btn {
   background: #f5f5f5;
   color: #333;
   border: none;
   border-radius: 4px;
   padding: 6px 18px;
   font-size: 15px;
   cursor: pointer;
    transition: background 0.2s;
}
.cancel-btn:hover {
    background: #e0e0e0;
}

.submit-btn {
   background: #1890ff;
   color: #fff;
   border: none;
   border-radius: 4px;
   padding: 6px 18px;
   font-size: 15px;
   cursor: pointer;
    transition: background 0.2s;
}
.submit-btn:hover {
    background: #40a9ff;
}

.submit-btn:disabled {
   background: #b5d6fb;
   cursor: not-allowed;
}


/* 其他样式保留 */
/* ... existing styles ... */

/* 任务进展相关的样式 */

.progress-actions {
  margin-bottom: 20px;
  text-align: right; /* 按钮靠右 */
  padding-right: 24px; /* 与内容padding一致 */
}

.add-progress-btn {
  background: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 20px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
  display: inline-flex; /* 使按钮内容居中 */
  align-items: center;
}

.add-progress-btn:hover {
  background: #40a9ff;
}

.btn-icon {
  font-style: normal; /* 确保图标不倾斜 */
  margin-right: 5px;
  font-weight: bold;
}

/* 任务进展列表样式 */
.progress-timeline {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.progress-item {
  background: #fafbfc; /* 调整背景色 */
  border-radius: 6px; /* 调整圆角 */
  box-shadow: 0 1px 4px rgba(0,0,0,0.04); /* 调整阴影 */
  padding: 16px 20px; /* 调整内边距 */
}

.progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.progress-title {
  font-size: 15px;
  font-weight: 600;
  color: #1890ff; /* 调整标题颜色 */
  margin: 0;
}

.progress-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 13px; /* 调整字体大小 */
  color: #888; /* 调整颜色 */
}

.progress-time {
  white-space: nowrap;
}

.status-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px; /* 调整圆角 */
  font-size: 13px;
  font-weight: 500;
  /* 调整状态颜色 */
  background: #e6f7ff;
  color: #1890ff;
}
.status-badge.completed {
  background: #e6fffb;
  color: #52c41a;
}
.status-badge.in-progress {
  background: #fffbe6;
  color: #faad14;
}

.progress-content {
  color: #444;
  font-size: 15px;
  margin-top: 6px;
  line-height: 1.6; /* 调整行高 */
  white-space: pre-wrap; /* 保留换行符和空格 */
  word-break: break-all;
}

.progress-result {
  margin-top: 8px;
  color: #1890ff;
  font-size: 14px;
  /* 调整样式 */
}

.progress-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee; /* 添加顶部分割线 */
}

.file-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.file-attachment {
  font-size: 14px;
  color: #555;
  display: flex;
  align-items: center;
}

.file-icon {
  margin-right: 4px;
  font-size: 16px;
  color: #1890ff; /* 调整图标颜色 */
}

.file-actions {
  display: flex;
  gap: 10px;
}

.download-btn,
.delete-file-btn,
.delete-progress-btn { /* 删除记录按钮样式 */
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  font-size: 13px;
  padding: 0;
  transition: color 0.2s;
}

.download-btn:hover,
.delete-file-btn:hover {
  color: #40a9ff;
  text-decoration: underline;
}

.delete-progress-btn {
   color: #ff4d4f; /* 删除记录按钮颜色 */
}

.delete-progress-btn:hover {
    color: #ff7875;
    text-decoration: underline;
}


.action-buttons {
    display: flex;
    gap: 10px;
}


/* 提交任务进展模态框样式 */
.modal-content.progress-form-modal {
  background: #fff;
  border-radius: 10px;
  width: 420px; /* 调整宽度 */
  max-width: 95vw;
  box-shadow: 0 4px 24px rgba(0,0,0,0.13);
  padding: 0;
  overflow: hidden;
}

/* 表单通用样式 (可能已存在，确保一致) */
.modal-body {
   padding: 18px 24px 24px 24px;
}
.form-group {
   margin-bottom: 16px;
}
.form-control {
   width: 100%;
   padding: 7px 10px;
   border: 1px solid #d9d9d9;
   border-radius: 4px;
   font-size: 15px;
}
.form-control-file { /* 文件输入框样式可能需要单独调整 */
    display: block;
    width: 100%;
}
.form-text {
    font-size: 12px;
    color: #888;
    margin-top: 4px;
    display: block; /* 确保占一行 */
}
.selected-file-info {
    font-size: 13px;
    color: #555;
    margin-top: 8px;
    word-break: break-all;
}


.form-error {
   color: #ff4d4f;
   margin-bottom: 10px;
   font-size: 14px;
}

.modal-footer { /* 表单底部按钮区域 */
  padding: 12px 24px;
  border-top: 1px solid #eee;
  background: #f9f9f9;
  display: flex;
  justify-content: flex-end;
}

.form-actions { /* 按钮容器 */
   display: flex;
   gap: 12px;
}

.cancel-btn {
   background: #f5f5f5;
   color: #333;
   border: none;
   border-radius: 4px;
   padding: 6px 18px;
   font-size: 15px;
   cursor: pointer;
    transition: background 0.2s;
}
.cancel-btn:hover {
    background: #e0e0e0;
}

.submit-btn {
   background: #1890ff;
   color: #fff;
   border: none;
   border-radius: 4px;
   padding: 6px 18px;
   font-size: 15px;
   cursor: pointer;
    transition: background 0.2s;
}
.submit-btn:hover {
    background: #40a9ff;
}

.submit-btn:disabled {
   background: #b5d6fb;
   cursor: not-allowed;
}


/* 其他样式保留 */
/* ... existing styles ... */

/* 任务进展相关的样式 */

.progress-actions {
  margin-bottom: 20px;
  text-align: right; /* 按钮靠右 */
  padding-right: 24px; /* 与内容padding一致 */
}

.add-progress-btn {
  background: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 20px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
  display: inline-flex; /* 使按钮内容居中 */
  align-items: center;
}

.add-progress-btn:hover {
  background: #40a9ff;
}

.btn-icon {
  font-style: normal; /* 确保图标不倾斜 */
  margin-right: 5px;
  font-weight: bold;
}

/* 任务进展列表样式 */
.progress-timeline {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.progress-item {
  background: #fafbfc; /* 调整背景色 */
  border-radius: 6px; /* 调整圆角 */
  box-shadow: 0 1px 4px rgba(0,0,0,0.04); /* 调整阴影 */
  padding: 16px 20px; /* 调整内边距 */
}

.progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.progress-title {
  font-size: 15px;
  font-weight: 600;
  color: #1890ff; /* 调整标题颜色 */
  margin: 0;
}

.progress-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 13px; /* 调整字体大小 */
  color: #888; /* 调整颜色 */
}

.progress-time {
  white-space: nowrap;
}

.status-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px; /* 调整圆角 */
  font-size: 13px;
  font-weight: 500;
  /* 调整状态颜色 */
  background: #e6f7ff;
  color: #1890ff;
}
.status-badge.completed {
  background: #e6fffb;
  color: #52c41a;
}
.status-badge.in-progress {
  background: #fffbe6;
  color: #faad14;
}

.progress-content {
  color: #444;
  font-size: 15px;
  margin-top: 6px;
  line-height: 1.6; /* 调整行高 */
  white-space: pre-wrap; /* 保留换行符和空格 */
  word-break: break-all;
}

.progress-result {
  margin-top: 8px;
  color: #1890ff;
  font-size: 14px;
  /* 调整样式 */
}

.progress-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee; /* 添加顶部分割线 */
}

.file-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.file-attachment {
  font-size: 14px;
  color: #555;
  display: flex;
  align-items: center;
}

.file-icon {
  margin-right: 4px;
  font-size: 16px;
  color: #1890ff; /* 调整图标颜色 */
}

.file-actions {
  display: flex;
  gap: 10px;
}

.download-btn,
.delete-file-btn,
.delete-progress-btn { /* 删除记录按钮样式 */
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  font-size: 13px;
  padding: 0;
  transition: color 0.2s;
}

.download-btn:hover,
.delete-file-btn:hover {
  color: #40a9ff;
  text-decoration: underline;
}

.delete-progress-btn {
   color: #ff4d4f; /* 删除记录按钮颜色 */
}

.delete-progress-btn:hover {
    color: #ff7875;
    text-decoration: underline;
}


.action-buttons {
    display: flex;
    gap: 10px;
}


/* 提交任务进展模态框样式 */
.modal-content.progress-form-modal {
  background: #fff;
  border-radius: 10px;
  width: 420px; /* 调整宽度 */
  max-width: 95vw;
  box-shadow: 0 4px 24px rgba(0,0,0,0.13);
  padding: 0;
  overflow: hidden;
}

/* 表单通用样式 (可能已存在，确保一致) */
.modal-body {
   padding: 18px 24px 24px 24px;
}
.form-group {
   margin-bottom: 16px;
}
.form-control {
   width: 100%;
   padding: 7px 10px;
   border: 1px solid #d9d9d9;
   border-radius: 4px;
   font-size: 15px;
}
.form-control-file { /* 文件输入框样式可能需要单独调整 */
    display: block;
    width: 100%;
}
.form-text {
    font-size: 12px;
    color: #888;
    margin-top: 4px;
    display: block; /* 确保占一行 */
}
.selected-file-info {
    font-size: 13px;
    color: #555;
    margin-top: 8px;
    word-break: break-all;
}


.form-error {
   color: #ff4d4f;
   margin-bottom: 10px;
   font-size: 14px;
}

.modal-footer { /* 表单底部按钮区域 */
  padding: 12px 24px;
  border-top: 1px solid #eee;
  background: #f9f9f9;
  display: flex;
  justify-content: flex-end;
}

.form-actions { /* 按钮容器 */
   display: flex;
   gap: 12px;
}

.cancel-btn {
   background: #f5f5f5;
   color: #333;
   border: none;
   border-radius: 4px;
   padding: 6px 18px;
   font-size: 15px;
   cursor: pointer;
    transition: background 0.2s;
}
.cancel-btn:hover {
    background: #e0e0e0;
}

.submit-btn {
   background: #1890ff;
   color: #fff;
   border: none;
   border-radius: 4px;
   padding: 6px 18px;
   font-size: 15px;
   cursor: pointer;
    transition: background 0.2s;
}
.submit-btn:hover {
    background: #40a9ff;
}

.submit-btn:disabled {
   background: #b5d6fb;
   cursor: not-allowed;
}


/* 其他样式保留 */
/* ... existing styles ... */

/* 方向成果相关样式 */
.achievements-container {
  margin-top: 20px;
}

.achievements-tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}

.achievement-tab {
  padding: 10px 20px;
  cursor: pointer;
  transition: color 0.2s;
  margin-right: 10px;
}

.achievement-tab.active {
  border-bottom: 2px solid #1890ff;
}

.achievement-list-container {
  flex: 1;
}

.section-title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
}

.chart-container {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  margin-bottom: 20px;
  padding: 10px;
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
}

.chart-description {
  font-size: 14px;
  color: #666;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.task-item {
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
  padding: 10px;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.task-name {
  font-size: 16px;
  font-weight: 600;
}

.task-badges {
  display: flex;
  align-items: center;
  gap: 5px;
}

.level-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: #e6f7ff;
  color: #1890ff;
}

.status-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
  background: #e6f7ff;
  color: #1890ff;
}

.status-badge.completed {
  background: #e6fffb;
  color: #52c41a;
}

.status-badge.in-progress {
  background: #fffbe6;
  color: #faad14;
}

.progress-info {
  font-size: 13px;
  color: #666;
  margin-bottom: 5px;
}

.progress-bar-container {
  width: 100%;
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #52c41a; /* 进度条颜色 */
  width: 0%; /* 初始宽度为0 */
  border-radius: 3px;
  transition: width 0.4s ease-in-out; /* 过渡动画 */
}

/* 方向成果标签页的样式 */
.achievements-container {
  /* 可能需要一些布局调整 */
}

/* 成果子标签页样式 */
.achievements-tabs {
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px; /* 增加底部间距 */
  padding: 0 24px; /* 与模态框内容左侧对齐 */
}

.achievement-tab {
  font-size: 15px; /* 调整字体大小 */
  color: #888;
  padding: 10px 16px; /* 调整内边距 */
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
  margin-right: 16px; /* 调整标签间距 */
}

.achievement-tab.active {
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
  font-weight: 500;
}

/* 各个成果列表容器样式 */
.achievement-list-container {
  padding: 0 24px; /* 与子标签页对齐 */
}

.section-title {
   font-size: 18px; /* 调整标题大小 */
   font-weight: 600;
   color: #333;
   margin-bottom: 20px; /* 增加底部间距 */
   border-left: 4px solid #1890ff; /* 添加左侧蓝色条 */
   padding-left: 10px;
}

/* 图表容器样式 */
.chart-container {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  margin-bottom: 30px; /* 增加底部间距 */
  padding: 10px; /* 调整内边距 */
  position: relative; /* 为图表定位提供上下文 */
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  text-align: center; /* 标题居中 */
  margin-bottom: 8px;
}

.chart-description {
  font-size: 13px;
  color: #888;
  text-align: center;
  margin-bottom: 15px;
}

/* 任务列表样式 */
.task-list {
  display: flex;
  flex-direction: column;
  gap: 15px; /* 任务项之间的间距 */
}

.task-item {
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
  padding: 16px 20px; /* 调整内边距 */
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.task-name {
  font-size: 16px;
  font-weight: 600;
  color: #1890ff; /* 任务名称颜色 */
  margin: 0;
}

.task-badges {
  display: flex;
  align-items: center;
  gap: 8px;
}

.level-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: #e6f7ff;
  color: #1890ff;
}

/* 状态徽章样式 (已在任务进展部分定义，确保一致) */
/* .status-badge { ... } */
/* .status-badge.completed { ... } */
/* .status-badge.in-progress { ... } */


.task-progress {
  margin-top: 8px;
}

.progress-info {
  font-size: 13px;
  color: #666;
  margin-bottom: 5px;
}

.progress-bar-container {
  width: 100%;
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  overflow: hidden; /* 隐藏溢出的进度条 */
}

.progress-bar {
  height: 100%;
  background-color: #52c41a; /* 进度条颜色 */
  width: 0%; /* 初始宽度为0 */
  border-radius: 3px;
  transition: width 0.4s ease-in-out; /* 过渡动画 */
}


/* 其他样式保留 */
/* ... existing styles ... */
</style>
