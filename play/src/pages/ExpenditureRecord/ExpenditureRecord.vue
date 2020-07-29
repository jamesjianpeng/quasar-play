<template>
  <q-page class="flex flex-center">
    <div style="width: 100%;height: 50vh">
    <Chart
      :option="{
                color: ['#ef5350', '#ec407a', '#5c6bc0', '#ab47bc', '#7e57c2', '#26c6da', '#26a69a'],
                title: {
                  text: '月支出',
                  fontWeight: 500,
                  x:'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                label: {
                  formatter: '{b|{b}：}{c}  {per|{d}%}  ',
                  rich: {
                    a: {
                      lineHeight: 22,
                      align: 'center'
                    },
                    hr: {
                      borderColor: '#aaa',
                      width: '100%',
                      borderWidth: 0.5,
                      height: 0
                    },
                    per: {
                      color: '#eee',
                      backgroundColor: '#334455',
                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }
                },
                backgroundColor: 'rgba(255, 255, 255, 0)',
                series: {
                  type: 'pie',
                  name: ' 投保人年龄',
                  radius: ['0%', '55%'],
                  data: this.data
                }
            }"
            :id="'policyholderAgeDataID'"
        />
      </div>
  </q-page>
</template>

<script>
import Chart from 'components/Chart.vue'
export default {
  name: 'PageIndex',
  components: {
    Chart
  },
  data () {
    return {
      data: [
        { name: '(45, 50]', value: 19 },
        { name: '(40, 45]', value: 19 },
        { name: '(35, 40]', value: 19 },
        { name: '(30, 35]', value: 19 },
        { name: '(25, 30]', value: 19 },
        { name: '(20, 25]', value: 12 },
        { name: '(45, 50)', value: 23 }
      ]
    }
  }
}
</script>
