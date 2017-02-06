angular.module('starter')
    .factory('manifestService', function ($http, $filter) {
        var timeout = 8000;
        var manifestUrl = 'http://parachuteschool.com/manifest.json';

        return {
            getManifest: function () {
                return $http.get(manifestUrl, { timeout: timeout }).then(function (response) {
                    var manifestData = response.data;
                    
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
                                name: currentRecord.ProspectName == null ? currentRecord.JumperName : "***",
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

