angular.module('starter')
    .factory('manifestService', function ($http, $filter) {
        var timeout = 8000;
        var manifestUrl = 'http://parachuteschool.com/manifest.json';

        var processJumperName = function (jumperName) {
            if (jumperName == null)
                return '***';

            var fullNameTokens = jumperName.split(',');

            if (fullNameTokens.length == 1)
                return jumperName;

            var lastName = fullNameTokens[0];
            var firstNameWithGarbage = fullNameTokens[1].trim();

            var firstName = firstNameWithGarbage.split(' ')[0];

            return firstName + ' ' + lastName[0] + '.';
        }

        return {
            getManifest: function () {
                return $http.get(manifestUrl, { timeout: timeout }).then(function (response) {
                    var manifestData = response.data;

                    manifestData = {
                        SnapshotDateTime: "2017-02-05T17:06:39.3428964Z",
                        ManifestInfoRecords: [
                            {
                                FromManifestNumber: "Caravan-01",
                                JumpType: "Tandem Passenger",
                                JumperName: null,
                                ProspectName: "Abblitt, Rebecca ",
                                DisplayOrder: 10,
                                ScheduledTakeOffTime: "2017-02-05T12:59:00",
                                Status: 1,
                                JumperCapacity: 17,
                                CurrentJumpers: 10
                            },
                            {
                                FromManifestNumber: "Caravan-01",
                                JumpType: "Tandem Master",
                                JumperName: "Bate, Kevin J ",
                                ProspectName: null,
                                DisplayOrder: 20,
                                ScheduledTakeOffTime: "2017-02-05T12:59:00",
                                Status: 1,
                                JumperCapacity: 17,
                                CurrentJumpers: 10
                            },
                            {
                                FromManifestNumber: "Caravan-01",
                                JumpType: "2 Camera Services",
                                JumperName: "Adams, Steve D ",
                                ProspectName: null,
                                DisplayOrder: 30,
                                ScheduledTakeOffTime: "2017-02-05T12:59:00",
                                Status: 1,
                                JumperCapacity: 17,
                                CurrentJumpers: 10
                            },
                            {
                                FromManifestNumber: "SGR-01",
                                JumpType: "Demo Jump",
                                JumperName: "Hannaford, Greg R ",
                                ProspectName: null,
                                DisplayOrder: 10,
                                ScheduledTakeOffTime: "2017-02-05T11:40:00",
                                Status: 1,
                                JumperCapacity: 4,
                                CurrentJumpers: 3
                            },
                            {
                                FromManifestNumber: "SGR-01",
                                JumpType: "Demo Jump",
                                JumperName: "Parry, Gareth J ",
                                ProspectName: null,
                                DisplayOrder: 20,
                                ScheduledTakeOffTime: "2017-02-05T11:40:00",
                                Status: 1,
                                JumperCapacity: 4,
                                CurrentJumpers: 3
                            },
                            {
                                FromManifestNumber: "SGR-01",
                                JumpType: "Demo Jump",
                                JumperName: "Sammit, Deb M ",
                                ProspectName: null,
                                DisplayOrder: 30,
                                ScheduledTakeOffTime: "2017-02-05T11:40:00",
                                Status: 1,
                                JumperCapacity: 4,
                                CurrentJumpers: 3
                            },
                            {
                                FromManifestNumber: "Caravan-01",
                                JumpType: "Tandem Passenger",
                                JumperName: null,
                                ProspectName: "Abbott, Johnathan ",
                                DisplayOrder: 40,
                                ScheduledTakeOffTime: "2017-02-05T12:59:00",
                                Status: 1,
                                JumperCapacity: 17,
                                CurrentJumpers: 10
                            },
                            {
                                FromManifestNumber: "Caravan-01",
                                JumpType: "Tandem Master",
                                JumperName: "Baxter, Derek S ",
                                ProspectName: null,
                                DisplayOrder: 50,
                                ScheduledTakeOffTime: "2017-02-05T12:59:00",
                                Status: 1,
                                JumperCapacity: 17,
                                CurrentJumpers: 10
                            },
                            {
                                FromManifestNumber: "Caravan-01",
                                JumpType: "video",
                                JumperName: "Adleman, Alanna E ",
                                ProspectName: null,
                                DisplayOrder: 60,
                                ScheduledTakeOffTime: "2017-02-05T12:59:00",
                                Status: 1,
                                JumperCapacity: 17,
                                CurrentJumpers: 10
                            },
                            {
                                FromManifestNumber: "Caravan-01",
                                JumpType: "Return Tandem",
                                JumperName: null,
                                ProspectName: "Abboud, Sofia ",
                                DisplayOrder: 70,
                                ScheduledTakeOffTime: "2017-02-05T12:59:00",
                                Status: 1,
                                JumperCapacity: 17,
                                CurrentJumpers: 10
                            },
                            {
                                FromManifestNumber: "Caravan-01",
                                JumpType: "TM Handcam",
                                JumperName: "Brooks, Jamie GW ",
                                ProspectName: null,
                                DisplayOrder: 80,
                                ScheduledTakeOffTime: "2017-02-05T12:59:00",
                                Status: 1,
                                JumperCapacity: 17,
                                CurrentJumpers: 10
                            },
                            {
                                FromManifestNumber: "Caravan-01",
                                JumpType: "Low Student",
                                JumperName: "Abal, Stephanie ",
                                ProspectName: null,
                                DisplayOrder: 90,
                                ScheduledTakeOffTime: "2017-02-05T12:59:00",
                                Status: 1,
                                JumperCapacity: 17,
                                CurrentJumpers: 10
                            },
                            {
                                FromManifestNumber: "Caravan-01",
                                JumpType: "JM1",
                                JumperName: "Mabee, Adam ",
                                ProspectName: null,
                                DisplayOrder: 100,
                                ScheduledTakeOffTime: "2017-02-05T12:59:00",
                                Status: 1,
                                JumperCapacity: 17,
                                CurrentJumpers: 10
                            }
                        ]
                    };

                    if (manifestData == null)
                        return null;

                    var loads = null;
                    var manifestRecords = manifestData.ManifestInfoRecords;
                    if (manifestRecords != null) {
                        loads = [];
                        var sortedRecords = $filter('orderBy')(manifestRecords, ['-ScheduledTakeOffTime', 'DisplayOrder']);

                        var currentLoad = null;
                        for (var i = 0; i < sortedRecords.length; i++) {
                            var currentRecord = sortedRecords[i];
                            if (currentLoad == null || currentLoad.name != currentRecord.FromManifestNumber) {
                                currentLoad = {
                                    name: currentRecord.FromManifestNumber,
                                    scheduledTakeOffTime: new Date(Date.parse(currentRecord.ScheduledTakeOffTime) + new Date().getTimezoneOffset() * 60 * 1000),
                                    status: currentRecord.Status,
                                    jumperCapacity: currentRecord.JumperCapacity,
                                    currentJumpers: currentRecord.CurrentJumpers,
                                    jumpers: []
                                }

                                loads.push(currentLoad);
                            }

                            var jumper = {
                                name: processJumperName(currentRecord.JumperName != null ? currentRecord.JumperName : currentRecord.ProspectName),
                                jumpType: currentRecord.JumpType
                            }

                            currentLoad.jumpers.push(jumper);
                        }
                    }
                    
                    return {
                        snapshotDateTime: new Date(Date.parse(manifestData.SnapshotDateTime)),
                        loads: loads
                    };
                }, function (error) {
                    return null;
                });
            }
        }
    });

