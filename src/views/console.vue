<template>
  <div style="margin-left:10px">
    控制台
  </div>
</template>
<script>
export default {
  computed: {
    isEn() {
      return this.$store.state.isEn
    },
    columns() {
      return [
        { value: "no", label: "序号", label_en: "No." },
        { value: "image", label: "图片", label_en: "Cover" },
        {
          value: "label",
          label: "名称",
          label_en: "Name",
          value_en: "label_en",
        },
        { value: "sold", label: "销量", label_en: "Quantity" },
        { value: "amount", label: "销售额", label_en: "Amount" },
      ].map((item) => {
        return {
          ...item,
          label: (this.isEn && item.label_en) || item.label,
          value: (this.isEn && item.value_en) || item.value,
        }
      })
    },
  },
  created() {
    this.dates = [
      this.$moment()
        .startOf("day")
        .format("YYYY/MM/DD HH:mm:ss"),
      this.$moment()
        .endOf("day")
        .format("YYYY/MM/DD HH:mm:ss"),
    ]
  },
  data() {
    return {}
  },
  methods: {
    async getInfo() {
      try {
        let res = await this.$axios.get("/reports", {
          params: {
            startTime: this.dates[0],
            endTime: this.$moment(this.dates[1])
              .endOf("day")
              .format("YYYY/MM/DD HH:mm:ss"),
          },
        })
        let { data, billInfo, top10Goods, paymentInfo } = res
        this.data = data
        this.billInfo.forEach((item, index) => {
          item.value = billInfo[index]
        })
        this.top10Goods = top10Goods
        this.pieData = { columns: ["name", "number"], rows: paymentInfo }
        this.histogramData = { columns: ["name", "total"], rows: paymentInfo }

        console.log(res)
      } catch (error) {
        console.log(error)
      } finally {
      }
    },
  },
}
</script>
<style></style>
