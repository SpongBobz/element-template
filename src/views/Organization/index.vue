<template>
  <div class="organization">
    <div class="left">
      <div class="org-title">组织机构</div>
      <div class="org-tree" v-loading="treeLoading">
        <el-input
          size="small"
          clearable
          placeholder="输入部门名称进行过滤"
          style="margin-bottom: 5px;"
          v-model="filterText"
        >
        </el-input>
        <el-tree
          class="cus-tree"
          :data="treeData"
          :props="defaultProps"
          highlight-current
          @node-click="nodeClick"
          :expand-on-click-node="false"
          default-expand-all
          :filter-node-method="filterNode"
          ref="tree"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>
              <span class="tree-icon">
                <icon-font :type="node.level > 1 ? 'organization' : 'jg'" />
              </span>
              <span
                class="org-name"
                :style="{ width: 148 - (node.level - 1) * 18 + 'px' }"
                :title="node.label"
                >{{ node.label }}</span
              >
            </span>
            <span class="bun-goup">
              <el-button
                type="text"
                icon="el-icon-edit"
                @click.stop.prevent="editOrg(data, node)"
              >
              </el-button>
              <el-popconfirm
                v-if="!data.ChildOrg || !data.ChildOrg.length"
                :title="`是否确认删除 ${data.DisplayName} ？`"
                @confirm="delOrg(data)"
              >
                <el-button
                  slot="reference"
                  @click.stop.prevent
                  type="text"
                  icon="el-icon-delete"
                >
                </el-button>
              </el-popconfirm>
            </span>
          </span>
        </el-tree>
      </div>
      <el-button icon="el-icon-plus" type="primary" @click="addOrg"
        >新建部门</el-button
      >
    </div>
    <div class="right">
      <el-form
        class="query-form"
        :model="queryForm"
        label-suffix=":"
        size="small"
        inline
      >
        <el-form-item label="关键字">
          <el-input v-model="queryForm.key" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryBtn">查询</el-button>
          <el-button class="reset" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <Com-Table
        :columns="columns"
        :dataSource="tableData"
        :options="options"
        :fetch="getTabData"
        :pagination="pagination"
        :pageSizes="pageSizes"
        style="height: calc(100% - 62px);"
      >
        <template slot="func" slot-scope="scoped">
          <el-button
            size="mini"
            @click.stop.prevent="editUser(scoped.row)"
            type="success"
            icon="el-icon-edit"
            style="margin-right: 5px"
            >编辑</el-button
          >
          <el-popconfirm
            :title="`是否确认删除用户 ${scoped.row.Name} ？`"
            @confirm="delUser(scoped.row)"
            ><el-button
              slot="reference"
              @click.stop.prevent
              size="mini"
              type="danger"
              icon="el-icon-delete"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </Com-Table>
    </div>
    <SaveOrgDialog @change="getOrganization" ref="saveOrgDialog" />
    <SaveUserDialog @change="getTabData" ref="userDialog" />
  </div>
</template>
<script>
import { getListTree, deleteOrg } from "@/api/organization.js";
import { getUserListByOrgID, deleteUser } from "@/api/user.js";
import SaveOrgDialog from "./components/saveOrgDialog";
import { formatDate } from "@/util";
import SaveUserDialog from "@/views/User/components/SaveUserDialog";
export default {
  components: {
    SaveOrgDialog,
    SaveUserDialog
  },
  data() {
    return {
      filterText: "",
      treeData: [],
      defaultProps: {
        children: "ChildOrg",
        label: "DisplayName"
      },
      columns: [
        {
          prop: "Name",
          label: "姓名"
        },
        {
          prop: "OrgDisplayName",
          label: "所属(机构/部门)"
        },
        {
          prop: "JobPost",
          label: "职务"
        },
        {
          prop: "PhoneNumber",
          label: "电话"
        },
        {
          prop: "EmailAddress",
          label: "邮箱",
          width: 220
        },
        {
          prop: "UserName",
          label: "登录账号"
        },
        {
          label: "创建时间",
          render: row => {
            return <span>{formatDate(row.CreationTime)}</span>;
          }
        },
        {
          prop: "func",
          label: "操作",
          width: 200
        }
      ],
      queryForm: {
        key: ""
      },
      tableData: [],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 15
      },
      pageSizes: [10, 15, 30, 40, 60],
      treeLoading: false,
      options: {
        height: "calc(100% - 62px)",
        mutiSelect: false,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: false // 是否一挂载就加载数据
        // border: true,
      },
      currntId: null
    };
  },
  watch: {
    filterText(val) {
      console.log(val);
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.getOrganization();
  },
  methods: {
    addOrg() {
      this.$refs.saveOrgDialog.open();
    },
    editOrg(data, node) {
      console.log(node);
      this.$refs.saveOrgDialog.open(data);
    },
    delOrg(data) {
      deleteOrg(data.Id).then(res => {
        if (res.Success) {
          this.$message.success("删除成功！");
          this.getOrganization();
        }
      });
    },
    editUser(data) {
      this.$refs.userDialog.open(data);
    },
    delUser(data) {
      deleteUser(data.Id).then(res => {
        if (res.Success) {
          this.$message.success("删除成功！");
          this.getTabData();
        }
      });
    },
    getTabData() {
      this.options.loading = true;
      let parms = {
        id: this.currntId,
        name: this.queryForm.key,
        pageIndex: this.pagination.pageIndex,
        pagesize: this.pagination.pageSize
      };
      getUserListByOrgID(parms).then(res => {
        this.tableData = res.Data.Data;
        this.pagination.total = res.Data.PageInfo.Count;
        this.options.loading = false;
      });
    },
    nodeClick(data) {
      this.currntId = data.Id;
      this.queryBtn();
    },
    queryBtn() {
      this.pagination.pageIndex = 1;
      this.getTabData();
    },
    reset() {
      this.queryForm = {
        key: ""
      };
      this.pagination = {
        total: 0,
        pageIndex: 1,
        pageSize: 15
      };
      this.getTabData();
    },
    getOrganization() {
      this.treeLoading = true;
      getListTree().then(res => {
        this.treeData = res.Data;
        this.currntId = this.treeData[0].Id;
        this.getTabData();
        this.treeLoading = false;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.DisplayName.indexOf(value) !== -1;
    }
  }
};
</script>
<style lang="scss" scoped>
.organization {
  height: calc(100% - 12px);
  background: #04242460;
  padding: 6px;
  display: flex;
  .left {
    flex: none;
    width: 270px;
    background: #18557e;
    border: 2px solid #2d6a8e;
    border-radius: 4px;
    position: relative;
    text-align: left;
    .org-title {
      text-align: center;
      height: 42px;
      line-height: 42px;
      background: #2073a4;
    }
    .org-tree {
      overflow: auto;
      margin: 10px;
      margin: 6px;
      height: calc(100% - 94px);
    }
    .el-button--primary {
      position: absolute;
      bottom: 0;
      width: 100%;
      border-radius: 0px;
    }
    .tree-icon {
      font-size: 18px;
      margin-right: 5px;
      padding: 3px 4px;
      background: #3a87e4;
      border-radius: 50%;
    }
    .org-name {
      @include textEllipsis(148px);
      vertical-align: text-bottom;
    }
  }
  .right {
    flex: 1;
    width: 100%;
    overflow: auto;
    padding-left: 10px;
  }
}
</style>
