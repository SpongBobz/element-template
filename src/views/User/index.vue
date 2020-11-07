<template>
  <div class="user">
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
      <el-form-item style="position: absolute;right: 12px;">
        <el-button icon="el-icon-plus" type="primary" @click="addUser"
          >新建用户</el-button
        >
      </el-form-item>
    </el-form>
    <Com-Table
      :columns="columns"
      :dataSource="tableData"
      :options="options"
      :fetch="getTabData"
      :pagination="pagination"
      :pageSizes="pageSizes"
    >
      <template slot="func" slot-scope="scoped">
        <el-button
          size="mini"
          @click="editUser(scoped.row)"
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
    <SaveUserDialog @change="getTabData" ref="userDialog" />
  </div>
</template>
<script>
import { getUserList, deleteUser } from "@/api/user";
import { formatDate } from "@/util";
import SaveUserDialog from "./components/SaveUserDialog";
export default {
  components: {
    SaveUserDialog
  },
  data() {
    return {
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
      queryForm: {},
      tableData: [],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 12
      },
      pageSizes: [12, 14, 20, 50],
      treeLoading: false,
      options: {
        mutiSelect: false,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true // 是否一挂载就加载数据
        // border: true,
      }
    };
  },
  methods: {
    addUser() {
      this.$refs.userDialog.open();
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
        pageSize: 12
      };
      this.getTabData();
    },
    getTabData() {
      this.options.loading = true;
      let parms = {
        name: this.queryForm.key,
        pageIndex: this.pagination.pageIndex,
        pagesize: this.pagination.pageSize
      };
      getUserList(parms).then(res => {
        this.tableData = res.Data.Data;
        this.pagination.total = res.Data.PageInfo.Count;
        this.options.loading = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.user {
  height: calc(100% - 12px);
  background: #04242460;
  padding: 6px 20px;
  position: relative;
  overflow: auto;
}
</style>
