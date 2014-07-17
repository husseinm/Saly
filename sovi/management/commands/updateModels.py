import requests
from sovi.api.teams.models import Team, TeamName, TeamWebsite
from sovi.metadata.models import TeamLastModify
from django.core.management.base import BaseCommand
from django.core.exceptions import ObjectDoesNotExist


class Command(BaseCommand):
    help = 'Updates all models from TBA website in case of changes'

    def handle(self, *args, **options):
        headers = {
            'X-TBA-App-Id': '180:Sovi-Scouting_System:0.0.1',
            'If-Modified-Since': ''
        }
        baseUrl = 'http://www.thebluealliance.com/api/v2/'
        data = ['Not Empty']
        currentPage = 0
        importedTeams = 0

        while data:
            try:
                lastModified = TeamLastModify.objects.get(page=currentPage)
                headers['If-Modified-Since'] = lastModified.time
            except ObjectDoesNotExist:
                lastModified = TeamLastModify(page=currentPage)

            query = 'teams/' + str(currentPage)
            response = requests.get(baseUrl + query, headers=headers)
            response.raise_for_status()

            if not response.status_code == 304:
                lastModified.time = response.headers['last-modified']
                lastModified.save()

                data = response.json()

                for team in data:
                    teamWebsite = None
                    teamName = None
                    name = ''
                    country = ''
                    region = ''
                    locality = ''

                    if team['name'] and team['nickname']:
                        name = team['name'] + ' - ' + team['nickname']
                    elif team['name']:
                        name = team['name']
                    else:
                        name = team['nickname']

                    if name:
                        teamName = TeamName(number=team['team_number'],
                                            name=name)
                        teamName.save()

                    if team['website']:
                        teamWebsite = TeamWebsite(number=team['team_number'],
                                                  website=team['website'])
                        teamWebsite.save()

                    if team['country_name']:
                        country = team['country_name']
                    if team['region']:
                        region = team['region']
                    if team['locality']:
                        locality = team['locality']

                    team = Team(number=team['team_number'],
                                name=teamName,
                                website=teamWebsite,
                                country=country,
                                region=region,
                                locality=locality)

                    team.save()
                    importedTeams += 1

            currentPage += 1
        self.stdout.write("Successfully imported " + str(importedTeams) +
                          " teams")
