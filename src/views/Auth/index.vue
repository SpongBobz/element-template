<template>
  <div class="auth">
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
    </el-form>
    <div class="tab-content">
      <Com-Table
        :columns="columns"
        :dataSource="tableData"
        :options="options"
        :fetch="getTabData"
        :pagination="pagination"
        :pageSizes="pageSizes"
        style="height: 100%"
      >
        <template slot="func" slot-scope="scoped">
          <el-button
            size="mini"
            @click="editFunc(scoped.row)"
            type="success"
            style="margin-right: 5px"
            >功能权限</el-button
          >
          <el-button
            size="mini"
            @click="editData(scoped.row)"
            type="success"
            style="margin-right: 5px"
            >数据权限</el-button
          >
          <el-button
            size="mini"
            @click="editApproval(scoped.row)"
            type="success"
            >审批权限</el-button
          >
        </template>
      </Com-Table>
    </div>
    <RoleAuthdialog ref="roleAuthdialog" />
    <ApprovalDialog ref="approvalDialog" />
    <DataAuthDialog ref="dataAuthDialog" />
  </div>
</template>
<script>
import { getListPage, deleteRole } from "@/api/role.js";
import { formatDate } from "@/util";
import RoleAuthdialog from "./components/roleAuthdialog";
import ApprovalDialog from "./components/ApprovalDialog";
import DataAuthDialog from "./components/DataAuthDialog";
export default {
  components: { RoleAuthdialog, ApprovalDialog, DataAuthDialog },
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
          width: 300
        }
      ],
      queryForm: {},
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
        initTable: true // 是否一挂载就加载数据
        // border: true,
      }
    };
  },
  methods: {
    editFunc(data) {
      this.$refs.roleAuthdialog.open(data.Id);
    },
    editData(data) {
      this.$refs.dataAuthDialog.open(data.Id);
    },
    editApproval(data) {
      this.$refs.approvalDialog.open(data.Id);
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
        pageSize: 15
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
.auth {
  height: calc(100% - 12px);
  background: #04242460;
  padding: 6px 20px;
  position: relative;
  overflow: auto;
}
</style>
