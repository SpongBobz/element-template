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
    <el-form
      class="approval-form"
      :model="formData"
      ref="dialogForm"
      label-width="80px"
    >
      <el-form-item label="审批员" prop="AuditAuthType">
        <el-select
          clearable
          v-model="formData.AuditAuthType"
          placeholder="选择审批员"
          style="width:100%"
        >
          <el-option
            v-for="(item, k) in authList"
            :key="k"
            :label="item.Name"
            :value="item.Id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" :loading="saveLoad" @click="save"
        >保 存</el-button
      >
      <el-button @click="handleClose" size="small">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getDataSourceAuthList, editAuthAudit } from "@/api/auth.js";
export default {
  name: "",
  data() {
    return {
      dialogTreeVisible: false,
      title: "新建部门",
      saveLoad: false,
      authList: null,
      formData: {
        AuditAuthType: 0
      },
      roleId: null
    };
  },
  computed: {},
  methods: {
    save() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.saveLoad = true;
          editAuthAudit({
            RoleID: this.roleId,
            ...this.formData
          }).then(res => {
            this.saveLoad = false;
            if (res.Success) {
              this.handleClose();
              this.$message.success("保存成功！");
            }
          });
        } else {
          this.$message({
            type: "warning",
            message: "验证不通过！"
          });
          this.saveLoad = false;
          return false;
        }
      });
    },
    handleClose() {
      this.dialogTreeVisible = false;
    },
    getDataAuthList() {
      getDataSourceAuthList(this.roleId).then(res => {
        this.authList = res.Data.Data;
        this.authList.push({ Id: 0, Name: "无" });
        if (res.Data.CurrentRoleAuth) {
          this.formData = { ...res.Data.CurrentRoleAuth };
        } else {
          this.formData.AuditAuthType = 0;
        }
      });
    },
    open(id) {
      this.roleId = id;
      this.getDataAuthList();
      this.dialogTreeVisible = true;
      this.title = "编辑审批权限";
    }
  }
};
</script>
