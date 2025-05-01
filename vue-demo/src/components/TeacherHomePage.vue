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
      
      <!-- 导航菜单 (教师特定) -->
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
          :class="{ 'active': activeMenu === 'team-info' }"
          @click="setActiveMenu('team-info')"
        >
          <i class="nav-icon">👥</i>
          <span>团队信息</span>
        </div>
        
        <!-- 教师特有菜单项 -->
        <div 
          class="nav-item" 
          :class="{ 'active': activeMenu.startsWith('direction'), 'has-submenu': true }"
          @click="toggleDirectionMenu"
        >
          <div class="nav-item-content">
            <i class="nav-icon">🧭</i>
            <span>方向管理</span>
            <i class="submenu-icon" :class="{'rotated': isDirectionMenuOpen}">▼</i>
          </div>
          
          <!-- 子菜单 -->
          <div class="submenu" v-if="isDirectionMenuOpen">
            <div 
              class="submenu-item" 
              :class="{ 'active': activeMenu === 'direction-team' }"
              @click.stop="setActiveMenu('direction-team')"
            >
              团队方向
            </div>
            <div 
              class="submenu-item" 
              :class="{ 'active': activeMenu === 'direction-my' }"
              @click.stop="setActiveMenu('direction-my')"
            >
              我的方向
            </div>
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
          :class="{ 'active': activeMenu === 'message-management' }"
          @click="setActiveMenu('message-management')"
        >
          <i class="nav-icon">📊</i>
          <span>消息管理</span>
        </div>
        
        <div 
          class="nav-item" 
          :class="{ 'active': activeMenu.startsWith('results'), 'has-submenu': true }"
          @click="toggleResultsMenu"
        >
          <div class="nav-item-content">
            <i class="nav-icon">📈</i>
            <span>成果展示</span>
            <i class="submenu-icon" :class="{'rotated': isResultsMenuOpen}">▼</i>
          </div>
          <!-- 子菜单 -->
          <div class="submenu" v-if="isResultsMenuOpen">
            <div 
              class="submenu-item" 
              :class="{ 'active': activeMenu === 'results-team' }"
              @click.stop="setActiveMenu('results-team')"
            >
              团队成果
            </div>
            <div 
              class="submenu-item" 
              :class="{ 'active': activeMenu === 'results-personal' }"
              @click.stop="setActiveMenu('results-personal')"
            >
              个人成果
            </div>
          </div>
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
        <!-- 个人信息页面 -->
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
            <div class="edit-modal">
              <h3 class="edit-modal-title">编辑个人信息</h3>
              <button class="close-btn" @click="showEditModal = false">&times;</button>
              
              <div class="edit-form">
                <div class="form-group">
                  <label for="editName">姓名</label>
                  <input 
                    id="editName" 
                    v-model="editedUserData.name" 
                    type="text" 
                    class="form-control"
                  />
                </div>
                
                <div class="form-group">
                  <label for="editEmail">邮件</label>
                  <input 
                    id="editEmail" 
                    v-model="editedUserData.email" 
                    type="email" 
                    class="form-control"
                  />
                </div>
                
                <div class="form-group">
                  <label for="editAge">年龄</label>
                  <input 
                    id="editAge" 
                    v-model="editedUserData.age" 
                    type="number" 
                    class="form-control"
                  />
                </div>
                
                <div class="form-group">
                  <label for="editSex">性别</label>
                  <select 
                    id="editSex" 
                    v-model="editedUserData.sex" 
                    class="form-control"
                  >
                    <option value="man">男</option>
                    <option value="woman">女</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label for="editPhone">电话号码</label>
                  <input 
                    id="editPhone" 
                    v-model="editedUserData.phone" 
                    type="tel" 
                    class="form-control"
                  />
                </div>
                
                <div class="form-group">
                  <label for="editAddress">地址</label>
                  <input 
                    id="editAddress" 
                    v-model="editedUserData.address" 
                    type="text" 
                    class="form-control"
                  />
                </div>
                
                <div class="form-group">
                  <label for="editQQ">QQ</label>
                  <input 
                    id="editQQ" 
                    v-model="editedUserData.qq" 
                    type="text" 
                    class="form-control"
                  />
                </div>
                
                <div class="form-group">
                  <label for="editWechat">微信</label>
                  <input 
                    id="editWechat" 
                    v-model="editedUserData.wechat" 
                    type="text" 
                    class="form-control"
                  />
                </div>
              </div>
              
              <div class="edit-actions">
                <button @click="showEditModal = false" class="cancel-btn">取消</button>
                <button @click="saveChanges" class="save-btn" :disabled="isUpdating">
                  {{ isUpdating ? '保存中...' : '保存修改' }}
                </button>
              </div>
              
              <div v-if="updateMessage" :class="['update-message', updateSuccess ? 'success' : 'error']">
                {{ updateMessage }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- 团队信息页面 -->
        <div v-else-if="activeMenu === 'team-info'" class="team-panel">
          <div class="profile-header">
            <h2>团队信息</h2>
          </div>
          
          <!-- 添加标签页导航 -->
          <div class="tabs-nav">
            <div
              class="tab-item"
              :class="{ 'active': activeTab === 'members' }"
              @click="activeTab = 'members'"
            >
              团队成员
            </div>
            <div 
              class="tab-item"
              :class="{ 'active': activeTab === 'pending' }"
              @click="activeTab = 'pending'"
            >
              待审批成员
              <span v-if="pendingStudents.length > 0" class="badge">
                {{ pendingStudents.length }}
              </span>
            </div>
          </div>
          
          <div class="tab-content">
            <div v-if="isLoading" class="loading-indicator">
              <p>加载团队信息中...</p>
            </div>
            
            <div v-else-if="teamLoadError" class="error-message">
              <p>{{ teamLoadError }}</p>
            </div>
            
            <div v-else>
              <!-- 团队成员标签页内容 -->
              <div v-if="activeTab === 'members'" class="tab-panel">
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
              
              <!-- 待审批成员标签页内容 -->
              <div v-else-if="activeTab === 'pending'" class="tab-panel approval-section">
                <div class="section-header">
                  <h3>待审批成员</h3>
                  <button @click="loadPendingStudents" class="refresh-button">
                    <span>刷新</span>
                  </button>
                </div>
                
                <div v-if="isLoadingApprovals" class="loading-indicator">
                  <p>加载待审批成员中...</p>
                </div>
                
                <div v-else-if="approvalsError" class="error-message">
                  <p>{{ approvalsError }}</p>
                </div>
                
                <div v-else-if="pendingStudents.length === 0" class="empty-approvals">
                  <div class="notice-icon">📋</div>
                  <p>当前没有待审批的成员申请</p>
                </div>
                
                <div v-else>
                  <div class="table-wrapper">
                    <table class="team-table">
                      <thead>
                        <tr>
                          <th>姓名</th>
                          <th>邮箱</th>
                          <th>性别</th>
                          <th>年龄</th>
                          <th>电话</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="student in pendingStudents" :key="'pending-'+student.id">
                          <td>{{ student.name }}</td>
                          <td>{{ student.email || '未设置' }}</td>
                          <td>{{ student.sex === 'man' ? '男' : (student.sex === 'woman' ? '女' : student.sex) }}</td>
                          <td>{{ student.age }}</td>
                          <td>{{ student.phone }}</td>
                          <td class="action-buttons">
                            <button 
                              @click="approveStudent(student.id)" 
                              class="approve-button"
                              :disabled="isProcessingApproval"
                            >
                              批准
                            </button>
                            <button 
                              @click="rejectStudent(student.id)" 
                              class="reject-button"
                              :disabled="isProcessingApproval"
                            >
                              拒绝
                            </button>
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
        
        <!-- 方向管理页面 -->
        <div v-else-if="activeMenu === 'direction'" class="direction-panel">
          <div class="panel-header">
            <h2>方向管理</h2>
          </div>
          
          <div class="direction-content">
            <!-- 方向标签页导航 -->
            <div class="direction-tabs">
              <div 
                :class="['direction-tab', activeDirectionTab === 'team' ? 'active' : '']" 
                @click="setActiveDirectionTab('team')"
              >
                团队方向
              </div>
              <div 
                :class="['direction-tab', activeDirectionTab === 'my' ? 'active' : '']" 
                @click="setActiveDirectionTab('my')"
              >
                我的方向
              </div>
            </div>
            
            <!-- 方向列表内容 -->
            <div class="direction-list-container">
              <!-- 加载状态 -->
              <div v-if="isLoadingDirections" class="loading-container">
                <div class="loading-spinner"></div>
                <div>加载中...</div>
              </div>
              
              <!-- 错误信息 -->
              <div v-else-if="directionError" class="error-message">
                {{ directionError }}
              </div>
              
              <!-- 团队方向列表 -->
              <div v-else-if="activeDirectionTab === 'team'" class="direction-list">
                <h3 class="list-title">团队所有方向列表</h3>
                
                <!-- 空列表提示 -->
                <div v-if="teamOrientations.length === 0" class="empty-message">
                  暂无团队方向
                </div>
                
                <!-- 方向表格 -->
                <div v-else class="direction-table-wrapper">
                  <table class="team-table">
                    <thead>
                      <tr>
                        <th>方向名称</th>
                        <th>指导老师名称</th>
                        <th>方向人数</th>
                        <th>查看详情</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="direction in teamOrientations" :key="'direction-'+direction.id">
                        <td>{{ direction.name }}</td>
                        <td>{{ direction.teacherName }}</td>
                        <td>{{ direction.amount }}</td>
                        <td>
                          <button class="view-btn" @click="viewDirectionDetail(direction.id)">查看详情</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <!-- 我的方向列表 -->
              <div v-else-if="activeDirectionTab === 'my'" class="direction-list">
                <h3 class="list-title">我创建的方向</h3>
                <div class="empty-message">
                  我的方向功能正在开发中，敬请期待...
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 团队方向页面 -->
        <div v-else-if="activeMenu === 'direction-team'" class="direction-panel">
          <div class="panel-header">
            <h2>团队方向</h2>
          </div>
          
          <div class="direction-list-container">
            <!-- 加载状态 -->
            <div v-if="isLoadingDirections" class="loading-container">
              <div class="loading-spinner"></div>
              <div>加载中...</div>
            </div>
            
            <!-- 错误信息 -->
            <div v-else-if="directionError" class="error-message">
              {{ directionError }}
            </div>
            
            <!-- 团队方向列表 -->
            <div v-else class="direction-list">
              <h3 class="list-title">团队所有方向列表</h3>
              
              <!-- 空列表提示 -->
              <div v-if="teamOrientations.length === 0" class="empty-message">
                暂无团队方向
              </div>
              
              <!-- 方向表格 -->
              <div v-else class="direction-table-wrapper">
                <table class="team-table">
                  <thead>
                    <tr>
                      <th>方向名称</th>
                      <th>指导老师名称</th>
                      <th>方向人数</th>
                      <th>查看详情</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="direction in teamOrientations" :key="'direction-'+direction.id">
                      <td>{{ direction.name }}</td>
                      <td>{{ direction.teacherName }}</td>
                      <td>{{ direction.amount }}</td>
                      <td>
                        <button class="view-btn" @click="viewDirectionDetail(direction.id)">查看详情</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 我的方向页面 -->
        <div v-else-if="activeMenu === 'direction-my'" class="direction-panel">
          <div class="panel-header">
            <h2>我的方向</h2>
          </div>
          
          <div class="direction-content">
            <!-- 方向标签页导航 -->
            <div class="direction-tabs">
              <div 
                :class="['tab-item', myDirectionActiveTab === 'list' ? 'active' : '']" 
                @click="setMyDirectionActiveTab('list')"
              >
                方向列表
              </div>
              <div 
                :class="['tab-item', myDirectionActiveTab === 'approval' ? 'active' : '']" 
                @click="setMyDirectionActiveTab('approval')"
              >
                方向人员审批
                <span v-if="pendingApplications.length > 0" class="badge">{{ pendingApplications.length }}</span>
              </div>
            </div>
            
            <div class="tab-content">
              <!-- 我的方向列表 -->
              <div v-if="myDirectionActiveTab === 'list'" class="tab-panel">
                <!-- 操作按钮 -->
                <div class="action-bar">
                  <button class="action-btn primary" @click="showCreateDirectionForm = true">
                    <i class="btn-icon">+</i> 创建新方向
                  </button>
                </div>
                
                <!-- 加载状态 -->
                <div v-if="isLoadingMyDirections" class="loading-container">
                  <div class="loading-spinner"></div>
                  <div>加载中...</div>
                </div>
                
                <!-- 错误信息 -->
                <div v-else-if="myDirectionError" class="error-message">
                  {{ myDirectionError }}
                </div>
                
                <!-- 方向列表内容 -->
                <div v-else class="direction-list">
                  <!-- 空列表提示 -->
                  <div v-if="myOrientations.length === 0" class="empty-message">
                    您还没有创建方向，点击"创建新方向"按钮开始创建
                  </div>
                  
                  <!-- 方向表格 -->
                  <div v-else class="direction-table-wrapper">
                    <table class="team-table">
                      <thead>
                        <tr>
                          <th>方向名称</th>
                          <th>指导老师名称</th>
                          <th>方向人数</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="direction in myOrientations" :key="direction.id">
                          <td>{{ direction.name }}</td>
                          <td>{{ direction.teacherName || userData.name || '未知' }}</td>
                          <td>{{ direction.amount }}</td>
                          <td>
                            <div class="action-buttons">
                              <button class="view-btn" @click="viewDirectionDetail(direction.id)">查看详情</button>
                              <button class="delete-btn" @click="confirmDeleteDirection(direction)">删除</button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <!-- 方向人员审批 -->
              <div v-else-if="myDirectionActiveTab === 'approval'" class="tab-panel">
                <!-- 加载状态 -->
                <div v-if="isLoadingApplications" class="loading-container">
                  <div class="loading-spinner"></div>
                  <div>加载中...</div>
                </div>
                
                <!-- 错误信息 -->
                <div v-else-if="applicationsError" class="error-message">
                  {{ applicationsError }}
                </div>
                
                <!-- 申请列表内容 -->
                <div v-else class="applications-list">
                  <h3 class="approval-title">申请加入该教师方向的所有学生记录</h3>
                  
                  <!-- 空列表提示 -->
                  <div v-if="pendingApplications.length === 0" class="empty-message">
                    暂无待审批的方向申请
                  </div>
                  
                  <!-- 申请表格 -->
                  <div v-else class="direction-table-wrapper">
                    <table class="team-table approval-table">
                      <thead>
                        <tr>
                          <th>学生姓名</th>
                          <th>加入方向</th>
                          <th>申请时间</th>
                          <th>操作 (同意or不同意)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="application in pendingApplications" :key="application.id">
                          <td>{{ application.studentName }}</td>
                          <td>{{ application.orientationName }}</td>
                          <td>{{ application.time }}</td>
                          <td>
                            <div class="action-buttons">
                              <button class="approve-btn" @click="approveApplication(application.id, true)">同意</button>
                              <button class="reject-btn" @click="approveApplication(application.id, false)">不同意</button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 创建新方向表单模态框 -->
          <div v-if="showCreateDirectionForm" class="modal-overlay" @click.self="showCreateDirectionForm = false">
            <div class="modal-content">
              <div class="modal-header">
                <h3>创建新方向</h3>
                <button class="close-btn" @click="showCreateDirectionForm = false">&times;</button>
              </div>
              
              <div class="modal-body">
                <div class="form-group">
                  <label>方向名称</label>
                  <input type="text" v-model="newDirection.name" placeholder="请输入方向名称">
                </div>
                
                <div class="form-group">
                  <label>方向描述</label>
                  <textarea v-model="newDirection.description" placeholder="请输入方向描述"></textarea>
                </div>
                
                <div v-if="directionFormError" class="error-message">
                  {{ directionFormError }}
                </div>
              </div>
              
              <div class="modal-footer">
                <button class="cancel-btn" @click="showCreateDirectionForm = false">取消</button>
                <button 
                  class="submit-btn" 
                  :disabled="isCreatingDirection" 
                  @click="createNewDirection"
                >
                  {{ isCreatingDirection ? '创建中...' : '创建' }}
                </button>
              </div>
            </div>
          </div>
          
          <!-- 删除确认对话框 -->
          <div v-if="showDeleteConfirmation" class="modal-overlay" @click.self="showDeleteConfirmation = false">
            <div class="modal-content confirmation-modal">
              <div class="modal-header">
                <h3>确认删除</h3>
                <button class="close-btn" @click="showDeleteConfirmation = false">&times;</button>
              </div>
              
              <div class="modal-body">
                <p>确定要删除方向 "{{ directionToDelete.name }}" 吗？此操作不可撤销。</p>
              </div>
              
              <div class="modal-footer">
                <button class="cancel-btn" @click="showDeleteConfirmation = false">取消</button>
                <button 
                  class="delete-btn" 
                  :disabled="isDeletingDirection" 
                  @click="deleteDirection"
                >
                  {{ isDeletingDirection ? '删除中...' : '确认删除' }}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 设备管理页面 -->
        <div v-else-if="activeMenu === 'device'" class="device-panel">
          <div class="panel-header">
            <h2>设备管理页面</h2>
            <button @click="showAddDeviceForm = true" class="add-device-btn">录入新设备</button>
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
                        <!-- 空闲设备操作：借阅、编辑、删除 -->
                        <template v-if="activeDeviceTab === 'available'">
                          <button class="borrow-btn" @click="borrowDevice(device.id)">借阅</button>
                          <button class="edit-btn" @click="editDevice(device)">编辑</button>
                          <button class="delete-btn" @click="confirmDeleteDevice(device.id)">删除</button>
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
          
          <!-- 添加设备表单 -->
          <div v-if="showAddDeviceForm" class="modal-overlay" @click.self="showAddDeviceForm = false">
            <div class="device-form">
              <div class="form-header">
                <h3>{{ isEditingDevice ? '编辑设备' : '录入新设备' }}</h3>
                <button @click="showAddDeviceForm = false" class="close-button">&times;</button>
              </div>
              
              <div class="form-body">
                <div class="form-group">
                  <label for="deviceName">设备名称</label>
                  <input id="deviceName" v-model="newDevice.name" type="text" class="form-control" placeholder="请输入设备名称">
                </div>
                
                <div class="form-group">
                  <label for="deviceAddress">设备位置</label>
                  <input id="deviceAddress" v-model="newDevice.address" type="text" class="form-control" placeholder="请输入设备存放位置">
                </div>
              </div>
              
              <div class="form-footer">
                <button 
                  @click="isEditingDevice ? updateDevice() : addDevice()" 
                  class="save-button" 
                  :disabled="isAddingDevice"
                >
                  {{ isAddingDevice ? '保存中...' : isEditingDevice ? '保存修改' : '添加设备' }}
                </button>
                <button @click="showAddDeviceForm = false" class="cancel-button">取消</button>
              </div>
              
              <div v-if="deviceFormError" class="error-message">
                {{ deviceFormError }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- 消息管理页面 -->
        <div v-else-if="activeMenu === 'message-management'" class="message-panel">
          <div class="panel-header">
            <h2>消息管理</h2>
            <button class="publish-btn" @click="showPublishForm = true">发布新消息</button>
          </div>
          
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
        
        <!-- 成果展示页面 -->
        <div v-else-if="activeMenu === 'results'" class="results-panel">
          <!-- 子导航栏 -->
          <div class="results-tabs">
            <div
              :class="['results-tab', resultsActiveTab === 'team' ? 'active' : '']"
              @click="resultsActiveTab = 'team'"
            >团队成果</div>
            <div
              :class="['results-tab', resultsActiveTab === 'personal' ? 'active' : '']"
              @click="resultsActiveTab = 'personal'"
            >个人成果</div>
          </div>

          <!-- 团队成果页面 -->
          <div v-if="resultsActiveTab === 'team'" class="team-results-content">
            <!-- 筛选按钮 -->
            <div class="status-filter">
              <button :class="{active: teamStatusFilter === 'completed'}" @click="teamStatusFilter = 'completed'">已完成</button>
              <button :class="{active: teamStatusFilter === 'not_completed'}" @click="teamStatusFilter = 'not_completed'">进行中</button>
            </div>
            <!-- 折线图 -->
            <div class="team-line-chart-container">
              <canvas ref="teamLineChart"></canvas>
            </div>
          </div>

          <!-- 个人成果页面 -->
          <div v-else class="personal-results-content">
            <div class="personal-type-tabs">
              <button :class="{active: personalTypeTab === 'thesis'}" @click="personalTypeTab = 'thesis'">论文</button>
              <button :class="{active: personalTypeTab === 'competition'}" @click="personalTypeTab = 'competition'">竞赛</button>
              <button :class="{active: personalTypeTab === 'project'}" @click="personalTypeTab = 'project'">项目</button>
            </div>
            <div class="personal-bar-chart-container">
              <canvas ref="personalResultsChart"></canvas>
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
            
            <div class="modal-body">
              <!-- 加载状态 -->
              <div v-if="isLoadingDirectionDetail" class="loading-container">
                <div class="loading-spinner"></div>
                <div>加载详情中...</div>
              </div>
              
              <!-- 错误信息 -->
              <div v-else-if="directionDetailError" class="error-message">
                {{ directionDetailError }}
              </div>
              
              <!-- 详情内容 -->
              <div v-else-if="currentDirectionDetail" class="direction-detail-container">
                <!-- 标签页导航 -->
                <div class="detail-tabs">
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
                
                <!-- 方向简介内容 -->
                <div v-if="activeDetailTab === 'intro'" class="detail-panel">
                  <div class="direction-info">
                    <div class="info-card">
                      <h4 class="card-title">方向描述</h4>
                      <div class="description">
                        {{ currentDirectionDetail.description }}
                      </div>
                    </div>
                    
                    <div class="info-card">
                      <h4 class="card-title">基本信息</h4>
                      <div class="info-grid">
                        <div class="info-item">
                          <div class="info-label">方向名称</div>
                          <div class="info-value">{{ currentDirectionDetail.name }}</div>
                        </div>
                        <div class="info-item">
                          <div class="info-label">指导老师</div>
                          <div class="info-value">{{ currentDirectionDetail.teacherName }}</div>
                        </div>
                        <div class="info-item">
                          <div class="info-label">成员数量</div>
                          <div class="info-value">{{ currentDirectionDetail.amount || currentDirectionDetail.memberCount || 0 }}</div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- 成员列表 -->
                    <div class="info-card">
                      <h4 class="card-title">成员列表</h4>
                      <div v-if="!currentDirectionDetail.members || currentDirectionDetail.members.length === 0" class="empty-message">
                        暂无成员
                      </div>
                      <div v-else class="members-list-table-wrapper">
                        <table class="team-table members-table">
                          <thead>
                            <tr>
                              <th>姓名</th>
                              <th>联系方式</th>
                              <th>加入时间</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="member in currentDirectionDetail.members" :key="member.id">
                              <td>{{ member.studentName }}</td>
                              <td>
                                <div class="contact-info">
                                  <div v-if="member.email">邮箱: {{ member.email }}</div>
                                  <div v-if="member.phone">电话: {{ member.phone }}</div>
                                </div>
                              </td>
                              <td>{{ formatDate(member.joinTime) }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- 任务列表内容 -->
                <div v-else-if="activeDetailTab === 'tasks'" class="detail-panel">
                  <div class="task-container">
                    <!-- 标题和新建任务按钮 -->
                    <div class="task-header">
                      <h4 class="section-title">该方向任务列表</h4>
                      <!-- 仅在我的方向中显示新建任务按钮 -->
                      <button v-if="currentDirectionSource === 'my'" class="new-task-btn" @click="showTaskForm">新建任务</button>
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
                      <!-- 根据来源显示不同的提示信息 -->
                      <span v-if="currentDirectionSource === 'my'">
                        暂无任务，点击"新建任务"按钮创建新任务
                      </span>
                      <span v-else>
                        该方向暂无任务
                      </span>
                    </div>
                    
                    <!-- 任务列表 -->
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
                            <td>{{ task.title || task.taskName }}</td>
                            <td>{{ formatTaskType(task.taskType || task.task_type) }}</td>
                            <td>{{ task.ownerName || task.owner_name || '未知' }}</td>
                            <td>
                              <div class="action-buttons">
                                <button class="view-btn" @click="viewTaskDetail(task.id)">查看详情</button>
                                <!-- 仅在我的方向中显示删除按钮 -->
                                <button v-if="currentDirectionSource === 'my'" class="delete-btn" @click="deleteTask(task.id)">删除</button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <!-- 创建任务表单模态框 -->
                  <div v-if="showCreateTaskForm" class="modal-overlay" @click.self="closeTaskForm">
                    <div class="modal-content task-form-modal">
                      <div class="modal-header">
                        <h3>创建新任务</h3>
                        <button @click="closeTaskForm" class="close-button">&times;</button>
                      </div>
                      
                      <div class="modal-body">
                        <form @submit.prevent="createNewTask">
                          <!-- 任务名称 -->
                          <div class="form-group">
                            <label for="taskName">任务名称</label>
                            <input 
                              id="taskName"
                              v-model="newTask.taskName"
                              type="text"
                              class="form-control"
                              placeholder="请输入任务名称"
                            />
                          </div>
                          
                          <!-- 任务目标 -->
                          <div class="form-group">
                            <label for="taskTarget">任务目标</label>
                            <input 
                              id="taskTarget"
                              v-model="newTask.target"
                              type="text"
                              class="form-control"
                              placeholder="请输入任务目标"
                            />
                          </div>
                          
                          <!-- 任务类型和级别 -->
                          <div class="form-row">
                            <div class="form-group half-width">
                              <label for="taskType">任务类型</label>
                              <select 
                                id="taskType"
                                v-model="newTask.taskType"
                                class="form-control"
                              >
                                <option 
                                  v-for="option in taskTypeOptions"
                                  :key="option.value"
                                  :value="option.value"
                                >
                                  {{ option.label }}
                                </option>
                              </select>
                            </div>
                            
                            <div class="form-group half-width">
                              <label for="taskLevel">任务级别</label>
                              <select 
                                id="taskLevel"
                                v-model="newTask.level"
                                class="form-control"
                              >
                                <option 
                                  v-for="option in taskLevelOptions"
                                  :key="option.value"
                                  :value="option.value"
                                >
                                  {{ option.label }}
                                </option>
                              </select>
                            </div>
                          </div>
                          
                          <!-- 任务描述 -->
                          <div class="form-group">
                            <label for="taskDescription">任务描述</label>
                            <textarea 
                              id="taskDescription"
                              v-model="newTask.description"
                              class="form-control"
                              placeholder="请输入任务描述（可选）"
                              rows="4"
                            ></textarea>
                          </div>
                          
                          <!-- 错误信息 -->
                          <div v-if="taskFormError" class="form-error">
                            {{ taskFormError }}
                          </div>
                          
                          <!-- 表单按钮 -->
                          <div class="form-actions">
                            <button 
                              type="button"
                              class="cancel-btn"
                              @click="closeTaskForm"
                            >
                              取消
                            </button>
                            <button 
                              type="submit"
                              class="submit-btn"
                              :disabled="isCreatingTask"
                            >
                              {{ isCreatingTask ? '创建中...' : '创建任务' }}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                
                
                <div v-else-if="activeDetailTab === 'achievements'" class="detail-panel">
                  <div v-if="isLoadingTaskStats" class="loading-container">
                    <div class="loading-spinner"></div>
                    <div>加载方向成果统计中...</div>
                  </div>
                  
                  <div v-else-if="taskStatsError" class="error-message">
                    {{ taskStatsError }}
                  </div>
                  
                  <div v-else-if="!taskStats" class="empty-message">
                    暂无方向成果数据
                  </div>
                  
                  <div v-else class="achievements-container">
                    <!-- 标签页导航 -->
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
                    
                    <!-- 论文列表 -->
                    <div v-if="achievementView === 'thesis'" class="achievement-list-container">
                      <h3 class="section-title">论文成果</h3>
                      
                      <!-- 柱形图 -->
                      <div class="chart-container">
                        <h3 class="chart-title">论文任务完成情况</h3>
                        <div class="chart-description">
                          柱形图展示A、B、C、D级别的论文任务数量，区分已完成和未完成
                        </div>
                        
                        <canvas ref="thesisChartRef" width="400" height="200"></canvas>
                      </div>
                      
                      <div v-if="thesisTasks.length === 0" class="empty-message">
                        暂无论文类型的任务
                      </div>
                      <div v-else class="task-list">
                        <div v-for="task in thesisTasks" :key="task.id" class="task-item">
                          <div class="task-header">
                            <h4 class="task-name">{{ task.name }}</h4>
                            <div class="task-badges">
                              <span class="level-badge">{{ task.level }}级</span>
                              <span :class="['status-badge', task.status === 'completed' ? 'completed' : 'in-progress']">
                                {{ task.status === 'completed' ? '已完成' : '进行中' }}
                              </span>
                            </div>
                          </div>
                          <div class="task-progress">
                            <div class="progress-info">
                              <span>提交了{{ task.total_progress_count }}个进度</span>
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
                    
                    <!-- 项目列表 -->
                    <div v-else-if="achievementView === 'project'" class="achievement-list-container">
                      <h3 class="section-title">项目成果</h3>
                      
                      <!-- 柱形图 -->
                      <div class="chart-container">
                        <h3 class="chart-title">项目任务完成情况</h3>
                        <div class="chart-description">
                          柱形图展示A、B、C、D级别的项目任务数量，区分已完成和未完成
                        </div>
                        
                        <canvas ref="projectChartRef" width="400" height="200"></canvas>
                      </div>
                      
                      <div v-if="projectTasks.length === 0" class="empty-message">
                        暂无项目类型的任务
                      </div>
                      <div v-else class="task-list">
                        <div v-for="task in projectTasks" :key="task.id" class="task-item">
                          <div class="task-header">
                            <h4 class="task-name">{{ task.name }}</h4>
                            <div class="task-badges">
                              <span class="level-badge">{{ task.level }}级</span>
                              <span :class="['status-badge', task.status === 'completed' ? 'completed' : 'in-progress']">
                                {{ task.status === 'completed' ? '已完成' : '进行中' }}
                              </span>
                            </div>
                          </div>
                          <div class="task-progress">
                            <div class="progress-info">
                              <span>提交了{{ task.total_progress_count }}个进度</span>
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
                    
                    <!-- 比赛列表 -->
                    <div v-else-if="achievementView === 'competition'" class="achievement-list-container">
                      <h3 class="section-title">比赛成果</h3>
                      
                      <!-- 柱形图 -->
                      <div class="chart-container">
                        <h3 class="chart-title">比赛任务完成情况</h3>
                        <div class="chart-description">
                          柱形图展示A、B、C、D级别的比赛任务数量，区分已完成和未完成
                        </div>
                        
                        <canvas ref="competitionChartRef" width="400" height="200"></canvas>
                      </div>
                      
                      <div v-if="competitionTasks.length === 0" class="empty-message">
                        暂无比赛类型的任务
                      </div>
                      <div v-else class="task-list">
                        <div v-for="task in competitionTasks" :key="task.id" class="task-item">
                          <div class="task-header">
                            <h4 class="task-name">{{ task.name }}</h4>
                            <div class="task-badges">
                              <span class="level-badge">{{ task.level }}级</span>
                              <span :class="['status-badge', task.status === 'completed' ? 'completed' : 'in-progress']">
                                {{ task.status === 'completed' ? '已完成' : '进行中' }}
                              </span>
                            </div>
                          </div>
                          <div class="task-progress">
                            <div class="progress-info">
                              <span>提交了{{ task.total_progress_count }}个进度</span>
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

        <!-- 任务详情模态框 -->
        <div v-if="showTaskDetail" class="modal-overlay" @click.self="closeTaskDetail">
          <div class="modal-content task-detail-modal">
            <div class="modal-header">
              <h3>任务详情</h3>
              <button @click="closeTaskDetail" class="close-button">&times;</button>
            </div>
            
            <div class="modal-body">
              <!-- 加载状态 -->
              <div v-if="isLoadingTaskDetail" class="loading-container">
                <div class="loading-spinner"></div>
                <div>加载详情中...</div>
              </div>
              
              <!-- 错误信息 -->
              <div v-else-if="taskDetailError" class="error-message">
                {{ taskDetailError }}
              </div>
              
              <!-- 详情内容 -->
              <div v-else-if="currentTask" class="task-detail-container">
                <!-- 标签页导航 -->
                <div class="task-tabs">
                  <div class="tabs-container">
                    <div 
                      :class="['task-tab', activeTaskTab === 'detail' ? 'active' : '']" 
                      @click="setActiveTaskTab('detail')"
                    >
                      任务详情
                    </div>
                    <div 
                      :class="['task-tab', activeTaskTab === 'progress' ? 'active' : '']" 
                      @click="setActiveTaskTab('progress')"
                    >
                      任务进展
                    </div>
                  </div>
                  
                  <!-- 将按钮移到右侧 -->
                  <div class="task-actions" v-if="activeTaskTab === 'detail' && currentDirectionSource === 'my'">
                    <button class="edit-task-btn" @click="showEditTask">
                      编辑任务
                    </button>
                  </div>
                </div>
                
                <!-- 任务详情内容 -->
                <div v-if="activeTaskTab === 'detail'" class="task-detail-panel">
                  <!-- 移除原来左侧的按钮区域 -->
                  <!-- 基本信息卡片 -->
                  <div class="info-card">
                    <h4 class="card-title">基本信息</h4>
                    <div class="info-grid">
                      <div class="info-item">
                        <div class="info-label">任务名称</div>
                        <div class="info-value">{{ currentTask.taskName }}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">任务类型</div>
                        <div class="info-value">{{ formatTaskType(currentTask.taskType) }}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">任务级别</div>
                        <div class="info-value">{{ formatTaskLevel(currentTask.level) }}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">创建人</div>
                        <div class="info-value">{{ currentTask.ownerName || '未知' }}</div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 任务描述卡片 -->
                  <div class="info-card">
                    <h4 class="card-title">任务描述</h4>
                    <div class="description">
                      {{ currentTask.description || '暂无描述' }}
                    </div>
                  </div>
                  
                  <!-- 任务目标卡片 -->
                  <div class="info-card">
                    <h4 class="card-title">任务目标</h4>
                    <div class="description">
                      {{ currentTask.target }}
                    </div>
                  </div>
                </div>

                <!-- 任务进展内容 -->
                <div v-else-if="activeTaskTab === 'progress'" class="task-progress-panel">
                  <!-- 操作按钮 - 仅在"我的方向"中显示 -->
                  <div v-if="currentDirectionSource === 'my'" class="progress-actions">
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
                  
                  <!-- 空列表提示 - 根据不同来源显示不同提示 -->
                  <div v-else-if="taskProgressList.length === 0" class="empty-message">
                    <span v-if="currentDirectionSource === 'my'">
                      暂无任务进展记录，点击"提交任务进展"按钮添加新的进展
                    </span>
                    <span v-else>
                      暂无任务进展记录
                    </span>
                  </div>
                  
                  <!-- 进展记录列表 -->
                  <div v-else class="progress-timeline">
                    <div v-for="progress in taskProgressList" :key="progress.id" class="progress-item">
                      <div class="progress-header">
                        <h4 class="progress-title">{{ progress.title }}</h4>
                        <div class="progress-meta">
                          <div class="progress-time">{{ formatDate(progress.time) }}</div>
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
                      <div class="progress-footer">
                        <div class="file-info" v-if="progress.hasFile">
                          <span class="file-attachment">
                            <i class="file-icon">📎</i> 
                            {{ getFileNameFromPath(progress.filePath) || '提交进度相关材料' }}
                          </span>
                          <div class="file-actions">
                            <button class="download-btn" @click="downloadFile(progress.id)">下载</button>
                            <button v-if="currentDirectionSource === 'my'" class="delete-file-btn" @click="deleteFile(progress.id)">删除文件</button>
                          </div>
                        </div>
                        
                        <!-- 删除按钮 - 仅在"我的方向"中显示 -->
                        <div v-if="currentDirectionSource === 'my'" class="action-buttons">
                          <button class="delete-progress-btn" @click="deleteProgress(progress.id)">删除记录</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 编辑任务表单模态框 -->
        <div v-if="showEditTaskForm" class="modal-overlay" @click.self="cancelEditTask">
          <div class="modal-content task-form-modal">
            <div class="modal-header">
              <h3>编辑任务</h3>
              <button @click="cancelEditTask" class="close-button">&times;</button>
            </div>
            
            <div class="modal-body">
              <form @submit.prevent="updateTask">
                <!-- 任务名称 -->
                <div class="form-group">
                  <label for="editTaskName">任务名称</label>
                  <input 
                    id="editTaskName"
                    v-model="editedTask.taskName"
                    type="text"
                    class="form-control"
                    placeholder="请输入任务名称"
                  />
                </div>
                
                <!-- 任务目标 -->
                <div class="form-group">
                  <label for="editTaskTarget">任务目标</label>
                  <input 
                    id="editTaskTarget"
                    v-model="editedTask.target"
                    type="text"
                    class="form-control"
                    placeholder="请输入任务目标"
                  />
                </div>
                
                <!-- 任务类型和级别 -->
                <div class="form-row">
                  <div class="form-group half-width">
                    <label for="editTaskType">任务类型</label>
                    <select 
                      id="editTaskType"
                      v-model="editedTask.taskType"
                      class="form-control"
                    >
                      <option 
                        v-for="option in taskTypeOptions"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                  </div>
                  
                  <div class="form-group half-width">
                    <label for="editTaskLevel">任务级别</label>
                    <select 
                      id="editTaskLevel"
                      v-model="editedTask.level"
                      class="form-control"
                    >
                      <option 
                        v-for="option in taskLevelOptions"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                  </div>
                </div>
                
                <!-- 任务描述 -->
                <div class="form-group">
                  <label for="editTaskDescription">任务描述</label>
                  <textarea 
                    id="editTaskDescription"
                    v-model="editedTask.description"
                    class="form-control"
                    placeholder="请输入任务描述（可选）"
                    rows="4"
                  ></textarea>
                </div>
                
                <!-- 错误信息 -->
                <div v-if="editTaskFormError" class="form-error">
                  {{ editTaskFormError }}
                </div>
                
                <!-- 表单按钮 -->
                <div class="form-actions">
                  <button 
                    type="button"
                    class="cancel-btn"
                    @click="cancelEditTask"
                  >
                    取消
                  </button>
                  <button 
                    type="submit"
                    class="submit-btn"
                    :disabled="isUpdatingTask"
                  >
                    {{ isUpdatingTask ? '更新中...' : '更新任务' }}
                  </button>
                </div>
              </form>
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
        
        <!-- 团队成果页面 -->
        <div v-if="activeMenu === 'results-team'" class="team-results-panel">
          <div class="panel-header">
            <h2>团队成果展示</h2>
            <div class="filter-controls">
              <div class="status-filter">
                <button 
                  :class="{ active: teamStatusFilter === 'completed' }"
                  @click="teamStatusFilter = 'completed'"
                >
                  已完成
                </button>
                <button 
                  :class="{ active: teamStatusFilter === 'not_completed' }"
                  @click="teamStatusFilter = 'not_completed'"
                >
                  进行中
                </button>
              </div>
            </div>
          </div>

          <div class="chart-container">
            <canvas ref="teamLineChart"></canvas>
          </div>
        </div>

        <!-- 个人成果页面 -->
        <div v-if="activeMenu === 'results-personal'" class="personal-results-panel">
          <div class="personal-results-header">
            <h2>个人成果</h2>
          </div>

          <!-- 类型切换标签 -->
          <div class="personal-type-tabs">
            <button 
              v-for="type in ['thesis', 'competition', 'project']"
              :key="type"
              :class="['type-tab', { active: personalTypeTab === type }]"
              @click="personalTypeTab = type"
            >
              {{ type === 'thesis' ? '论文' : type === 'competition' ? '竞赛' : '项目' }}
            </button>
          </div>

          <!-- 图表容器 -->
          <div class="chart-container">
            <div v-if="isLoadingPersonalResults" class="loading-overlay">
              <div class="loading-spinner"></div>
              <div>加载中...</div>
            </div>
            <div v-else-if="personalResultsError" class="error-message">
              {{ personalResultsError }}
            </div>
            <canvas v-else ref="personalResultsChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '../services/api.js'
import Chart from 'chart.js/auto'

export default {
  name: "TeacherHomePage",
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
      userAvatar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iIzRDQUY1MCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+VDwvdGV4dD48L3N2Zz4=',
      showEditModal: false,
      editedUserData: {},
      isUpdating: false,
      updateMessage: '',
      updateSuccess: false,
      
      // 团队信息相关
      teamInfo: {
        teachers: [],
        students: []
      },
      isLoading: false,
      teamLoadError: '',
      
      // 成员审批相关
      pendingStudents: [],
      isLoadingApprovals: false,
      approvalsError: '',
      isProcessingApproval: false,
      activeTab: 'members', // 默认显示团队成员标签页
      
      // 消息管理相关数据
      activeMessageTab: 'active',
      activeMessages: [],
      expiredMessages: [],
      isLoadingMessages: false,
      messageError: null,
      showPublishForm: false,
      newMessage: {
        title: '',
        content: '',
        userId: '',
        userType: 'teacher',
        userName: '',
        expiredTime: this.getDefaultExpiryDate(),
        priority: 'normal' // 默认优先级为普通
      },
      isPublishing: false,
      publishError: null,
      myMessages: [],
      showEditMessageModal: false,
      editedMessage: {
        title: '',
        content: '',
        priority: 'normal',
        expiredTime: ''
      },
      isUpdatingMessage: false,
      updateMessageError: null,
      
      // 设备管理相关数据
      activeDeviceTab: 'available',       // 当前激活的设备标签页
      availableDevices: [],               // 可用设备列表
      borrowedDevices: [],                // 已借出设备列表
      myBorrowedDevices: [],              // 我借用的设备列表
      isLoadingDevices: false,            // 加载设备列表状态
      deviceError: null,                  // 设备列表加载错误信息
      
      // 新增设备相关
      showAddDeviceForm: false,           // 控制添加设备表单显示
      isEditingDevice: false,             // 是否处于编辑设备状态
      newDevice: {                        // 新设备对象
        name: '',
        address: '',
        teacherId: ''
      },
      editingDeviceId: null,              // 正在编辑的设备ID
      isAddingDevice: false,              // 添加设备中状态
      deviceFormError: null,              // 设备表单错误信息
      
      // 方向管理相关数据
      activeDirectionTab: 'team',         // 当前激活的方向标签页
      teamOrientations: [],               // 团队方向列表
      isLoadingDirections: false,         // 加载方向列表状态
      directionError: null,               // 方向列表加载错误信息
      
      isDirectionMenuOpen: false,          // 方向菜单是否展开
      
      // 我的方向相关数据
      myDirectionActiveTab: 'list',        // 当前激活的我的方向标签页
      myOrientations: [],                 // 我的方向列表
      isLoadingMyDirections: false,        // 加载我的方向列表状态
      myDirectionError: null,              // 我的方向列表加载错误信息
      
      // 方向人员审批相关数据
      pendingApplications: [],            // 待审批的方向申请列表
      isLoadingApplications: false,        // 加载方向人员审批列表状态
      applicationsError: null,            // 方向人员审批列表加载错误信息
      
      // 创建新方向相关数据
      showCreateDirectionForm: false,      // 控制创建新方向表单显示
      isCreatingDirection: false,          // 创建新方向中状态
      newDirection: {                     // 新方向对象
        name: '',
        description: ''
      },
      directionFormError: null,            // 方向表单错误信息
      
      // 删除方向相关数据
      showDeleteConfirmation: false,       // 控制删除确认对话框显示
      isDeletingDirection: false,          // 删除方向中状态
      directionToDelete: null,             // 要删除的方向对象
      
      // 方向详情相关数据
      showDirectionDetail: false,          // 控制方向详情模态框显示
      currentDirectionId: null,            // 当前查看的方向ID
      currentDirectionDetail: null,        // 当前方向详情数据
      currentDirectionSource: 'team',      // 当前方向详情来源：'team'表示团队方向，'my'表示我的方向
      isLoadingDirectionDetail: false,     // 加载方向详情状态
      directionDetailError: null,          // 方向详情加载错误信息
      activeDetailTab: 'intro',            // 当前激活的详情标签页
      
      // 方向任务相关数据
      directionTasks: [],                  // 方向任务列表
      isLoadingTasks: false,               // 加载任务状态
      taskError: null,                     // 任务加载错误信息
      showCreateTaskForm: false,           // 控制创建任务表单显示
      isCreatingTask: false,               // 创建任务中状态
      newTask: {                           // 新任务对象
        taskName: '',
        target: '',
        taskType: 'project',
        level: 'A',
        description: '',
        orientationId: '',
        ownerId: '',
        ownerType: 'teacher'
      },
      taskFormError: null,                 // 任务表单错误信息
      taskTypeOptions: [                   // 任务类型选项
        { value: 'thesis', label: '论文' },
        { value: 'project', label: '项目' },
        { value: 'competition', label: '比赛' }
      ],
      taskLevelOptions: [                  // 任务级别选项
        { value: 'A', label: 'A类' },
        { value: 'B', label: 'B类' },
        { value: 'C', label: 'C类' },
        { value: 'D', label: 'D类' }
      ],
      
      // 任务详情相关数据
      showTaskDetail: false,               // 控制任务详情模态框显示
      currentTaskId: null,                 // 当前查看的任务ID
      currentTask: null,                   // 当前任务详情数据
      isLoadingTaskDetail: false,          // 加载任务详情状态
      taskDetailError: null,               // 任务详情加载错误信息
      showEditTaskForm: false,             // 控制编辑任务表单显示
      isUpdatingTask: false,               // 更新任务中状态
      editedTask: {                        // 编辑任务对象
        taskName: '',
        target: '',
        taskType: 'project',
        level: 'A',
        description: '',
        orientationId: null,
        ownerId: null,
        ownerType: 'teacher'
      },
      editTaskFormError: null,             // 编辑任务表单错误信息
      activeTaskTab: 'detail',             // 当前激活的任务标签页（detail: 详情，progress: 进展）
      
      // 任务进展相关数据
      taskProgressList: [],                // 任务进展记录列表
      isLoadingProgress: false,            // 加载任务进展状态
      progressError: null,                 // 任务进展加载错误信息
      showCreateProgressForm: false,       // 控制添加进展表单显示
      isCreatingProgress: false,           // 创建进展记录中状态
      newProgress: {                       // 新进展记录对象
        title: '',
        content: '',
        status: 'not_completed',
        projectResult: '',
        taskId: null,
        filePath: ''
      },
      progressFormError: null,             // 进展表单错误信息
      selectedFile: null,                  // 选择的文件
      isUploadingFile: false,              // 上传文件中状态
      uploadError: null,                   // 上传文件错误信息
      fileUploadSuccess: false,            // 文件上传成功标志
      selectedProgressId: null,            // 选中的进展记录ID（用于操作）
      isLoadingTaskStats: false,            // 加载方向成果统计状态
      taskStatsError: null,                // 方向成果统计加载错误信息
      taskStats: null,                     // 方向成果统计数据
      taskStatsChart: null,                // 任务统计图表实例
      thesisTasks: [],                      // 论文任务列表
      projectTasks: [],                     // 项目任务列表
      competitionTasks: [],                // 比赛任务列表
      achievementView: 'thesis',            // 成果展示视图
      thesisChart: null,                   // 论文任务图表实例
      projectChart: null,                  // 项目任务图表实例
      competitionChart: null,              // 比赛任务图表实例
      resultsActiveTab: 'team',            // 成果展示子导航栏
      teamStatusFilter: 'completed',        // 团队成果筛选
      teamTypeTab: 'thesis',                // 团队成果类型
      personalTypeTab: 'thesis',            // 个人成果类型
      teamLineChartInstance: null,
      personalBarChartInstance: null,
      teamResultsData: null,
      personalResultsData: null,
      isResultsMenuOpen: false,
      teamLineChart: null,
      personalTypeTab: 'thesis',
      personalResultsChart: null,
      personalResultsData: null,
      isLoadingPersonalResults: false,
      personalResultsError: null,
      isLoadingTeamInfo: false,
      teamInfoError: null,
    };
  },
  computed: {
    menuTitle() {
      switch(this.activeMenu) {
        case 'profile': return '个人信息';
        case 'team-info': return '团队信息';
        case 'direction': return '方向管理';
        case 'direction-team': return '方向管理 / 团队方向';
        case 'direction-my': return '方向管理 / 我的方向';
        case 'device': return '设备管理';
        case 'message-management': return '消息管理';
        case 'results': return '成果展示';
        default: return '';
      }
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
  },
  methods: {
    logout() {
      // 移除token和相关数据
      apiService.setAuthToken(null);
      localStorage.removeItem('savedUsername');
      localStorage.removeItem('userData');
      localStorage.removeItem('userType');
      
      // 通知父组件退出登录
      this.$emit('logout');
    },
    
    async saveChanges() {
      this.isUpdating = true;
      this.updateMessage = '';
      
      try {
        // 准备提交的数据
        const updateData = {
          ...this.editedUserData,
          user_id: this.userData.id,
          user_type: 'teacher'  // 明确指定教师类型
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
      try {
        this.isLoadingTeamInfo = true;
        this.teamInfoError = null;
        
        const response = await apiService.getTeamInfo();
        
        if (response && response.data && response.data.data) {
          this.teamInfo = response.data.data;
        } else {
          throw new Error('获取团队信息失败');
        }
      } catch (error) {
        console.error('Failed to load team info:', error);
        this.teamInfoError = '加载团队信息失败，请稍后重试';
      } finally {
        this.isLoadingTeamInfo = false;
      }
    },
    
    // 加载待审批学生列表
    async loadPendingStudents() {
      this.isLoadingApprovals = true;
      this.approvalsError = '';
      
      try {
        // 调用获取待审批学生列表的API
        const response = await apiService.getPendingStudents();
        
        if (response.data.success) {
          // 确保接收到的数据与预期格式匹配
          this.pendingStudents = response.data.data || [];
          
          // 格式化性别显示，确保性别显示为"男"或"女"
          this.pendingStudents = this.pendingStudents.map(student => ({
            ...student,
            // 如果性别是英文，转换为中文
            sex: student.sex === 'man' ? '男' : (student.sex === 'woman' ? '女' : student.sex)
          }));
          
          console.log('成功加载待审批学生:', this.pendingStudents);
        } else {
          this.approvalsError = response.data.message || '加载待审批成员失败';
          console.error('加载待审批成员失败:', response.data.message);
        }
      } catch (error) {
        console.error('获取待审批学生错误:', error);
        this.approvalsError = '加载待审批学生时发生错误，请稍后再试';
      } finally {
        this.isLoadingApprovals = false;
      }
    },
    
    // 批准学生加入团队
    async approveStudent(studentId) {
      this.isProcessingApproval = true;
      
      try {
        // 调用批准学生的API
        const response = await apiService.approveStudent(studentId);
        
        if (response.data.success) {
          // 从待审批列表中移除该学生
          this.pendingStudents = this.pendingStudents.filter(student => student.id != studentId);
          
          // 刷新团队信息以获取最新的成员列表
          this.loadTeamInfo();
          
          // 显示成功消息
          alert('已成功批准该学生加入团队');
          
          // 如果待审批列表为空，自动切换到团队成员标签页
          if (this.pendingStudents.length === 0) {
            this.activeTab = 'members';
          }
        } else {
          alert(response.data.message || '批准学生失败');
        }
      } catch (error) {
        console.error('批准学生错误:', error);
        alert('批准学生失败，请稍后再试');
      } finally {
        this.isProcessingApproval = false;
      }
    },
    
    // 拒绝学生加入团队 - 仅从列表中移除，不调用API
    rejectStudent(studentId) {
      // 从待审批列表中移除该学生
      this.pendingStudents = this.pendingStudents.filter(student => student.id != studentId);
      
      // 显示提示消息
      alert('已拒绝该学生加入团队');
    },
    
    // 设置当前导航菜单
    async setActiveMenu(menu) {
      this.activeMenu = menu;
      if (menu === 'results-team') {
        await this.loadTeamResultsData();
      } else if (menu === 'results-personal') {
        this.personalTypeTab = 'thesis';
        await this.loadPersonalResultsData();
      } else if (menu === 'team-info') {
        await this.loadTeamInfo();
      }
    },
    
    // 初始化消息管理模块
    initMessageManagement() {
      // 初始化消息数据
      this.resetNewMessage();
      
      // 加载消息列表
      this.loadMessages();
      
      console.log('已初始化消息管理模块');
    },
    
    // 重置新消息表单并使用用户数据
    resetNewMessage() {
      this.newMessage = {
        title: '',
        content: '',
        userId: this.userData.id || '1',
        userType: 'teacher',
        userName: this.userData.name || this.userData.username || '教师',
        expiredTime: this.getDefaultExpiryDate(),
        priority: 'normal' // 默认优先级为普通
      };
    },
    
    // 设置当前消息标签页
    setActiveMessageTab(tab) {
      this.activeMessageTab = tab;
      this.loadMessages();
    },
    
    // 加载消息列表
    loadMessages() {
      this.isLoadingMessages = true;
      this.messageError = null;
      
      let apiPromise;
      
      if (this.activeMessageTab === 'my-messages') {
        // 加载用户自己发布的消息
        const userData = {
          userId: this.userData.id || '1',
          userType: 'teacher'
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
    
    // 发布新消息
    publishNewMessage() {
      if (!this.validateMessageForm()) {
        return;
      }
      
      this.isPublishing = true;
      this.publishError = null;
      
      // 准备发送的消息数据
      const messageData = {
        userId: this.userData.id || '1', // 使用当前登录教师的ID
        title: this.newMessage.title,
        content: this.newMessage.content,
        userType: 'teacher', // 固定为teacher
        userName: this.userData.name || this.userData.username || '教师', // 使用当前登录教师的姓名
        expiredTime: this.newMessage.expiredTime + ' 00:00:00', // 添加时间部分
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
    
    // 取消发布消息
    cancelPublish() {
      this.showPublishForm = false;
      this.resetMessageForm();
    },
    
    // 重置消息表单
    resetMessageForm() {
      this.resetNewMessage();
      this.publishError = null;
    },
    
    // 验证消息表单
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
        this.newMessage.userName = this.userData.name || this.userData.username || '教师';
      }
      
      return true;
    },
    
    // 获取默认有效期（当前日期+30天）
    getDefaultExpiryDate() {
      const date = new Date();
      date.setDate(date.getDate() + 30);
      return date.toISOString().split('T')[0]; // 格式化为YYYY-MM-DD
    },
    
    // 格式化日期
    formatDate(dateStr) {
      if (!dateStr) return '未知时间';
      
      try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('zh-CN', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }).replace(/\//g, '-');
      } catch (e) {
        console.error('日期格式化错误:', e);
        return dateStr;
      }
    },
    
    // 获取优先级标签类名
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
    
    // 获取优先级文本
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
    
    // 编辑消息
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
    
    // 更新消息
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
    
    // 确认删除消息
    confirmDeleteMessage(id) {
      if (confirm('确定要删除这条消息吗？')) {
        this.deleteMessage(id);
      }
    },
    
    // 删除消息
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
          borrowerType: 'teacher',
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
    
    // 添加新设备
    addDevice() {
      if (!this.validateDeviceForm()) {
        return;
      }
      
      this.isAddingDevice = true;
      this.deviceFormError = null;
      
      // 准备发送的设备数据
      const deviceData = {
        name: this.newDevice.name,
        address: this.newDevice.address,
        teacherId: this.userData.id || '1', // 使用当前登录教师的ID
      };
      
      console.log('发送设备数据:', deviceData);
      
      apiService.addEquipment(deviceData)
        .then(response => {
          console.log('设备添加成功:', response);
          this.showAddDeviceForm = false;
          this.resetDeviceForm();
          this.loadDevices(); // 重新加载设备列表
          
          // 显示成功提示
          alert('设备添加成功!');
        })
        .catch(error => {
          console.error('添加设备错误:', error);
          this.deviceFormError = '添加设备失败，请稍后重试';
          
          // 显示更详细的错误信息，帮助调试
          if (error.response) {
            console.error('错误响应数据:', error.response.data);
            this.deviceFormError = error.response.data.message || '添加设备失败，请稍后重试';
          }
        })
        .finally(() => {
          this.isAddingDevice = false;
        });
    },
    
    // 编辑设备信息
    editDevice(device) {
      this.isEditingDevice = true;
      this.editingDeviceId = device.id;
      this.newDevice = {
        name: device.name,
        address: device.address,
        teacherId: device.teacherId || this.userData.id || '1'
      };
      this.showAddDeviceForm = true;
      this.deviceFormError = null;
    },
    
    // 更新设备信息
    updateDevice() {
      if (!this.validateDeviceForm()) {
        return;
      }
      
      this.isAddingDevice = true; // 复用加载状态
      this.deviceFormError = null;
      
      // 准备更新的设备数据
      const deviceData = {
        name: this.newDevice.name,
        address: this.newDevice.address,
        teacherId: this.userData.id || '1' // 使用当前登录教师的ID
      };
      
      console.log('更新设备数据:', deviceData);
      
      apiService.updateEquipment(this.editingDeviceId, deviceData)
        .then(response => {
          console.log('设备更新成功:', response);
          this.showAddDeviceForm = false;
          this.resetDeviceForm();
          this.loadDevices(); // 重新加载设备列表
          
          // 显示成功提示
          alert('设备更新成功!');
        })
        .catch(error => {
          console.error('更新设备错误:', error);
          this.deviceFormError = '更新设备失败，请稍后重试';
          
          // 显示更详细的错误信息，帮助调试
          if (error.response) {
            console.error('错误响应数据:', error.response.data);
            this.deviceFormError = error.response.data.message || '更新设备失败，请稍后重试';
          }
        })
        .finally(() => {
          this.isAddingDevice = false;
          this.isEditingDevice = false;
          this.editingDeviceId = null;
        });
    },
    
    // 确认删除设备
    confirmDeleteDevice(deviceId) {
      if (confirm('确定要删除这个设备吗？此操作不可撤销。')) {
        this.deleteDevice(deviceId);
      }
    },
    
    // 删除设备
    deleteDevice(deviceId) {
      apiService.deleteEquipment(deviceId)
        .then(response => {
          console.log('设备删除成功:', response);
          this.loadDevices(); // 重新加载设备列表
          
          // 显示成功提示
          alert('设备删除成功!');
        })
        .catch(error => {
          console.error('删除设备错误:', error);
          alert('删除设备失败，请稍后重试');
        });
    },
    
    // 借阅设备
    borrowDevice(deviceId) {
      // 准备借阅数据
      const borrowData = {
        equipmentId: deviceId,
        borrowerType: 'teacher'
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
    
    // 验证设备表单
    validateDeviceForm() {
      if (!this.newDevice.name.trim()) {
        this.deviceFormError = '请输入设备名称';
        return false;
      }
      
      if (!this.newDevice.address.trim()) {
        this.deviceFormError = '请输入设备位置';
        return false;
      }
      
      return true;
    },
    
    // 重置设备表单
    resetDeviceForm() {
      this.newDevice = {
        name: '',
        address: '',
        teacherId: this.userData.id || '1'
      };
      this.deviceFormError = null;
      this.isEditingDevice = false;
      this.editingDeviceId = null;
    },
    
    // 设置当前方向标签页
    setActiveDirectionTab(tab) {
      this.activeDirectionTab = tab;
      this.loadDirections();
    },
    
    // 加载方向列表
    loadDirections() {
      this.isLoadingDirections = true;
      this.directionError = null;
      
      apiService.getAllOrientations()
        .then(response => {
          console.log('获取方向列表响应:', response.data);
          
          if (response.data && response.data.success) {
            this.teamOrientations = response.data.data || [];
            console.log('已加载方向列表:', this.teamOrientations);
          } else {
            this.directionError = response.data?.message || '加载方向列表失败';
            console.error('加载方向列表失败:', response.data);
          }
        })
        .catch(error => {
          console.error('获取方向列表错误:', error);
          this.directionError = '加载方向列表时发生错误，请稍后再试';
        })
        .finally(() => {
          this.isLoadingDirections = false;
        });
    },
    
    // 查看方向详情
    viewDirectionDetail(directionId) {
      this.activeDetailTab = 'intro'; // 默认显示方向简介标签页
      this.currentDirectionId = directionId;
      this.currentDirectionSource = this.myOrientations.some(d => d.id == directionId) ? 'my' : 'team';
      this.showDirectionDetail = true;
      
      // 重置任务统计相关数据，以便在切换到方向成果标签页时重新加载
      this.taskStats = null;
      this.taskStatsError = null;
      this.isLoadingTaskStats = false;
      this.achievementView = 'chart'; // 默认展示图表视图
      
      // 加载方向详情
      this.isLoadingDirectionDetail = true;
      this.directionDetailError = null;
      
      apiService.getOrientationDetail(directionId)
        .then(response => {
          if (response.data && response.data.success) {
            this.currentDirectionDetail = response.data.data;
            console.log('已加载方向详情:', this.currentDirectionDetail);
          } else {
            this.directionDetailError = response.data?.message || '加载方向详情失败';
          }
        })
        .catch(error => {
          console.error('加载方向详情错误:', error);
          this.directionDetailError = '加载方向详情时发生错误，请稍后再试';
        })
        .finally(() => {
          this.isLoadingDirectionDetail = false;
        });
        
      // 同时预加载方向任务列表数据，以便切换到任务列表标签页时可以立即显示
      this.loadDirectionTasks();
      
      // 注意：不在这里加载任务统计数据，而是在用户切换到方向成果标签页时才加载
    },
    
    // 关闭方向详情模态框
    closeDirectionDetail() {
      this.showDirectionDetail = false;
      this.currentDirectionId = null;
      this.currentDirectionDetail = null;
    },
    
    // 切换方向菜单
    toggleDirectionMenu() {
      this.isDirectionMenuOpen = !this.isDirectionMenuOpen;
    },
    
    // 加载所有团队方向列表
    loadAllDirections() {
      this.isLoadingDirections = true;
      this.directionError = null;
      
      apiService.getAllOrientations()
        .then(response => {
          console.log('获取团队方向列表响应:', response.data);
          
          if (response.data && response.data.success) {
            this.teamOrientations = response.data.data || [];
            console.log('已加载团队方向列表:', this.teamOrientations);
          } else {
            this.directionError = response.data?.message || '加载团队方向列表失败';
            console.error('加载团队方向列表失败:', response.data);
          }
        })
        .catch(error => {
          console.error('获取团队方向列表错误:', error);
          this.directionError = '加载团队方向列表时发生错误，请稍后再试';
        })
        .finally(() => {
          this.isLoadingDirections = false;
        });
    },
    
    // 设置我的方向标签页
    setMyDirectionActiveTab(tab) {
      this.myDirectionActiveTab = tab;
      
      // 根据不同的标签加载不同的数据
      if (tab === 'list') {
        this.loadMyDirections();
      } else if (tab === 'approval') {
        this.loadPendingApplications();
      }
    },
    
    // 加载我的方向列表
    loadMyDirections() {
      this.isLoadingMyDirections = true;
      this.myDirectionError = null;
      
      apiService.getMyOrientations()
        .then(response => {
          console.log('获取我的方向列表响应:', response.data);
          
          if (response.data && response.data.success) {
            this.myOrientations = response.data.data || [];
            console.log('已加载我的方向列表:', this.myOrientations);
          } else {
            this.myDirectionError = response.data?.message || '加载我的方向列表失败';
            console.error('加载我的方向列表失败:', response.data);
          }
        })
        .catch(error => {
          console.error('获取我的方向列表错误:', error);
          this.myDirectionError = '加载我的方向列表时发生错误，请稍后再试';
        })
        .finally(() => {
          this.isLoadingMyDirections = false;
        });
    },
    
    // 批准方向申请
    async approveApplication(applicationId, approve) {
      this.isProcessingApproval = true;
      
      try {
        // 调用批准方向申请的API
        const response = await apiService.approveOrientationApplication({
          applicationId: applicationId,
          approve: approve,
          teacherId: this.userData.id || '1'
        });
        
        if (response.data.success) {
          // 从待审批列表中移除该申请
          this.pendingApplications = this.pendingApplications.filter(application => application.id != applicationId);
          
          // 刷新我的方向列表
          this.loadMyDirections();
          
          // 显示成功消息
          alert(approve ? '已同意学生加入方向' : '已拒绝学生加入方向');
          
          // 如果待审批列表为空，自动切换到方向列表标签页
          if (this.pendingApplications.length === 0) {
            this.myDirectionActiveTab = 'list';
          }
        } else {
          alert(response.data.message || '处理方向申请失败');
        }
      } catch (error) {
        console.error('处理方向申请错误:', error);
        alert('处理方向申请失败，请稍后再试');
      } finally {
        this.isProcessingApproval = false;
      }
    },
    
    // 拒绝方向申请
    rejectApplication(applicationId) {
      // 从待审批列表中移除该申请
      this.pendingApplications = this.pendingApplications.filter(application => application.id != applicationId);
      
      // 显示提示消息
      alert('已拒绝方向申请');
    },
    
    // 创建新方向
    createNewDirection() {
      if (!this.validateDirectionForm()) {
        return;
      }
      
      this.isCreatingDirection = true;
      this.directionFormError = null;
      
      // 准备发送的方向数据
      const directionData = {
        name: this.newDirection.name,
        description: this.newDirection.description,
        teacherId: this.userData.id || '1', // 使用当前登录教师的ID
      };
      
      console.log('发送方向数据:', directionData);
      
      apiService.addOrientation(directionData)
        .then(response => {
          console.log('方向添加成功:', response);
          this.showCreateDirectionForm = false;
          this.resetDirectionForm();
          this.loadMyDirections(); // 重新加载我的方向列表
          
          // 显示成功提示
          alert('方向添加成功!');
        })
        .catch(error => {
          console.error('添加方向错误:', error);
          this.directionFormError = '添加方向失败，请稍后重试';
          
          // 显示更详细的错误信息，帮助调试
          if (error.response) {
            console.error('错误响应数据:', error.response.data);
            this.directionFormError = error.response.data.message || '添加方向失败，请稍后重试';
          }
        })
        .finally(() => {
          this.isCreatingDirection = false;
        });
    },
    
    // 验证方向表单
    validateDirectionForm() {
      if (!this.newDirection.name.trim()) {
        this.directionFormError = '请输入方向名称';
        return false;
      }
      
      if (!this.newDirection.description.trim()) {
        this.directionFormError = '请输入方向描述';
        return false;
      }
      
      return true;
    },
    
    // 重置方向表单
    resetDirectionForm() {
      this.newDirection = {
        name: '',
        description: ''
      };
      this.directionFormError = null;
      this.isCreatingDirection = false;
    },
    
    // 确认删除方向
    confirmDeleteDirection(direction) {
      this.directionToDelete = direction;
      this.showDeleteConfirmation = true;
    },
    
    // 删除方向
    deleteDirection() {
      apiService.deleteOrientation(this.directionToDelete.id)
        .then(response => {
          console.log('方向删除成功:', response);
          this.showDeleteConfirmation = false;
          this.loadMyDirections(); // 重新加载我的方向列表
          
          // 显示成功提示
          alert('方向删除成功!');
        })
        .catch(error => {
          console.error('删除方向错误:', error);
          alert('删除方向失败，请稍后重试');
        });
    },
    
    // 加载待审批方向申请
    loadPendingApplications() {
      this.isLoadingApplications = true;
      this.applicationsError = null;
      
      // 使用当前教师ID
      const teacherId = this.userData.id || '1';
      
      apiService.getOrientationApplications(teacherId)
        .then(response => {
          console.log('获取待审批方向申请响应:', response.data);
          
          if (response.data && response.data.success) {
            this.pendingApplications = response.data.data || [];
            console.log('已加载待审批方向申请:', this.pendingApplications);
            
            // 格式化时间显示
            this.pendingApplications = this.pendingApplications.map(app => ({
              ...app,
              time: this.formatDateTime(app.time)
            }));
          } else {
            this.applicationsError = response.data?.message || '加载待审批方向申请失败';
            console.error('加载待审批方向申请失败:', response.data);
          }
        })
        .catch(error => {
          console.error('获取待审批方向申请错误:', error);
          this.applicationsError = '加载待审批方向申请时发生错误，请稍后再试';
        })
        .finally(() => {
          this.isLoadingApplications = false;
        });
    },
    
    // 格式化日期时间
    formatDateTime(dateTimeStr) {
      if (!dateTimeStr) return '';
      
      try {
        const date = new Date(dateTimeStr);
        return date.toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).replace(/\//g, '-');
      } catch (e) {
        console.error('日期格式化错误:', e);
        return dateTimeStr;
      }
    },
    
    // 切换方向详情标签页
    setDetailTab(tab) {
      this.activeDetailTab = tab;
      
      // 如果切换到成果标签页，重置标签页选中状态为论文，并加载成果统计数据
      if (tab === 'achievements') {
        // 重置成果标签页为论文标签页
        this.achievementView = 'thesis';
        
        // 如果尚未加载任务统计数据，则加载
        if (!this.taskStats) {
          this.loadOrientationTaskStats();
        } else {
          // 如果已加载数据，确保在下一个 DOM 更新周期渲染图表
          this.$nextTick(() => {
            this.renderTaskStatsChart();
          });
        }
      }
    },
    
    // 加载方向任务列表
    loadDirectionTasks() {
      if (!this.currentDirectionId) {
        console.error('当前方向ID未设置，无法加载任务列表');
        this.taskLoadError = '无法确定当前方向，请刷新页面重试';
        return;
      }
      
      this.isLoadingTasks = true;
      this.taskLoadError = null;
      
      // 确保orientationId是数字类型
      const orientationId = parseInt(this.currentDirectionId);
      
      console.log('开始加载方向任务列表，方向ID:', orientationId);
      
      apiService.getOrientationTasks(orientationId)
        .then(response => {
          console.log('获取方向任务列表响应:', response.data);
          
          if (response.data && response.data.success) {
            this.directionTasks = response.data.data || [];
            console.log('已加载方向任务列表数据:', this.directionTasks);
            
            // 如果任务列表为空，设置提示信息
            if (this.directionTasks.length === 0) {
              console.log('任务列表为空');
            }
          } else {
            this.taskLoadError = response.data?.message || '加载任务列表失败';
            console.error('加载任务列表失败:', response.data);
          }
        })
        .catch(error => {
          console.error('加载任务列表时发生错误:', error);
          
          // 提供更具体的错误信息
          if (error.response) {
            console.error('错误响应:', error.response);
            if (error.response.status === 404) {
              this.taskLoadError = '找不到该方向的任务列表，可能该方向已被删除';
            } else if (error.response.status === 401) {
              this.taskLoadError = '您没有权限查看该方向的任务列表';
            } else {
              this.taskLoadError = `加载失败 (${error.response.status}): ${error.response.data?.message || '未知错误'}`;
            }
          } else if (error.request) {
            this.taskLoadError = '网络请求失败，请检查网络连接';
          } else {
            this.taskLoadError = '加载任务列表时发生错误，请稍后再试';
          }
        })
        .finally(() => {
          this.isLoadingTasks = false;
        });
    },
    
    // 显示创建任务表单
    showTaskForm() {
      // 重置任务表单
      this.resetTaskForm();
      // 设置当前方向ID
      this.newTask.orientationId = this.currentDirectionId ? parseInt(this.currentDirectionId) : null;
      // 设置创建者ID
      this.newTask.ownerId = this.userData.id ? parseInt(this.userData.id) : null;
      // 显示表单
      this.showCreateTaskForm = true;
    },
    
    // 关闭创建任务表单
    closeTaskForm() {
      this.showCreateTaskForm = false;
      this.resetTaskForm();
    },
    
    // 重置任务表单
    resetTaskForm() {
      this.newTask = {
        taskName: '',
        target: '',
        taskType: 'project',
        level: 'A',
        description: '',
        orientationId: this.currentDirectionId ? parseInt(this.currentDirectionId) : null,
        ownerId: this.userData.id ? parseInt(this.userData.id) : null,
        ownerType: 'teacher'
      };
      this.taskFormError = null;
    },
    
    // 验证任务表单
    validateTaskForm() {
      if (!this.newTask.taskName.trim()) {
        this.taskFormError = '请输入任务名称';
        return false;
      }
      
      if (!this.newTask.target.trim()) {
        this.taskFormError = '请输入任务目标';
        return false;
      }
      
      return true;
    },
    
    // 创建新任务
    createNewTask() {
      if (!this.validateTaskForm()) {
        return;
      }
      
      this.isCreatingTask = true;
      this.taskFormError = null;
      
      // 准备任务数据，确保字段名称与API一致，并且ID是数字类型
      const taskData = {
        taskName: this.newTask.taskName,
        target: this.newTask.target,
        taskType: this.newTask.taskType,
        level: this.newTask.level,
        description: this.newTask.description,
        orientationId: parseInt(this.currentDirectionId),
        ownerId: parseInt(this.userData.id),
        ownerType: 'teacher'
      };
      
      // 发送请求创建任务
      apiService.createTask(taskData)
        .then(response => {
          console.log('任务创建成功:', response);
          
          if (response.data && response.data.success) {
            // 关闭表单
            this.showCreateTaskForm = false;
            // 重置表单
            this.resetTaskForm();
            // 重新加载任务列表
            this.loadDirectionTasks();
            // 显示成功消息
            alert('任务创建成功!');
          } else {
            this.taskFormError = response.data?.message || '创建任务失败，请稍后重试';
            console.error('创建任务失败:', response.data);
          }
        })
        .catch(error => {
          console.error('创建任务错误:', error);
          this.taskFormError = '创建任务时发生错误，请稍后再试';
        })
        .finally(() => {
          this.isCreatingTask = false;
        });
    },
    
    // 删除任务
    deleteTask(taskId) {
      if (confirm('确定要删除这个任务吗？删除后无法恢复。')) {
        apiService.deleteTask(taskId)
          .then(response => {
            console.log('任务删除响应:', response.data);
            
            if (response.data && response.data.success) {
              // 从列表中移除该任务
              this.directionTasks = this.directionTasks.filter(task => task.id !== taskId);
              alert('任务删除成功!');
            } else {
              alert(response.data?.message || '删除任务失败，请稍后重试');
            }
          })
          .catch(error => {
            console.error('删除任务错误:', error);
            alert('删除任务时发生错误，请稍后再试');
          });
      }
    },
    
    // 格式化任务类型
    formatTaskType(type) {
      const typeMap = {
        'thesis': '论文',
        'project': '项目',
        'competition': '比赛'
      };
      return typeMap[type] || type;
    },
    
    // 格式化任务等级
    formatTaskLevel(level) {
      return level && level.toUpperCase ? level.toUpperCase() + '级' : level;
    },
    
    // 查看任务详情
    viewTaskDetail(taskId) {
      this.currentTaskId = taskId;
      this.showTaskDetail = true;
      this.activeTaskTab = 'detail'; // 默认显示详情标签页
      
      // 加载任务详情
      this.loadTaskDetail();
    },
    
    // 加载任务详情
    loadTaskDetail() {
      this.isLoadingTaskDetail = true;
      this.taskDetailError = null;
      
      // 确保taskId是数字类型
      const taskId = parseInt(this.currentTaskId);
      
      apiService.getTaskDetail(taskId)
        .then(response => {
          if (response.data && response.data.success) {
            this.currentTask = response.data.data;
            console.log('已加载任务详情:', this.currentTask);
          } else {
            this.taskDetailError = response.data?.message || '加载任务详情失败';
            console.error('加载任务详情失败:', response.data);
          }
        })
        .catch(error => {
          console.error('加载任务详情时发生错误:', error);
          this.taskDetailError = '网络错误，请稍后再试';
        })
        .finally(() => {
          this.isLoadingTaskDetail = false;
        });
    },
    
    // 关闭任务详情
    closeTaskDetail() {
      this.showTaskDetail = false;
      this.currentTask = null;
      this.currentTaskId = null;
      this.showEditTaskForm = false;
    },
    
    // 切换任务标签页
    setActiveTaskTab(tab) {
      // 如果切换到进展标签页，加载任务进展数据
      if (tab === 'progress' && this.activeTaskTab !== 'progress') {
        this.loadTaskProgress();
      }
      this.activeTaskTab = tab;
    },
    
    // 加载任务进展记录
    loadTaskProgress() {
      if (!this.currentTaskId) {
        console.error('当前任务ID未设置，无法加载任务进展');
        return;
      }
      
      this.isLoadingProgress = true;
      this.progressError = null;
      
      apiService.getTaskProgress(this.currentTaskId)
        .then(response => {
          console.log('获取任务进展响应:', response.data);
          
          if (response.data && response.data.success) {
            // 按时间从最近到最久远排序
            this.taskProgressList = (response.data.data || []).sort((a, b) => {
              return new Date(b.time) - new Date(a.time);
            });
            console.log('已加载任务进展列表:', this.taskProgressList);
          } else {
            this.progressError = response.data?.message || '加载任务进展失败';
            console.error('加载任务进展失败:', response.data);
          }
        })
        .catch(error => {
          console.error('获取任务进展错误:', error);
          this.progressError = '加载任务进展时发生错误，请稍后再试';
        })
        .finally(() => {
          this.isLoadingProgress = false;
        });
    },
    
    // 显示添加进展表单
    showProgressForm() {
      // 重置表单状态
      this.newProgress = {
        title: '',
        content: '',
        status: 'not_completed',
        projectResult: '',
        taskId: this.currentTaskId,
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
    
    // 创建新进展记录
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
          taskId: this.currentTaskId
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
        }
      } catch (error) {
        console.error('创建进展记录错误:', error);
        this.progressFormError = '创建进展记录时发生错误，请稍后再试';
      } finally {
        this.isCreatingProgress = false;
      }
    },
    
    // 上传文件
    async uploadFile(progressId) {
      if (!this.selectedFile) {
        return;
      }
      
      this.isUploadingFile = true;
      this.uploadError = null;
      
      try {
        // 创建FormData对象
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        
        // 上传文件
        const response = await apiService.uploadProgressFile(progressId, formData);
        
        if (response.data && response.data.success) {
          console.log('文件上传成功:', response.data);
          this.fileUploadSuccess = true;
          this.showCreateProgressForm = false;
          this.loadTaskProgress(); // 重新加载任务进展列表
          alert('进展记录创建成功，文件已上传!');
        } else {
          this.uploadError = response.data?.message || '上传文件失败';
          console.error('上传文件失败:', response.data);
        }
      } catch (error) {
        console.error('上传文件错误:', error);
        this.uploadError = '上传文件时发生错误，请稍后再试';
      } finally {
        this.isUploadingFile = false;
      }
    },
    
    // 下载文件
    downloadFile(progressId) {
      if (!progressId) {
        alert('进度记录ID无效，无法下载文件');
        return;
      }
      
      apiService.downloadProgressFile(progressId)
        .then(response => {
          console.log('文件下载响应:', response);
          
          // 从响应头中获取文件名
          const contentDisposition = response.headers['content-disposition'];
          let filename = '';
          
          // 尝试从Content-Disposition提取文件名
          if (contentDisposition) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(contentDisposition);
            if (matches != null && matches[1]) {
              // 移除可能存在的引号
              filename = matches[1].replace(/['"]/g, '');
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
          link.setAttribute('download', filename);
          document.body.appendChild(link);
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
        });
    },
    
    // 根据内容类型获取文件扩展名的辅助方法
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
      };
      
      return typeMap[contentType] || '.bin';
    },
    
    // 删除进展记录
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
    
    // 获取进展状态文本
    getProgressStatusText(status) {
      return status === 'completed' ? '已完成' : '进行中';
    },
    
    // 从文件路径中提取文件名
    getFileNameFromPath(filePath) {
      if (!filePath) return '';
      // 获取路径中最后一个斜杠后的内容作为文件名
      const parts = filePath.split('/');
      return parts[parts.length - 1];
    },
    
    // 删除进度文件
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
    
    // 显示编辑任务表单
    showEditTask() {
      if (!this.currentTask) return;
      
      // 初始化编辑表单数据
      this.editedTask = {
        taskName: this.currentTask.taskName,
        target: this.currentTask.target,
        taskType: this.currentTask.taskType,
        level: this.currentTask.level,
        description: this.currentTask.description || '',
        orientationId: parseInt(this.currentTask.orientationId),
        ownerId: parseInt(this.currentTask.ownerId),
        ownerType: this.currentTask.ownerType
      };
      
      this.showEditTaskForm = true;
      this.editTaskFormError = null;
    },
    
    // 取消编辑任务
    cancelEditTask() {
      this.showEditTaskForm = false;
      this.editTaskFormError = null;
    },
    
    // 验证编辑任务表单
    validateEditTaskForm() {
      if (!this.editedTask.taskName.trim()) {
        this.editTaskFormError = '请输入任务名称';
        return false;
      }
      
      if (!this.editedTask.target.trim()) {
        this.editTaskFormError = '请输入任务目标';
        return false;
      }
      
      return true;
    },
    
    // 更新任务
    updateTask() {
      if (!this.validateEditTaskForm()) {
        return;
      }
      
      this.isUpdatingTask = true;
      this.editTaskFormError = null;
      
      const taskData = {
        taskName: this.editedTask.taskName,
        target: this.editedTask.target,
        taskType: this.editedTask.taskType,
        level: this.editedTask.level,
        description: this.editedTask.description,
        orientationId: this.editedTask.orientationId,
        ownerId: this.editedTask.ownerId,
        ownerType: this.editedTask.ownerType
      };
      
      apiService.updateTask(this.currentTaskId, taskData)
        .then(response => {
          if (response.data && response.data.success) {
            // 更新成功后关闭编辑表单并刷新任务详情
            this.showEditTaskForm = false;
            this.loadTaskDetail();
            
            // 更新任务列表中的对应任务
            this.loadDirectionTasks();
            
            // 显示成功消息
            alert('任务更新成功!');
          } else {
            this.editTaskFormError = response.data?.message || '更新任务失败，请稍后重试';
            console.error('更新任务失败:', response.data);
          }
        })
        .catch(error => {
          console.error('更新任务错误:', error);
          this.editTaskFormError = '更新任务时发生错误，请稍后再试';
        })
        .finally(() => {
          this.isUpdatingTask = false;
        });
    },
    
    // 加载方向详情
    loadOrientationDetail() {
      if (!this.currentOrientationId) {
        console.error('当前方向ID未设置，无法加载详情');
        return;
      }
      
      this.isLoadingOrientationDetail = true;
      
      apiService.getOrientationDetail(this.currentOrientationId)
        .then(response => {
          if (response.data && response.data.success) {
            this.currentOrientation = response.data.data;
            console.log('已加载方向详情:', this.currentOrientation);
            
            // 如果当前标签是成果标签，加载方向成果统计
            if (this.activeDetailTab === 'achievements') {
              this.loadOrientationTaskStats();
            }
          } else {
            this.orientationDetailError = response.data?.message || '加载方向详情失败';
          }
        })
        .catch(error => {
          console.error('加载方向详情错误:', error);
          this.orientationDetailError = '加载方向详情时发生错误，请稍后再试';
        })
        .finally(() => {
          this.isLoadingOrientationDetail = false;
        });
    },
    
    // 切换方向详情标签页
    setDetailTab(tab) {
      this.activeDetailTab = tab;
      
      // 如果切换到成果标签页，加载成果统计数据
      if (tab === 'achievements' && !this.taskStats) {
        this.loadOrientationTaskStats();
      }
    },
    
    // 加载方向任务统计数据
    loadOrientationTaskStats() {
      if (!this.currentDirectionId) {
        console.error('当前方向ID未设置，无法加载任务统计');
        return;
      }
      
      this.isLoadingTaskStats = true;
      this.taskStatsError = null;
      console.log('开始加载方向任务统计数据，方向ID:', this.currentDirectionId);
      
      apiService.getOrientationTaskStats(this.currentDirectionId)
        .then(response => {
          console.log('获取方向任务统计响应:', response.data);
          
          if (response.data && response.data.success) {
            this.taskStats = response.data.data;
            
            // 处理任务详情数据，按类型分类
            this.thesisTasks = this.taskStats.task_details.filter(task => task.type === 'thesis');
            this.projectTasks = this.taskStats.task_details.filter(task => task.type === 'project');
            this.competitionTasks = this.taskStats.task_details.filter(task => task.type === 'competition');
            
            // 标记数据已加载，并且在当前活动标签页是成果且视图是图表时立即渲染
            console.log('方向任务统计数据加载完成，准备渲染图表');
            
            // 在下一个DOM更新周期后渲染图表
            this.$nextTick(() => {
              // 确保当前是在图表视图，且图表容器已经渲染
              if (this.activeDetailTab === 'achievements' && this.achievementView === 'chart' && this.$refs.taskStatsChart) {
                console.log('开始渲染统计图表');
                this.renderTaskStatsChart();
              } else {
                console.log('当前不在图表视图，或图表容器未渲染，暂不渲染图表');
              }
            });
          } else {
            this.taskStatsError = response.data?.message || '加载任务统计数据失败';
            console.error('加载任务统计数据失败:', response.data);
          }
        })
        .catch(error => {
          console.error('获取任务统计数据错误:', error);
          
          // 提供更具体的错误信息
          if (error.response) {
            console.error('错误响应:', error.response);
            if (error.response.status === 404) {
              this.taskStatsError = '找不到该方向的任务统计数据，可能该方向已被删除';
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
        })
        .finally(() => {
          this.isLoadingTaskStats = false;
        });
    },
    
    // 渲染任务统计图表
    renderTaskStatsChart() {
      console.log('执行renderTaskStatsChart方法');
      
      // 调用对应类型的图表渲染方法
      if (this.achievementView === 'thesis') {
        this.renderThesisChart();
      } else if (this.achievementView === 'project') {
        this.renderProjectChart();
      } else if (this.achievementView === 'competition') {
        this.renderCompetitionChart();
      }
    },
    
    // 渲染论文任务图表
    renderThesisChart() {
      if (!this.taskStats || !this.$refs.thesisChartRef) {
        console.error('无法渲染论文图表：', !this.taskStats ? '任务统计数据不存在' : '图表容器不存在');
        return;
      }
      
      try {
        // 获取任务统计数据
        const taskStats = this.taskStats.task_stats;
        const thesisStats = this.getTaskStatsByType('thesis');
        
        if (!taskStats || !thesisStats) {
          console.error('任务统计数据格式不正确或论文任务数据不存在');
          return;
        }
        
        // 清除可能存在的旧图表实例
        if (this.thesisChart instanceof Chart) {
          this.thesisChart.destroy();
          this.thesisChart = null;
        }
        
        // 获取canvas上下文
        const ctx = this.$refs.thesisChartRef.getContext('2d');
        if (!ctx) {
          console.error('无法获取canvas上下文');
          return;
        }
        
        // 创建图表
        this.thesisChart = this.createTaskChart(ctx, thesisStats, '论文任务完成情况');
        
        console.log('论文图表创建成功');
      } catch (error) {
        console.error('渲染论文图表时发生错误:', error);
      }
    },
    
    // 渲染项目任务图表
    renderProjectChart() {
      if (!this.taskStats || !this.$refs.projectChartRef) {
        console.error('无法渲染项目图表：', !this.taskStats ? '任务统计数据不存在' : '图表容器不存在');
        return;
      }
      
      try {
        // 获取任务统计数据
        const taskStats = this.taskStats.task_stats;
        const projectStats = this.getTaskStatsByType('project');
        
        if (!taskStats || !projectStats) {
          console.error('任务统计数据格式不正确或项目任务数据不存在');
          return;
        }
        
        // 清除可能存在的旧图表实例
        if (this.projectChart instanceof Chart) {
          this.projectChart.destroy();
          this.projectChart = null;
        }
        
        // 获取canvas上下文
        const ctx = this.$refs.projectChartRef.getContext('2d');
        if (!ctx) {
          console.error('无法获取canvas上下文');
          return;
        }
        
        // 创建图表
        this.projectChart = this.createTaskChart(ctx, projectStats, '项目任务完成情况');
        
        console.log('项目图表创建成功');
      } catch (error) {
        console.error('渲染项目图表时发生错误:', error);
      }
    },
    
    // 渲染比赛任务图表
    renderCompetitionChart() {
      if (!this.taskStats || !this.$refs.competitionChartRef) {
        console.error('无法渲染比赛图表：', !this.taskStats ? '任务统计数据不存在' : '图表容器不存在');
        return;
      }
      
      try {
        // 获取任务统计数据
        const taskStats = this.taskStats.task_stats;
        const competitionStats = this.getTaskStatsByType('competition');
        
        if (!taskStats || !competitionStats) {
          console.error('任务统计数据格式不正确或比赛任务数据不存在');
          return;
        }
        
        // 清除可能存在的旧图表实例
        if (this.competitionChart instanceof Chart) {
          this.competitionChart.destroy();
          this.competitionChart = null;
        }
        
        // 获取canvas上下文
        const ctx = this.$refs.competitionChartRef.getContext('2d');
        if (!ctx) {
          console.error('无法获取canvas上下文');
          return;
        }
        
        // 创建图表
        this.competitionChart = this.createTaskChart(ctx, competitionStats, '比赛任务完成情况');
        
        console.log('比赛图表创建成功');
      } catch (error) {
        console.error('渲染比赛图表时发生错误:', error);
      }
    },
    
    // 根据任务类型获取统计数据
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
    
    // 创建任务统计图表的通用方法
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
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: '已完成',
              data: completedData,
              backgroundColor: '#4CAF50',
              borderColor: '#388E3C',
              borderWidth: 1,
              borderRadius: 4,
              barPercentage: 0.6,
              categoryPercentage: 0.7,
            },
            {
              label: '未完成',
              data: notCompletedData,
              backgroundColor: '#FFC107',
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
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 20,
              right: 25,
              bottom: 20,
              left: 25
            }
          },
          scales: {
            x: {
              stacked: false,
              grid: {
                display: false,
                drawBorder: false
              },
              title: {
                display: true,
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
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)',
                lineWidth: 1
              },
              title: {
                display: true,
                text: '任务数量',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              },
              ticks: {
                precision: 0,
                stepSize: 1,
                font: {
                  size: 12
                }
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: this.currentDirectionDetail && this.currentDirectionDetail.name 
                ? `${this.currentDirectionDetail.name} ${title}`
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
              position: 'top',
              labels: {
                padding: 15,
                usePointStyle: true,
                pointStyle: 'rectRounded',
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              titleColor: '#333',
              bodyColor: '#333',
              borderColor: '#ddd',
              borderWidth: 1,
              padding: 10,
              displayColors: true,
              callbacks: {
                footer: (tooltipItems) => {
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
    
    // 当切换成果视图时更新图表
    watchAchievementView(newView, oldView) {
      if (newView !== oldView) {
        console.log(`切换到${newView}视图，准备渲染图表`);
        
        // 在DOM更新后渲染图表
        this.$nextTick(() => {
          if (this.taskStats) {
            this.renderTaskStatsChart();
          } else if (!this.isLoadingTaskStats) {
            // 如果数据未加载且当前不在加载状态，则重新加载数据
            console.log('数据未加载，重新请求统计数据');
            this.loadOrientationTaskStats();
          } else {
            console.log('统计数据正在加载中，等待加载完成后自动渲染');
          }
        });
      }
    },
    
    // 处理窗口大小变化的方法
    handleResize() {
      // 如果当前在方向成果标签页，并且数据已加载，则重新渲染图表以适应新的窗口大小
      if (this.activeDetailTab === 'achievements' && this.taskStats) {
        this.$nextTick(() => {
          this.renderTaskStatsChart();
        });
      }
    },
    async loadTeamResultsData() {
      console.log('Starting to load team results data');
      try {
        // 检查用户数据
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        if (!userData.id) {
          throw new Error('No valid user data found');
        }

        const response = await apiService.getAllTasksWithStatus();
        console.log('API response received:', response);
        
        if (response.data && response.data.success) {
          this.teamResultsData = response.data.data;
          console.log('Team data loaded:', this.teamResultsData);
          
          this.$nextTick(() => {
            console.log('Rendering chart in nextTick');
            this.renderTeamLineChart();
          });
        }
      } catch (error) {
        console.error('Failed to load team results:', error);
        if (error.response && error.response.status === 400) {
          console.error('Authentication error - invalid token format');
        }
      }
    },
    renderTeamLineChart() {
      console.log('Starting to render chart');
      if (!this.teamResultsData) {
        console.log('No team data available');
        return;
      }

      const ctx = this.$refs.teamLineChart?.getContext('2d');
      if (!ctx) {
        console.log('Canvas context not found');
        return;
      }

      if (this.teamLineChart) {
        this.teamLineChart.destroy();
      }

      console.log('Preparing chart data');
      const data = this.processChartData(this.teamResultsData[this.teamStatusFilter]);
      console.log('Processed chart data:', data);

      this.teamLineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['论文', '竞赛', '项目'],
          datasets: [
            {
              label: 'A类',
              data: data.A,
              borderColor: '#FF6384',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              tension: 0.1
            },
            {
              label: 'B类',
              data: data.B,
              borderColor: '#36A2EB',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              tension: 0.1
            },
            {
              label: 'C类',
              data: data.C,
              borderColor: '#FFCE56',
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              tension: 0.1
            },
            {
              label: 'D类',
              data: data.D,
              borderColor: '#4BC0C0',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: '任务数量'
              }
            }
          }
        }
      });
    },
    processChartData(tasks) {
      const data = {
        A: [0, 0, 0], // 论文、竞赛、项目
        B: [0, 0, 0],
        C: [0, 0, 0],
        D: [0, 0, 0]
      };

      if (!tasks || !Array.isArray(tasks)) {
        console.log('No tasks data or invalid format');
        return data;
      }

      console.log('Processing tasks:', tasks);

      tasks.forEach(task => {
        const typeIndex = {
          'thesis': 0,
          'competition': 1,
          'project': 2
        }[task.taskType];

        if (typeIndex !== undefined && task.level) {
          data[task.level][typeIndex]++;
        }
      });

      console.log('Processed data:', data);
      return data;
    },
    async loadPersonalResultsData() {
      if (!this.userData || !this.userData.id) {
        console.error('No user data available');
        this.personalResultsError = '用户数据不可用';
        return;
      }

      try {
        this.isLoadingPersonalResults = true;
        this.personalResultsError = null;

        const response = await apiService.getPersonalTaskStats({
          ownerId: this.userData.id,
          ownerType: 'teacher'
        });
        
        // 确保响应成功并且有数据
        if (response.data && response.data.success) {
          this.personalResultsData = response.data.data;
          await this.$nextTick();  // 等待DOM更新
          this.updatePersonalResultsChart();
        } else {
          throw new Error('获取数据失败');
        }
      } catch (error) {
        console.error('加载个人成果数据失败:', error);
        this.personalResultsError = '加载数据失败，请稍后重试';
      } finally {
        this.isLoadingPersonalResults = false;
      }
    },
    updatePersonalResultsChart() {
      // 检查canvas元素是否存在
      const canvas = this.$refs.personalResultsChart;
      if (!canvas) {
        console.error('Canvas element not found');
        return;
      }

      // 销毁旧的图表实例
      if (this.personalResultsChart) {
        this.personalResultsChart.destroy();
      }

      // 获取当前类型的数据
      const currentTypeData = this.personalResultsData[this.personalTypeTab];
      if (!currentTypeData) {
        console.error('No data found for type:', this.personalTypeTab);
        return;
      }

      // 准备数据
      const labels = ['A类', 'B类', 'C类', 'D类'];
      const completedData = [];
      const notCompletedData = [];

      // 处理数据
      labels.forEach(level => {
        const levelKey = level.replace('类', '');
        const levelData = currentTypeData[levelKey] || { completed: 0, not_completed: 0 };
        completedData.push(levelData.completed);
        notCompletedData.push(levelData.not_completed);
      });

      // 创建新的图表
      const ctx = canvas.getContext('2d');
      this.personalResultsChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: '已完成',
              data: completedData,
              borderColor: '#52c41a',
              backgroundColor: 'rgba(82, 196, 26, 0.1)',
              tension: 0.4,
              fill: true
            },
            {
              label: '未完成',
              data: notCompletedData,
              borderColor: '#f5222d',
              backgroundColor: 'rgba(245, 34, 45, 0.1)',
              tension: 0.4,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 20
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                title: (tooltipItems) => {
                  return tooltipItems[0].label;
                },
                label: (context) => {
                  const label = context.dataset.label;
                  const value = context.parsed.y;
                  return `${label}: ${value}`;
                },
                footer: (tooltipItems) => {
                  const level = tooltipItems[0].label.replace('类', '');
                  const typeData = this.personalResultsData[this.personalTypeTab];
                  if (typeData && typeData[level]) {
                    const levelData = typeData[level];
                    const total = levelData.completed + levelData.not_completed;
                    return `总任务数: ${total}`;
                  }
                  return '';
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    },
    toggleResultsMenu() {
      this.isResultsMenuOpen = !this.isResultsMenuOpen;
      if (this.isResultsMenuOpen && this.activeMenu === 'results-team') {
        this.loadTeamResultsData();
      }
    },
  },
  created() {
    // 获取用户数据
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    // 初始化加载团队方向列表
    this.loadAllDirections();
    
    // 初始加载我的方向列表
    this.loadMyDirections();
    
    // 初始化加载设备列表
    this.loadDevices();
    
    // 初始化加载消息列表
    this.loadMessages();

    // 确保Chart.js在组件挂载时就初始化，以便后续快速渲染图表
    console.log('TeacherHomePage组件已挂载，Chart.js已加载');
    
    // 添加窗口大小变化监听，以便在窗口大小变化时重新渲染图表
    window.addEventListener('resize', this.handleResize);
  },
  watch: {
    // 监听模态框显示状态，当显示时初始化编辑数据
    showEditModal(newVal) {
      if (newVal) {
        this.editedUserData = JSON.parse(JSON.stringify(this.userData));
        this.updateMessage = '';
      }
    },
    // 监听设备表单显示状态，当关闭时重置表单
    showAddDeviceForm(newVal) {
      if (!newVal) {
        if (!this.isEditingDevice) {
          // 重置新设备表单
          this.newDevice = {
            name: '',
            address: '',
            teacherId: this.userData.id || ''
          };
        }
        // 重置错误信息
        this.deviceFormError = null;
      }
    },
    // 监听当前方向ID变化
    currentDirectionId(newId, oldId) {
      if (newId && newId !== oldId) {
        // 已经在 viewDirectionDetail 中加载了方向详情
      }
    },
    // 监听成果视图变化
    achievementView(newView, oldView) {
      this.watchAchievementView(newView, oldView);
    },
    resultsActiveTab(newVal) {
      if (newVal === 'team') this.loadTeamResultsData();
      else this.loadPersonalResultsData();
    },
    teamStatusFilter() { this.renderTeamLineChart(); },
    teamTypeTab() { this.renderTeamLineChart(); },
    personalTypeTab() { this.updatePersonalResultsChart(); }
  },
  mounted() {
    if (this.resultsActiveTab === 'team') this.loadTeamResultsData();
    else this.loadPersonalResultsData();
  },
  beforeDestroy() {
    // 移除窗口大小变化监听
    window.removeEventListener('resize', this.handleResize);
    
    // 如果存在图表实例，销毁它以避免内存泄漏
    if (this.taskStatsChart instanceof Chart) {
      this.taskStatsChart.destroy();
    }
    
    // 清理新增的图表实例
    if (this.thesisChart instanceof Chart) {
      this.thesisChart.destroy();
    }
    
    if (this.projectChart instanceof Chart) {
      this.projectChart.destroy();
    }
    
    if (this.competitionChart instanceof Chart) {
      this.competitionChart.destroy();
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
}

.dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

/* 内容区域样式 */
.content {
  flex: 1;
  padding: 20px;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.profile-panel {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.profile-header h2 {
  font-size: 18px;
  font-weight: 500;
}

.edit-button {
  padding: 6px 12px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.profile-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.profile-item {
  width: calc(50% - 5px);
}

.profile-item label {
  display: block;
  margin-bottom: 4px;
}

.profile-item div {
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

/* 编辑模态框 */
.modal-overlay {
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

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.75);
}

.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s;
}

.form-control:focus {
  border-color: #40a9ff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

textarea.form-control {
  resize: vertical;
  min-height: 80px;
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
  font-size: 14px;
}

.save-btn {
  padding: 8px 16px;
  background-color: #52c41a;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 14px;
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

/* 修改团队信息页面样式 */
.team-panel {
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

/* 调整标签导航样式 */
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

/* 添加小徽章样式，显示待审批数量 */
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

/* 内容区域 */
.tab-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 修改为hidden以防止内容溢出 */
}

/* 标签页面板 */
.tab-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 修改为hidden以确保内容在面板内 */
}

/* 表格区域样式 */
.team-section {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

/* 教师表格区域 */
.team-section:first-child {
  flex: 0 0 auto;
  margin-bottom: 18px;
}

/* 教师表格包装器 */
.team-section:first-child .table-wrapper {
  height: 148px;
  overflow-y: auto;
  overflow-x: auto;
}

/* 学生表格区域 */
.team-section:nth-child(2) {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 120px; /* 减小最小高度 */
}

/* 学生表格包装器 - 调整高度使其更合适 */
.tab-panel .team-section:nth-child(2) .table-wrapper {
  height: 200px !important; /* 减小高度 */
  min-height: 120px; /* 减小最小高度 */
  max-height: 40vh; /* 降低最大高度比例 */
  overflow-y: auto !important;
  overflow-x: auto;
  display: block !important;
  position: relative;
  z-index: 1;
}

/* 审批表格样式 */
.approval-section .table-wrapper {
  height: 250px; /* 减小高度 */
  overflow-y: auto;
  overflow-x: auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.refresh-button {
  padding: 6px 12px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.team-table {
  width: 100%;
  border-collapse: separate; /* 改为separate以支持固定表头 */
  border-spacing: 0; /* 确保单元格之间没有间隙 */
}

.team-table th,
.team-table td {
  padding: 12px 8px;
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid #e8e8e8; /* 添加底部边框增强可读性 */
}

.team-table th {
  background-color: #f5f5f5;
  position: sticky; /* 使表头固定 */
  top: 0;  /* 固定在容器顶部 */
  z-index: 5; /* 确保表头位于内容之上 */
  box-shadow: 0 1px 2px rgba(0,0,0,0.1); /* 添加阴影分隔表头和内容 */
}

/* 确保每列宽度保持一致 */
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

/* 行悬停效果 */
.table-wrapper .team-table tbody tr:hover {
  background-color: #f5f5f5;
}

/* 奇数行背景色 */
.table-wrapper .team-table tbody tr:nth-child(odd) {
  background-color: #fafafa;
}

/* 表格容器基础样式 */
.table-wrapper {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  background-color: #fff;
  position: relative;
  margin-bottom: 15px; /* 增加底部间距 */
  box-shadow: 0 1px 3px rgba(0,0,0,0.05); /* 添加轻微阴影增强立体感 */
}

.empty-approvals {
  text-align: center;
  padding: 20px;
  color: #999;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.notice-icon {
  font-size: 24px;
  margin-bottom: 10px;
}

.action-buttons {
  text-align: center;
  white-space: nowrap;
}

.approve-button,
.reject-button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  margin-right: 5px;
  color: white;
}

.approve-button {
  background-color: #52c41a;
}

.reject-button {
  background-color: #f5222d;
}

.loading-indicator,
.error-message {
  padding: 20px;
  text-align: center;
}

.empty-content {
  text-align: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

/* 消息管理样式 */
.message-panel {
  width: 100%;
  height: calc(100vh - 100px);
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.panel-header h2 {
  margin: 0;
  color: #333;
}

.publish-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.publish-btn:hover {
  background-color: #45a049;
}

.message-tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.message-tab {
  padding: 10px 20px;
  cursor: pointer;
  color: #666;
  font-weight: 500;
}

.message-tab.active {
  color: #3f51b5;
  border-bottom: 2px solid #3f51b5;
}

.message-list-container {
  flex: 1;
  overflow-y: auto;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.message-title {
  font-weight: bold;
  color: #333;
  font-size: 16px;
}

.message-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.priority-tag {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: white;
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
}

.message-footer {
  display: flex;
  justify-content: space-between;
  color: #777;
  font-size: 13px;
}

.empty-message {
  text-align: center;
  padding: 40px 20px;
  color: #8c8c8c;
  font-size: 15px;
  background-color: #fafafa;
  border-radius: 6px;
  border: 1px dashed #d9d9d9;
  margin: 10px 0;
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

.message-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  padding: 16px;
  transition: box-shadow 0.3s;
}

.message-item:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.message-title {
  font-weight: 500;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
}

.message-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.priority-tag {
  padding: 2px 8px;
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
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
}

.message-content {
  margin-bottom: 12px;
  color: rgba(0, 0, 0, 0.65);
  line-height: 1.5;
  white-space: pre-line;
}

.message-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #666;
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

.form-text {
  color: #888;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.publish-form .form-group input,
.publish-form .form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.publish-form .form-group input:focus,
.publish-form .form-group textarea:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.publish-form .error-message {
  margin-top: 12px;
  padding: 8px 12px;
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 4px;
  color: #f5222d;
  text-align: center;
}

/* 添加调试信息样式 */
.debug-info {
  font-size: 9px;
  opacity: 0.6;
  margin-left: 2px;
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
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.device-tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.device-tab {
  padding: 10px 20px;
  cursor: pointer;
  color: #666;
  font-weight: 500;
  position: relative;
}

.device-tab.active {
  color: #3f51b5;
  border-bottom: 2px solid #3f51b5;
}

.device-tab:hover {
  color: #3f51b5;
}

.device-list-container {
  flex: 1;
  overflow-y: auto;
  padding-right: 6px;
}

.device-table-wrapper {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: hidden;
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

.borrow-btn, .edit-btn, .delete-btn, .return-btn {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  border: none;
  color: white;
}

.borrow-btn {
  background-color: #1890ff;
}

.borrow-btn:hover {
  background-color: #40a9ff;
}

.edit-btn {
  background-color: #52c41a;
}

.edit-btn:hover {
  background-color: #73d13d;
}

.delete-btn {
  background-color: #ff4d4f;
}

.delete-btn:hover {
  background-color: #ff7875;
}

.return-btn {
  background-color: #faad14;
}

.return-btn:hover {
  background-color: #ffc53d;
}

.status-badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: white;
  white-space: nowrap;
  display: inline-block;
}

.completed {
  background-color: #52c41a;
}

.in-progress {
  background-color: #faad14;
}

.add-device-btn {
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
}

.add-device-btn:hover {
  background-color: #40a9ff;
}

.device-form {
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

/* 剩余的CSS样式已经存在于代码中，如form-header, form-body等 */

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
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.direction-tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.direction-tab {
  padding: 10px 20px;
  cursor: pointer;
  color: #666;
  font-weight: 500;
  position: relative;
}

.direction-tab.active {
  color: #3f51b5;
  border-bottom: 2px solid #3f51b5;
}

.direction-tab:hover {
  color: #3f51b5;
}

.direction-list-container {
  flex: 1;
  overflow-y: auto;
  padding-right: 6px;
}

.direction-table-wrapper {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: hidden;
}

.direction-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.direction-table th,
.direction-table td {
  padding: 12px 8px;
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid #e8e8e8;
}

.direction-table th {
  background-color: #f5f5f5;
  position: sticky;
  top: 0;
  z-index: 5;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.direction-table tbody tr:hover {
  background-color: #f5f5f5;
}

.direction-table tbody tr:nth-child(odd) {
  background-color: #fafafa;
}

.list-title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
}

.submenu {
  display: none;
  padding-left: 20px;
}

.submenu-item {
  padding: 10px 0;
  cursor: pointer;
  transition: all 0.3s;
}

.submenu-item.active {
  color: #1890ff;
  border-left: 3px solid #1890ff;
}

.submenu-item:hover {
  color: #1890ff;
}

.submenu-icon {
  float: right;
  transition: transform 0.3s;
}

.rotated {
  transform: rotate(90deg);
}

/* 添加CSS样式来支持子菜单 */
.nav-item.has-submenu {
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 0;
}

.nav-item-content {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
}

.submenu-icon {
  position: absolute;
  right: 0;
  font-size: 10px;
  transition: transform 0.3s;
}

.rotated {
  transform: rotate(180deg);
}

.submenu {
  display: block;
  padding-left: 28px;
  width: 100%;
}

.submenu-item {
  padding: 10px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  color: #ddd;
}

.submenu-item.active {
  color: #1890ff;
}

.submenu-item:hover {
  color: #1890ff;
  background-color: #333;
}

/* 添加以下样式 */
/* 方向页面操作按钮样式 */
.action-bar {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  border: 1px solid #d9d9d9;
  background-color: white;
}

.action-btn.primary {
  background-color: #1890ff;
  color: white;
  border-color: #1890ff;
}

.action-btn:hover {
  opacity: 0.8;
}

.btn-icon {
  margin-right: 6px;
  font-size: 18px;
}

/* 方向人员审批样式 */
.tab-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.tab-panel {
  flex: 1;
  overflow-y: auto;
  padding: 0 6px 6px 0;
}

.tab-item {
  padding: 10px 20px;
  cursor: pointer;
  color: #666;
  font-weight: 500;
  position: relative;
  display: inline-flex;
  align-items: center;
}

.tab-item.active {
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
}

.tab-item:hover {
  color: #1890ff;
}

.badge {
  background-color: #ff4d4f;
  color: white;
  font-size: 12px;
  font-weight: bold;
  border-radius: 10px;
  padding: 2px 6px;
  margin-left: 5px;
  min-width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* 操作按钮样式 */
.action-buttons {
  display: flex;
  gap: 8px;
}

.view-btn, .approve-btn, .reject-btn, .delete-btn {
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  border: 1px solid #d9d9d9;
  transition: all 0.3s;
  background-color: white;
}

.view-btn {
  color: #1890ff;
  border-color: #1890ff;
}

.approve-btn {
  color: #52c41a;
  border-color: #52c41a;
}

.reject-btn {
  color: #ff4d4f;
  border-color: #ff4d4f;
}

.delete-btn {
  color: #ff4d4f;
  border-color: #ff4d4f;
}

.view-btn:hover, .approve-btn:hover, .reject-btn:hover, .delete-btn:hover {
  opacity: 0.8;
}

/* 模态框样式 */
.modal-overlay {
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

.modal-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 500px;
  padding: 0;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.confirmation-modal {
  max-width: 400px;
}

.modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
}

.close-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.45);
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  max-height: calc(90vh - 108px);
}

.modal-footer {
  padding: 10px 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #40a9ff;
  outline: 0;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.cancel-btn,
.submit-btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.cancel-btn {
  background-color: white;
  border: 1px solid #d9d9d9;
  color: rgba(0, 0, 0, 0.65);
}

.submit-btn {
  background-color: #1890ff;
  color: white;
  border: 1px solid #1890ff;
}

.cancel-btn:hover,
.submit-btn:hover {
  opacity: 0.8;
}

.submit-btn:disabled {
  background-color: #f5f5f5;
  border-color: #d9d9d9;
  color: rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
}

/* 添加下面的新样式到<style>部分 */
.approval-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.approval-table {
  border: 1px solid #ddd;
  border-radius: 4px;
}

.approval-table th {
  background-color: #f7f7f7;
  padding: 12px 8px;
  text-align: center;
  font-weight: 500;
}

.approval-table td {
  padding: 12px 8px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.applications-list {
  padding: 20px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.approve-btn, .reject-btn {
  padding: 6px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}

.approve-btn {
  background-color: #52c41a;
  color: white;
  border-color: #52c41a;
}

.reject-btn {
  background-color: #ff4d4f;
  color: white;
  border-color: #ff4d4f;
}

.direction-detail-modal {
  max-width: 800px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden; /* 防止模态框本身滚动 */
  display: flex;
  flex-direction: column;
}

.modal-content .modal-header {
  flex-shrink: 0; /* 防止标题栏被压缩 */
  border-bottom: 1px solid #f0f0f0;
  padding: 16px 24px;
}

.modal-content .modal-body {
  flex: 1;
  overflow: hidden; /* 防止模态框主体滚动 */
  display: flex;
  flex-direction: column;
}

.direction-detail-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 确保只有panel部分滚动 */
}

/* 标签栏样式 */
.detail-tabs {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 0;
  padding: 0 15px;
  flex-shrink: 0; /* 防止标签栏被压缩 */
  background-color: #fff;
}

/* 重新定义内容区样式 */
.detail-panel {
  padding: 15px;
  overflow-y: auto !important; /* 强制显示滚动条 */
  height: calc(100% - 44px); /* 减去标签栏高度 */
  flex: 1;
}

.info-card {
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
  transition: all 0.3s ease;
  width: 100%; /* 确保卡片充满宽度 */
  box-sizing: border-box; /* 包含padding在内的宽度计算 */
}

.info-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card-title {
  margin-top: 0;
  margin-bottom: 16px;
  color: #333;
  font-weight: 500;
  font-size: 16px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
}

.card-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 16px;
  background-color: #1890ff;
  margin-right: 8px;
  border-radius: 2px;
}

.description {
  color: #333;
  font-size: 14px;
  line-height: 1.8;
  white-space: pre-line;
  padding: 5px 0;
}

.empty-message {
  text-align: center;
  padding: 30px;
  color: #8c8c8c;
  font-size: 14px;
}

.members-list-table-wrapper {
  max-height: 200px;
  overflow-y: auto;
}

.contact-info {
  display: flex;
  flex-direction: column;
}

.members-table {
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
}

.members-table th,
.members-table td {
  padding: 8px 12px;
  text-align: left;
  font-size: 13px;
  border-bottom: 1px solid #f0f0f0;
}

.members-table th {
  background-color: #fafafa;
  font-weight: 500;
  color: #333;
}

.members-table tr:hover {
  background-color: #f9f9f9;
}

.members-list-table-wrapper {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  margin-top: 10px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #666;
  line-height: 1.5;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  color: #8c8c8c;
  font-size: 13px;
  margin-bottom: 4px;
}

.info-value {
  color: #333;
  font-size: 14px;
}

/* 添加模态框内容体样式 */
.modal-content .modal-body {
  flex: 1;
  overflow: hidden; /* 防止模态框主体滚动 */
  position: relative;
  display: flex;
  flex-direction: column;
}

.direction-detail-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 确保只有panel部分滚动 */
}

.modal-content .modal-header {
  flex-shrink: 0; /* 防止标题栏被压缩 */
}

/* 滚动条样式美化 */
.detail-panel::-webkit-scrollbar {
  width: 6px;
}

.detail-panel::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.detail-panel::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.detail-panel::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 恢复标签页样式 */
.detail-tab {
  padding: 12px 20px;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  transition: all 0.3s ease;
  position: relative;
}

.detail-tab:hover {
  color: #1890ff;
}

.detail-tab.active {
  color: #1890ff;
}

.detail-tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #1890ff;
}

/* 恢复direction-info样式 */
.direction-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 15px;
  min-height: min-content; /* 允许内容自然增长 */
}

.task-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.task-header h4 {
  font-size: 18px;
  font-weight: 500;
}

.new-task-btn {
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.task-table-wrapper {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: hidden;
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

.task-table tbody tr:hover {
  background-color: #f5f5f5;
}

.task-table tbody tr:nth-child(odd) {
  background-color: #fafafa;
}

.form-error {
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.form-group.half-width {
  width: 48%;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
  width: 100%;
}

.task-form-modal {
  max-width: 600px;
  width: 90%;
}

.submit-btn {
  padding: 8px 16px;
  background-color: #52c41a;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.submit-btn:disabled {
  background-color: #b7eb8f;
  cursor: not-allowed;
}

.task-detail-modal {
  max-width: 800px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden; /* 防止模态框本身滚动 */
  display: flex;
  flex-direction: column;
}

.modal-content .modal-header {
  flex-shrink: 0; /* 防止标题栏被压缩 */
  border-bottom: 1px solid #f0f0f0;
  padding: 16px 24px;
}

.modal-content .modal-body {
  flex: 1;
  overflow: hidden; /* 防止模态框主体滚动 */
  display: flex;
  flex-direction: column;
}

.task-detail-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 确保只有panel部分滚动 */
}

/* 标签栏样式 */
.task-tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 20px;
  padding: 0 15px;
  flex-shrink: 0; /* 防止标签栏被压缩 */
  background-color: #fff;
}

.tabs-container {
  display: flex;
  gap: 30px; /* 增加标签间距 */
}

.task-tab {
  padding: 12px 16px;
  cursor: pointer;
  color: #666;
  font-weight: 500;
  transition: all 0.3s;
  border-bottom: 3px solid transparent;
  position: relative;
}

.task-tab.active {
  color: #1890ff;
  border-bottom: 3px solid #1890ff;
  font-weight: 600;
}

.task-tab:hover {
  color: #40a9ff;
}

.task-actions {
  display: flex;
  gap: 10px;
  margin-left: auto; /* 确保按钮靠右 */
}

.edit-task-btn {
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(24, 144, 255, 0.2);
}

.task-progress-panel {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  height: 100%;
  overflow-y: auto;
}

.empty-message {
  text-align: center;
  padding: 30px;
  color: #8c8c8c;
  font-size: 14px;
}

.edit-task-btn {
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.edit-task-btn:hover {
  background-color: #40a9ff;
}

.isUpdatingTask {
  background-color: #ff4d4f;
  cursor: not-allowed;
}

/* 重新定义内容区样式 */
.task-detail-panel {
  padding: 15px;
  overflow-y: auto !important; /* 强制显示滚动条 */
  height: calc(100% - 64px); /* 减去标签栏高度 */
  flex: 1;
}

.info-card {
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
  transition: all 0.3s ease;
  width: 100%; /* 确保卡片充满宽度 */
  box-sizing: border-box; /* 包含padding在内的宽度计算 */
  margin-bottom: 20px;
}

.info-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card-title {
  margin-top: 0;
  margin-bottom: 16px;
  color: #333;
  font-weight: 500;
  font-size: 16px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
}

.card-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 16px;
  background-color: #1890ff;
  margin-right: 8px;
  border-radius: 2px;
}

.description {
  color: #333;
  font-size: 14px;
  line-height: 1.8;
  white-space: pre-line;
  padding: 5px 0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  color: #8c8c8c;
  font-size: 13px;
  margin-bottom: 4px;
}

.info-value {
  color: #333;
  font-size: 14px;
}

.task-progress-panel {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  height: 100%;
  overflow-y: auto;
}

.empty-message {
  text-align: center;
  padding: 30px;
  color: #8c8c8c;
  font-size: 14px;
}

.progress-actions {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.add-progress-btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  border: 1px solid #d9d9d9;
  background-color: white;
}

.add-progress-btn:hover {
  opacity: 0.8;
}

.btn-icon {
  margin-right: 6px;
  font-size: 18px;
}

.progress-timeline {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.progress-item {
  padding: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  margin-bottom: 16px;
  transition: all 0.3s;
}

.progress-item:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.09);
}

.progress-title {
  font-weight: 600;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  margin: 0;
  padding-right: 12px;
  flex: 1;
}

.progress-content {
  margin-bottom: 16px;
  color: rgba(0, 0, 0, 0.75);
  line-height: 1.6;
  white-space: pre-line;
  font-size: 14px;
}

.progress-result {
  margin-top: 8px;
  padding: 8px 12px;
  background-color: #f6f6f6;
  border-radius: 4px;
  font-size: 14px;
}

.progress-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.download-btn, .delete-progress-btn {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  border: none;
  color: white;
  transition: background-color 0.3s;
}

.download-btn {
  background-color: #1890ff;
}

.download-btn:hover {
  background-color: #40a9ff;
}

.delete-progress-btn {
  background-color: #ff4d4f;
}

.delete-progress-btn:hover {
  background-color: #ff7875;
}

.progress-form-modal {
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.progress-form-modal .modal-body {
  overflow-y: auto;
  padding: 20px;
  flex: 1;
}

.progress-form-modal .modal-header {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
  border-bottom: 1px solid #eee;
  padding: 15px 20px;
}

.progress-form-modal form {
  display: flex;
  flex-direction: column;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  padding: 10px 0;
  border-top: 1px solid #eee;
  background-color: white;
}

.form-actions .cancel-btn {
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
}

.form-actions .submit-btn {
  padding: 8px 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.progress-form-modal {
  max-width: 600px;
  width: 90%;
  max-height: 80vh; /* 稍微减少高度确保在较小屏幕上也能完全显示 */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 防止内容溢出 */
}

.progress-form-modal .modal-body {
  overflow-y: auto;
  padding: 20px;
  flex: 1;
  max-height: calc(80vh - 130px); /* 减去头部和底部的高度 */
}

.progress-form-modal .modal-footer {
  border-top: 1px solid #eee;
  padding: 15px 20px;
  background-color: #f9f9f9;
  border-radius: 0 0 8px 8px;
}

/* 恢复基础表单样式 */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
}

.form-control:focus {
  border-color: #40a9ff;
  outline: 0;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.form-control-file {
  display: block;
  width: 100%;
}

.selected-file-info {
  margin-top: 8px;
  padding: 8px;
  background-color: #f6f6f6;
  border-radius: 4px;
  font-size: 12px;
}

.form-error {
  margin-top: 8px;
  color: #ff4d4f;
  font-size: 12px;
}

.form-text {
  margin-top: 4px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
}

.file-attachment {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  color: #333;
  background-color: #f0f0f0;
  border: 1px solid #e0e0e0;
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-icon {
  margin-right: 4px;
  font-size: 14px;
  color: #1890ff;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px dashed #f0f0f0;
}

.progress-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.file-actions {
  display: flex;
  gap: 8px;
}

.download-btn {
  padding: 2px 8px;
  font-size: 12px;
  color: #1890ff;
  background-color: transparent;
  border: 1px solid #1890ff;
  border-radius: 4px;
  cursor: pointer;
}

.download-btn:hover {
  background-color: #e6f7ff;
}

.delete-file-btn {
  padding: 2px 8px;
  font-size: 12px;
  color: #ff4d4f;
  background-color: transparent;
  border: 1px solid #ff4d4f;
  border-radius: 4px;
  cursor: pointer;
}

.delete-file-btn:hover {
  background-color: #fff1f0;
}

.achievements-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  padding: 15px;
  height: 100%;
  overflow: hidden;
}

.achievements-tabs {
  display: flex;
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 20px;
  background-color: #fafafa;
  border-radius: 6px;
  overflow: hidden;
}

.achievement-tab {
  padding: 12px 20px;
  cursor: pointer;
  color: #666;
  font-weight: 500;
  position: relative;
  flex: 1;
  text-align: center;
  transition: all 0.3s ease;
}

.achievement-tab.active {
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
  background-color: #e6f7ff;
}

.achievement-tab:hover {
  color: #40a9ff;
  background-color: #f0f5ff;
}

.achievement-list-container {
  flex: 1;
  overflow-y: auto;
  padding: 5px 0 15px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 15px;
}

.task-item {
  padding: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  transition: all 0.3s;
}

.task-item:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.09);
  transform: translateY(-2px);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.task-name {
  font-weight: 600;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  margin: 0;
}

.task-badges {
  display: flex;
  gap: 10px;
}

.level-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: white;
  white-space: nowrap;
  background-color: #1890ff;
  font-weight: 500;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: white;
  white-space: nowrap;
}

.status-badge.completed {
  background-color: #52c41a;
}

.status-badge.in-progress {
  background-color: #faad14;
}

.task-progress {
  margin-top: 12px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  margin-bottom: 6px;
}

.progress-bar-container {
  width: 100%;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #4CAF50;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.chart-container {
  position: relative;
  height: 400px;
  width: 100%;
  margin: 0 auto 30px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
}

.chart-title {
  text-align: center;
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.chart-description {
  text-align: center;
  margin-bottom: 15px;
  font-size: 14px;
  color: #666;
}

/* 确保canvas占据剩余高度 */
.chart-container canvas {
  flex: 1;
  min-height: 300px;
}

.results-panel {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  overflow: hidden;
}

.results-tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.results-tab {
  padding: 10px 20px;
  cursor: pointer;
  color: #666;
  font-weight: 500;
  position: relative;
  flex: 1;
  text-align: center;
  transition: all 0.3s ease;
}

.results-tab.active {
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
  background-color: #e6f7ff;
}

.results-tab:hover {
  color: #40a9ff;
  background-color: #f0f5ff;
}

.team-results-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.status-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.status-filter button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.status-filter button.active {
  background-color: #1890ff;
  color: white;
}

.team-line-chart-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.team-type-tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.team-type-tabs button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.team-type-tabs button.active {
  background-color: #1890ff;
  color: white;
}

.personal-results-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.personal-type-tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.personal-type-tabs button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.personal-type-tabs button.active {
  background-color: #1890ff;
  color: white;
}

.personal-type-tabs button:hover {
  color: #40a9ff;
}

.chart-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  color: #666;
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

.error-message {
  padding: 20px;
  text-align: center;
}

.chart-container canvas {
  max-height: 300px;
}

.type-tab {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.type-tab.active {
  background-color: #1890ff;
  color: white;
}

.type-tab:hover {
  color: #40a9ff;
}

.personal-results-panel {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  overflow: hidden;
}

.personal-results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.personal-results-header h2 {
  font-size: 18px;
  font-weight: 500;
}

.personal-type-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.personal-type-tabs button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  background-color: #f0f0f0;
}

.personal-type-tabs button.active {
  background-color: #1890ff;
  color: white;
}

.personal-type-tabs button:hover {
  opacity: 0.8;
}

.chart-container {
  flex: 1;
  position: relative;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1890ff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  color: #ff4d4f;
  text-align: center;
  padding: 20px;
}
</style>


