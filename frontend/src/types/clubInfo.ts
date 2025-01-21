export interface Club {
  tag: string;
  name: string;
  description: string;
  type: "open" | "inviteOnly" | "closed";
  badgeId: number;
  badgeUrl?: string;
  requiredTrophies: number;
  trophies: number;
  members: ClubMember[];
}

export interface ClubMember {
  tag: string;
  name: string;
  nameColor: string;
  role: string;
  trophies: number;
  icon: {
    id: number;
    url?: string;
  };
}

export interface ClubRanking {
  rank: number;
  name: string;
  tag: string;
  badgeUrl?: string;
  badgeId: number;
  memberCount: number;
  trophies: number;
}
