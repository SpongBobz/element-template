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
      <el-form-item label="登录账号" prop="UserName">
        <el-input
          v-model.trim="formData.UserName"
          placeholder="请输入登录账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="Name">
        <el-input
          v-model.trim="formData.Name"
          placeholder="请输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="Password">
        <el-input
          type="password"
          @input="pasChange"
          v-model.trim="formData.Password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="showCheck" label="确认密码" prop="checkPass">
        <el-input
          type="password"
          placeholder="请再次输入密码"
          v-model.trim="formData.checkPass"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="RoleId">
        <el-select
          clearable
          v-model="formData.RoleId"
          placeholder="请选择角色"
          style="width:100%"
          :loading="roleLoading"
        >
          <el-option
            v-for="(item, k) in roleList"
            :key="k"
            :label="item.DisplayName"
            :value="item.Id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职务" prop="JobPost">
        <el-input
          v-model.trim="formData.JobPost"
          placeholder="请输入职务"
        ></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="PhoneNumber">
        <el-input
          v-model.trim="formData.PhoneNumber"
          placeholder="请输入电话号码"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="EmailAddress">
        <el-input
          v-model.trim="formData.EmailAddress"
          placeholder="请输入邮箱"
        ></el-input>
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
import { getRoleList } from "@/api/role.js";
import { addUser, updateUser } from "@/api/user.js";
export default {
  name: "",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formData.Password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        UserName: "",
        Name: "",
        EmailAddress: "",
        OrganizationId: "",
        JobPost: "",
        RoleId: "",
        PhoneNumber: "",
        Password: "",
        checkPass: ""
      },
      dialogTreeVisible: false,
      title: "新增用户",
      rules: {
        UserName: [
          { required: true, message: "请输入该用户登录账号", trigger: "blur" },
          {
            min: 0,
            max: 32,
            message: "长度在 32 个字符以内",
            trigger: "blur"
          }
        ],
        Name: [
          { required: true, message: "请输入用户姓名", trigger: "blur" },
          {
            min: 0,
            max: 32,
            message: "长度在 32 个字符以内",
            trigger: "blur"
          }
        ],
        Password: [
          { required: true, message: "请输入用户登录密码", trigger: "blur" },
          {
            min: 6,
            max: 32,
            message: "长度在 6 - 32 个字符以内",
            trigger: "blur"
          }
        ],
        checkPass: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        JobPost: [
          {
            min: 0,
            max: 32,
            message: "长度在 32 个字符以内",
            trigger: "blur"
          }
        ],
        OrganizationId: [
          { required: true, message: "请选择所属机构", trigger: "change" }
        ],
        RoleId: [{ required: true, message: "请选择角色", trigger: "change" }],
        EmailAddress: [
          {
            pattern: /[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
            message: "请输入有效的邮箱格式！",
            trigger: "blur"
          }
        ],
        PhoneNumber: [
          { required: true, message: "请输入用户电话号码!", trigger: "blur" },
          {
            pattern: /((^0\d{2}-\d{8})|(^1[34578]\d{9}))$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ]
      },
      saveLoad: false,
      roleLoading: true,
      orgLoading: false,
      orgList: null,
      roleList: null,
      showCheck: true
    };
  },
  computed: {
    apiName() {
      if (this.title == "新增用户") {
        return addUser;
      }
      return updateUser;
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
    pasChange() {
      this.showCheck = true;
    },
    handleClose() {
      this.formData = {};
      this.$refs.userForm.resetFields();
      this.dialogTreeVisible = false;
    },
    getRoleList() {
      if (this.roleList == null) {
        this.roleLoading = true;
        getRoleList().then(res => {
          this.roleList = res.Data;
          this.roleLoading = false;
        });
      }
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
      this.getRoleList();
      this.dialogTreeVisible = true;
      this.title = "新增用户";
      if (data) {
        this.showCheck = false;
        this.title = "编辑用户";
        const {
          UserName,
          Name,
          EmailAddress,
          OrganizationId,
          JobPost,
          RoleId,
          PhoneNumber,
          Password,
          Id
        } = data;
        this.formData = {
          UserName,
          Name,
          EmailAddress,
          OrganizationId,
          JobPost,
          RoleId,
          PhoneNumber,
          Password,
          Id
        };
      }
    }
  }
};
</script>
