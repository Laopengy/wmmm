<template>
  <div class="session">
    <el-table
      :data="memberList"
      border
      :max-height="`${tableHeight}`"
      style="width: 100%">
      <el-table-column
        prop="userName"
        label="姓名">
        <template slot-scope="scoped">
          <!-- 铁衣 -->
          <span v-if="scoped.row.occupation === '铁衣'" class="ty">{{ scoped.row.userName }}</span>
          <!-- 血河 -->
          <span v-if="scoped.row.occupation === '血河'" class="xh">{{ scoped.row.userName }}</span>
          <!-- 素问 -->
          <span v-if="scoped.row.occupation === '素问'" class="sw">{{ scoped.row.userName }}</span>
          <!-- 九零 -->
          <span v-if="scoped.row.occupation === '九灵'" class="jl">{{ scoped.row.userName }}</span>
          <!-- 荒羽 -->
          <span v-if="scoped.row.occupation === '荒羽'" class="hy">{{ scoped.row.userName }}</span>
          <!-- 潮光 -->
          <span v-if="scoped.row.occupation === '潮光'" class="cg">{{ scoped.row.userName }}</span>
          <!-- 神相 -->
          <span v-if="scoped.row.occupation === '神相'" class="sx">{{ scoped.row.userName }}</span>
          <!-- 玄机 -->
          <span v-if="scoped.row.occupation === '玄机'" class="xj">{{ scoped.row.userName }}</span>
          <!-- 龙吟 -->
          <span v-if="scoped.row.occupation === '龙吟'" class="ly">{{ scoped.row.userName }}</span>
          <!-- 碎梦 -->
          <span v-if="scoped.row.occupation === '碎梦'" class="sm">{{ scoped.row.userName }}</span>
          <!-- 鸿音 -->
          <span v-if="scoped.row.occupation === '鸿音'" class="hyin">{{ scoped.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="occupation"
        label="职业">
      </el-table-column>
      <el-table-column
        prop="position"
        label="职位">
      </el-table-column>
      <el-table-column
        prop="combatPower"
        sortable
        label="战力">
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import memberData from '../../../stores/memberData.js'

export default {
  name: 'memberView',
  components: {
  },
  data() {
    return {
      memberList: [],
      tableHeight: null,
    }
  },

  mounted() {
    this.memberList = memberData
    const contentBox = document.getElementsByClassName('right-data')[0]
    this.tableHeight = contentBox.offsetHeight
    console.dir( this.tableHeight, '=====>>>>>  this.tableHeight');

  },
  methods: {

  },
}
</script >
<style lang="scss">
.session {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
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
</style>
