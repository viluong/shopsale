import json

import requests


def google_request_oauth2(token):
    payload = {'access_token': token}  # validate the token
    r = requests.get('https://www.googleapis.com/oauth2/v2/userinfo', params=payload)
    data = json.loads(r.text)

    return data


def test_111(data):
    return google_request_oauth2(data.get('token'))
