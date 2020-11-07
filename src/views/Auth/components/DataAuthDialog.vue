<template>
  <el-dialog
    :title="title"
    width="30%"
    custom-class="cus-dialog"
    :close-on-click-modal="false"
    :before-close="handleClose"
    center
    :visible.sync="dialogTreeVisible"
  >
    <div class="dialog-tree" v-loading="treeLoading">
      <el-tree
        class="cus-tree"
        :data="treeData"
        :props="defaultProps"
        show-checkbox
        highlight-current
        node-key="Id"
        :expand-on-click-node="false"
        ref="dialogTree"
      >
      </el-tree>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" :loading="saveLoad" @click="save"
        >保 存</el-button
      >
      <el-button @click="handleClose" size="small">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getDataAuthList, editDataAuth } from "@/api/auth.js";
export default {
  name: "",
  data() {
    return {
      dialogTreeVisible: false,
      title: "新建部门",
      saveLoad: false,
      orgList: null,
      treeData: [],
      defaultProps: {
        children: "Child",
        label: "DisplayName"
      },
      checkedKeys: [],
      roleId: null,
      treeLoading: false
    };
  },
  methods: {
    save() {
      let data = this.$refs.dialogTree.getCheckedKeys(true);
      this.saveLoad = true;
      editDataAuth({ RoleId: this.roleId, SelectId: data }).then(res => {
        this.saveLoad = false;
        if (res.Success) {
          this.handleClose();
          this.$message.success("保存成功！");
        }
      });
    },
    handleClose() {
      this.dialogTreeVisible = false;
    },
    getDataAuthList() {
      this.treeLoading = true;
      getDataAuthList(this.roleId).then(res => {
        this.treeData = res.Data.Data;
        this.$refs.dialogTree.setCheckedKeys(res.Data.CurrentRoleAuth, true);
        this.treeLoading = false;
      });
    },
    open(id) {
      this.roleId = id;
      this.getDataAuthList();
      this.dialogTreeVisible = true;
      this.title = "编辑功能权限";
    }
  }
};
</script>
<style lang="scss" scoped>
.dialog-tree {
  height: 500px;
  overflow: auto;
  background: #133a5a;
  border: 1px solid #2d6a8e;
  border-radius: 4px;
  padding: 10px 20px;
}
</style>
