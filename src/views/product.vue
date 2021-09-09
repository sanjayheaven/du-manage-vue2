<template>
  <div style="margin-left: 10px;height: 100%;">
    产品
  </div>
</template>
<script>
export default {
  computed: {
    isEn() {
      return this.$store.state.isEn
    },
  },
  created() {},
  data() {
    return { showAction: false, selectProduct: {} }
  },
  methods: {
    handleClick(value) {
      this.showAction = true
      this.selectProduct = value
      console.log("产品点击", value)
    },
    async handleUpdateIfSale(value) {
      await this.$axios.post("/products/updateIfSale", {
        ifSale: value,
        foodId: this.selectProduct.foodId,
      })
      this.$refs["productCategoryBasic"].init()
      console.log(value)
    },
    async handleUpdateSpecsIfShow(spec, value) {
      console.log("看看更新上下架ifshow", spec, value)
      await this.$axios.post("/products/updateSpecsIfShow", {
        ifShow: value,
        specId: spec._id,
      })
      this.$refs["productCategoryBasic"].init()
      // console.log(value)
    },
  },
}
</script>
<style scoped>
.actionItem {
  position: relative;
  margin: 10px 12px;
  width: 140px;
  height: 150px;
  padding: 5px;
  box-shadow: 0px 2px 3px 0px rgba(142, 142, 142, 0.11);
  border-radius: 10px;
  border: 1px solid #eeeeee;
}
</style>
