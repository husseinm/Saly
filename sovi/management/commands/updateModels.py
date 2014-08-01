import requests
from sovi.api.teams.models import Team
from sovi.api.events.models import Event
from sovi.metadata.models import LastModify
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

        # Teams
        while data:
            # TODO: DRY
            try:
                lastModified = LastModify.objects.get(page=currentPage,
                                                      model='team')
                headers['If-Modified-Since'] = lastModified.time
            except ObjectDoesNotExist:
                lastModified = LastModify(page=currentPage,
                                          model='team')

            query = 'teams/' + str(currentPage)

            # TODO: DRY
            response = requests.get(baseUrl + query, headers=headers)
            response.raise_for_status()

            if not response.status_code == 304:
                lastModified.time = response.headers['last-modified']
                lastModified.save()

                data = response.json()

                # TODO: BEGIN
                for team in data:
                    website = ''
                    name = ''
                    country = ''
                    region = ''
                    locality = ''

                    if team['nickname'] is not None:
                        name = team['nickname']
                    if team['website'] is not None:
                        website = team['website']
                    if team['country_name'] is not None:
                        country = team['country_name']
                    if team['region'] is not None:
                        region = team['region']
                    if team['locality'] is not None:
                        locality = team['locality']

                    team = Team(number=team['team_number'],
                                name=name,
                                website=website,
                                country=country,
                                region=region,
                                locality=locality)

                    team.save()
                    importedTeams += 1
                    # TODO: End

            currentPage += 1
        self.stdout.write("Successfully imported " + str(importedTeams) +
                          " teams")


        # Events
        data = ['Not Empty']
        # TODO: DRY
        try:
            lastModified = LastModify.objects.get(page=currentPage,
                                                  model='events')
            headers['If-Modified-Since'] = lastModified.time
        except ObjectDoesNotExist:
            lastModified = LastModify(page=currentPage,
                                      model='events')

        query = 'events/'
        importedEvents = 0

        # TODO: DRY
        response = requests.get(baseUrl + query, headers=headers)
        response.raise_for_status()

        if not response.status_code == 304:
            lastModified.time = response.headers['last-modified']
            lastModified.save()

            data = response.json()

            # TODO: BEGIN
            for event in data:
                eventName = ''
                eventWebsite = ''

                if event['name']:
                    eventName = event['name']

                if event['website']:
                    eventWebsite = event['website']

                try:
                    Event.objects.get(name=eventName,
                                      isOfficial=event['official'],
                                      website=eventWebsite)
                except ObjectDoesNotExist:
                    event = Event(name=eventName, isOfficial=event['official'],
                                  website=eventWebsite)
                    event.save()
                    importedEvents += 1

        self.stdout.write("Successfully imported " + str(importedEvents) +
                          " events")
