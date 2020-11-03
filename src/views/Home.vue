<template>
  <div class="home">
    <Com-Table
      :columns="columns"
      :dataSource="tableData"
      :options="options"
      :pagination="pagination"
    >
      <template slot="func">
        <el-button size="mini">
          <i class="el-icon-view el-icon--left"></i>
          浏览附件
        </el-button>
      </template>
    </Com-Table>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      columns: [
        {
          prop: "a",
          label: "交班人"
        },
        {
          prop: "c",
          label: "接班人"
        },
        {
          prop: "x",
          label: "交班内容"
        },
        {
          prop: "func",
          label: "操作",
          width: 250
        }
      ],
      tableData: [
        // { a: 123, c: "asda", x: "就是这样" },
        // { a: 123, c: "asda", x: "就是这样" },
        // { a: 123, c: "asda", x: "就是这样" },
        // { a: 123, c: "asda", x: "就是这样" },
        // { a: 123, c: "asda", x: "就是这样" }
      ],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      options: {
        mutiSelect: false,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true // 是否一挂载就加载数据
        // border: true,
      }
    };
  }
};
</script>
<style lang="scss"></style>
