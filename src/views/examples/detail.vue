<template>
  <div style="margin-left: 10px;">
    <du-card style="margin-bottom: 10px;">
      <div slot="title">
        <du-button type="primary" @click="$router.go(-1)">返回 </du-button>
      </div>
      <div slot="extra">
        <du-button @click="handleSave" type="danger">保存 </du-button>
      </div>
      <du-field title="名称"> </du-field>
      <du-field title="英文名称"> </du-field>
      <du-field title="编号">
        <du-radio-group
          v-model="data.code"
          :options="[
            { label: '山水', value: 'value2' },
            { label: '人世', value: 'value1' },
          ]"
        ></du-radio-group>
      </du-field>
      <du-field title="选择">
        <du-select
          v-model="data.code"
          :options="[
            { label: '人世', value: 'value1' },
            { label: '山水', value: 'value2' },
            { label: '清贫', value: 'value3' },
            { label: '安乐', value: 'value4' },
            { label: '退休', value: 'value5' },
            { label: '养老', value: 'value6' },
          ]"
        ></du-select>
      </du-field>
      <du-field title="多选">
        <du-checkbox-group
          v-model="data.codes"
          :options="[
            { label: '山水', value: 'value2' },
            { label: '人世', value: 'value1' },
          ]"
        ></du-checkbox-group>
      </du-field>
      <du-field title="编号" type="textarea"> </du-field>
    </du-card>
    <du-card title="操作记录">
      <du-table :data="historyData" :columns="historyColumns"> </du-table>
    </du-card>
  </div>
</template>
<script>
export default {
  computed: {
    isEn() {
      return this.$store.state.isEn
    },
  },
  created() {
    this.init()
  },

  data() {
    return {
      data: {},
      historyData: [],
      historyColumns: [
        { value: "name", label: "操作人" },
        { value: "content", label: "内容" },
        { value: "createTime", label: "时间" },
      ],
    }
  },
  methods: {
    async init() {
      let res = {}
      this.data = res || {}
    },
    async handleSave() {
      this.$du_confirm({
        message: "确认保存吗?",
        onConfirm: async () => {},
      })
    },
  },
}
</script>
<style></style>
