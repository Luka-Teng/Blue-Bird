<template>
  <div>
    <div id="main" :style="{ width: '100%', height: height}"></div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import echarts from 'echarts'
  export default {
    data () {
      return {
        height: 0
      }
    },
    computed: {
      ...mapGetters({
        user: 'user',
        allUsers: 'allUsers'
      })
    },
    methods: {
      drawChart () {
        // 指定图表的配置项和数据
        const users = this.allUsers
        let level_map = {}, nodes = [], links = [], levels = 0
        users.forEach((user) => {
          level_map['level' + user.level] === undefined ? level_map['level' + user.level] = [] : ''
          level_map['level' + user.level].push(user)
        })
        Object.keys(level_map).forEach((key, index) => {
          let level = level_map[key]
          level.forEach((level_2, index_2) => {
            nodes.push({
              name: level_2.name+" : "+level_2.money,
              y: index * 50,
              x: 100 * index_2 - (level.length-1) * 100 / 2,
              value: level_2.level,
              id: level_2.id,
              father_id: level_2.father_id,
              symbol: 'image://'+level_2.avatar
            })
            links.push({
              name: 'belongs',
              source: level_2.id,
              target: level_2.father_id
            })
          })
          levels++
        })
        this.height = levels * 120 + 'px'

        this.$nextTick(() => {
          // 基于准备好的dom，初始化echarts实例
          const myChart = echarts.init(document.getElementById('main'));
          let option = {
            title: {
              text: 'Pyramid members',
              top: 'top',
              left: 'left',
              textStyle: {
                color: '#555',
                fontSize: '25'
              }
            },
            animationDuration: 1500,
            animationEasingUpdate: 'quinticInOut',
            tooltip: {
              trigger: 'none'
            },
            edgeSymbol: ['circle', 'arrow'],
            series: [
              {
                name: 'Pyramid members',
                type: 'graph',
                layout: 'none',
                rome: false,
                lineStyle: {
                  normal: {
                    color: '#555',
                    curveness: 0.1,
                    width:2
                  }
                },
                label: {
                  normal: {
                    show: true,
                    position: 'left',
                    color: '#888',
                    fontSize: 15,
                    offset: [0,5]
                  }
                },
                symbolSize: [50,50],
                nodes: nodes,
                links: links
              }
            ]
          }
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option)
        })
      }
    },
    watch: {
      allUsers: {
        handler (value) {
          this.drawChart()
        },
        deep: true
      }
    },
    mounted () {
      if (this.allUsers) {
        this.drawChart()
      } else {
        let int = setInterval(() => {
          if (this.allUsers) {
            clearInterval(int)
          }
        }, 2000)
      }
    }
  }
</script>
