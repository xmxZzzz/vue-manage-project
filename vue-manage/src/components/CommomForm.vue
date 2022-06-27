<template>
  <el-form ref="form" label-width="100px" :model="form" :inline="inline">
    <el-form-item
      v-for="item in formLabel"
      :key="item.label"
      :label="item.label"
    >
      <el-input
        v-if="item.type === 'input'"
        v-model="form[item.model]"
        :placeholder="'请输入' + item.label"
      ></el-input>
      <el-switch
        v-if="item.type === 'switch'"
        v-model="form[item.model]"
      ></el-switch>
      <el-date-picker
        v-if="item.type === 'date'"
        type="date"
        v-model="form[item.model]"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
      ></el-date-picker>
      <el-select
        v-if="item.type === 'select'"
        v-model="form[item.model]"
        placeholder="请选择"
      >
        <el-option
          v-for="ele in item.opts"
          :key="ele.value"
          :value="ele.value"
          :label="ele.label"
        ></el-option>
      </el-select>
    </el-form-item>
    <!-- 自定义item -->
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "CommonForm",
  props: {
    formLabel: Array,
    form: Object,
    inline: Boolean,
  },
};
</script>