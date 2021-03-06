<template>
  <div>
    <el-table
      v-loading="options.loading"
      :data="dataSource"
      :stripe="options.stripe"
      class="cus-table"
      :border="options.border"
      :height="options.height"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
      header-row-class-name="table-header-row"
      @row-click="rowClick"
      highlight-current-row
    >
      <!--selection选择框-->
      <el-table-column
        v-if="options.mutiSelect"
        type="selection"
        width="50"
        align="center"
        :selectable="options.selected"
      ></el-table-column>

      <!--序号-->
      <el-table-column
        v-if="options.index"
        label="序号"
        type="index"
        width="60"
        align="center"
      ></el-table-column>

      <!--数据列-->
      <template v-for="(column, index) in columns">
        <slot name="column.prop">
          <el-table-column
            show-overflow-tooltip
            :key="index"
            :prop="column.prop"
            :label="column.label"
            :header-align="column.headerAlign || 'center'"
            :align="column.align || 'center'"
            :width="column.width"
            :fixed="column.fixed"
          >
            <template slot-scope="scope">
              <!-- slot 你可以其他常用项 -->
              <slot :name="column.prop" :row="scope.row">
                <template v-if="!column.render">
                  {{ scope.row[column.prop] }}
                </template>
                <!-- render -->
                <template v-else>
                  <RenderDom
                    :row="scope.row"
                    :index="index"
                    :render="column.render"
                  />
                </template>

                <!-- render button -->
                <template v-if="column.button">
                  <template v-for="(btn, i) in column.group">
                    <el-button
                      :key="i"
                      :type="btn.type"
                      :size="btn.size || 'mini'"
                      :icon="btn.icon"
                      :disabled="btn.disabled"
                      :plain="btn.plain"
                      @click.stop="btn.onClick(scope.row, scope.$index)"
                      >{{ btn.name }}</el-button
                    >
                  </template>
                </template>
              </slot>
            </template>
          </el-table-column>
        </slot>
      </template>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-if="pagination"
      :current-page.sync="pagination.pageIndex"
      :total="pagination.total"
      :page-size="pagination.pageSize"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleIndexChange"
      class="pagination"
      background
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "ComTable",
  components: {
    RenderDom: {
      functional: true, // 函数式组件 - 无 data 和 this 上下文 => better render
      props: {
        row: Object,
        index: Number,
        render: Function
      },
      /**
       * @param {Function} createElement - 原生创建dom元素的方法， 弃用，推荐使用 jsx
       * @param {Object} ctx - 渲染的节点的this对象
       * @argument 传递参数 row index
       */
      render(createElement, ctx) {
        const { row, index } = ctx.props;
        return ctx.props.render(row, index);
      }
    }
  },
  props: {
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    dataSource: Array,
    options: Object, // 表格参数控制 maxHeight、stripe 等等...
    columns: Array,
    pagination: Object, // 分页，不传则不显示,
    fetch: {
      default: () => {},
      type: Function
    }, // 获取数据的函数
    handleSelectionChange: {
      default: () => {},
      type: Function
    },
    handleCurrentChange: {
      default: () => {},
      type: Function
    },
    rowClick: {
      default: () => {},
      type: Function
    }
    // handleRowClick: {
    //   default: (row, event, column) => {
    //    console.log(row, event, column)
    //   },
    //   type: Function
    // }
  },
  created() {
    // 传入的options覆盖默认设置
    this.$parent.options = Object.assign(
      {
        // maxHeight: 750,
        stripe: false, // 是否为斑马纹
        border: true,
        highlightCurrentRow: false
      },
      this.options
    );
    this.options.initTable && this.fetch();
  },
  methods: {
    handleSizeChange(size) {
      // 切换每页显示的数量
      this.pagination.pageSize = size;
      this.fetch();
    },
    handleIndexChange(current) {
      // 切换页码
      this.pagination.pageIndex = current;
      this.fetch();
    }
  }
};
</script>
<style lang="scss" scoped>
.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
