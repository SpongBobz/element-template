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
    <el-form :model="formData" :rules="rules" ref="userForm" label-width="80px">
      <el-form-item label="所属机构" prop="OrganizationId">
        <el-select
          clearable
          v-model="formData.OrganizationId"
          placeholder="请选择所属机构"
          style="width:100%"
          :loading="orgLoading"
        >
          <el-option
            v-for="(item, k) in orgList"
            :key="k"
            :label="item.DisplayName"
            :value="item.Id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="显示名称" prop="DisplayName">
        <el-input
          v-model.trim="formData.DisplayName"
          placeholder="请输入显示名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色名称" prop="Name">
        <el-input
          v-model.trim="formData.Name"
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否默认" prop="IsDefault">
        <el-radio-group v-model="formData.IsDefault">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否静态" prop="IsStatic">
        <el-radio-group v-model="formData.IsStatic">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" :loading="saveLoad" @click="save"
        >保 存</el-button
      >
      <el-button @click="handleClose" class="cancal" size="small"
        >取 消</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import { getList } from "@/api/organization.js";
import { addRole, updateRole } from "@/api/role.js";
export default {
  name: "",
  data() {
    return {
      formData: {
        DisplayName: "",
        Name: "",
        OrganizationId: "",
        IsDefault: false,
        IsStatic: false
      },
      dialogTreeVisible: false,
      title: "新增角色",
      rules: {
        DisplayName: [
          { required: true, message: "请输入该角色显示名称", trigger: "blur" },
          {
            min: 0,
            max: 32,
            message: "长度在 32 个字符以内",
            trigger: "blur"
          }
        ],
        Name: [
          { required: true, message: "请输入角色角色名称", trigger: "blur" },
          {
            min: 0,
            max: 32,
            message: "长度在 32 个字符以内",
            trigger: "blur"
          }
        ],
        IsStatic: [
          { required: true, message: "请选择是否静态", trigger: "change" }
        ],
        IsDefault: [
          { required: true, message: "请选择是否默认", trigger: "change" }
        ],
        OrganizationId: [
          { required: true, message: "请选择所属机构", trigger: "change" }
        ]
      },
      saveLoad: false,
      orgLoading: false,
      orgList: null
    };
  },
  computed: {
    apiName() {
      if (this.title == "新增角色") {
        return addRole;
      }
      return updateRole;
    }
  },
  methods: {
    save() {
      this.saveLoad = true;
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.apiName(this.formData).then(res => {
            this.saveLoad = false;
            if (res.Success) {
              this.handleClose();
              this.$emit("change");
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
      this.formData = { IsDefault: false, IsStatic: false };
      this.$refs.userForm.resetFields();
      this.dialogTreeVisible = false;
    },
    getList() {
      if (this.orgList == null) {
        this.orgLoading = true;
        getList().then(res => {
          this.orgList = res.Data;
          this.orgLoading = false;
        });
      }
    },
    open(data) {
      this.getList();
      this.dialogTreeVisible = true;
      this.title = "新增角色";
      if (data) {
        this.showCheck = false;
        this.title = "编辑角色";
        const {
          DisplayName,
          Name,
          OrganizationId,
          IsDefault,
          IsStatic,
          Id
        } = data;
        this.formData = {
          DisplayName,
          Name,
          OrganizationId,
          IsDefault,
          IsStatic,
          Id
        };
      }
    }
  }
};
</script>
