import requests
from flask import abort

nhl_url = 'https://statsapi.web.nhl.com/api/v1/'


def nhl_request(path, **kwargs):
    res = requests.get(nhl_url+path, **kwargs)
    if res.status_code == 200:
        return res.json()
    try:
        abort(res.status_code, res.json()['message'])
    except:
        abort(res.status_code, 'NHL API Error')


def get_player(player_id, params={}):
    response = nhl_request(f'people/{player_id}', params=params)
    return response['people'][0]


def get_player_stats(player_id, params={}):
    response = nhl_request(f'people/{player_id}/stats', params=params)
    return response['stats']


def get_teams(params={}):
    response = nhl_request('teams', params=params)
    return response['teams']


def get_team(team_id, params={}):
    response = nhl_request(f'teams/{team_id}', params=params)
    return response['teams'][0]


def get_team_stats(team_id, params={}):
    response = nhl_request(f'teams/{team_id}/stats', params=params)
    return response['stats']


def get_team_roster(team_id, params={}):
    response = nhl_request(
        f'teams/{team_id}?expand=team.roster', params=params)
    return response['teams'][0]['roster']['roster']


def get_schedule(params={}):
    response = nhl_request('schedule', params=params)
    return response


def get_game(game_pk, params={}):
    response = nhl_request(f'game/{game_pk}/feed/live', params=params)
    return response['gameData']
