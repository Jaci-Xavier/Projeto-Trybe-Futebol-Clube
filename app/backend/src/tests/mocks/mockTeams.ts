export type Team = {
  id: number;
  teamName: string;
}

const mockTeam: Team = {
  id: 1,
  teamName: "Avaí/Kindermann",
} 


const mockTeams: Array<Team> = [
  {
    id: 1,
    teamName: "Avaí/Kindermann",
  },
  {
    id: 2,
    teamName: "Bahia",
  },
  {
    id: 3,
    teamName: "Botafogo",
  },
]

export { mockTeams, mockTeam };