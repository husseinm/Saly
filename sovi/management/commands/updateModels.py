import requests
from datetime import date
from sovi.api.teams.models import Team
from sovi.api.events.models import Event
from sovi.api.awards.models import Award, AwardType
from sovi.metadata.models import LastModify
from django.core.management.base import BaseCommand
from django.core.exceptions import ObjectDoesNotExist


class Command(BaseCommand):
    help = 'Updates all models from TBA website in case of changes'
    awardTypes = ['Chairmans', 'Winner', 'Finalist', 'Woodie Flowers',
                  'Deans List', 'Volunteer', 'Founders', 'Bart Kamen Memorial',
                  'Make It Loud', 'Engineering Inspiration',
                  'Rookie All Star', 'Gracious Professionalism',
                  'Coopertition', 'Judges', 'Highest Rookie Seed',
                  'Rookie Inspiration', 'Industrial Design',
                  'Quality', 'Safety', 'Sportsmanship', 'Creativity',
                  'Engineering Excellence', 'Entrepreneurship',
                  'Excellence In Design', 'Excellence In Design Cad',
                  'Excellence In Design Animation',
                  'Driving Tomorrows Technology', 'Imagery',
                  'Media And Technology', 'Innovation In Control',
                  'Spirit', 'Website', 'Visualization',
                  'Autodesk Inventor', 'Future Innovator',
                  'Recognition Of Extraordinary Service',
                  'Outstanding Cart', 'Wsu Aim Higher',
                  'Leadership In Control', 'Num 1 Seed',
                  'Incredible Play', 'Peoples Choice Animation',
                  'Visualization Rising Star', 'Best Offensive Round',
                  'Best Play Of The Day', 'Featherweight In The Finals',
                  'Most Photogenic', 'Outstanding Defense',
                  'Power To Simplify', 'Against All Odds',
                  'Rising Star', 'Chairmans Honorable Mention',
                  'Content Communication Honorable Mention',
                  'Technical Execution Honorable Mention',
                  'Realization', 'Realization Honorable Mention',
                  'Design Your Future',
                  'Design Your Future Honorable Mention',
                  'Special Recognition Character Animation',
                  'High Score', 'Teacher Pioneer',
                  'Best Craftsmanship', 'Best Defensive Match',
                  'Play Of The Day', 'Programming', 'Professionalism',
                  'Golden Corndog']

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
        self.stdout.write("-----------")
        self.stdout.write("-- Teams --")
        self.stdout.write("-----------")
        while data:
            query = 'teams/' + str(currentPage)

            self.stdout.write("Requesting page #" + str(currentPage))
            response = requests.get(baseUrl + query, headers=headers,
                                    timeout=10)
            response.raise_for_status()

            data = response.json()

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

            currentPage += 1
        self.stdout.write("\nSuccessfully imported " + str(importedTeams) +
                          " teams\n\n\n")

        # Events
        self.stdout.write("------------")
        self.stdout.write("-- Events --")
        self.stdout.write("------------")
        data = ['Not Empty']
        try:
            lastModified = LastModify.objects.get(page=currentPage,
                                                  model='events')
            headers['If-Modified-Since'] = lastModified.time
        except ObjectDoesNotExist:
            lastModified = LastModify(page=currentPage,
                                      model='events')

        query = 'events/'
        importedEvents = 0

        self.stdout.write("Requesting all Events")
        response = requests.get(baseUrl + query, headers=headers)
        response.raise_for_status()

        if not response.status_code == 304:
            lastModified.time = response.headers['last-modified']
            lastModified.save()

            data = response.json()
            self.stdout.write(">  Request was successful, now applying to" +
                              " DB\n")

            for event in data:
                eventName = ''
                eventWebsite = ''

                if event['name']:
                    eventName = event['name']

                if event['website']:
                    eventWebsite = event['website']

                try:
                    Event.objects.get(id=event['event_code'],
                                      name=eventName,
                                      isOfficial=event['official'],
                                      website=eventWebsite)
                except ObjectDoesNotExist:
                    event = Event(id=event['event_code'],
                                  name=eventName,
                                  isOfficial=event['official'],
                                  website=eventWebsite)
                    event.save()
                    importedEvents += 1
        else:
            self.stdout.write(">  Request was successful, but data has not " +
                              " been modified\n")

        self.stdout.write("\nSuccessfully imported " + str(importedEvents) +
                          " events\n\n\n")

        # Awards
        self.stdout.write("------------------")
        self.stdout.write("-- Awards Names --")
        self.stdout.write("------------------")

        currentI = 1
        for award in self.awardTypes:
            try:
                AwardType.objects.get(id=currentI)
            except ObjectDoesNotExist:
                awardType = AwardType(type=award)
                awardType.save()
                self.stdout.write('Created the ' + str(awardType) + ' award!')
            currentI += 1

        self.stdout.write(str(currentI - 1) + ' Awards were created!\n\n\n')

        # Awards
        self.stdout.write("------------")
        self.stdout.write("-- Awards --")
        self.stdout.write("------------")
        data = ['Not Empty']

        try:
            lastModified = LastModify.objects.get(page=currentPage,
                                                  model='awards')
            headers['If-Modified-Since'] = lastModified.time
        except ObjectDoesNotExist:
            lastModified = LastModify(page=currentPage,
                                      model='awards')

        query = 'event/{}/awards'
        importedAwards = 0

        for frcEvent in Event.objects.all():
            newQuery = query.format(str(date.today().year) + frcEvent.id)
            self.stdout.write("Requesting all Awards from the {} Event".
                              format(frcEvent.name))
            response = requests.get(baseUrl + newQuery, headers=headers)
            response.raise_for_status()

            if not response.status_code == 304:
                lastModified.time = response.headers['last-modified']
                lastModified.save()

                receivedData = response.json()
                self.stdout.write(">  Request was successful, now applying " +
                                  "to DB\n\n")

                for newAward in receivedData:
                    for recipient in newAward['recipient_list']:
                        if recipient['team_number'] is not None:
                            # Setup
                            awardId = newAward['award_type'] + 1
                            awardRecipient = recipient['team_number']

                            # Setup
                            awardType = AwardType.objects.get(id=awardId)
                            winner = Team.objects.get(number=awardRecipient)

                            # Save
                            try:
                                Award.objects.get(type=awardType,
                                                  event=frcEvent,
                                                  recipient=winner)
                            except ObjectDoesNotExist:
                                award = Award(type=awardType,
                                              event=frcEvent,
                                              recipient=winner)
                                award.save()
                    importedAwards += 1
            else:
                self.stdout.write(">  Request was successful, but data has" +
                                  " not been modified\n")

        self.stdout.write("Successfully imported " + str(importedAwards) +
                          " awards")
