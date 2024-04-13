import { defineStore } from 'pinia';
import SaturdayExcel from '@/file/data/Saturday.json'

export const useSaturdaystore = defineStore('Saturday', {
  state: () => ({
    our3: {
      name: '',
      MemberList: [],
      MemberLength: 0,
      OccupationalData: {}, // 我方职业数据
      AllData: {}, // 我方总数据
      AverageData: {}, // 我方平均数据
      HighestData: {}, // 我方最高数据
      SoldierCount: 0, // 我方输出人数
      MtCount: 0, // 我方铁衣人数
      DoctorCount: 0, // 我方素问人数
      OkuribitoCount: 0, // 我方90人数
    },
    enemy3: {
      name: '',
      MemberList: [],
      MemberLength: 0,
      AllData: {}, // 敌方总数据
      OccupationalData: {}, // 敌方职业数据
      AverageData: {}, // 敌方平均数据
      HighestData: {}, // 敌方最高数据
      SoldierCount: 0, // 我方输出人数
      MtCount: 0, // 我方铁衣人数
      DoctorCount: 0, // 我方素问人数
      OkuribitoCount: 0, // 我方90人数
    },
    maxData3: {
      dp: 0, // 对玩家伤害
      dc: 0, // 塔伤
      assets: 0, // 战备资源
      controls: 0, // 控制
      healing: 0, // 治疗量
    }

  }),
  actions: {
    getLeagueList() {
      this.leagueList = []
    },
    initSaturday() {
      let ourMemberCount = 0
      let enemyMemberCount = 0
      let ourMemberList = []
      let enemyMemberList = []
      let ourSoldierCount = 0 // 我方输出人数
      let ourMtCount = 0 // 我方铁衣人数
      let ourDoctorCount = 0 // 我方素问人数
      let ourOkuribitoCount = 0 // 我方90人数

      let enemyName = '' // 敌方帮会名
      let enemySoldierCount = 0 // 敌方输出人数
      let enemyMtCount = 0 // 敌方铁衣人数
      let enemyDoctorCount = 0 // 敌方素问人数
      let enemyOkuribitoCount = 0 // 敌方90人数
      // 我方
      // 计算平均数据
      let ourAggregate = {
        aggregateDefeat: 0, // 击败
        aggregateAssist: 0, // 助攻
        aggregateRevive: 0, // 化羽
        aggregateHurtTower: 0, // 塔伤
        aggregateHurt: 0, // 人伤
        aggregateAssets: 0, // 战备资源
        aggregateCombinedInjury: 0, // 总伤
        aggregateTakeDamage: 0, // 承受伤害
        aggregateControls: 0, // 控制
        aggregateHeal: 0, // 治疗
        aggregateDeath: 0, // 重伤
        aggregateCremation: 0, // 青灯焚骨
      }
      // 统计数据
      let ourOccupational = {
        "铁衣": 0,
        "血河": 0,
        "素问": 0,
        "九灵": 0,
        "荒羽": 0,
        "潮光": 0,
        "神相": 0,
        "玄机": 0,
        "龙吟": 0,
        "碎梦": 0,
        "鸿音": 0,
      }
      // 敌方
      // 计算平均数据
      let enemyAggregate = {
        aggregateDefeat: 0, // 击败
        aggregateAssist: 0, // 助攻
        aggregateRevive: 0, // 化羽
        aggregateHurtTower: 0, // 塔伤
        aggregateHurt: 0, // 人伤
        aggregateAssets: 0, // 战备资源
        aggregateCombinedInjury: 0, // 总伤
        aggregateTakeDamage: 0, // 承受伤害
        aggregateControls: 0, // 控制
        aggregateHeal: 0, // 治疗
        aggregateDeath: 0, // 重伤
        aggregateCremation: 0, // 青灯焚骨
      }
      // 统计数据
      let enemyOccupational = {
        "铁衣": 0,
        "血河": 0,
        "素问": 0,
        "九灵": 0,
        "荒羽": 0,
        "潮光": 0,
        "神相": 0,
        "玄机": 0,
        "龙吟": 0,
        "碎梦": 0,
        "鸿音": 0,
      }
      // 击败
      // 助攻
      // 化羽
      // 对建筑伤害
      // 对玩家伤害
      // 帮会名
      // 战备资源
      // 所在团长
      // 承受伤害
      // 控制
      // 治疗值
      // 玩家
      // 等级
      // 职业
      // 重伤
      // 青灯焚骨
      SaturdayExcel.data.forEach(item => {
        if(item['帮会名'] === '满月') {
          ourMemberCount++
          ourAggregate.aggregateCombinedInjury += item['对建筑伤害'] + item['对玩家伤害']
          ourAggregate.aggregateDefeat += item['击败']
          ourAggregate.aggregateAssist += item['助攻']
          ourAggregate.aggregateRevive += item['化羽']
          ourAggregate.aggregateHurtTower += item['对建筑伤害']
          ourAggregate.aggregateHurt += item['对玩家伤害']
          ourAggregate.aggregateAssets += item['战备资源']
          ourAggregate.aggregateTakeDamage += item['承受伤害']
          ourAggregate.aggregateControls += item['控制']
          ourAggregate.aggregateHeal += item['治疗值']
          ourAggregate.aggregateDeath += item['重伤']
          ourAggregate.aggregateCremation += item['青灯焚骨']
          ourMemberList.push({
            ...item,
            '总伤': item['对建筑伤害'] + item['对玩家伤害']
          })
          ourOccupational[item['职业']]++
          if(item['职业'] === '铁衣') {
            ourMtCount++
          }
          if(item['职业'] === '素问') {
            ourDoctorCount++
          } else {
            ourSoldierCount++
          }
          if(item['职业'] === '九灵') {
            ourOkuribitoCount++
          }
        } else {
          enemyName = item['帮会名']
          enemyMemberCount++
          enemyAggregate.aggregateCombinedInjury += item['对建筑伤害'] + item['对玩家伤害']
          enemyAggregate.aggregateDefeat += item['击败']
          enemyAggregate.aggregateAssist += item['助攻']
          enemyAggregate.aggregateRevive += item['化羽']
          enemyAggregate.aggregateHurtTower += item['对建筑伤害']
          enemyAggregate.aggregateHurt += item['对玩家伤害']
          enemyAggregate.aggregateAssets += item['战备资源']
          enemyAggregate.aggregateTakeDamage += item['承受伤害']
          enemyAggregate.aggregateControls += item['控制']
          enemyAggregate.aggregateHeal += item['治疗值']
          enemyAggregate.aggregateDeath += item['重伤']
          enemyAggregate.aggregateCremation += item['青灯焚骨']
          enemyMemberList.push(item)
          enemyOccupational[item['职业']]++
          if(item['职业'] === '铁衣') {
            enemyMtCount++
          }
          if(item['职业'] === '素问') {
            enemyDoctorCount++
          } else {
            enemySoldierCount++
          }
          if(item['职业'] === '九灵') {
            enemyOkuribitoCount++
          }
        }
      })
      // 我方数据输出
      this.our3 = {
        name: '满月',
        MemberList: ourMemberList,
        MemberLength: ourMemberCount,
        AllData: {
          ...ourAggregate
        },
        SoldierCount: ourSoldierCount,
        ourMtCount: ourMtCount,
        DoctorCount: ourDoctorCount,
        OkuribitoCount: ourOkuribitoCount,
        AverageData: {
          averageDefeat: ourAggregate.aggregateDefeat / ourSoldierCount, // 平均击败
          averageAssist: ourAggregate.aggregateAssist / ourMemberCount, // 平均助攻
          averageRevive: ourAggregate.aggregateRevive / ourDoctorCount, // 平均化羽
          averageHurtTower: ourAggregate.aggregateHurtTower / ourSoldierCount, // 平均塔伤
          averageHurt: ourAggregate.aggregateHurt / ourSoldierCount, // 平均人伤
          averageAssets: ourAggregate.aggregateAssets / ourMemberCount, // 平均战备资源
          averageCombinedInjury: ourAggregate.aggregateCombinedInjury / ourSoldierCount, // 平均总伤
          averageTakeDamage: ourAggregate.aggregateTakeDamage / ourMemberCount, // 平均承受伤害
          averageControls: ourAggregate.aggregateControls / ourMtCount, // 平均控制
          averageHeal: ourAggregate.aggregateHeal / ourDoctorCount, // 平均治疗
          averageDeath: ourAggregate.aggregateDeath / ourMemberCount, // 平均重伤
          averageCremation: ourAggregate.aggregateCremation / ourOkuribitoCount, // 平均青灯焚骨
        },
        HighestData: {
          HighestDefeat: this.findMax(ourMemberList, '击败'), // 击败
          HighestAssist: this.findMax(ourMemberList, '助攻'), // 助攻
          HighestRevive: this.findMax(ourMemberList, '化羽'), // 化羽
          HighestHurtTower: this.findMax(ourMemberList, '对建筑伤害'), // 塔伤
          HighestHurt: this.findMax(ourMemberList, '对玩家伤害'), // 人伤
          HighestAssets: this.findMax(ourMemberList, '战备资源'), // 战备资源
          HighestCombinedInjury: this.findMax(ourMemberList, '总伤'), // 总伤
          HighestTakeDamage: this.findMax(ourMemberList, '承受伤害'), // 承受伤害
          HighestControls: this.findMax(ourMemberList, '控制'), // 控制
          HighestHeal: this.findMax(ourMemberList, '治疗值'), // 治疗
          HighestDeath: this.findMax(ourMemberList, '重伤'), // 重伤
          HighestCremation: this.findMax(ourMemberList, '青灯焚骨'), // 青灯焚骨
        },
      },
      // 敌方输出输出
      this.enemy3 = {
        name: enemyName,
        MemberList: enemyMemberList,
        MemberLength: enemyMemberCount,
        AllData: {
          ...enemyAggregate
        },
        SoldierCount: enemySoldierCount,
        enemyMtCount: enemyMtCount,
        DoctorCount: enemyDoctorCount,
        OkuribitoCount: enemyOkuribitoCount,
        AverageData: {
          averageDefeat: enemyAggregate.aggregateDefeat / enemySoldierCount, // 平均击败
          averageAssist: enemyAggregate.aggregateAssist / enemyMemberCount, // 平均助攻
          averageRevive: enemyAggregate.aggregateRevive / enemyDoctorCount, // 平均化羽
          averageHurtTower: enemyAggregate.aggregateHurtTower / enemySoldierCount, // 平均塔伤
          averageHurt: enemyAggregate.aggregateHurt / enemySoldierCount, // 平均人伤
          averageAssets: enemyAggregate.aggregateAssets / enemyMemberCount, // 平均战备资源
          averageCombinedInjury: enemyAggregate.aggregateCombinedInjury / enemySoldierCount, // 平均总伤
          averageTakeDamage: enemyAggregate.aggregateTakeDamage / enemyMemberCount, // 平均承受伤害
          averageControls: enemyAggregate.aggregateControls / enemyMtCount, // 平均控制
          averageHeal: enemyAggregate.aggregateHeal / enemyDoctorCount, // 平均治疗
          averageDeath: enemyAggregate.aggregateDeath / enemyMemberCount, // 平均重伤
          averageCremation: enemyAggregate.aggregateCremation / enemyOkuribitoCount, // 平均青灯焚骨
        },
        HighestData: {
          HighestDefeat: this.findMax(enemyMemberList, 'aggregateDefeat'), // 击败
          HighestAssist: this.findMax(enemyMemberList, 'aggregateAssist'), // 助攻
          HighestRevive: this.findMax(enemyMemberList, 'aggregateRevive'), // 化羽
          HighestHurtTower: this.findMax(enemyMemberList, 'aggregateHurtTower'), // 塔伤
          HighestHurt: this.findMax(enemyMemberList, 'aggregateHurt'), // 人伤
          HighestAssets: this.findMax(enemyMemberList, 'aggregateAssets'), // 战备资源
          HighestCombinedInjury: this.findMax(enemyMemberList, 'aggregateCombinedInjury'), // 总伤
          HighestTakeDamage: this.findMax(enemyMemberList, 'aggregateTakeDamage'), // 承受伤害
          HighestControls: this.findMax(enemyMemberList, 'aggregateControls'), // 控制
          HighestHeal: this.findMax(enemyMemberList, 'aggregateHeal'), // 治疗
          HighestDeath: this.findMax(enemyMemberList, 'aggregateDeath'), // 重伤
          HighestCremation: this.findMax(enemyMemberList, 'aggregateCremation'), // 青灯焚骨
        },
      },
      this.maxData3 = {
        dp: this.our3.AllData.aggregateHurt > this.enemy3.AllData.aggregateHurt ? this.our3.AllData.aggregateHurt :  this.enemy3.AllData.aggregateHurt, // 对玩家伤害
        dc: this.our3.AllData.aggregateHurtTower > this.enemy3.AllData.aggregateHurtTower ? this.our3.AllData.aggregateHurtTower :  this.enemy3.AllData.aggregateHurtTower, // 塔伤
        assets: this.our3.AllData.aggregateAssets > this.enemy3.AllData.aggregateAssets ? this.our3.AllData.aggregateAssets :  this.enemy3.AllData.aggregateAssets, // 战备资源
        controls: this.our3.AllData.aggregateControls > this.enemy3.AllData.aggregateControls ? this.our3.AllData.aggregateControls :  this.enemy3.AllData.aggregateControls, // 控制
        healing: this.our3.AllData.aggregateHeal > this.enemy3.AllData.aggregateHeal ? this.our3.AllData.aggregateHeal :  this.enemy3.AllData.aggregateHeal, // 治疗量
      }
      console.log(this.our3, '======>>>>> 03我方数据输出')
      console.log(this.enemy3, '======>>>>> 03敌方输出输出')
    },
    // 寻找最大值
    findMax(obj, key) {
      return obj.reduce((maxObj, currentObj) => {  
        return maxObj[key] > currentObj[key] ? maxObj : currentObj;  
      })
    }
  },
});
