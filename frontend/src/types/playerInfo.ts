export interface PlayerIcon {
  id: number;
  url?: string;
}

export interface PlayerClub {
  tag: string;
  name: string;
}

export interface PlayerInfo {
  tag: string;
  name: string;
  nameColor: string;
  icon: PlayerIcon;
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
  club?: PlayerClub;
}

export interface PlayerRanking extends PlayerInfo {
  rank: number;
}

export interface BrawlAPIPlayerIcon {
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
