import { defineStore } from 'pinia';

export const useLeagueStore = defineStore('league', {
  state: () => ({
    leagueList: [],
  }),
  actions: {
    getLeagueList() {
      this.leagueList = []
    },
  },
});
