<template>
  <div :id="id" style="width: 100%;height:100%;"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'Chart',
  props: ['option', 'id'],
  mounted () {
    this.option && this.changePieChart(this.data, this.id)
  },
  watch: {
    option () {
      this.option && this.changePieChart(this.data, this.id)
    }
  },
  methods: {
    changePieChart (data, id) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(this.id))
      // 指定图表的配置项和数据
      const option = this.option
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>
