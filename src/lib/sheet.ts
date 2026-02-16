//The name and code suggests this file does the spreadsheet/server stuff

import { keys, lastGet, matches, response, teams } from "$lib/store";
import type {
  Team,
  Alliance,
  Match,
  Response,
  Input
} from "$lib/types";
import { get as getStore } from "svelte/store";
import { PUBLIC_API_URL } from "$env/static/public";

//gets data from spreadsheet
export const get = async () => {
  try {
    const response = await fetch(PUBLIC_API_URL);
    const {
      matches: match_array,
      teams: team_array
    }: Record<string, any[][]> = await response.json();
    setMatches(match_array);
    setTeams(team_array as [number, string][]);
    lastGet.set(Date.now());
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

//Formats app data so it can be sent to the spreadsheet
export const append = async (responseQueue: Response[]) => {
  const body = JSON.stringify(responseQueue.map((response) => ({
    team: response.team,
    match: response.match,
    scout: response.scout,
    alliance: response.alliance,
    type: response.type.name,
    id: response.id,
    ...response.data
  })));

  console.log(body);

  try {
    await fetch(PUBLIC_API_URL, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
    });
    return true;
  } catch {
    return false;
  }
};

const setTeams = (team_array: [number, string][]) => {
  const team_obj: Record<number, Team> = {};
  team_array.forEach(
    (team) =>
      (team_obj[team[0]] = {
        number: team[0],
        name: team[1],
      })
  );
  teams.set(team_obj);
};

const setMatches = (match_array: number[][]) => {
  const match_obj: Record<number, Match> = {};
  match_array.forEach(
    (match, i) =>
      (match_obj[i + 1] = {
        number: i + 1,
        red_alliance: match.slice(0, 3) as Alliance,
        blue_alliance: match.slice(3, 6) as Alliance,
        red_score: match[6],
        blue_score: match[7],
      })
  );
  matches.set(match_obj);
};

//I think this just turns an array of columns into an array of rows
const transpose = <T>(matrix: T[][]) =>
  matrix[0].map((_, i) => matrix.map((array) => array[i]));
