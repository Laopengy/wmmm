<template>
  <div class="session">
    <el-table
      :data="memberData"
      border
      :max-height="`${tableHeight}`"
      style="width: 100%">
      <el-table-column
        prop="名称"
        label="姓名">
        <template slot-scope="scoped">
          <!-- 铁衣 -->
          <span v-if="scoped.row['职业'] === '铁衣'" class="ty">{{ scoped.row['名称'] }}</span>
          <!-- 血河 -->
          <span v-if="scoped.row['职业'] === '血河'" class="xh">{{ scoped.row['名称'] }}</span>
          <!-- 素问 -->
          <span v-if="scoped.row['职业'] === '素问'" class="sw">{{ scoped.row['名称'] }}</span>
          <!-- 九零 -->
          <span v-if="scoped.row['职业'] === '九灵'" class="jl">{{ scoped.row['名称'] }}</span>
          <!-- 荒羽 -->
          <span v-if="scoped.row['职业'] === '荒羽'" class="hy">{{ scoped.row['名称'] }}</span>
          <!-- 潮光 -->
          <span v-if="scoped.row['职业'] === '潮光'" class="cg">{{ scoped.row['名称'] }}</span>
          <!-- 神相 -->
          <span v-if="scoped.row['职业'] === '神相'" class="sx">{{ scoped.row['名称'] }}</span>
          <!-- 玄机 -->
          <span v-if="scoped.row['职业'] === '玄机'" class="xj">{{ scoped.row['名称'] }}</span>
          <!-- 龙吟 -->
          <span v-if="scoped.row['职业'] === '龙吟'" class="ly">{{ scoped.row['名称'] }}</span>
          <!-- 碎梦 -->
          <span v-if="scoped.row['职业'] === '碎梦'" class="sm">{{ scoped.row['名称'] }}</span>
          <!-- 鸿音 -->
          <span v-if="scoped.row['职业'] === '鸿音'" class="hyin">{{ scoped.row['名称'] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="职业"
        sortable
        label="职业">
      </el-table-column>
      <el-table-column
        prop="职位"
        sortable
        label="职位">
      </el-table-column>
      <el-table-column
        prop="装评"
        sortable
        label="战力">
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import memberList from '@/file/member/member.json'

export default {
  name: 'memberView',
  components: {
  },
  data() {
    return {
      tableHeight: null,
      memberData: [],
    }
  },

  mounted() {
    const contentBox = document.getElementsByClassName('right-data')[0]
    this.tableHeight = contentBox.offsetHeight
    this.memberData = memberList.data
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
