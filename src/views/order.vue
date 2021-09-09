<template>
  <div style="margin-left: 10px;">
    <du-card style="margin-bottom: 10px;">
      <div
        style="display: flex;align-items: center;flex-wrap: wrap;gap:5px 30px;"
      >
        <du-field title="名称" v-model="filters.name"></du-field>
        <du-field title="编号">
          <du-radio-group
            v-model="filters.code"
            :options="[
              { label: '山水', value: 'value2' },
              { label: '人世', value: 'value1' },
            ]"
          ></du-radio-group>
        </du-field>
        <du-field title="编号">
          <du-select
            v-model="filters.code"
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
        <du-field title="编号">
          <du-checkbox-group
            v-model="filters.codes"
            :options="[
              { label: '山水', value: 'value2' },
              { label: '人世', value: 'value1' },
            ]"
          ></du-checkbox-group>
        </du-field>
        <div style="display: flex;gap: 10px;">
          <du-button type="primary">查询</du-button>
          <du-button>重置</du-button>
        </div>
      </div>
    </du-card>
    <du-card>
      <du-table showNo :data="data" :columns="columns" :pagination="pagination">
        <div slot="action">
          <du-button type="primary" @click="$router.push({name:'orderDetail'})">详情</du-button>
        </div>
      </du-table>
    </du-card>
  </div>
</template>
<script>
export default {
  computed: {
    isEn() {
      return this.$store.state.isEn
    },
    goodsColumns() {
      return [
        { value: "label", label: "品项", label_en: "No." },
        { value: "quantity", label: "数量", label_en: "Code" },
        { value: "price", label: "单价", label_en: "Amount" },
        { value: "amount", label: "金额", label_en: "Action" },
      ].map((item) => {
        return {
          ...item,
          label: (this.isEn && item.label_en) || item.label,
        }
      })
    },
    columns() {
      return [
        // { value: "no", label: "序号", label_en: "No." },
        { value: "code", label: "订单号", label_en: "Code" },
        { value: "createTime", label: "创建时间", label_en: "Time" },
        { value: "from", label: "来源", label_en: "From" },
        { value: "paymentWay", label: "支付方式", label_en: "Payment Way" },
        { value: "status", label: "状态", label_en: "Status" },
        { value: "amount", label: "金额", label_en: "Amount" },
        { value: "action", label: "操作", label_en: "Action" },
      ]
    },
  },
  created() {
    // if (!this.filters.dates || !this.filters.dates.length) {
    //   this.handleChangeRadio("今日")
    // }
    // this.init()
  },
  watch: {
    filters: {
      handler: function(newVal, oldVal) {
        if (JSON.stringify(newVal) == "{}") {
          this.init()
        } else {
          console.log(newVal)
        }
      },
      deep: true,
    },
  },
  data() {
    this.handleChange = this.$lodash.debounce(this.init, 500)
    return {
      pagination: {},
      filters: {},
      currentPage: 1,
      total: 10, // 分页总条目
      selectOrder: { payment: {}, orderGoods: [] }, // 详情选中的订单
      showOrder: false,

      initData: [],
      data: [
        ...Array.from({ length: 10 }, (v, k) => {
          return {
            code: `你好啊${k + 1}`,
            createTime: new Date().toLocaleString(),
            from: "来源" + k,
          }
        }),
      ],
    }
  },
  methods: {
    async init() {
      try {
        let res = await this.$axios.get("/orders", {
          params: {
            ...this.filters,
            startTime: this.filters.dates[0],
            endTime: this.filters.dates[1],
          },
        })
        this.total = res.total || 10
        this.initData = JSON.parse(JSON.stringify(res.content))
        console.log(res, this.initData)
        this.data = this.initData.slice(0, 10)
      } catch (error) {
        console.log(error)
      } finally {
      }
    },
  },
}
</script>
<style></style>
