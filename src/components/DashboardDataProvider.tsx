"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useAuth } from "./AuthProvider";
import {
  listTeams,
  getTeamMembers,
  getTeamNodes,
  type Team,
  type Member,
  type Node,
} from "@/lib/api";

interface TeamDetail {
  team: Team;
  members: Member[];
  nodes: Node[];
}

interface DashboardStats {
  totalTeams: number;
  totalMembers: number;
  totalNodes: number;
  activeNodes: number;
  teamsOwned: number;
  teamsMember: number;
}

interface DashboardContextValue {
  stats: DashboardStats;
  teams: Team[];
  teamDetails: TeamDetail[];
  loading: boolean;
  refresh: () => Promise<void>;
}

const emptyStats: DashboardStats = {
  totalTeams: 0,
  totalMembers: 0,
  totalNodes: 0,
  activeNodes: 0,
  teamsOwned: 0,
  teamsMember: 0,
};

const DashboardContext = createContext<DashboardContextValue>({
  stats: emptyStats,
  teams: [],
  teamDetails: [],
  loading: true,
  refresh: async () => {},
});

export function useDashboardData() {
  return useContext(DashboardContext);
}

const ACTIVE_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes

export function DashboardDataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamDetails, setTeamDetails] = useState<TeamDetail[]>([]);
  const [stats, setStats] = useState<DashboardStats>(emptyStats);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const teamList = await listTeams();
      setTeams(teamList);

      const details = await Promise.all(
        teamList.map(async (team) => {
          const [members, nodes] = await Promise.all([
            getTeamMembers(team.team_id).catch(() => [] as Member[]),
            getTeamNodes(team.team_id).catch(() => [] as Node[]),
          ]);
          return { team, members, nodes };
        })
      );
      setTeamDetails(details);

      const uniqueEmails = new Set<string>();
      let totalNodes = 0;
      let activeNodes = 0;
      const now = Date.now();

      for (const d of details) {
        for (const m of d.members) uniqueEmails.add(m.email);
        totalNodes += d.nodes.length;
        activeNodes += d.nodes.filter(
          (n) => now - n.last_heartbeat * 1000 < ACTIVE_THRESHOLD_MS
        ).length;
      }

      setStats({
        totalTeams: teamList.length,
        totalMembers: uniqueEmails.size,
        totalNodes,
        activeNodes,
        teamsOwned: teamList.filter((t) => t.role === "owner").length,
        teamsMember: teamList.filter((t) => t.role === "member").length,
      });
    } catch {
      // stats stay at defaults
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <DashboardContext.Provider
      value={{ stats, teams, teamDetails, loading, refresh: fetchAll }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
