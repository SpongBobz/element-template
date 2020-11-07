<template>
  <div class="role">
    <el-form
      class="query-form"
      :model="queryForm"
      label-suffix=":"
      size="small"
      inline
    >
      <el-form-item label="关键字">
        <el-input
          v-model="queryForm.key"
          placeholder="请输入显示名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryBtn">查询</el-button>
        <el-button class="reset" @click="reset">重置</el-button>
      </el-form-item>
      <el-form-item style="position: absolute;right: 12px;">
        <el-button icon="el-icon-plus" type="primary" @click="addRole"
          >新建角色</el-button
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
          :title="`是否确认删除角色 ${scoped.row.DisplayName} ？`"
          @confirm="delRole(scoped.row)"
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
    <SaveRoleDiaolg @change="getTabData" ref="roleDialog" />
  </div>
</template>
<script>
import { getListPage, deleteRole } from "@/api/role.js";
import { formatDate } from "@/util";
import SaveRoleDiaolg from "./components/SaveRoleDiaolg";
export default {
  components: {
    SaveRoleDiaolg
  },
  data() {
    return {
      columns: [
        {
          prop: "DisplayName",
          label: "显示名称"
        },
        {
          prop: "Name",
          label: "角色名称"
        },
        {
          prop: "IsStatic",
          label: "是否静态",
          render: row => {
            if (row.IsStatic) {
              return <span>是</span>;
            }
            return <span>否</span>;
          }
        },
        {
          prop: "IsDefault",
          label: "是否默认",
          render: row => {
            if (row.IsDefault) {
              return <span>是</span>;
            }
            return <span>否</span>;
          }
        },
        {
          prop: "OrgDisplayName",
          label: "所属(机构/部门)"
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
    addRole() {
      this.$refs.roleDialog.open();
    },
    editUser(data) {
      this.$refs.roleDialog.open(data);
    },
    delRole(data) {
      console.log(data);
      deleteRole(data.Id).then(res => {
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
        displayName: this.queryForm.key,
        pageIndex: this.pagination.pageIndex,
        pagesize: this.pagination.pageSize
      };
      getListPage(parms).then(res => {
        this.tableData = res.Data.Data;
        this.pagination.total = res.Data.PageInfo.Count;
        this.options.loading = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.role {
  height: calc(100% - 12px);
  background: #04242460;
  padding: 6px 20px;
  position: relative;
  overflow: auto;
}
</style>
