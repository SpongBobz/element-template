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
      :model="formData"
      :rules="rules"
      ref="dialogForm"
      label-width="80px"
    >
      <el-form-item label="上级部门" prop="ParentId">
        <el-select
          clearable
          v-model="formData.ParentId"
          placeholder="选择上级部门"
          style="width:100%"
        >
          <el-option
            v-for="(item, k) in orgList"
            :key="k"
            :label="item.DisplayName"
            :value="item.Id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门名称" prop="DisplayName">
        <el-input
          v-model.trim="formData.DisplayName"
          placeholder="请输入部门名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="Remark">
        <el-input
          v-model.trim="formData.Remark"
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 10 }"
          show-word-limit
          placeholder="请输入备注"
        ></el-input>
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
import { getList, addOrg, editOrg } from "@/api/organization.js";
export default {
  name: "",
  data() {
    return {
      formData: {
        ParentId: null,
        DisplayName: "",
        Remark: ""
      },
      dialogTreeVisible: false,
      title: "新建部门",
      rules: {
        DisplayName: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          {
            min: 0,
            max: 32,
            message: "长度在 32 个字符以内",
            trigger: "blur"
          }
        ]
        // ParentId: [
        //   { required: true, message: "请选择上级部门", trigger: "change" }
        // ]
      },
      saveLoad: false,
      orgList: null
    };
  },
  computed: {
    apiName() {
      if (this.title == "新建部门") {
        return addOrg;
      }
      return editOrg;
    }
  },
  methods: {
    save() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.saveLoad = true;
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
      this.formData = {};
      this.$refs.dialogForm.resetFields();
      this.dialogTreeVisible = false;
    },
    getList() {
      if (this.orgList == null) {
        getList().then(res => {
          this.orgList = res.Data;
        });
      }
    },
    open(data) {
      this.getList();
      this.dialogTreeVisible = true;
      this.title = "新建部门";
      if (data) {
        this.title = "编辑部门";
        const { Remark, ParentId, DisplayName, Id } = data;
        this.formData = { Remark, ParentId, DisplayName, Id };
      }
    }
  }
};
</script>
