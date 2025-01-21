export interface Player {
  tag: string;
  name: string;
  nameColor: string;
  icon: {
    id: number;
    url?: string;
  };
  trophies: number;
  highestTrophies: number;
  expLevel: number;
  expPoints: number;
  isQualifiedFromChampionshipChallenge: boolean;
  "3vs3Victories": number;
  soloVictories: number;
  duoVictories: number;
  bestRoboRumbleTime: number;
  bestTimeAsBigBrawler: number;
  club?: {
    tag: string;
    name: string;
    badgeId?: number;
    badgeUrl?: string;
  };
}

export interface PlayerRanking extends Player {
  rank: number;
}

export interface BrawlAPIIcon {
  id: number;
  name: string;
  name2: string;
  imageUrl: string;
  brawler: string | null;
  requiredTotalTrophies: number;
  sortOrder: number;
  isReward: boolean;
  isAvailableForOffers: boolean;
}
