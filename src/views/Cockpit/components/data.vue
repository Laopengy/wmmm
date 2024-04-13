<template>
  <div class="data-box">
    <el-select v-model="value" placeholder="请选择阵营" @change="changeFactions" class="select-item">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="value1" placeholder="请选择场次" @change="changeSession" class="select-item">
      <el-option
        v-for="item in options1"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="value2" placeholder="筛选团长" clearable @change="changeCommander" class="select-item">
      <el-option
        v-for="item in options2"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="value3" placeholder="筛选职业" clearable @change="changeOccupation" class="select-item">
      <el-option
        v-for="item in options3"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-table
      :data="showList"
      border
      :max-height="`${tableHeight - 40}`"
      :style="`width: ${tableWidth - 40}px`">
      <el-table-column
        prop="玩家"
        fixed
        width="150"
        label="玩家">
        <template slot-scope="scoped">
          <!-- 铁衣 -->
          <span v-if="scoped.row['职业'] === '铁衣'" class="ty">{{ scoped.row['玩家'] }}</span>
          <!-- 血河 -->
          <span v-if="scoped.row['职业'] === '血河'" class="xh">{{ scoped.row['玩家'] }}</span>
          <!-- 素问 -->
          <span v-if="scoped.row['职业'] === '素问'" class="sw">{{ scoped.row['玩家'] }}</span>
          <!-- 九零 -->
          <span v-if="scoped.row['职业'] === '九灵'" class="jl">{{ scoped.row['玩家'] }}</span>
          <!-- 荒羽 -->
          <span v-if="scoped.row['职业'] === '荒羽'" class="hy">{{ scoped.row['玩家'] }}</span>
          <!-- 潮光 -->
          <span v-if="scoped.row['职业'] === '潮光'" class="cg">{{ scoped.row['玩家'] }}</span>
          <!-- 神相 -->
          <span v-if="scoped.row['职业'] === '神相'" class="sx">{{ scoped.row['玩家'] }}</span>
          <!-- 玄机 -->
          <span v-if="scoped.row['职业'] === '玄机'" class="xj">{{ scoped.row['玩家'] }}</span>
          <!-- 龙吟 -->
          <span v-if="scoped.row['职业'] === '龙吟'" class="ly">{{ scoped.row['玩家'] }}</span>
          <!-- 碎梦 -->
          <span v-if="scoped.row['职业'] === '碎梦'" class="sm">{{ scoped.row['玩家'] }}</span>
          <!-- 鸿音 -->
          <span v-if="scoped.row['职业'] === '鸿音'" class="hyin">{{ scoped.row['玩家'] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-for="item in column"
        :key="item"
        :prop="item"
        sortable
        :formatter="stateFormat" 
        :width="item === '所在团长' ? '150' : ''"
        :label="item">
        <template slot-scope="scoped">
          <!-- 铁衣 -->
          <span :class="scoped.row[item] && scoped.row[item].length > 9 ? 'hightData' : ''">{{ stateFormat('', '', scoped.row[item]) }}</span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>

import { mapState } from 'pinia';
import { useFriday01Store } from '@/stores/friday01';
import { useFriday02Store } from '@/stores/friday02';
import { useSaturdaystore } from '@/stores/Saturday';



export default {
  name: 'dataView',
  components: {
  },
  data() {
    return {
      options: [{
        value: '1',
        label: '本方'
      }, {
        value: '2',
        label: '敌方'
      }],
      options1: [
        {
          value: '1',
          label: '周五第一场'
        }, 
        {
          value: '2',
          label: '周五第二场'
        },
        {
          value: '3',
          label: '周六第一场'
        },
      ],
      options2: [],
      options3: [
        {
          value: '铁衣',
          label: '铁衣'
        },
        {
          value: '血河',
          label: '血河'
        },
        {
          value: '素问',
          label: '素问'
        },
        {
          value: '九灵',
          label: '九灵'
        },
        {
          value: '荒羽',
          label: '荒羽'
        },
        {
          value: '潮光',
          label: '潮光'
        },
        {
          value: '神相',
          label: '神相'
        },
        {
          value: '玄机',
          label: '玄机'
        },
        {
          value: '龙吟',
          label: '龙吟'
        },
        {
          value: '碎梦',
          label: '碎梦'
        },
        {
          value: '鸿音',
          label: '鸿音'
        },
      ],
      column: [
        '职业',
        '所在团长',
        '击败',
        '助攻',
        '治疗值',
        '对建筑伤害',
        '对玩家伤害',
        '总伤',
        '承受伤害',
        '重伤',
        '控制',
        '化羽',
        '青灯焚骨',
        '战备资源',
      ],
      value: '1',
      value1: '1',
      value2: null,
      value3: null,
      tableHeight: null,
      tableWidth: null,
      dataList: [],
      showList: []
    }
  },

  computed:{
    ...mapState(useFriday01Store, ['our', 'enemy']),
    ...mapState(useFriday02Store, ['our2', 'enemy2']),
    ...mapState(useSaturdaystore, ['our3', 'enemy3']),
  },


  mounted() {
    const contentBox = document.getElementsByClassName('right-data')[0]
    this.tableHeight = contentBox.offsetHeight
    this.tableWidth = contentBox.offsetWidth
    this.dataList = this.our.MemberList
    this.showList = this.dataList
    const commander = [...new Set(this.our.MemberList.map(obj => obj['所在团长']))];
    this.options2 = commander.map(item => {
      return {
        label: item,
        value: item
      }
    })
  },
  methods: {
    changeFactions(val) {
      this.value2 = null
      this.value3 = null
      if(val === '1') {
        if(this.value1 === '1') {
          this.dataList = this.our.MemberList
        }
        if(this.value1 === '2') {
          this.dataList = this.our2.MemberList
        }
        if(this.value1 === '3') {
          this.dataList = this.our3.MemberList
        }
      } else {
        if(this.value1 === '1') {
          this.dataList = this.enemy.MemberList
        }
        if(this.value1 === '2') {
          this.dataList = this.enemy2.MemberList
        }
        if(this.value1 === '3') {
          this.dataList = this.enemy3.MemberList
        }
      }
      const commander = [...new Set(this.dataList.map(obj => obj['所在团长']))];
      this.options2 = commander.map(item => {
        return {
          label: item,
          value: item
        }
      })
      console.log(this.dataList, '====>>>> this.dataList');
      this.showList = this.dataList
    },
    changeSession(val) {
      this.value2 = null
      this.value3 = null
      if(this.value === '1') {
        if(val === '1') {
          this.dataList = this.our.MemberList
        }
        if(val === '2') {
          this.dataList = this.our2.MemberList
        }
        if(val === '3') {
          this.dataList = this.our3.MemberList
        }
      } else {
        if(val === '1') {
          this.dataList = this.enemy.MemberList
        }
        if(val === '2') {
          this.dataList = this.enemy2.MemberList
        }
        if(val === '3') {
          this.dataList = this.enemy3.MemberList
        }
      }
      this.showList = this.dataList
      const commander = [...new Set(this.dataList.map(obj => obj['所在团长']))];
      this.options2 = commander.map(item => {
        return {
          label: item,
          value: item
        }
      })
    },
    changeCommander(val) {
      if(val) {
        const newList = this.dataList.filter(item => {
          if(this.value3) {
            if(item['所在团长'] === val && item['职业'] === this.value3) {
              return item
            }
          } else{
            if(item['所在团长'] === val) {
              return item
            }
          }
        })
        this.showList = newList
      } else {
        const newList = this.dataList.filter(item => {
          if(this.value3) {
            if(item['职业'] === this.value3) {
              return item
            }
          } else{
            return item
          }
        })
        this.showList = newList
      }
      
    },
    changeOccupation(val) {
      if(val) {
        const newList = this.dataList.filter(item => {
          if(this.value2) {
            if(item['职业'] === val && item['所在团长'] === this.value2) {
              return item
            }
          } else{
            if(item['职业'] === val) {
              return item
            }
          }
        })
        this.showList = newList
      } else {
        const newList = this.dataList.filter(item => {
          if(this.value2) {
            if(item['所在团长'] === this.value2) {
              return item
            }
          } else{
            return item
          }
        })
        this.showList = newList
      }
    },
  },
}
</script >
<style lang="scss">

.data-box {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
}
.select-item {
  margin-bottom: 20px;
}

.ty {
  color: #ff9216;
}

.xh {
  color: #d42525;
}

.sw {
  color: #ff77ab;
}

.jl {
  color: #ac4de2;
}

.hy {
  color: #b5d2e1;
}

.cg {
  color: #7bbbef;
}

.sx {
  color: #3676de;
}

.xj {
  color: #ffdf79;
}

.ly {
  color: #70ad47;
}

.sm {
  color: #0ea5dc;
}

.hyin {
  color: #dede12;
}
.hightData {
  color: #d42525;
}
</style>
